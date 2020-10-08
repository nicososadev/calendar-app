import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { useDispatch, useSelector } from 'react-redux'
import { setActive, cleanActiveEvent } from '../../actions/events'
import { AddEventFab } from '../ui/AddEventFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment)

export const CalendarPage = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

    const onDoubleClick = (e) => {
        
        dispatch( uiOpenModal() )

    }

    const onSelectEvent = (e) => {

        dispatch( setActive(e) )
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {

        dispatch( cleanActiveEvent() )
    }

    return (

        <div>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 850 }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddEventFab/>

            {
                ( activeEvent ) &&
                    <DeleteEventFab/>
            }


            <CalendarModal />
        </div>
    )
}
