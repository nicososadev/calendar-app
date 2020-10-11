import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { checkingManager } from '../actions/auth'
import { LoginPage } from '../components/auth/LoginPage'
import { CalendarPage } from '../components/calendar/CalendarPage'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const dispatch = useDispatch()

    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( checkingManager() )
        
    }, [dispatch])

    if ( checking ) {

        return (<h4>Wait...</h4>)

    }

    return (
        
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' isAuthenticated={ !!uid } component={ LoginPage } />
                    <PrivateRoute exact path='/' isAuthenticated={ !!uid } component={ CalendarPage } />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
