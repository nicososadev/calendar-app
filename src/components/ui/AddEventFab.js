import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export const AddEventFab = () => {

    const dispatch = useDispatch()

    const handleNewEvent = () => {

        dispatch( uiOpenModal() )
    }

    return (

        <div>
            <button
                className="btn btn-primary fab"
                onClick={handleNewEvent}
            
            >
            <i className="fas fa-plus"></i>

            </button>
        </div>
    )
}
