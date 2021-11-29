import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();
  const { deckId } = useParams();
  useEffect(() => {
    const ac = new AbortController();
    setDeck({ cards: [] });
    const loadDeck = () => {
      readDeck(deckId, ac.signal)
        .then(setDeck)
        .catch(console.error);
    };
    loadDeck();
    return () => ac.abort();
  }, [setDeck, deckId]);

  function handleDeleteBtn(event) {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete this deck?")) {
      let deckDelId =
        event.target.parentElement.parentElement.getAttribute("id");
      deleteDeck(deckDelId)
        .then(() => history.go(0))
        .catch(console.error);
    }
  }

  function handleDeleteCard(event) {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this card?")){    
      let cardDelId =
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "id"
      );
    deleteCard(cardDelId)
      .then(() => history.go(0))
      .catch(console.error);
    }
  }

  if (!deck.name) return <h2>Loading...</h2>;
  console.log(deck);

  const deckHTML = deck.cards.map((card) => {
    return (
      <div key={card.id}>
        <div className="card">
          <div className="card-body" id={`${card.id}`}>
            <table>
              <tbody>
                <tr>
                  <td>{card.front}</td>
                  <td>
                    {card.back}
                    <Link
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                      className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteCard}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>

      <div key={deck.id} id={deck.id}>
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>

        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
          Edit
        </Link>

        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>

        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteBtn}
        >
          Delete
        </button>
        <h2>Cards</h2>
        {deckHTML}
      </div>
    </div>
  );
}

export default Deck;
