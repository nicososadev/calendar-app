import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { LoginPage } from '../auth/LoginPage'
import { CalendarPage } from '../calendar/CalendarPage'

export const AppRouter = () => {

    return (
        
        <Router>
            <div>
                <Switch>
                    <Route path='/login' component={ LoginPage } />
                    <Route exact path='/' component={ CalendarPage } />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
