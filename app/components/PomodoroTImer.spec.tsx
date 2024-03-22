import { render } from '@testing-library/react'
import PomodoroTimer from './PomodoroTimer';

jest.mock('/sounds/bell-start.mp3', () => {
    return function() {
      return { play: jest.fn() };
    };
  });
  jest.mock('/sounds/bell-finish.mp3', () => {
    return function() {
      return { play: jest.fn() };
    };
  });
  Object.defineProperty(document.body, 'classList', {
    value: {
      add: jest.fn(),
      remove: jest.fn()
    }
  });


describe('Pomodoro Component', () => {

    it('Shold render Pomodoro Timer', ()=> {

        const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4}/>);
        expect(getByTestId('pomodoro-timer')).toBeInTheDocument()

    })

    it('deve iniciar com o tempo padrão do pomodoro', () => {
        const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4} />);
        expect(getByTestId('pomodoro-timer')).toHaveTextContent('25:00');
      });

})