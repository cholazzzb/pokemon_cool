import OwnedPokemon from "../OwnedPokemon";

describe("Test constuctor", () => {
  test("", () => {
    let myPokemon = new OwnedPokemon([
      {
        name: "bulbasaur",
        imgURL: "",
        attributes: [{ name: "BOBI" }],
      },
    ]);
    expect(myPokemon.data).toMatchObject({});
  });
});

describe("Test OwnedPokemon methods", () => {
  describe("checkIfNameAlreadyExist()", () => {
    describe("no data", () => {
      test("should return false (no data)", () => {
        let myPokemon = new OwnedPokemon(null);
        expect(myPokemon.checkIfNameAlreadyExist("BOBI")).toBeFalsy();
      });
    });

    let myPokemon: any;
    beforeEach(() => {
      myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }],
        },
      ]);
    });
    test("should return true", () => {
      expect(myPokemon.checkIfNameAlreadyExist("BOBI")).toBeTruthy();
    });

    test("should return false (no pokemon with that name)", () => {
      expect(myPokemon.checkIfNameAlreadyExist("BOBA")).toBeFalsy();
    });
  });

  describe("checkIfPokemonAlreadyExist()", () => {
    test("should return false (no data)", () => {
      let myPokemon = new OwnedPokemon(null);
      expect(myPokemon.checkIfPokemonAlreadyExist("bulbasaur")).toBeFalsy();
    });

    let myPokemon: any;

    beforeEach(() => {
      myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }],
        },
      ]);
    });

    test("should return true", () => {
      expect(myPokemon.checkIfPokemonAlreadyExist("bulbasaur")).toBeTruthy();
    });
    test("should return false (no pokemon)", () => {
      expect(myPokemon.checkIfPokemonAlreadyExist("chimcar")).toBeFalsy();
    });
  });

  describe("addPokemon()", () => {
    test("should add new pokemon (first time)", () => {
      let myPokemon = new OwnedPokemon(null);
      const isSuccess = myPokemon.addPokemon("bulbasaur", "BOBI", "0");
      expect(myPokemon.checkIfNameAlreadyExist("BOBI")).toBeTruthy();
      expect(myPokemon.checkIfPokemonAlreadyExist("bulbasaur")).toBeTruthy();
      expect(isSuccess).toBeTruthy();
    });

    let myPokemon: any;
    beforeEach(() => {
      myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }],
        },
      ]);
    });
    test("should add new pokemon (different pokemon)", () => {
      const isSuccess = myPokemon.addPokemon("chimcar", "MONYET", "2.png");
      expect(myPokemon.checkIfNameAlreadyExist("MONYET")).toBeTruthy();
      expect(myPokemon.checkIfPokemonAlreadyExist("chimcar")).toBeTruthy();
      expect(isSuccess).toBeTruthy();
    });
    test("should add new pokemon (same pokemon, different name)", () => {
      myPokemon.addPokemon("chimcar", "MONYET", "2.png");

      const isSuccess = myPokemon.addPokemon("chimcar", "MONYET LAGI", "2.png");
      expect(myPokemon.checkIfNameAlreadyExist("MONYET LAGI")).toBeTruthy();
      expect(myPokemon.checkIfPokemonAlreadyExist("chimcar")).toBeTruthy();
      expect(isSuccess).toBeTruthy();
    });
    test("should not add new pokemon (name already exist)", () => {
      myPokemon.addPokemon("chimcar", "MONYET", "2.png");
      myPokemon.addPokemon("chimcar", "MONYET LAGI", "2.png");

      const isSuccess = myPokemon.addPokemon("chimcar", "MONYET LAGI", "2.png");
      expect(isSuccess).toBeFalsy();
    });
  });

  describe("releasePokemon()", () => {
    test("pokemon data reduced (without any same pokemon left)", () => {
      let myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }],
        },
      ]);
      myPokemon.releasePokemon("BOBI");
      expect(myPokemon.data?.length).toEqual(0);
    });

    test("pokemon data reduced (without any same pokemon left)", () => {
      let myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }, { name: "BOBA" }],
        },
        {
          name: "chimcar",
          imgURL: "",
          attributes: [{ name: "MONYET" }],
        },
      ]);
      myPokemon.releasePokemon("MONYET");
      expect(myPokemon.data?.length).toEqual(1);
    });

    test("pokemon data reduced (left the same pokemon)", () => {
      let myPokemon = new OwnedPokemon([
        {
          name: "bulbasaur",
          imgURL: "",
          attributes: [{ name: "BOBI" }, { name: "BOBA" }],
        },
      ]);
      myPokemon.releasePokemon("BOBI");
      expect(myPokemon.checkIfNameAlreadyExist("BOBA")).toBeTruthy();
      expect(myPokemon.checkIfNameAlreadyExist("BOBI")).toBeFalsy();
    });

    test("nothing happen (pokemon name doesn't exist)", () => {});
    let myPokemon = new OwnedPokemon([
      {
        name: "bulbasaur",
        imgURL: "",
        attributes: [{ name: "BOBI" }],
      },
    ]);
    myPokemon.releasePokemon("GA ADA");
    expect(myPokemon.checkIfNameAlreadyExist("BOBI")).toBeTruthy();
  });
});
