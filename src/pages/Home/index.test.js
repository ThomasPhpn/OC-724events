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

// Nouveaux tests à implémenter

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);

    const eventHeadings = screen.getAllByText("Nos réalisations");

    expect(eventHeadings.some((el) => el.tagName === "H2")).toBe(true);
  });

  it("a list of people is displayed", () => {
    render(<Home />);

    const peopleHeadings = screen.getAllByText("Notre équipe");

    expect(peopleHeadings.some((el) => el.tagName === "H2")).toBe(true);

    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Home />);

    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(
      screen.getByText("45 avenue de la République, 75000 Paris")
    ).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
  });
});
