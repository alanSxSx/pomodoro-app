import React from 'react'

interface Props {
  onClick?: () => void;
  text: string;
  className?: string;
}

export default function Button(props:Props) {

	return (

	<button data-testid="button-component" onClick={props.onClick} className={props.className} >{props.text}</button>

	)
}
