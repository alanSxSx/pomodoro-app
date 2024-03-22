import { render } from '@testing-library/react'
import Home from './page'

describe('Home Component', () => {
    it('shold render', ()=> {

        const { getByTestId } = render (<Home/>)

        expect(getByTestId('container')).toHaveAttribute('class', 'container')
    })
})