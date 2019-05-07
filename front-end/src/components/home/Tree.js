import React from 'react';
import {TreeWrapper} from '../index'

const myTreeData = [
    {
        name: 'Top Level',
        attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C'
        },
        children: [
            {
                name: 'Level 2: A',
                attributes: {
                    keyA: 'val A',
                    keyB: 'val B',
                    keyC: 'val C'
                }
            },
            {
                name: 'Level 2: B'
            }
        ]
    }
];

export class TreeComponent extends React.Component {
    render() {
        return (
            <TreeWrapper data={myTreeData} />
        );
    }
}