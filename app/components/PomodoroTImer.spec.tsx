import { fireEvent, render, waitFor } from '@testing-library/react'
import PomodoroTimer, { audioStartWorking } from './PomodoroTimer';
import { act } from 'react-dom/test-utils';


describe('Pomodoro Component', () => {

  it('Shold render Pomodoro Timer', () => {

    const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4} />);
    expect(getByTestId('pomodoro-timer')).toBeTruthy()

  })

  it('Should start with default values', () => {
    const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4} />);

    expect(getByTestId('pomodoro-timer')).toHaveTextContent('25:00');

    expect(getByTestId('ciclos-concluidos')).toHaveTextContent('Ciclos Concluídos: 0');

    expect(getByTestId('horas-trabalhadas')).toHaveTextContent('Horas Trabalhadas: 00:00:00');

    expect(getByTestId('pomodoros-concluidos')).toHaveTextContent('Pomodoros Concluídos: 0');
  });


  it('Should increment pomodoro after 25 minutes', async () => {

    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

    const { getByTestId, getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText('Working');
      fireEvent.click(startCycleButton);
    });


    //incremento por segundo

    for (let i = 0; i < 1500; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Avançar 1 segundo
      });
    }

    expect(getByTestId('horas-trabalhadas')).toHaveTextContent(
      'Horas Trabalhadas: 00:25:00'
    );

    expect(getByTestId('ciclos-concluidos')).toHaveTextContent(
      'Ciclos Concluídos: 0'
    );

    expect(getByTestId('pomodoros-concluidos')).toHaveTextContent(
      'Pomodoros Concluídos: 1'
    );


  });

  it('Should increment 1 clicle after 4 pomodores completed', async () => {

    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

    const { getByTestId, getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText('Working');
      fireEvent.click(startCycleButton);
    });

    //incremento por segundo 4 ciclos (Trabalhando: 1500 x 4 = 6000 + Descansando: 300 x 4 = 1200 Total: 7200)
    for (let i = 0; i < 7200; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Avançar 1 segundo
      });
    }


    //100 minutos trabalhados
    expect(getByTestId('horas-trabalhadas')).toHaveTextContent(
      'Horas Trabalhadas: 01:40:00'
    );

    expect(getByTestId('ciclos-concluidos')).toHaveTextContent(
      'Ciclos Concluídos: 1'
    );

    expect(getByTestId('pomodoros-concluidos')).toHaveTextContent(
      'Pomodoros Concluídos: 4'
    );


  });


  it('Should Play the music play when you click on working', async () => {

    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

    const { getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText('Working');
      fireEvent.click(startCycleButton);
    });

    expect(mockPlay).toHaveBeenCalled();

  });


  it('Should called Play 3 times', async () => {

    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

    const Timeworkedplusresttime = 1800 // Work 1500 + Rest 300

    const { getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText('Working');
      fireEvent.click(startCycleButton);
    });


    for (let i = 0; i < Timeworkedplusresttime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Avançar 1 segundo
      });
    }

    expect(mockPlay).toHaveBeenCalledTimes(3)

  });


  

})
