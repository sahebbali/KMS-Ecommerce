import React from 'react';
import Sidebar from './../../components/Dashboard/Sidebar';

const MyLayout = ({ children }) => {
	return (
		<>
			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-3'>
					<Sidebar />
				</div>
				<div className='col-span-9 p-4'>
					<main>{children}</main>
				</div>
			</div>
		</>
	);
};

export default MyLayout;
