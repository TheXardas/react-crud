import React, {PropTypes} from 'react';
import classNames from 'classnames';
import s from './Select.scss';

export default class Select extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        options: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                    ]).isRequired,
                    name: PropTypes.string,
                })
            ),
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.number),
        ]).isRequired,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        isDirty: PropTypes.bool,
        makeDirty: PropTypes.func,
        onChange: PropTypes.func,
        error: PropTypes.string,
        isRequired: PropTypes.bool,
    };

    handleChange = (event) => {
        const {onChange, name, makeDirty} = this.props;

        if (makeDirty) {
            makeDirty({
                [name]: true,
            });
        }

        if (onChange) {
            onChange({
                [name]: event.target.value,
            });
        }
    };

    renderValues() {
        return this.props.options.map(option => {
            let label;
            let value;
            if (typeof option === 'string' || typeof option === 'number') {
                value = option;
                label = option;
            } else if (typeof option === 'object') {
                value = option.id;
                label = option.name;
            } else {
                throw new Error('Incorrect option recieved in select! ' + typeof option);
            }
            return (
                <option key={value} value={value}>{label}</option>
            );
        });
    }

    render() {
        const {value, className, isRequired} = this.props;
        return (
            <select
                className={classNames(s.input, className, {
                    [s.required]: isRequired,
                })}
                value={value}
                onChange={this.handleChange}
            >
                {this.renderValues()}
            </select>
        );
    }
}
