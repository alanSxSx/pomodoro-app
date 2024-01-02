import Image from 'next/image'
import PomodoroTimer from './components/PomodoroTimer'

export default function Home() {
  return (
    <div className="container">
			<PomodoroTimer pomodoroTime={1500} shortRestTime={300} longRestTime={900} cycles={4}/>
    </div>
  )
}
