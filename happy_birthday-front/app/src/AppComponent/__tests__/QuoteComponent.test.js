import React from "react";
import { render, screen } from "@testing-library/react";
import QuoteComponent from "../QuoteComponent/Quote";

test("displays a quote", () => {
  const currentQuote = { quote: "Test quote", author: "Author" };
  render(<QuoteComponent currentQuote={currentQuote} currentColor="#000000" />);
  expect(screen.getByText(/Test quote/i)).toBeInTheDocument();
  expect(screen.getByText(/Author/i)).toBeInTheDocument();
});
