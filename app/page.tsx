import PomodoroTimer from './components/PomodoroTimer'

export default function Home() {
  return (
    <div data-testid="container" className="container">
			<PomodoroTimer pomodoroTime={5} shortRestTime={3} longRestTime={900} cycles={4}/>
    </div>
  )
}
