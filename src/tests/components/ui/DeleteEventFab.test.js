import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}

let store = mockStore(initialState)

store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
)

describe('Pruebas en componente DeleteEventFab', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot()
    })
    
})
