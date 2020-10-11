import Swal from "sweetalert2"
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"

export const loginManager = (email, password) => {

    return async (dispatch) => {

        const response = await fetchWithoutToken('auth', { email, password }, 'POST')

        const body = await response.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('tokenInitDate', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {

            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const registerManager = (name, email, password) => {

    return async (dispatch) => {
        
        const response = await fetchWithoutToken('auth/register', { name, email, password }, 'POST')
    
        const body = await response.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('tokenInitDate', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {

            Swal.fire('Error', body.msg, 'error')
        }
    }

}

export const checkingManager = () => {

    return async (dispatch) => {

        const response = await fetchWithToken('auth/renew', {}, 'GET')
    
        const body = await response.json()

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('tokenInitDate', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            
            dispatch( checkingFinish() )
        }
    }
}

export const logoutManager = () => {

    return (dispatch) => {

        localStorage.clear()

        dispatch( logout() )
    }
}

const login = (user) => {

    return {
        type: types.authLogin,
        payload: user
    }
}

const logout = () => {

    return {
        type: types.authLogout
    }
}

const checkingFinish = () => {

    return {
        type: types.authCheckingFinished
    }
}




