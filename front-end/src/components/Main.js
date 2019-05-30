import React from 'react'
import { routes } from '../modules/_index'
import { Route, Switch, Redirect } from 'react-router-dom'

const Main = () => {
    return (
        <main className="viewport">
            <Switch>
                {
                    routes.map((item) => {
                        return <Route key={'Route_' + item.path} path={`${item.path}`} component={item.component}/>
                    })
                }
                <Redirect from="/" to={{pathname: '/tree', search: '?api=contexts'}}/>
            </Switch>
        </main>
    );
};

export default Main;