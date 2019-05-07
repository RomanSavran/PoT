import React from 'react'
import {TreeComponent} from '../../components/index'

import '../../less/pages/Home.less';

const Home = () => (
    <React.Fragment>
        <div id="home" className="viewport">
            <div className="viewport">
                <TreeComponent />
            </div>
        </div>
    </React.Fragment>
);

export default Home;