import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

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

test("renders testShow and no selected Season without errors", () => {
  render(<Show show={testShow} selectedSeason="none" />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  const loading = screen.getByTestId("loading-container");
  expect(loading).toBeInTheDocument();
  expect(loading).toHaveTextContent(/Fetching data.../i);
  expect(loading).toBeTruthy();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={testShow} selectedSeason="none" />);
  const seasonOptions = screen.getAllByTestId("season-option");
  expect(seasonOptions).toBeTruthy();
  expect(seasonOptions.length).toBe(2);
});

test("handleSelect is called when an season is selected", () => {
  const handleSelectMock = jest.fn();
  render(
    <Show show={testShow} selectedSeason="1" handleSelect={handleSelectMock} />
  );
  const selectSeason = screen.getByLabelText(/select a season/i);
  userEvent.selectOptions(selectSeason, ["0"]);
  expect(handleSelectMock).toBeCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(<Show show={testShow} selectedSeason="none" />);
  let episodesContainer = screen.queryByTestId("episodes-container");
  expect(episodesContainer).toBeFalsy();
  expect(episodesContainer).not.toBeInTheDocument();
  rerender(<Show show={testShow} selectedSeason="0" />);
  episodesContainer = screen.queryByTestId("episodes-container");
  expect(episodesContainer).toBeTruthy();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
