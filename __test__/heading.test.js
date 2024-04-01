/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Heading from "../components/Heading";

describe("Heading", () => {
  it("renders a heading", () => {
    render(<Heading title="Heading" description="Test" margin={false} />);

    const heading = screen.getByRole("article");
    const title = screen.getByText("Heading");
    const description = screen.getByText("Test");

    expect(heading).toBeInTheDocument();
    expect(heading).toContainElement(title);
    expect(heading).toContainElement(description);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
