import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import s from './Button.scss';

export default class Button extends React.Component {

    render() {
        const cleanProps = _.omit(this.props, ['className']);

        return (
            <button
                className={classNames(s.button, this.props.className)}
                {...cleanProps}
            />
        );
    }
}
