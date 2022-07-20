import Airtable from "airtable";

// Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME!);

export { table };
