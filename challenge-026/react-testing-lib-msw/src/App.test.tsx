import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient";
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "./utils/test-utils";
import App from "./App";
import { posts } from "./mocks/handlers";

it("Should return posts when clicking fetch button", async () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  expect(
    screen.getByRole("heading", {
      name: "MSW Testing Library Example",
      level: 1,
    })
  ).toBeDefined();

  userEvent.click(screen.getByRole("button", { name: "Fetch Posts" }));
  screen.debug();

  // await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));
  // The above only works up to React 17.x
  // Workaround for React 18.x
  const loadingIndicator = await screen.findByLabelText("loading");
  await waitFor(() => expect(loadingIndicator).not.toBeInTheDocument());

  screen.debug();
  posts.forEach((post) => {
    expect(
      screen.getByRole("heading", { name: post.title, level: 2 })
    ).toBeDefined();
    expect(screen.getByText(post.body)).toBeDefined();
  });
});

it("Should return posts when clicking fetch with graphql button", async () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  expect(
    screen.getByRole("heading", {
      name: "MSW Testing Library Example",
      level: 1,
    })
  ).toBeDefined();

  userEvent.click(screen.getByRole("button", { name: "Fetch Posts GraphQL" }));

  // await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));
  const loadingIndicator = await screen.findByLabelText("loading");
  await waitFor(() => expect(loadingIndicator).not.toBeInTheDocument());

  posts.forEach((post) => {
    expect(
      screen.getByRole("heading", { name: post.title, level: 2 })
    ).toBeDefined();
    expect(screen.getByText(post.body)).toBeDefined();
  });
});
