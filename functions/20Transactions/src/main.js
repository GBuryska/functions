import { Client, Databases } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  log('hello');
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  log('hello');
  const databases = new Databases(client);
  log('hello');
  try {
    log(req.body);
    const customerId = JSON.parse(req.body);

    if (!customerId) {
      return res.text({ error: 'customer ID is required' }, 400);
    }

    const transactions = await databases.listDocuments(
      '67e04d26003294165c25',
      '67e04d2f0004159d8c8a',
      [
        Query.equal('customer_id', customerID),
        Query.limit(20)
      ]
    );

    return res.text(transactions);
  } catch(err) {
    log("hi");
    error("Error fetching transactions", error);
    return res.text({ error: error.message }, 500);
  }
};
