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
				.select({ filterByFormula: `id="0"` })
				.firstPage();

			if (findCoffeeStoreRecords.length !== 0) {
				const records = findCoffeeStoreRecords.map((record) => ({
					...record.fields,
				}));

				res.json(records);
			} else {
				// create a record
				res.json({ message: "create a record" });
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
