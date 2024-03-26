import {
  findByTestId,
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import PomodoroTimer from "./PomodoroTimer";

import { act } from "react-dom/test-utils";

describe("Pomodoro Component", () => {
  beforeEach(() => {
    // Configuração inicial para cada teste
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Limpeza após cada teste
    jest.clearAllMocks();
  });

  it("Shold render Pomodoro Timer", () => {
    const { getByTestId } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );
    expect(getByTestId("pomodoro-timer")).toBeTruthy();
  });

  it("Should start with default values", () => {
    const { getByTestId } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    expect(getByTestId("pomodoro-timer")).toHaveTextContent("25:00");

    expect(getByTestId("ciclos-concluidos")).toHaveTextContent(
      "Ciclos Concluídos: 0"
    );

    expect(getByTestId("horas-trabalhadas")).toHaveTextContent(
      "Horas Trabalhadas: 00:00:00"
    );

    expect(getByTestId("pomodoros-concluidos")).toHaveTextContent(
      "Pomodoros Concluídos: 0"
    );
  });

  it("Should increment pomodoro after 25 minutes", async () => {
    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest
      .spyOn(global.HTMLMediaElement.prototype, "play")
      .mockImplementation(mockPlay);

    const { getByTestId, getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText("Working");
      fireEvent.click(startCycleButton);
    });

    //incremento por segundo

    for (let i = 0; i < 1500; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Avançar 1 segundo
      });
    }

    expect(getByTestId("horas-trabalhadas")).toHaveTextContent(
      "Horas Trabalhadas: 00:25:00"
    );

    expect(getByTestId("ciclos-concluidos")).toHaveTextContent(
      "Ciclos Concluídos: 0"
    );

    expect(getByTestId("pomodoros-concluidos")).toHaveTextContent(
      "Pomodoros Concluídos: 1"
    );
  });

  it("Should increment 1 clicle after 4 pomodores completed", async () => {
    jest.useFakeTimers();
    const mockPlay = jest.fn();
    jest
      .spyOn(global.HTMLMediaElement.prototype, "play")
      .mockImplementation(mockPlay);

    const { getByTestId, getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startCycleButton = getByText("Working");
      fireEvent.click(startCycleButton);
    });

    //incremento por segundo 4 ciclos (Trabalhando: 1500 x 4 = 6000 + Descansando: 300 x 4 = 1200 Total: 7200)
    for (let i = 0; i < 7200; i++) {
      act(() => {
        jest.advanceTimersByTime(1000); // Avançar 1 segundo
      });
    }

    //100 minutos trabalhados
    expect(getByTestId("horas-trabalhadas")).toHaveTextContent(
      "Horas Trabalhadas: 01:40:00"
    );

    expect(getByTestId("ciclos-concluidos")).toHaveTextContent(
      "Ciclos Concluídos: 1"
    );

    expect(getByTestId("pomodoros-concluidos")).toHaveTextContent(
      "Pomodoros Concluídos: 4"
    );
  });

  // it('Should Play the music play when you click on working', async () => {

  //   jest.useFakeTimers();
  //   const mockPlay = jest.fn();
  //   jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

  //   const { getByText } = render(
  //     <PomodoroTimer
  //       pomodoroTime={1500}
  //       shortRestTime={300}
  //       longRestTime={900}
  //       cycles={4}
  //     />
  //   );

  //   act(() => {
  //     const startCycleButton = getByText('Working');
  //     fireEvent.click(startCycleButton);
  //   });

  //   expect(mockPlay).toHaveBeenCalled();

  // });

  // it('Should called Play 3 times', async () => {

  //   jest.useFakeTimers();
  //   const mockPlay = jest.fn();
  //   jest.spyOn(global.HTMLMediaElement.prototype, 'play').mockImplementation(mockPlay);

  //   const Timeworkedplusresttime = 1800 // Work 1500 + Rest 300

  //   const { getByText } = render(
  //     <PomodoroTimer
  //       pomodoroTime={1500}
  //       shortRestTime={300}
  //       longRestTime={900}
  //       cycles={4}
  //     />
  //   );

  //   act(() => {
  //     const startCycleButton = getByText('Working');
  //     fireEvent.click(startCycleButton);
  //   });

  //   for (let i = 0; i < Timeworkedplusresttime; i++) {
  //     act(() => {
  //       jest.advanceTimersByTime(1000); // Avançar 1 segundo
  //     });
  //   }

  //   expect(mockPlay).toHaveBeenCalledTimes(3)
  //   expect(audioStartWorking?.id).toBe('audio-start-working')
  //   expect(audioFinishWorking?.id).toBe('audio-finish-working');

  // });

  // it('Shold verify that audio objects were created correctly', () => {
  //   // Verificar se audioStartWorking está definido
  //   expect(audioStartWorking).toBeDefined();

  //   // Verificar se audioFinishWorking está definido
  //   expect(audioFinishWorking).toBeDefined();

  //   // Verificar se audioStartWorking é do tipo Audio ou null
  //   if (audioStartWorking) {
  //     expect(audioStartWorking instanceof Audio).toBeTruthy();
  //     expect(audioStartWorking.src).toBe('http://localhost/sounds/bell-start.mp3');
  //     expect(audioStartWorking.id).toBe('audio-start-working'); // Verifica se o ID está definido corretamente
  //   } else {
  //     expect(audioStartWorking).toBeNull();
  //   }

  //   // Verificar se audioFinishWorking é do tipo Audio ou null
  //   if (audioFinishWorking) {
  //     expect(audioFinishWorking instanceof Audio).toBeTruthy();
  //     expect(audioFinishWorking.src).toBe('http://localhost/sounds/bell-finish.mp3');
  //     expect(audioFinishWorking.id).toBe('audio-finish-working'); // Verifica se o ID está definido corretamente
  //   } else {
  //     expect(audioFinishWorking).toBeNull();
  //   }
  // });

  it("Should Play the music play when you click on working", async () => {
    const { getByTestId, getByText } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    const audioStartWorking = getByTestId(
      "audio-start-working"
    ) as HTMLAudioElement;

    const playStartSpy = jest.spyOn(audioStartWorking, "play");
    // const playFinishSpy = jest.spyOn(audioFinishWorking, 'play');

    const playFinishSpy = jest.fn();

    act(() => {
      const startCycleButton = getByText("Working");
      fireEvent.click(startCycleButton);
    });

    audioStartWorking.play();

    // 1 do audioStartWorking e +1 do fireEvent.click
    expect(playStartSpy).toHaveBeenCalledTimes(2);
    expect(playFinishSpy).not.toHaveBeenCalled();
  });

  it("Should return call for audioFinishWorking", async () => {
    const { getByTestId } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    const audioFinishWorking = getByTestId(
      "audio-finish-working"
    ) as HTMLAudioElement;

    const playFinishSpy = jest.spyOn(audioFinishWorking, "play");

    const playStartSpy = jest.fn();

    audioFinishWorking.play();

    expect(playFinishSpy).toHaveBeenCalledTimes(1);
    expect(playStartSpy).not.toHaveBeenCalled();
  });


  it("Should call for audioFinishWorking after click rest-button", async () => {
    const { getByText,getByTestId } = render(
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    );

    act(() => {
      const startRestButton = getByText("Rest");
      fireEvent.click(startRestButton);
    });

		const audioFinishWorking = getByTestId(
      "audio-finish-working"
    ) as HTMLAudioElement;

		const playFinishSpy = jest.spyOn(audioFinishWorking, "play");

		expect(playFinishSpy).toHaveBeenCalledTimes(1);

})

it("Should Should play or pause for click", async () => {
	const { getByText,getByTestId } = render(
		<PomodoroTimer
			pomodoroTime={1500}
			shortRestTime={300}
			longRestTime={900}
			cycles={4}
		/>
	);

	const playPauseButton = getByText('Play');

	act(() => {
		const PlayPauseButton = getByText("Play");
		fireEvent.click(PlayPauseButton);
	});

	act(() => {
		const PlayPauseButton = getByText("Pause");
		fireEvent.click(PlayPauseButton);
	});

	act(() => {
		const PlayPauseButton = getByText("Play");
		fireEvent.click(PlayPauseButton);
	});

	expect(playPauseButton.textContent).toBe('Pause');

})




});
