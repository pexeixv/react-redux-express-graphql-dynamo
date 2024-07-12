const express = require("express");
const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} = require("@apollo/client/core");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.APPSYNC_URL,
    headers: {
      "x-api-key": process.env.APPSYNC_API_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

const LIST_MESSAGES = gql`
  query listEnvistaMessages {
    listEnvistaMessages {
      items {
        id
        content
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation createEnvistaMessages(
    $createEnvistaMessagesInput: CreateEnvistaMessagesInput!
  ) {
    createEnvistaMessages(input: $createEnvistaMessagesInput) {
      id
      content
    }
  }
`;

app.use(cors());
app.use(express.json());

app.get("/api/messages", async (req, res) => {
  try {
    const result = await client.query({ query: LIST_MESSAGES });
    console.log(result.data.listEnvistaMessages.items);
    res.json(result.data.listEnvistaMessages.items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching messages");
  }
});

app.post("/api/messages", async (req, res) => {
  const { content, id } = req.body;

  try {
    const result = await client.mutate({
      mutation: CREATE_MESSAGE,
      variables: {
        createEnvistaMessagesInput: { id, content },
      },
    });
    console.log(result.data.createEnvistaMessages);
    res.json(result.data.createEnvistaMessages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating message");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
