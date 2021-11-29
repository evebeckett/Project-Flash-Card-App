import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";


function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const {cards} = deck;
  const [cardFace, setCardFace] = useState('front');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  useEffect(() => {
    const ac = new AbortController();
    const loadDeck = () => {
      readDeck(deckId, ac.signal)
        .then((theDeck) => {
          setDeck(theDeck);
        })
        .catch(console.error);
    };
    loadDeck();
    return () => ac.abort();
  }, [setDeck, deckId]);

  console.log(deck);

  function handleFlip() {
    if (cardFace === "front") {
        setCardFace('back');
    } else {
     setCardFace("front");
    }
  }

  function handleNext () {
    if (currentCardIndex < deck.cards.length - 1) {
        setCurrentCardIndex((index) => index + 1);
        setCardFace('front');
    } else {
        if (window.confirm("Do you want to restart the deck?")) {
        setCurrentCardIndex(0);
        setCardFace('front');

        } else {
            history.push('/');
        }
    }
  }

  if (!deck.name) return <h1>Loading. . . </h1>

  if (cards.length < 3)  {
     return (
    <div>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item active">
              <Link to={`/decks/${deckId}`}>
              {deck.name}
              </Link></li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
        </nav>
     <h1>Not enough cards</h1>
     </div>
         )
            }
  const card = deck.cards[currentCardIndex];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item active">
              <Link to={`/decks/${deckId}`}>
              {deck.name}
              </Link></li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>

      <div className="card-container">
        <div className="whole-card">

          <div className="card card-front" id={`${deck.id}`}>
            <div className="card-body">
              <h5 className="card-title">{`Card ${currentCardIndex + 1} of ${cards.length}`}</h5>
              <div className="front">
                <p className="card-text">{cardFace === "front" ? card.front : card.back}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button type="button" className="btn btn-danger" onClick={handleFlip}>
        Flip
      </button>

     { cardFace === "back" && <button type="button" className="btn btn-primary" onClick={handleNext}>
          Next
      </button>}
    </div>
  );
}

export default Study;
