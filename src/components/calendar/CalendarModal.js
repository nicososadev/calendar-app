import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker'

import '../../styles/calendar/modal.css'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { cleanCalendar, eventCreateManager, updateEventManager } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours')

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: now.add(1,'hours').toDate()
}

export const CalendarModal = () => {
    
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)


    const [dateStart, setDateStart] = useState( now.toDate() )
    const [dateEnd, setDateEnd] = useState( now.add(1, 'hour').toDate() )
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues

    useEffect(() => {
        
        if( activeEvent ){
            setFormValues( activeEvent )
        } else {
            setFormValues( initEvent )
        }

    }, [activeEvent, setFormValues])

    const dispatch = useDispatch()


    const closeModal = () => {

        dispatch( uiCloseModal() )
        dispatch( cleanCalendar() )
        setFormValues( initEvent )
    }

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = (e) => {

        setDateStart( e )
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {

        setDateEnd( e )
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {

        e.preventDefault()

        const momentStart = moment( start )
        const momentEnd = moment( end )

        if( momentStart.isSameOrAfter( momentEnd ) ){

            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error')
        }

        if( title.trim().length < 2 ){

            return setTitleValid(false)
        }

        if( activeEvent ){

            dispatch( updateEventManager( formValues ) )
        } else {

            dispatch( eventCreateManager(formValues) )
        }

        setTitleValid(true)
        closeModal()
    }

    return (

        <Modal
            isOpen={modalOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeEvent)? 'Editar Evento' : 'Nuevo Evento' }</h1>
            <hr />
            <form onSubmit={handleSubmitForm} className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker className="form-control" onChange={handleStartDateChange} value={dateStart} />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker className="form-control" minDate={dateStart} onChange={handleEndDateChange} value={dateEnd} />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
