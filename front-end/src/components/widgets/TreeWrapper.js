import React from 'react';
import Tree from 'react-d3-tree';
import PropTypes from 'prop-types';

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
                      translate={this.state.translate}/>
            </div>
        );
    }
}

TreeWrapper.propTypes = {
    data: PropTypes.array
};