import React from 'react';
import { TreeWrapper, Loader } from '../index'

import * as treeActions from '../../store/tree/actions'

import { connect } from 'react-redux';

class TreeComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(treeActions.GET_tree(location.search));
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
                        this.props.showNodeInfo
                            ? <div className='node-info'>
                                <div className="name">Node: {this.props.selectedNode.name}</div>
                                <pre>{this.props.selectedNode.json}</pre>
                            </div>
                            : null
                    }
                    <div className="tree">
                        <TreeWrapper data={this.props.treeData}
                                     match={this.props.route}
                                     nodeClick={this.props.nodeClick}
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
            dispatch(treeActions.GET_tree(location.search));
            dispatch(treeActions.ShowNodeInfo(data));
        }
    };

    return { ...actions, dispatch };
};

function mapStateToProps(state) {
    return {
        treeData: state.tree.treeData,
        selectedNode: state.tree.selectedNode,
        isFetching: state.tree.isFetching,
        showNodeInfo: state.tree.showNodeInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);