import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import ProfileItem from '../ProfileItem';
import ProfileForm from '../ProfileForm';
import Line from '../../common/Line';
import s from './ProfileList.scss';

@inject((context) => ({
    profiles: context.store.profiles,
    state: context.state,
    store: context.store,
}))
@observer
export default class ProfileList extends React.Component {

    getEditHandler = (item) => () => {
        this.props.state.editProfileId = item.id;
    };

    getDeleteHandler = (item) => () => {
        this.props.store.deleteProfile(item.id);
    };

    getCancelHandler = (item) => () => {
        this.props.state.editProfileId = null;
    };

    render() {
        const {profiles} = this.props;
        return (
            <div>
                {profiles.map((profile) =>
                    <div key={profile.id}>
                        <If condition={this.props.state.editProfileId === profile.id}>
                            <ProfileForm
                                profile={profile}
                                onCancel={this.getCancelHandler(profile.id)}
                            />
                            <Else />
                            <ProfileItem
                                onEdit={this.getEditHandler(profile)}
                                onDelete={this.getDeleteHandler(profile)}
                                profile={profile}
                            />
                        </If>
                        <Line />
                    </div>
                )}
            </div>
        );
    }
}
