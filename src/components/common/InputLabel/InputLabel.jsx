import React from 'react';
import s from './InputLabel.scss';

export default class InputLabel extends React.Component {

    render() {
        return (
            <span className={s.label}>{this.props.children}</span>
        );
    }
}
