import React from 'react';
import s from './Line.scss';

export default class Line extends React.Component {

    render() {
        return (
            <hr className={s.line} />
        );
    }
}
