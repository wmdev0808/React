import type { Meta, StoryObj } from "@storybook/react";
import { DefaultBodyType, PathParams, rest } from "msw";

import { App } from "./App";
import { Post } from "./types";
import { posts } from "./mockData";

export default {
  title: "App",
  component: App,
} as Meta<typeof App>;

type Story = StoryObj<typeof App>;

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/posts",
          (_req, res, ctx) => res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const Data: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get<DefaultBodyType, PathParams, Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          (req, res, ctx) => res(ctx.json(posts))
        ),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/posts",
          (req, res, ctx) => res(ctx.status(500))
        ),
      ],
    },
  },
};
