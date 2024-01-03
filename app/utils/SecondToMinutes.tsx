import React from 'react'
import { zeroLeft } from './zeroLeaft';

export default function SecondToMinutes(seconds: number):string {
	const min = zeroLeft((seconds/60) % 60);
	const sec = zeroLeft((seconds%60) % 60);

	return `${min}:${sec}`
}
