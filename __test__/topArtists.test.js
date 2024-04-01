/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TopArtists from "../components/TopArtists";

describe("TopArtists", () => {
  const mockArtists = [
    {
      id: "1",
      name: "Artist 1",
      images: [
        {
          url: "http://example.com/1.jpg",
          width: 500,
          height: 500,
        },
      ],
    },
    {
      id: "2",
      name: "Artist 2",
      images: [
        {
          url: "http://example.com/2.jpg",
          width: 500,
          height: 500,
        },
      ],
    },
    // Add more artists as needed
  ];

  it("renders without crashing", () => {
    render(<TopArtists topArtists={mockArtists} />);
    expect(screen.getByText(`1. Artist 1`)).toBeInTheDocument();
  });

  it("renders the correct number of artists", () => {
    render(<TopArtists topArtists={mockArtists} />);
    const artistElements = screen.getAllByText(/Artist/);
    expect(artistElements).toHaveLength(mockArtists.length);
  });
});
