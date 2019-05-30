import React from 'react';
import { TreeWrapper, Loader } from '../components/index'

import * as treeActions from '../actions/tree'

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
                        this.props.selectedNode
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
            dispatch(treeActions.GET_tree(data, location.search, 'node'));
        },
        nodeTextClick: (data) => {
            //dispatch(treeActions.GET_tree(data, location.search, 'node'));
        }
    };

    return { ...actions, dispatch };
};

function mapStateToProps(state) {
    return {
        treeData: state.tree.data,
        selectedNode: state.tree.selectedNode,
        isFetching: state.tree.isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);