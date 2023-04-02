const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
	const response = await fetch(
		getUrlForCoffeeStores("43.654274227376945,-79.38941371781443", "coffee", 6),
		{
			method: "GET",
			headers: {
				Authorization: process.env.FOURSQUARE_API_KEY,
			},
		}
	);
	const data = await response.json();

	return data.results;
};
