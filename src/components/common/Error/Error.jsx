import React from 'react';
import s from './Error.scss';

export default class Error extends React.Component {

    render() {
        return (
            <div className={s.error}>{this.props.children}</div>
        );
    }
}
