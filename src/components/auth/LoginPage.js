import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { loginManager, registerManager } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import '../../styles/auth/login.css';

export const LoginPage = () => {

    const dispatch = useDispatch()

    const initalLoginFormValues = {
        loginEmail: '',
        loginPassword: ''
    }

    const initalRegisterFormValues = {
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: ''
    }

    const [ LoginFormValues, handleLoginInputChange ] = useForm(initalLoginFormValues)

    const [ RegisterFormValues, handleRegisterInputChange ] = useForm(initalRegisterFormValues)

    const { loginEmail, loginPassword } = LoginFormValues

    const { registerName, registerEmail, registerPassword, registerPassword2 } = RegisterFormValues

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch( loginManager(loginEmail, loginPassword) )
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if ( registerPassword !== registerPassword2 ){
            return Swal.fire('Error', 'Password are not the same', 'error')
        }
        
        dispatch( registerManager(registerName, registerEmail, registerPassword) )
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">

                    <h3>Sign in</h3>

                    <form onSubmit={handleLogin}>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="loginEmail" value={loginEmail} 
                                onChange={handleLoginInputChange} 
                                placeholder="Email" 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="loginPassword" 
                                value={loginPassword} 
                                onChange={handleLoginInputChange} 
                                placeholder="Password" 
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">

                    <h3>Register</h3>

                    <form onSubmit={handleRegister}>

                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                                placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                                placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}
                                placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                                placeholder="Confirm Password" />
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}