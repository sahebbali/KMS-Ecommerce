'use client';

import { useEffect, useRef } from 'react';

const Loading = () => {
	const ref = useRef(null);
	useEffect(() => {
		import('@lottiefiles/lottie-player');
	});
	return (
		<div className='mt-32 flex justify-center'>
			<lottie-player
				id='firstLottie'
				ref={ref}
				autoplay
				loop
				mode='normal'
				src='https://assets1.lottiefiles.com/packages/lf20_s6lxmxqw.json'
				style={{ width: '300px', height: '300px' }}
			></lottie-player>
		</div>
	);
};

export default Loading;
