import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AppRouter } from '../../routers/AppRouter'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Pruebas en el componente AppRouter', () => {
    
    test('Debe mostrarse correctamente ', () => {
        
        const initialState = {
            auth: {
                checking: true
            }
        }
        
        let store = mockStore(initialState)
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()

    })

    test('Debe mostrarse la ruta publica ', () => {
        
        const initialState = {
            auth: {
                checking: false
            }
        }
        
        let store = mockStore(initialState)
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
        
        const loginContainer = wrapper.find('.login-container')

        expect( loginContainer.exists() ).toBe( true )
        
    })

    test('Debe mostrarse la ruta privada ', () => {
        
        const initialState = {
            ui: {
                modalOpen: false,
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'test'
            }
            
        }
        
        let store = mockStore(initialState)
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
        
    })
    
})
