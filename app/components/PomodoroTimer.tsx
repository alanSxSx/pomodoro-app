'use client'
import { useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval';
import Button from './Button';
import Timer from './Timer';

const audioStartWorking = typeof window !== 'undefined' ? new Audio('/sounds/bell-start.mp3') : null;
const audioFinishWorking = typeof window !== 'undefined' ? new Audio('/sounds/bell-finish.mp3') : null;

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



	useEffect(() => {
	if(working) document.body.classList.add('working');
	if(resting) document.body.classList.remove('working');

	},

	[working])


	useInterval(() => { setMainTime(mainTime - 1); }, timeConting ? 1000 : null)

	const configureWork = () => {
		setTimeConting(true);
		setWorking(true);
		setResting(false);
		setMainTime(props.pomodoroTime);
		audioStartWorking?.play();
	}

	const configureResting = (long:boolean) => {
		setTimeConting(true);
		setWorking(false);
		setResting(true);
		if(long) {
			setMainTime(props.longRestTime)
		} else {
			setMainTime(props.shortRestTime)
		}
		audioFinishWorking?.play();
	}

	return (
		<div className='pomodoro'>
			<h2>You are: Working</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text='Working' onClick={() => configureWork()} />
				<Button text='Rest' onClick={() => configureResting(false)} />
				<Button className={!working && !resting ? 'hidden' : ''} text={timeConting? 'Pause' : 'Play'} onClick={() => setTimeConting(!timeConting)} />
			</div>
			<div className="details">
				<p>Testando</p>
				<p>Testando</p>
				<p>Testando</p>
				<p>Testando</p>
			</div>
		</div>
	)
}
