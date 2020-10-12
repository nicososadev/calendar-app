import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab'
import { deleteEventManager } from '../../../actions/events'

jest.mock('../../../actions/events', () => ({
    deleteEventManager: jest.fn()
}))

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

    test('Debe llamar la funcion deleteEventManager al hacer click en borrar', () => {
        
        wrapper.find('button').simulate('click')

        expect( deleteEventManager ).toHaveBeenCalledTimes(1)
    })
    
})
