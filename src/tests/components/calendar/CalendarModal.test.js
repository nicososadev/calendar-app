import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moment from 'moment'
import { Provider } from 'react-redux'
import { CalendarModal } from '../../../components/calendar/CalendarModal'
import { cleanActiveEvent, eventCreateManager, updateEventManager } from '../../../actions/events'
import { act } from 'react-dom/test-utils'
import Swal from 'sweetalert2'

jest.mock('../../../actions/events', () => ({
    updateEventManager: jest.fn(),
    cleanActiveEvent: jest.fn(),
    eventCreateManager: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1, 'hours')

const initialState = {
    ui: {
        modalOpen: true
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Prueba',
            notes: 'Evento de prueba',
            start: now.toDate(),
            end: now.add(1,'hours').toDate()
        }
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
        <CalendarModal />
    </Provider>
)

describe('Pruebas en el componente CalendarModal', () => {
    
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Debe mostrar correctamente el Modal ', () => {
        
        const modalOpen = wrapper.find('Modal').prop('isOpen')

        expect(modalOpen).toBe(true)
    })

    test('Debe llamar la accion updateEventManager y cerrar el Modal', () => {
        
        wrapper.find('form').simulate('submit')

        expect( updateEventManager ).toHaveBeenCalledWith( initialState.calendar.activeEvent )
        expect( cleanActiveEvent ).toHaveBeenCalled()
    })

    test('Debe mostrar el error si no se introduce el titulo correctamente ', () => {
        
        wrapper.find('form').simulate('submit')

        const titleError = wrapper.find('input[name="title"]').hasClass('is-invalid')

        expect( titleError ).toBe( true )
        
    })

    test('Debe llamar a la accion eventCreateManager', () => {
        
        const initialState = {
            ui: {
                modalOpen: true
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
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Prueba'
            }
        })

        wrapper.find('form').simulate('submit')

        expect( eventCreateManager ).toHaveBeenCalledWith({
            "end": expect.anything(), 
            "notes": "", 
            "start": expect.anything(),
            "title": "Prueba"
        })

        expect( cleanActiveEvent ).toHaveBeenCalled()

    })

    test('Debe realizar la validacion de fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Prueba'
            }
        })

        const now = new Date()

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(now)
        })

        wrapper.find('form').simulate('submit')

        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
        
    })
    
})
