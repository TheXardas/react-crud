import React from 'react';
import s from './Button.scss';

export default class Button extends React.Component {

    render() {
        // TODO use css modules for styles, not the foundation framework
        return (
            <button {...this.props} />
        );
    }
}
