import React from 'react';
import { Link } from "react-router-dom";

import '../../less/layouts/TreeNodeLabel.less'

export class TreeNodeLabel extends React.PureComponent {
    render() {
        const {nodeData} = this.props;
        return (
            <div className="treeNodeLabel">
                {
                    nodeData.root
                    ? <span className="name">{nodeData.label}</span>
                    : <span className="name"><Link to={{pathname: '/tree', search: `?api=${nodeData.path}`}}>{nodeData.label}</Link></span>
                }
            </div>
        )
    }
}