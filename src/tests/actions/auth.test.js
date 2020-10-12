import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'
import { checkingManager, loginManager, registerManager } from '../../actions/auth'
import * as fetchModule from '../../helpers/fetch'

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}

let store = mockStore(initialState)

Storage.prototype.setItem = jest.fn()

describe('Pruebas en las acciones del auth', () => {
    
    beforeEach( () => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('loginManager debe funcionar correctamente', async () => {
        
        const email = 'Nicolas@gmail.com'
        const password = '123456'

        await store.dispatch( loginManager(email, password) )

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: '[Auth] Login',
            payload: { uid: '5f82109c62bcff3dc8ad6af7', name: 'Nicolas' }
        })
        
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String) )
        expect( localStorage.setItem ).toHaveBeenCalledWith('tokenInitDate', expect.any(Number) )
    })

    test('loginManager debe dar error con credenciales incorrectas', async () => {
        
        const email = 'Nicolas@gmail.com'
        const incorrectEmail = 'nonuser@gmail.com'
        const password = '123456'
        const incorrectPassword = '123456789'

        await store.dispatch( loginManager(incorrectEmail, password) )

        let actions = store.getActions()

        expect(actions).toEqual([])

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "User does not exists", "error")

        await store.dispatch( loginManager(email, incorrectPassword) )

        actions = store.getActions()

        expect(actions).toEqual([])

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Incorrect password", "error")
        
    })

    test('registerManager debe funcionar correctamente', async () => {
        
        fetchModule.fetchWithoutToken = jest.fn( () => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'name',
                    token: 'abc123'
                }
            }
        }))

        const name= 'test'
        const email = 'test@gmail.com'
        const password = '123456'

        await store.dispatch( registerManager(name, email, password) )

        const actions = store.getActions()

        expect(actions[0]).toEqual({ type: '[Auth] Login', payload: { uid: '123', name: 'name' } })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'abc123' )
        expect( localStorage.setItem ).toHaveBeenCalledWith('tokenInitDate', expect.any(Number) )
        
    })

    test('checkingManager debe funcionar correctamente', async() => {
        
        fetchModule.fetchWithToken = jest.fn( () => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'name',
                    token: 'abc123'
                }
            }
        }))

        await store.dispatch( checkingManager() )

        const actions = store.getActions()

        expect(actions[0]).toEqual({ type: '[Auth] Login', payload: { uid: '123', name: 'name' } })
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'abc123' )
        
    })
    
    
    
})
