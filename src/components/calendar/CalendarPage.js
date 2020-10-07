import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

const localizer = momentLocalizer(moment)

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Nicolas'
    }
}]

export const CalendarPage = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

    const onDoubleClick = (e) => {
        console.log(e)
    }

    const onSelectEvent= (e) => {
        console.log(e)
    }

    const onViewChange= (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
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
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />
        </div>
    )
}
