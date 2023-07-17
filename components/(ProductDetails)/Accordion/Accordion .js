'use client';
import { useState } from 'react';
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

function Icon({ id, open }) {
	return open === id ? (
		<FaMinus className='h-5 w-5 transition-transform' />
	) : (
		<FaPlus className='h-5 w-5 transition-transform' />
	);
}

export default function AccordionDetails() {
	const [open, setOpen] = useState(0);

	const handleOpen = (value) => {
		setOpen((prevState) => (prevState === value ? 0 : value));
	};

	return (
		<>
			<div className='space-y-4'>
				<Accordion
					open={open === 1}
					icon={<Icon id={1} open={open} />}
					className='text-lg'
				>
					<AccordionHeader onClick={() => handleOpen(1)}>
						Description
					</AccordionHeader>
					<AccordionBody>
						Looking for a sleek, laceless sneaker that still
						delivers style and comfort? Look no further than the
						Yeezy Boost 700 MNVN Laceless Analog. This neutral-toned
						sneaker features an ivory polyester textile upper, with
						black no-sew overlays and reflective silver 700 branding
						on the lateral side. The laceless design provides a
						streamlined look, perfect for those who want to slip on
						their sneakers and go. A sculpted PU midsole offers
						full-length drop-in Boost cushioning for a responsive
						ride, while a herringbone-traction rubber outsole
						ensures optimal grip. Whether running errands or hitting
						the town, the Yeezy Boost 700 MNVN Laceless Analog has
						got you covered. This shoe is available in a men's size
						6, which converts to a women's size 7.5.
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 2}
					icon={<Icon id={2} open={open} />}
					className='text-lg'
				>
					<AccordionHeader onClick={() => handleOpen(2)}>
						Shipping
					</AccordionHeader>
					<AccordionBody>
						We offer several shipping options to meet the needs of
						our customers. The shipping cost and delivery time for
						each option will vary based on your location and the
						size and weight of your order.
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 3}
					icon={<Icon id={3} open={open} />}
					className='text-lg'
				>
					<AccordionHeader onClick={() => handleOpen(3)}>
						Returns
					</AccordionHeader>
					<AccordionBody>
						We understand that returns and exchanges can be
						important to our customers. To ensure a seamless
						process, please review our full Return and Exchange
						Policy for all the details, including conditions for
						exchange, exceptions, and restocking fees. Our customer
						service team is always here to help if you have any
						questions.
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 4}
					icon={<Icon id={4} open={open} />}
					className='text-lg'
				>
					<AccordionHeader onClick={() => handleOpen(4)}>
						Policies
					</AccordionHeader>
					<AccordionBody>
						By placing an order on the Houston Drip Factory website,
						you confirm that your shipping address must match the
						full billing address of the credit card used for the
						purchase. We do not accept orders addressed to P.O.
						boxes or APO/FPO/DPO addresses. You also agree to the
						use of your personal data to process your order, support
						your experience on the website, and for other purposes
						as described in this Privacy Policy. All orders are
						subject to product availability. In the event that an
						item is out of stock, we will inform you as soon as
						possible and offer you the option to either wait for the
						item to be restocked or to cancel your order. Payment
						must be received in full before the shipment of your
						order. Shipping charges and delivery times are outlined
						in our shipping policy, and our return and refund policy
						is outlined in detail on our website. By placing an
						order on the Houston Drip Factory website, you agree to
						these terms and conditions and our policies as outlined.
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 5}
					icon={<Icon id={5} open={open} />}
					className='text-lg'
				>
					<AccordionHeader onClick={() => handleOpen(5)}>
						Seller Details
					</AccordionHeader>
					<AccordionBody>
						<p className='py-4'>Store Name : Demo</p>
						<div className='flex border-t border-b w-1/2'>
							<div className='border-r py-2  px-2 '>
								<p className='capitalize font-medium h-16 w-24'>
									positive seller <br /> ratings
								</p>
								<h2 className='text-2xl text-black font-semibold'>
									91%
								</h2>
							</div>
							<div className='border-r py-2  px-2'>
								<p className='capitalize font-medium h-16  w-24'>
									ship on time
									<br />
									{''}
								</p>
								<h2 className='text-2xl  text-black font-semibold'>
									98%
								</h2>
							</div>
							<div className=' py-2  px-2'>
								<p className='capitalize font-medium h-16  w-24'>
									chat response rate
									<br />
									{''}
								</p>
								<h2 className='text-2xl  text-black font-semibold'>
									100%
								</h2>
							</div>
						</div>
						<div className='pt-4 underline'>
							<Link href='/'>View Store</Link>
						</div>
					</AccordionBody>
				</Accordion>
			</div>
		</>
	);
}
