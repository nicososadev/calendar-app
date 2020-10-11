import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutManager } from '../../actions/auth'

export const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch( logoutManager() )
    }

    const { name } = useSelector(state => state.auth)

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{ name }</span>

            <button onClick={handleLogout} className="btn btn-danger">
                <i className="fas fa-sign-out-alt" ></i>
                <span> Salir</span>
            </button>
        </div>

    )
}
