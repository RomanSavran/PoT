import React from 'react';
import { Link } from "react-router-dom";

export class TreeNodeLabel extends React.PureComponent {
    render() {
        const {className, nodeData} = this.props;
        return (
            <div className={className}>
                {
                    nodeData.root
                    ? <span>{nodeData.name}</span>
                    : <Link to={`${this.props.match.url}/${nodeData.name}`}>{nodeData.name}</Link>
                }
            </div>
        )
    }
}