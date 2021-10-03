import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ownedpage from "../Ownedpage";
import OwnedPokemon from "@utils/OwnedPokemon";
import { saveNewPokemon } from "@utils/session";

const mockSetCurrentPage = jest.fn();
const mockSetCurrentName = jest.fn();

describe("Ownedpage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    let myPokemon = new OwnedPokemon([
      {
        name: "bulbasaur",
        imgURL: "",
        attributes: [{ name: "BOBI" }],
      },
    ]);
    saveNewPokemon(window, myPokemon);
  });
  it("renders correctly", () => {
    render(
      <Ownedpage
        name={""}
        imgURL="2"
        setCurrentPage={mockSetCurrentPage}
        setCurrentName={mockSetCurrentName}
      />
    );

    const headerText = screen.getByText(/owned pokemon/i);
    const bulbasaurText = screen.getByText(/bulbasaur/i);
    expect(headerText).toBeInTheDocument();
    expect(bulbasaurText).toBeInTheDocument();
  });
});
