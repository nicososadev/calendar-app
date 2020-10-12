import '@testing-library/jest-dom'
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch'

describe('Pruebas en el helper fetch', () => {

    const email = 'Nicolas@gmail.com'
    const password = '123456'
    let token = ''
    
    test('Debe realizar el fetch sin token', async () => {

        const response = await fetchWithoutToken('auth', {email, password}, 'POST')

        expect(response instanceof Response).toBe(true)

        const body = await response.json()

        expect(body.ok).toBe(true)

        token = body.token
    })

    test('Debe realizar el fetch con token ', async () => {

        localStorage.setItem('token', token)

        const response = await fetchWithToken('auth/renew', {email, password}, 'GET')

        expect(response instanceof Response).toBe(true)

        const body = await response.json()
        
        expect(body.ok).toBe(true)

    })
    
    
})
