import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-stores");

const getMinifiedRecords = (records) =>
	records.map((record) => ({
		...record.fields,
		recordId: record.id,
	}));

const findRecordByFilter = async (id) => {
	const findCoffeeStoreRecords = await table
		.select({ filterByFormula: `id="${id}"` })
		.firstPage();

	return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
