import React from "react";
import { render, screen } from "@testing-library/react";
import { DomQuery } from "../components/DomQuery";

describe("DOM查询", () => {
  test("get & query & find", () => {
    render(<DomQuery />);
    const getElement = screen.getByText("test1");
    const getAllElement = screen.getAllByText(/test/i);
    const queryElement = screen.queryByText("test3");
    const queryAllElement = screen.queryAllByText("test3");
    debugger;
  });
});