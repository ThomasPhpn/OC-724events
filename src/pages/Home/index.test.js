import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);

    // Utilise getAllByText pour sélectionner tous les éléments avec le texte "Nos réalisations"
    const eventHeadings = screen.getAllByText("Nos réalisations");

    // Vérifie qu'un <h2> contient le texte "Nos réalisations" (titre de la section)
    expect(eventHeadings.some((el) => el.tagName === "H2")).toBe(true);
  });

  it("a list of people is displayed", () => {
    render(<Home />);

    // Utilise getAllByText pour sélectionner tous les éléments avec le texte "Notre équipe"
    const peopleHeadings = screen.getAllByText("Notre équipe");

    // Vérifie qu'un <h2> contient le texte "Notre équipe" (titre de la section)
    expect(peopleHeadings.some((el) => el.tagName === "H2")).toBe(true);

    // Vérifie que plusieurs cartes de personnes sont rendues avec les noms attendus
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Home />);

    // Vérifie la présence du footer avec les informations de contact
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    // Vérifie la présence de la dernière prestation dans le footer
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
  });
});
