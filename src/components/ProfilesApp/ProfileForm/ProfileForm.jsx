import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import Form from '../../common/Form';
import TextInput from '../../common/TextInput';
import BirthdayInput from '../../common/BirthdayInput';
import PhoneInput from '../../common/PhoneInput';
import Button from '../../common/Button';
import {isValidPhone, cleanPhone} from '../../../util/phoneHelper';
import {escapeString} from '../../../util/stringHelper';
import forms from '../../../constants/forms';
import s from './ProfileForm.scss';

@inject((context) => ({
    store: context.store,
}))
@observer
export default class ProfileForm extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        profile: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            birthDate: PropTypes.date,
            city: PropTypes.string,
            address: PropTypes.string,
        }),
        onCancel: PropTypes.func,
    };

    static getDefaultProfile() {
        return {
            id: null,
            name: '',
            birthDate: null,
            phone: '',
            city: '',
            address: '',
        };
    }

    getValues() {
        const values = ProfileForm.getDefaultProfile();

        const {profile} = this.props;
        if (profile && profile.id) {
            Object.assign(values, profile);
        }

        return values;
    }

    validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }

        if (!values.birthDate) {
            errors.birthDate = 'Birthday is required';
        }

        if (values.phone && !isValidPhone(values.phone)) {
            errors.phone = 'Phone is invalid. Currently we only work with russian mobile phones.';
        }

        return errors;
    };

    escapeProfile = (profile) => {
        return Object.assign({}, profile, {
            name: escapeString(profile.name),
            city: escapeString(profile.city),
            address: escapeString(profile.address),
            phone: cleanPhone(profile.phone),
        });
    };

    submit = (values) => {
        const {store, profile, onCancel} = this.props;
        if (!profile.id) {
            store.addProfile(values);
        } else {
            store.editProfile(values);
        }

        if (onCancel) {
            onCancel();
        }
    };

    render() {
        const {profile, onCancel, className} = this.props;
        const submitText = profile.id ? 'Save' : 'Create';
        return (
            <div className={className}>
                <Form
                    formId={forms.PROFILE_EDIT_FORM}
                    initialValues={this.getValues()}
                    validate={this.validate}
                    onSubmit={this.submit}
                    render={(fieldProps, submit, reset) =>
                        <div>
                            <div className={s.inputRow}>
                                <TextInput
                                    label="Full name"
                                    placeholder="Enter your first, last and second names"
                                    className={classNames(s.input, s.nameInput)}
                                    isRequired
                                    {...fieldProps.name}
                                />
                            </div>
                            <div className={s.inputRow}>
                                <BirthdayInput
                                    label="Birth date"
                                    className={classNames(s.input, s.birthdayInput)}
                                    isRequired
                                    {...fieldProps.birthDate}
                                />
                                <PhoneInput
                                    label="Phone number"
                                    className={classNames(s.input, s.phoneInput)}
                                    {...fieldProps.phone}
                                />
                            </div>
                            <div className={s.inputRow}>
                                <TextInput
                                    label="City"
                                    placeholder="Moscow"
                                    className={classNames(s.input, s.cityInput)}
                                    {...fieldProps.city}
                                />
                                <TextInput
                                    label="Address"
                                    placeholder="Malaiya Dmitrovka str., 20"
                                    className={classNames(s.input, s.addressInput)}
                                    {...fieldProps.address}
                                />
                            </div>

                            <div className={s.inputRow}>
                                <div>
                                    <Button
                                        className={s.button}
                                        onClick={submit}
                                        type="submit"
                                    >
                                        {submitText}
                                    </Button>

                                    <If condition={onCancel}>
                                        <Button
                                            className={s.button}
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </If>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        );
    }
}
