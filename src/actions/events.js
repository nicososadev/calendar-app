import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'
import { types } from '../types/types'

export const eventCreateManager = (event) => {

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth

        try {
            const response = await fetchWithToken('events', event, 'POST')
            const body = await response.json()
            
            if (body.ok) {
                event.id = body.event.id
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch( createEvent(event) )
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const createEvent = (event) => {

    return {

        type: types.eventCreate,
        payload: event
    }
}

export const setActive = (event) => {

    return {
        
        type: types.eventSetActive,
        payload: event
    }
}


export const cleanActiveEvent = () => {

    return {
        type: types.cleanActiveEvent,
    }
}

export const cleanCalendar = () => {
    
    return {
        type: types.cleanCalendar,
    }
}

export const updateEventManager = (event) => {

    return async(dispatch) => {

        try {
            const response = await fetchWithToken(`events/${event.id}`, event, 'PUT')
            const body = await response.json()

            if (body.ok) {
                dispatch( updateEvent(event) )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const updateEvent = (event) => {

    return {
        
        type: types.eventUpdate,
        payload: event
    }
}

export const deleteEventManager = () => {

    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent

        try {
            const response = await fetchWithToken(`events/${id}`, {}, 'DELETE')
            const body = await response.json()

            if (body.ok) {
                dispatch( deleteEvent() )
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const deleteEvent = () => {

    return {
        
        type: types.eventDelete
    }
}

export const eventReadManager = () => {

    return async (dispatch) => {

        try {
            const response = await fetchWithToken('events', {}, 'GET')
            const body = await response.json()

            const events = prepareEvents(body.events)

            dispatch( eventRead(events) )

        } catch (error) {
            console.log(error)
        }

    }
}

const eventRead = (events) => {

    return {
        type: types.eventRead,
        payload: events
    }
}