import React, {PropTypes} from 'react';
import Error from '../Error';
import classNames from 'classnames';
import InputLabel from '../InputLabel';
import s from './TextInput.scss';

export default class TextInput extends React.Component {

    static propTypes = {
        label: PropTypes.string,
        placeholder: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        isDirty: PropTypes.bool,
        makeDirty: PropTypes.func,
        error: PropTypes.string,
        isRequired: PropTypes.bool,
    };

    handleChange = (event) => {
        const {onChange, makeDirty, name} = this.props;

        if (makeDirty) {
            makeDirty({
                [name]: true,
            });
        }

        onChange({
            [name]: event.target.value,
        })
    };

    renderError() {
        const {error, isDirty} = this.props;
        if (!error || !isDirty) {
            return;
        }

        return (
            <Error>{error}</Error>
        );
    }

    renderLabel() {
        const {label} = this.props;
        if (!label) {
            return;
        }

        return (
            <InputLabel>{label}</InputLabel>
        )
    }

    render() {
        const {name, value, className, placeholder, isRequired} = this.props;

        return (
            <div className={classNames(s.wrapper, className, {
                [s.required]: isRequired,
            })}>
                <label>
                    {this.renderLabel()}
                    <input
                        className={s.input}
                        name={name}
                        value={value}
                        onChange={this.handleChange}
                        placeholder={placeholder}
                    />
                </label>
                {this.renderError()}
            </div>
        );
    }
}
