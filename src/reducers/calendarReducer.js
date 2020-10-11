import { types } from "../types/types"

// {
//     id: '1sd56a1s65das',
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     user: {
//         _id: '123',
//         name: 'Nicolas'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.eventCreate:
            
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventSetActive:
            
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.cleanActiveEvent:
        
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
    
            return {
                ...state,
                events: state.events.map(
                    event => ( event.id === action.payload.id )
                        ? action.payload
                        : event
                )
            }

        case types.eventDelete:
    
            return {
                ...state,
                events: state.events.filter(
                    event => ( event.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
        
        case types.eventRead:

            return {
                ...state,
                events: [ ...action.payload ]
            }

        case types.cleanCalendar:

            return {
                ...initialState
            }

        default:
            return state
    }
}
