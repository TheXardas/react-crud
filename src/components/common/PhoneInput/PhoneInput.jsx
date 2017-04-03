import React, {PropTypes} from 'react';
import classNames from 'classnames';
import TextInput from '../TextInput';
import InputLabel from '../InputLabel';
import Error from '../Error';
import s from './PhoneInput.scss';
import _ from 'lodash';

export default class PhoneInput extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        makeDirty: PropTypes.func,
        isDirty: PropTypes.bool,
        onChange: PropTypes.func,
        error: PropTypes.string,
    };

    renderLabel() {
        const {label} = this.props;
        if (!label) {
            return;
        }

        return <InputLabel>{label}</InputLabel>;
    }

    renderError() {
        const {error, isDirty} = this.props;
        if (!error || !isDirty) {
            return;
        }

        return <Error>{error}</Error>
    }

    render() {
        const cleanProps = _.omit(this.props, ['label', 'error', 'className']);

        return (
            <div className={classNames(s.wrapper, this.props.className)}>
                <label className={s.label}>
                    {this.renderLabel()}
                    <span className={s.code}>+7</span>
                    <TextInput
                        placeholder="915 23 23 32"
                        className={s.input}
                        {...cleanProps}
                    />
                </label>
                {this.renderError()}
            </div>
        );
    }
}
