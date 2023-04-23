import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
	if (req.method === "POST") {
		try {
			// find a record
			const findCoffeeStoreRecords = await table
				.select({ filterByFormula: `id="1"` })
				.firstPage();

			if (findCoffeeStoreRecords.length !== 0) {
				const records = findCoffeeStoreRecords.map((record) => ({
					...record.fields,
				}));

				res.json(records);
			} else {
				// create a record
				const createdRecords = await table.create([
					{
						fields: {
							id: "1",
							name: "My favorite coffee store",
							address: "my address",
							neighbourhood: "some neighbourhood",
							voting: 200,
							imgUrl: "https://myimg.com",
						},
					},
				]);

				const records = createdRecords.map((record) => ({
					...record.fields,
				}));

				res.json({ message: "create a record", records });
			}
		} catch (error) {
			console.error("Error finding store", error);
			res.status(500);
			res.json({ message: "Error finding store", error });
		}
	} else {
		res.json({ message: "method is GET" });
	}
};

export default createCoffeeStore;
