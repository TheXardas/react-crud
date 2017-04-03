import {observer, inject} from 'mobx-react';
import React, {PropTypes} from 'react';
import ProfileList from './ProfileList';
import ProfileForm from './ProfileForm';
import ProfileHeader from './ProfileHeader';
import Button from '../common/Button';
import s from './ProfilesApp.scss';

@inject((context) => ({
    state: context.state,
    store: context.store,
}))
@observer
export default class ProfilesApp extends React.Component {
    onNewProfileCancel = () => {
        this.props.state.newProfileFormVisible = false;
        this.props.state.editProfileId = null;
    };

    onAddProfileButtonClick = () => {
        this.props.state.newProfileFormVisible = true;
        this.props.state.editProfileId = null;
    };

    onProfileEdit = (profile) => {
        this.props.state.editProfileId = profile.id;
    };

    renderNewProfileForm() {
        if (!this.props.state.newProfileFormVisible) {
            // If form is not visible yet, show the button
            return (
                <Button onClick={this.onAddProfileButtonClick}>
                    New profile
                </Button>
            );
        }

        return (
            <ProfileForm className={s.form} profile={{}} onCancel={this.onNewProfileCancel} />
        );
    }

    render() {
        return (
            <div className={s.layout}>
                <ProfileHeader className={s.header} />
                <ProfileList className={s.list} onProfileEdit={this.onProfileEdit} />
                {this.renderNewProfileForm()}
            </div>
        );
    }
}
