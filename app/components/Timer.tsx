import React from 'react'
import SecondToMinutes from '../utils/SecondToMinutes'

interface Props {
  mainTime: number
}

export default function Timer(props:Props) {

	return (

	<div className="timer">
		{SecondToMinutes(props.mainTime)}
	</div>

	)
}
