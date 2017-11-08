// Waiting for doc updates from Apollo team in order to upgrade to apollo-client@2.0
// Stick with react-apollo@1.4 for now
import { ApolloClient, createNetworkInterface } from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj9fr45hb4n160134atb0db9m"
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
  connectToDevTools: process.env.NODE_ENV === "development"
});

export default client;
