import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    // window.fetch = jest.fn();
    // window.fetch.mockResolvedValueOnce({
    //   json: async () => [{ id: "p1", title: "First post" }],
    // });
    /**
     * The above code complains because we are using TS
     */

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: "p1", title: "First post" }]),
      })
    ) as jest.Mock;

    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
