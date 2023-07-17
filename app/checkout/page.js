import React from 'react';
import BillingAddress from '../../components/(Checkout)/BillingAddress/BillingAddress';
import CheckoutOrder from '@/components/(Checkout)/CheckoutOrder/CheckoutOrder';

export default function page() {
	return (
		<div className='grid grid-cols-12 mt-16 gap-4 container mx-auto px-5'>
			<div className='col-span-8 p-4'>
				<BillingAddress />
			</div>
			<div className='col-span-4 p-4'>
				<CheckoutOrder />
			</div>
		</div>
	);
}
