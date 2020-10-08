import { types } from '../types/types'

export const createEvent = (event) => {

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

export const updateEvent = (event) => {

    return {
        
        type: types.eventUpdate,
        payload: event
    }
}

export const deleteEvent = (event) => {

    return {
        
        type: types.eventDelete
    }
}
