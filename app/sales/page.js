'use client';

import { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const SalesPage = () => {
	const [timerDays, setTimerDays] = useState('03');
	const [timerHours, setTimerHours] = useState('00');
	const [timerMinutes, setTimerMinutes] = useState('00');
	const [timerSeconds, setTimerSeconds] = useState('00');

	let interval = useRef();

	const startTimer = (countdownDate) => {
		const now = new Date().getTime();
		const distance = countdownDate - now;

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		if (distance < 0) {
			clearInterval(interval.current);
		} else {
			setTimerDays(days);
			setTimerHours(hours);
			setTimerMinutes(minutes);
			setTimerSeconds(seconds);
		}
	};

	function saveInLocalStorage(time) {
		localStorage.setItem('timer', time);
	}

	function getTimeFromLocalStorage() {
		return localStorage.getItem('timer');
	}

	useEffect(() => {
		const localTimer = getTimeFromLocalStorage();

		if (localTimer) {
			interval.current = setInterval(() => {
				startTimer(+localTimer);
			}, 1000);
		} else {
			const countdownDate =
				new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
			saveInLocalStorage(countdownDate);
			interval.current = setInterval(() => {
				startTimer(+countdownDate);
			}, 1000);
		}

		return () => clearInterval(interval.current);
	}, []);

	return (
		<div className=' flex flex-col justify-center items-center font-semibold space-y-4  w-screen h-screen  bg-black text-white'>
			<div className='flex text-2xl lg:text-8xl space-x-2 pb-4'>
				<div>
					-{timerDays}
					<sup>D</sup>
				</div>
				<div>
					{timerHours}
					<sup>H</sup>
				</div>
				<div>
					{timerMinutes}
					<sup>M</sup>
				</div>
				<div>
					{timerSeconds}
					<sup>S</sup>
				</div>
			</div>
			<div className='flex'>
				<input
					type='password'
					name=''
					id=''
					className='bg-black text-white  focus:outline-none border-b border-white pb-4'
					placeholder='PASSWORD'
				/>
				<div>
					<AiOutlineArrowRight size={24} />
				</div>
			</div>
		</div>
	);
};

export default SalesPage;
