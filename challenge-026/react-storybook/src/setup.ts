import "@testing-library/jest-dom";
import { setProjectAnnotations } from "@storybook/react";
import { getWorker } from "msw-storybook-addon";
import * as globalStorybookConfig from "../.storybook/preview";

setProjectAnnotations(globalStorybookConfig);

// Ensure MSW connections are closed
// @ts-expect-error https://github.com/mswjs/msw-storybook-addon/issues/65
afterAll(() => getWorker().close());
