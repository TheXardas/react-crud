import React, { PropTypes } from 'react';

export default class Join extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        separator: PropTypes.node,
        children: PropTypes.node,
    };

    render() {
        const { children } = this.props;

        const separator = this.props.separator || ', ';

        const filtered = children.filter(item => item);
        const separatedItems = filtered.map((child, index) => {
            if (index === filtered.length - 1) {
                return <span key={index}>{child}</span>;
            }
            return <span key={index}>{child}{separator}</span>;
        });
        return (
            <span className={this.props.className}>
                {separatedItems}
            </span>
        );
    }
}
