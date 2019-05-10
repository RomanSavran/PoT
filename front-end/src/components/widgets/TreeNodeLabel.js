import React from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import Home from "../../containers/home/Home";

export class TreeNodeLabel extends React.PureComponent {
    render() {
        const {className, nodeData} = this.props;
        return (
            <div className={className}>
                {
                    nodeData.root
                    ? <span>{nodeData.name}</span>
                    : <Link to={`${nodeData.path}`}>{nodeData.name}</Link>

                }
            </div>
        )
    }
}