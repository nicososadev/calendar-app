import '@testing-library/jest-dom'
import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types'

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en authReducer', () => {
    
    test('Debe retornar el estado por defecto', () => {
        
        const state = authReducer(initialState, {})

        expect(state).toEqual(initialState)
    })

    test('Debe realiazr la accion del login', () => {
        
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'name'
            }
        }

        const state = authReducer(initialState, action)

        expect(state).toEqual({ checking: false, uid: '123', name: 'name' })
    })
    
    test('Debe realizar la accion del logout ', () => {
        
        const action = {
            type: types.authLogout,
        }

        const state = authReducer(initialState, action)

        expect(state).toEqual({ checking: false })

    })
    
})
