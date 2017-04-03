import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Select from '../Select';
import Error from '../Error';
import s from './BirthdayInput.scss';
import * as dateHelper from '../../../util/dateHelper';
import InputLabel from '../InputLabel';

export default class BirthdayInput extends React.Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.object,
        onChange: PropTypes.func,
        makeDirty: PropTypes.func,
        isDirty: PropTypes.bool,
        error: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = dateHelper.dateToNumbers(props.value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(
                dateHelper.dateToNumbers(nextProps.value)
            );
        }
    }

    handleChange = () => {
        const {onChange, name, value} = this.props;

        if (!onChange) {
            return;
        }

        const {day, month, year} = this.state;
        const newValue = dateHelper.numbersToDate(day, month, year);
        if (newValue !== value) {
            onChange({
                [name]: newValue,
            });
        }
    };

    handleSelectChange = (update) => {
        this.setState(update, () => {
            this.handleChange();
        });
    };

    renderError() {
        const {error, isDirty} = this.props;
        if (!error || !isDirty) {
            return;
        }
        return <Error>{error}</Error>
    }

    renderLabel() {
        const {label} = this.props;
        if (!label) {
            return;
        }

        return <InputLabel>{label}</InputLabel>
    }

    render() {
        return (
            <div className={classNames(s.wrapper, this.props.className, {
                [s.required]: this.props.isRequired,
            })}>
                <label>
                    {this.renderLabel()}
                </label>
                <Select
                    name="day"
                    className={classNames(s.input, s.dayInput)}
                    options={dateHelper.getSelectableDays()}
                    onChange={this.handleSelectChange}
                    value={this.state.day}
                />
                <Select
                    name="month"
                    className={classNames(s.input, s.monthInput)}
                    options={dateHelper.getSelectableMonths()}
                    onChange={this.handleSelectChange}
                    value={this.state.month}
                />
                <Select
                    name="year"
                    className={classNames(s.input, s.yearInput)}
                    options={dateHelper.getSelectableYears()}
                    onChange={this.handleSelectChange}
                    value={this.state.year}
                />
                {this.renderError()}
            </div>
        );
    }
}
