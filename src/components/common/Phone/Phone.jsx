import React from 'react';
import classNames from 'classnames';
import s from './Phone.scss';

export default class Phone extends React.Component {

    render() {
        if (!this.props.value) {
            return null;
        }

        return (
            <div className={classNames(s.wrapper, this.props.className)}>
                <span className={s.code}>+7</span><span>{this.props.value}</span>
            </div>
        );
    }
}
