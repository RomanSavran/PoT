import React from 'react';
import { Link } from "react-router-dom";

import '../../less/layouts/TreeNodeLabel.less'

export class TreeNodeLabel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);

    }

    click() {
        this.props.click(this.props.nodeData);
    }
    render() {
        const {nodeData} = this.props;
        return (
            <div className="treeNodeLabel" onClick={this.click}>
                {
                    nodeData.root
                    ? <span className="name">{nodeData.label}</span>
                    : <span className="name"><Link to={{pathname: `${this.props.match.url}`, search: `?api=${nodeData.path}`}}>{nodeData.label}</Link></span>
                }
            </div>
        )
    }
}