import React from 'react'
import { zeroLeft } from './zeroLeaft';

export default function SecondToTime(seconds: number):string {
	const hours = zeroLeft((seconds/3600));
	const min = zeroLeft((seconds/60) % 60);
	const sec = zeroLeft((seconds%60) % 60);

	return `${hours}:${min}:${sec}`
}
