import React from 'react';

export class TreeNodeLabel extends React.PureComponent {
    render() {
        const {className, nodeData} = this.props;
        return (
            <div className={className}>
                <span>{nodeData.name}</span>
            </div>
        )
    }
}