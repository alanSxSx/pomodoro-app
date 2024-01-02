'use client'
import { useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval';
import Button from './Button';
import Timer from './Timer';

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

	useEffect(() => {if(working) document.body.classList.add('working')},[working])


	useInterval(() => { setMainTime(mainTime - 1); }, timeConting ? 1000 : null)

	const configureWork = () => {
		setTimeConting(true);
		setWorking(true);
	}

	return (
		<div className='pomodoro'>
			<h2>You are: Working</h2>
			<Timer mainTime={mainTime} />
			<div className="controls">
				<Button text='Working' onClick={() => configureWork()} />
				<Button text='Teste' onClick={() => console.log(1)} />
				<Button text={timeConting? 'Pause' : 'Play'} onClick={() => setTimeConting(!timeConting)} />
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
