import React from 'react';
import {inject, observer} from 'mobx-react';
import isEqual from 'lodash/isEqual';
import FormStore from '../../../stores/FormStore';

@inject((context, props) => {
    const {formStore} = context;
    const formExists = formStore.formExists(props.formId);

    return {
        formStore: context.formStore,
        currentValues: formExists
            ? formStore.getCurrentValues(props.formId)
            : props.initialValues,
        currentErrors: formExists
            ? formStore.getCurrentErrors(props.formId)
            : FormStore.getDefaultErrors(props.initialValues),
        currentIsDirty: formExists
            ? formStore.getCurrentIsDirty(props.formId)
            : FormStore.getDefaultIsDirty(props.initialValues),
    };
})
@observer
export default class Form extends React.Component {
    static propTypes = {
        formId: React.PropTypes.string.isRequired,
        initialValues: React.PropTypes.object.isRequired,
        onSubmit: React.PropTypes.func,
        validate: React.PropTypes.func,
        // This is the render function. Parameters: fieldProps, submit, reset.
        render: React.PropTypes.func.isRequired,
        forceSubmitOnErrors: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        // currentValues and currentErrors from storage.
        currentValues: React.PropTypes.object,
        currentErrors: React.PropTypes.object,
        currentIsDirty: React.PropTypes.object,
    };

    componentDidMount() {
        const {formId, initialValues, formStore} = this.props;
        if (!formId) {
            throw new Error('Form id is required!');
        }

        formStore._create(formId, initialValues);
    }

    componentWillReceiveProps(nextProps) {
        const {formId, initialValues} = nextProps;

        if (formId !== this.props.formId) {
            throw new Error(`Form id was changed during form lifetime! Old: ${this.props.formId}; new: ${formId}`);
        }

        if (initialValues !== this.props.initialValues && !isEqual(initialValues, this.props.initialValues)) {
            this.props.formStore._updateInitialValues(formId, initialValues);
        }

        if (this.props.currentValues && !isEqual(nextProps.currentValues, this.props.currentValues)) {
            if (this.props.onChange) {
                this.props.onChange(nextProps.currentValues, this.props.currentValues);
            }
            this.validate(nextProps.currentValues);
        }
    }

    componentWillUnmount() {
        const {formId, formStore} = this.props;
        formStore._destroy(formId);
    }

    handleChange = (newValues) => {
        const {formId, formStore, currentValues} = this.props;

        const allValues = Object.assign({}, currentValues, newValues);
        const errors = this.validate(allValues);

        formStore._updateValues(formId, newValues);
        formStore._updateErrors(formId, errors)
    };

    validate = (values) => {
        const {validate} = this.props;
        if (!validate) {
            return;
        }
        return validate(values);
    };

    hasErrors() {
        const {currentErrors} = this.props;
        let hasErrors = false;
        Object.keys(currentErrors).forEach((key) => {
            if (currentErrors[key].length) {
                hasErrors = true;
            }
        });

        return hasErrors;
    }

    makeDirty = (newIsDirty) => {
        const {formId, formStore} = this.props;

        formStore._updateIsDirty(formId, newIsDirty);
    };

    makeAllDirty = () => {
        const isDirty = {};
        Object.keys(this.props.initialValues).forEach((key) => {
            isDirty[key] = true;
        });
        this.makeDirty(isDirty);
    };

    reset = (e) => {
        const {formId, formStore} = this.props;
        if (e) {
            e.preventDefault();
        }

        formStore._reset(formId);
    };

    submit = (e) => {
        const {forceSubmitOnErrors, onSubmit, currentValues, formStore, formId} = this.props;

        if (e) {
            e.preventDefault();
        }

        // Mark all inputs in form as dirty, so all errors will become visible
        this.makeAllDirty();

        const errors = this.validate(currentValues);
        if (errors && Object.keys(errors).length && !forceSubmitOnErrors) {
            formStore._updateErrors(formId, errors);
            return;
        }

        // we can only submit form, if there is no errors.
        if (forceSubmitOnErrors || !this.hasErrors()) {
            onSubmit(currentValues);
        }
    };

    prepareFieldProps(values, errors, isDirty) {
        const fieldProps = {};
        Object.keys(values).forEach((key) => {
            fieldProps[key] = {
                name: key,
                onChange: this.handleChange,
                makeDirty: this.makeDirty,
                value: values[key],
                isDirty: isDirty && isDirty[key] ? isDirty[key] : false,
                error: errors && errors[key] ? errors[key] : '',
            };
        });

        return fieldProps;
    }

    render() {
        const {render, currentValues, currentErrors, currentIsDirty} = this.props;

        return render(
            this.prepareFieldProps(currentValues, currentErrors, currentIsDirty),
            this.submit, this.reset
        );
    }
}
