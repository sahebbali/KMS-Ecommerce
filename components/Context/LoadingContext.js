import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoadingContext = () => {
	return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [targetLink, setTargetLink] = useState('');

	const handleLinkClick = (link) => {
		// Simulate an API call or time-consuming operation
		setIsLoading(true);

		// Save the current page title to restore it later
		const originalTitle = document.title;

		// Set the loading message as the page title
		document.title = 'Loading...';

		// Set the target link for navigation after loading
		setTargetLink(link);

		// Measure the time taken for loading the target link
		const { performance } = window;
		const navigationStart = performance.timing.navigationStart;

		setTimeout(() => {
			setIsLoading(false);
			// Navigate to the target link
			window.location.href = link;

			// Restore the original page title after loading is completed
			document.title = originalTitle;
		}, performance.now() - navigationStart); // Calculate the time based on the current time minus the navigation start time
	};
	const value = {
		isLoading,
		handleLinkClick,
	};

	return (
		<LoadingContext.Provider value={value}>
			{children}
		</LoadingContext.Provider>
	);
};
