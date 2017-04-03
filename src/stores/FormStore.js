import {observable} from 'mobx';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Storage for generic Form component. Contains all forms
 */
export default class FormStore {

    @observable _state = {
        formDataByFormId: observable.map({}),
    };

    static getDefaultErrors(initialValues) {
        const errors = {};
        Object.keys(initialValues).forEach((key) => {
            errors[key] = '';
        });
        return errors;
    }

    static getDefaultIsDirty(initialValues) {
        const isDirty = {};
        Object.keys(initialValues).forEach((key) => {
            isDirty[key] = false;
        });
        return isDirty;
    }

    static getDefaultFormState(initialValues) {
        // values are cloned, so we don't loose initialValues through mutations.
        return observable({
            initialValues,
            values: observable(cloneDeep(initialValues)),
            errors: FormStore.getDefaultErrors(initialValues),
            isDirty: FormStore.getDefaultIsDirty(initialValues),
        });
    }

    _create(formId, initialValues) {
        this._state.formDataByFormId.set(formId, FormStore.getDefaultFormState(initialValues));
    }

    _updateInitialValues(formId, initialValues) {
        this._state.formDataByFormId.get(formId).initialValues = initialValues;
    }

    _destroy(formId) {
        this._state.formDataByFormId.delete(formId);
    }

    _reset(formId) {
        const formData = this._state.formDataByFormId.get(formId);
        this._updateIsDirty(formId, FormStore.getDefaultIsDirty(formData.initialValues), false);
        this._updateValues(formId, formData.initialValues, false);
        this._updateErrors(formId, FormStore.getDefaultErrors(formData.initialValues));
    }

    _updateValues(formId, values) {
        if (!this._state.formDataByFormId.get(formId)) {
            return;
        }


        // Values are cloned, so no unexpected mutations occur.
        // Shallow assign, so no ghost deep values are forgotten.
        this._state.formDataByFormId.get(formId).values = Object.assign({},
            this._state.formDataByFormId.get(formId).values,
            values
        );
    }

    _updateErrors(formId, errors) {
        if (!this._state.formDataByFormId.get(formId)) {
            return;
        }

        // Errors are not merged.
        this._state.formDataByFormId.get(formId).errors = Object.assign({},
            FormStore.getDefaultErrors(this._state.formDataByFormId.get(formId).initialValues),
            errors
        );
    }

    _updateIsDirty(formId, values) {
        this._state.formDataByFormId.get(formId).isDirty = Object.assign({},
            this._state.formDataByFormId.get(formId).isDirty,
            values
        );
    }

    formExists(formId) {
        return this._state.formDataByFormId.has(formId);
    }

    getCurrentValues(formId) {
        if (!this._state.formDataByFormId.get(formId)) {
            return;
        }
        return this._state.formDataByFormId.get(formId).values;
    }

    getCurrentErrors(formId) {
        if (!this._state.formDataByFormId.get(formId)) {
            return;
        }
        return this._state.formDataByFormId.get(formId).errors;
    }

    getCurrentIsDirty(formId) {
        if (!this._state.formDataByFormId.get(formId)) {
            return;
        }
        return this._state.formDataByFormId.get(formId).isDirty;
    }
}
