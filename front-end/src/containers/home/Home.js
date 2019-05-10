import React from 'react'
import { TreeComponent } from '../../components/index'
import { Route } from 'react-router-dom'

import '../../less/pages/Home.less';

const Home = ({ match }) => (
    <React.Fragment>
        <div id="home" className="viewport">
            <div className="viewport">
                <TreeComponent route={match} />
                <Route path={`${match.url}/:id`} component={Home}/>
            </div>
        </div>
    </React.Fragment>
);

export default Home;