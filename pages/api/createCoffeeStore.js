import { getMinifiedRecords, table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
	if (req.method === "POST") {
		const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

		try {
			if (id) {
				// find a record
				const findCoffeeStoreRecords = await table
					.select({ filterByFormula: `id="${id}"` })
					.firstPage();

				if (findCoffeeStoreRecords.length !== 0) {
					const records = getMinifiedRecords(findCoffeeStoreRecords);

					res.json(records);
				} else {
					if (name) {
						// create a record
						const createdRecords = await table.create([
							{
								fields: {
									id,
									name,
									address,
									neighbourhood,
									voting,
									imgUrl,
								},
							},
						]);
						const records = getMinifiedRecords(createdRecords);

						res.json({ message: "Create a record", records });
					} else {
						res.status(400);
						res.json({ message: "Name is missing" });
					}
				}
			} else {
				res.status(400);
				res.json({ message: "Id is missing" });
			}
		} catch (error) {
			console.error("Error creating or finding a store", error);
			res.status(500);
			res.json({ message: "Error creating or finding a store", error });
		}
	} else {
		res.json({ message: "Method is GET" });
	}
};

export default createCoffeeStore;
