import { createApi } from "unsplash-js";

// initialize api
const unsplashApi = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
	const photos = await unsplashApi.search.getPhotos({
		query: "coffee shop",
		perPage: 10,
	});
	const unsplashResults = photos.response.results;
	const photosResponse = unsplashResults.map((result) => result.urls["small"]);

	return photosResponse;
};

export const fetchCoffeeStores = async () => {
	const photos = await getListOfCoffeeStorePhotos();

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

	return data.results.map((venue, index) => ({
		...venue,
		imgUrl: photos[index],
	}));
};
