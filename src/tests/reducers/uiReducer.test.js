import '@testing-library/jest-dom'
import { uiReducer } from '../../reducers/uiReducer'
import { types } from '../../types/types'

const initialState = {
    modalOpen: false,
}

describe('Pruebas en uiReducer', () => {
    
    test('Debe retornar el estado por defecto ', () => {
        
        const state = uiReducer(initialState, {})

        expect(state).toEqual(initialState)
    })

    test('Debe abrir y cerrar el modal', () => {
        
        let action = {
            type: types.uiOpenModal
        }

        let state = uiReducer(initialState, action)

        expect(state).toEqual({ modalOpen: true })

        action = {
            type: types.uiCloseModal
        }

        state = uiReducer(initialState, action)

        expect(state).toEqual({ modalOpen: false })
    })
    
})
