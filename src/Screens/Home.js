import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  // const cardCount = decks.deck.cards.length();
 
  useEffect(() => {
    const ac = new AbortController();
    setDecks([]);
    const loadDecks = () => {
      listDecks(ac.signal).then(setDecks).catch(console.error);
    };
    loadDecks();
    return () => ac.abort();
  }, [setDecks]);

  console.log(decks);
function handleViewBtn(event) {
let currentDeckId = event.target.parentElement.parentElement.getAttribute('id');
event.preventDefault();
history.push(`/decks/${currentDeckId}`)
}

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


  const decksHTML = decks.map((deck) => {
    return (
      <div className="card" key={`${deck.id}`} id={`${deck.id}`}>
        <div className="card-body">
          <span><h5 className="card-title">{deck.name}</h5></span><span><h6> {deck.cards.length} cards</h6></span>
          <p className="card-text">{deck.description}</p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleViewBtn}
            >
              View
            </button>
          

          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteBtn}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <Link to="/decks/new" className="btn btn-secondary">
        + Create Deck
      </Link>
      {decksHTML}
    </div>
  );
}

export default Home;
