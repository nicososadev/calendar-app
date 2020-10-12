import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { CalendarPage } from '../../../components/calendar/CalendarPage'
import { types } from '../../../types/types'
import { setActive } from '../../../actions/events'
import { act } from 'react-dom/test-utils'

jest.mock('../../../actions/events', () => ({
    setActive: jest.fn(),
    eventReadManager: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    ui: {
        modalOpen: false
    },
    calendar: {
        events: [],
        activeEvent: null
    },
    auth: {
        uid: '123',
        name: 'test'
    }
}

let store = mockStore(initialState)

store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarPage />
    </Provider>
)

describe('Pruebas en el componente CalendarPage', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot()
    })

    test('Pruebas en las interacciones del Calendario', () => {
        
        const calendar = wrapper.find('Calendar')

        calendar.prop('onDoubleClickEvent')()
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal })

        calendar.prop('onSelectEvent')({ start: '1' })
        expect( setActive ).toHaveBeenCalledWith({ start: '1' })

        act(() => {
            calendar.prop('onView')('week')
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week')
        })

    })
    
})
