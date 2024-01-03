import Image from 'next/image'
import PomodoroTimer from './components/PomodoroTimer'

export default function Home() {
  return (
    <div className="container">
			<PomodoroTimer pomodoroTime={5} shortRestTime={2} longRestTime={4} cycles={4}/>
    </div>
  )
}
