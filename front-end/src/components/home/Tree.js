import React from 'react';
import { TreeWrapper, Loader } from '../index'

import * as treeActions from '../../store/tree/actions'

import { connect } from 'react-redux';

class TreeComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(treeActions.GET_tree(null, location.search, 'page'));
    }
    componentWillUnmount() {
        this.props.dispatch(treeActions.Unmount());
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    this.props.isFetching 
                        ? <Loader data={{size: 100}} />
                        : null
                }
                <div className="tree-control viewport">
                    {
                        this.props.selectedNode.json
                            ? <div className="node-info swing-in-left-fwd">
                            <div className="name">Node: {this.props.selectedNode.name}</div>
                            <pre>{this.props.selectedNode.json}</pre>
                        </div>
                            : null
                    }

                    <div className="tree">
                        <TreeWrapper data={this.props.treeData}
                                     match={this.props.route}
                                     nodeClick={this.props.nodeClick}
                                     nodeTextClick={this.props.nodeTextClick}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    let actions = {
        nodeClick: (data) => {
            // dispatch(treeActions.ShowNodeInfo(data));
        },
        nodeTextClick: (data) => {
            dispatch(treeActions.GET_tree(data, location.search, 'node'));
        }
    };

    return { ...actions, dispatch };
};

function mapStateToProps(state) {
    return {
        treeData: state.tree.treeData,
        selectedNode: state.tree.selectedNode,
        isFetching: state.tree.isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);