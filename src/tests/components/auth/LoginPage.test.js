import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { LoginPage } from '../../../components/auth/LoginPage'
import { loginManager, registerManager } from '../../../actions/auth'
import Swal from 'sweetalert2'

jest.mock('../../../actions/auth', () => ({
    loginManager: jest.fn(),
    registerManager: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}

let store = mockStore(initialState)

store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <LoginPage />
    </Provider>
)

describe('Pruebas en el componente LoginPage', () => {
    
    beforeEach( () => {
        jest.clearAllMocks()
    })

    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe realizar el dispatch del loginManager', () => {
        
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'test@test.com'
            }
        })

        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: 'test1234'
            }
        })

        wrapper.find('form').at(0).simulate('submit')

        expect( loginManager ).toHaveBeenCalledWith('test@test.com', 'test1234' )

    })

    test('Debe registrarse si las contraseñas son iguales', () => {
        
        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'test'
            }
        })

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'test@test.com'
            }
        })

        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: 'test1234'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: 'test1234'
            }
        })

        wrapper.find('form').at(1).simulate('submit')

        expect( Swal.fire ).not.toHaveBeenCalledWith()
        expect( registerManager ).toHaveBeenCalledWith('test', 'test@test.com', 'test1234')
    })
    
    
    test('No debe registrarse si las contraseñas son diferentes ', () => {
        
        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'test'
            }
        })

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'test@test.com'
            }
        })

        wrapper.find('input[name="registerPassword"]').simulate('change', {
            target: {
                name: 'registerPassword',
                value: 'test123'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: 'test1234'
            }
        })

        wrapper.find('form').at(1).simulate('submit')

        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password are not the same', 'error')
        expect( registerManager ).not.toHaveBeenCalled()
        
    })
    
    
})
