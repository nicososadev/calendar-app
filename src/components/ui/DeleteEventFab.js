import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../actions/events'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDeleteEvent = () => {

        dispatch( deleteEvent() )
    }

    return (

        <div>
            <button
                className="btn btn-danger fab-danger"
                onClick={handleDeleteEvent}
            
            >
            <i className="fas fa-trash"></i>

            </button>
        </div>
    )
}
