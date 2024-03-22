import { render } from '@testing-library/react'
import Home from './page'
import PomodoroTimer from './components/PomodoroTimer'

describe('Home Component', () => {
    it('shold render', ()=> {

        const { getByTestId } = render (<Home/>)
        // expect(getByTestId('container')).toHaveAttribute('class', 'container')
        expect(getByTestId('container')).toBeInTheDocument()
    })

})