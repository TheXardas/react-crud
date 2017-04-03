import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import s from './ProfileItem.scss';
import Phone from '../../common/Phone';
import Join from '../../common/Join';
import Button from '../../common/Button';
import * as dateHelper from '../../../util/dateHelper';

@observer
export default class ProfileItem extends React.Component {

    static propTypes = {
        profile: PropTypes.shape({

        }).isRequired,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
    };

    render() {
        const {profile} = this.props;
        return (
            <div className={s.wrapper}>
                <span className={s.name}>{profile.name}</span>
                <span className={s.birthDate}>{dateHelper.dateToString(profile.birthDate)}</span>
                <Phone
                    className={s.phone}
                    value={profile.phone}
                />
                <div>
                    <Join>
                        <If condition={profile.city}>
                            <span className={s.city}>{profile.city}</span>
                        </If>
                        <If condition={profile.address}>
                            <span className={s.address}>{profile.address}</span>
                        </If>
                    </Join>
                </div>

                <div className={s.buttons}>
                    <If condition={this.props.onEdit}>
                        <Button className={s.button} onClick={this.props.onEdit}>Edit</Button>
                    </If>
                    <If condition={this.props.onDelete}>
                        <Button className={s.button} onClick={this.props.onDelete}>Delete</Button>
                    </If>
                </div>
            </div>
        );
    }
}
