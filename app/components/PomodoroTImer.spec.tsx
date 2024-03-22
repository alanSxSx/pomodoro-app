import { render } from '@testing-library/react'
import PomodoroTimer from './PomodoroTimer';


describe('Pomodoro Component', () => {

    it('Shold render Pomodoro Timer', ()=> {

        const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4}/>);
        expect(getByTestId('pomodoro-timer')).toBeInTheDocument()
       
    })

})