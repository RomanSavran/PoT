import React from 'react';
import { TreeWrapper, Loader } from '../index'

import * as treeActions from '../../store/tree/actions'

import { connect } from 'react-redux';

class TreeComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(treeActions.GET_tree(this.props.route.path));
    }
    
    render() {
        return (
            <React.Fragment>
                {
                    this.props.isFetching 
                        ? <Loader data={{size: 100}} />
                        : null
                }
                <TreeWrapper data={this.props.treeData} match={this.props.route} nodeClick={this.props.nodeClick} />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    let actions = {
        nodeClick: (data) => {
            dispatch(treeActions.nodeClick(data))
        }
    };

    return { ...actions, dispatch };
};

function mapStateToProps(state) {
    return {
        treeData: state.tree.treeData,
        isFetching: state.tree.isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeComponent);