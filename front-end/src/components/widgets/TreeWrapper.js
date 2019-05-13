import React from 'react';
import Tree from 'react-d3-tree';
import PropTypes from 'prop-types';

import { TreeNodeLabel } from '../index'

export class TreeWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            translate: {
                x: 0,
                y: 0
            }
        };
    }

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 2
            }
        });
    }

    render() {
        return (
            <div className="viewport" ref={tc => (this.treeContainer = tc)}>
                <Tree data={this.props.data}
                      allowForeignObjects
                      nodeLabelComponent={{
                        render: <TreeNodeLabel className='myLabelComponentInSvg' match={this.props.match} />,
                        foreignObjectWrapper: {
                          y: 10
                        }
                      }}
                      onClick={this.props.nodeClick}
                      nodeSize={{x: 140, y: 80}}
                      separation={{siblings: 1, nonSiblings: 1}}
                      translate={this.state.translate}/>
            </div>
        );
    }
}

TreeWrapper.propTypes = {
    data: PropTypes.array,
    nodeClick: PropTypes.func
};