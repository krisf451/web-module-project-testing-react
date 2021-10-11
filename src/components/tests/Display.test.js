import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Display from "./../Display";
import userEvent from "@testing-library/user-event";

// import fetchShow from "./../../api/fetchShow";
// jest.mock("./../../api/fetchShow");

const testShow = {
  //add in approprate test data structure here.
  image: {
    medium:
      "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    original:
      "https://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg",
  },
  name: "Stranger Things Show Name Test",
  seasons: [
    {
      id: 0,
      name: "season one",
      episodes: [
        {
          id: 1234,
          name: "Episode 1: THE TEST",
          image:
            "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
        },
        {
          id: 4567,
          name: "Episode 2: THE TEST",
          image:
            "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
        },
      ],
    },
    {
      id: 1,
      name: "season two",
      episodes: [
        {
          id: 90839483,
          name: "Episode 1: Season 2 : THE TEST",
          image:
            "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
        },
        {
          id: 999039402,
          name: "Episode 2: Season 2 : THE TEST",
          image:
            "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
        },
      ],
    },
  ],
  summary: "A test summary for a show",
};

test("renders display component without error", () => {
  render(<Display />);
});

test("when the fetch button is pressed, the show component will display", async () => {
  render(<Display />);
  const button = screen.queryByRole("button");
  userEvent.click(button);
  await waitFor(() => {
    const show = screen.queryAllByTestId("show-container");
    expect(show).toBeTruthy();
  });
});

test("test seasons to have right number of episodes", () => {
  render(<Display show={testShow} />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  waitFor(() =>
    expect(screen.getAllByTestId("season-option")).toHaveLength(
      testShow.seasons.length
    )
  );
});

test("test if optional function is being called", () => {
  const mockClick = jest.fn();
  render(<Display handleClick={mockClick} />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  waitFor(() => expect(mockClick).toHaveBeenCalledTimes(1));
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
