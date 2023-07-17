"use client";
import Link from "next/link";
/* 
async function getData(email) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST}/api/cart/${email}`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
} */
const CartDrawer = async () => {
  // const email = localStorage.getItem("email");
  /* 	const data = await getData(email);
	console.log(data); */
  return (
    <div className="container px-8 mx-auto">
      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
        Shopping cart
      </h2>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            <li className="flex py-6">
              <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className="object-cover object-center w-full h-full"
                />
              </div>

              <div className="flex flex-col flex-1 ml-4">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">Throwback Hip Bag</a>
                    </h3>
                    <p className="ml-4">$90.00</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Salmon</p>
                </div>
                <div className="flex items-end justify-between flex-1 text-sm">
                  <p className="text-gray-500">price</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      quantity
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <Link
          href="/checkout"
          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
export default CartDrawer;
