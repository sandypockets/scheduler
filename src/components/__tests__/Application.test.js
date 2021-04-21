import React from "react";

import { render, cleanup, waitForElement, getByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);



it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  //console.log(prettyDOM(container));
});

it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

it("shows the delete error when failing to delete an appointment", () => {
  axios.put.mockRejectedValueOnce();
});