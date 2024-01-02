import React from 'react'
import SecondToTime from '../utils/SecondToTime'

interface Props {
  mainTime: number
}

export default function Timer(props:Props) {

	return (

	<div className="timer">
		{SecondToTime(props.mainTime)}
	</div>

	)
}
