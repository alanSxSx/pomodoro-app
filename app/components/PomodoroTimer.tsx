'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useInterval } from '../hooks/useInterval';
import Button from './Button';
import Timer from './Timer';
import SecondToTime from '../utils/SecondToTime';

// export const audioStartWorking = typeof window !== 'undefined' ? new Audio('/sounds/bell-start.mp3') : null;
// if (audioStartWorking) audioStartWorking.id = 'audio-start-working';
// export const audioFinishWorking = typeof window !== 'undefined' ? new Audio('/sounds/bell-finish.mp3') : null;
// if (audioFinishWorking) audioFinishWorking.id = 'audio-finish-working';


interface Props {
	pomodoroTime: number;
	shortRestTime: number;
	longRestTime: number;
	cycles: number;
}

export default function PomodoroTimer(props: Props) {

	const [mainTime, setMainTime] = useState(props.pomodoroTime);
	const [timeConting,setTimeConting] = useState(false);
	const [working,setWorking] = useState(false);
	const [resting,setResting] = useState(false);
	const [cyclesQtdManager,setCyclesQtdManager] = useState(new Array(props.cycles -1).fill(true))
	const [completedCycles,setCompletedCycles] = useState(0);

	const [fullWorkingTime,setFullWorkingTime] = useState(0);
	const [numberOfPomodoros,setNumberOfPomodoros] = useState(0);

	const audioStartWorkingRef = useRef<HTMLAudioElement>(null);
 	const audioFinishWorkingRef = useRef<HTMLAudioElement>(null);

	  // useEffect(() => {
		// audioStartWorkingRef.current

	  // }, []);

	  // useEffect(() => {
		// audioFinishWorkingRef.current
	  // }, []);



	useInterval(() => { setMainTime(mainTime - 1);
	if (working) setFullWorkingTime(fullWorkingTime + 1)
	}, timeConting ? 1000 : null)

		const configureWork = useCallback (() => {
		setTimeConting(true);
		setWorking(true);
		setResting(false);
		setMainTime(props.pomodoroTime);
		// audioStartWorking?.play();
		audioStartWorkingRef.current?.play();
	},[setTimeConting,setWorking,setResting,setMainTime,props.pomodoroTime])

	const configureResting = useCallback((long:boolean) => {
		setTimeConting(true);
		setWorking(false);
		setResting(true);
		if(long) {
			setMainTime(props.longRestTime)
		} else {
			setMainTime(props.shortRestTime)
		}
		// audioFinishWorking?.play();
		audioFinishWorkingRef.current?.play();
	},[setTimeConting,setWorking,setResting,setMainTime,props.longRestTime,props.shortRestTime])

	useEffect(() => {
		if(working) document.body.classList.add('working');
		if(resting) document.body.classList.remove('working');
		if (mainTime > 0) return

		if(working && cyclesQtdManager.length > 0) {
		configureResting(false);
		cyclesQtdManager.pop();
		} else if (working && cyclesQtdManager.length <= 0) {
			configureResting(true);
			setCyclesQtdManager(new Array(props.cycles -1).fill(true))
			setCompletedCycles(completedCycles + 1)
		}

		if(working) setNumberOfPomodoros(numberOfPomodoros + 1)
		if(resting) configureWork()

		}, [working,resting,mainTime,cyclesQtdManager,numberOfPomodoros,completedCycles,configureResting,setCyclesQtdManager,configureWork,props.cycles])

	return (
		<>
		<audio data-testid="audio-start-working" ref={audioStartWorkingRef} src='/sounds/bell-start.mp3' />
    	<audio data-testid="audio-finish-working" ref={audioFinishWorkingRef} src='/sounds/bell-finish.mp3' />
		<div data-testid="pomodoro-timer" className='pomodoro'>
			<h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button data-testid="start-cycle-button" text='Working' onClick={() => configureWork()} />
				<Button data-testid="rest-button" text='Rest' onClick={() => configureResting(false)} />
				<Button data-testid="play-pause-button" className={!working && !resting ? 'hidden' : ''} text={timeConting? 'Pause' : 'Play'} onClick={() => setTimeConting(!timeConting)} />
			</div>
			<div className="details">
				<p data-testid="ciclos-concluidos" >Ciclos Concluídos: {completedCycles}</p>
				<p data-testid="horas-trabalhadas">Horas Trabalhadas: {SecondToTime(fullWorkingTime)}</p>
				<p data-testid="pomodoros-concluidos">Pomodoros Concluídos: {numberOfPomodoros}</p>

			</div>
		</div>
		</>
	)
}
