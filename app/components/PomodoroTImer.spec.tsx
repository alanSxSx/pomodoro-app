import {  fireEvent, render, waitFor } from '@testing-library/react'
import PomodoroTimer from './PomodoroTimer';
import { act } from 'react-dom/test-utils';


describe('Pomodoro Component', () => {

    it('Shold render Pomodoro Timer', ()=> {

        const { getByTestId } = render(<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4}/>);
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

			act(() => {
				jest.advanceTimersByTime(1500000); // Avança o tempo em 25 minutos
			});

			// Agora você pode verificar se o estado do componente foi atualizado corretamente
			expect(getByTestId('pomodoro-timer')).toHaveTextContent('25:00');
			expect(getByTestId('ciclos-concluídos')).toHaveTextContent(
				'Ciclos Concluídos: 0'
			);
			expect(getByTestId('horas-trabalhadas')).toHaveTextContent(
				'Horas Trabalhadas: 00:25:00'
			);
			expect(getByTestId('pomodoros-concluídos')).toHaveTextContent(
				'Pomodoros Concluídos: 1'
			);
		});

})
