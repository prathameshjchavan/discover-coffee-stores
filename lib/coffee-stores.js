import { createApi } from "unsplash-js";

// initialize api
const unsplashApi = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async (limit) => {
	const photos = await unsplashApi.search.getPhotos({
		query: "coffee shop",
		perPage: limit,
	});
	const unsplashResults = photos.response.results;
	const photosResponse = unsplashResults.map((result) => result.urls["small"]);

	return photosResponse;
};

export const fetchCoffeeStores = async (
	latLong = "43.654274227376945,-79.38941371781443",
	limit = 6
) => {
	const photos = await getListOfCoffeeStorePhotos(limit);

	const response = await fetch(
		getUrlForCoffeeStores(latLong, "coffee", limit),
		{
			method: "GET",
			headers: {
				Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
			},
		}
	);
	const data = await response.json();

	return data.results.map(({ fsq_id, location, name }, index) => ({
		id: fsq_id,
		location,
		name,
		imgUrl: photos[index],
	}));
};
