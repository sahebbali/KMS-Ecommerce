import SellerTabs from './../../components/Seller/SellerTabs';
import SellerBanner from './../../components/Seller/SellerBanner';
export default function page() {
	return (
		<div className='container'>
			<SellerBanner />
			<SellerTabs />
		</div>
	);
}
