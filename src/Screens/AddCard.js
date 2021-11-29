import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import CardInput from "../Miscellaneous/CardInput";

function AddCard() {

    const {deckId} = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const ac = new AbortController();
        const loadDeck = () => {
          readDeck(deckId, ac.signal)
            .then((theDeck) => {
                setDeck(theDeck)
              })
            .catch(console.error);
        };
        loadDeck();
        return () => ac.abort();
      }, [setDeck, deckId]);
    
      return (
        <div>
         <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                  <li className="breadcrumb-item active">Add Card</li>
                </ol>
            </nav>
            <CardInput newCard={true} done="Done" submit="Save" />
        </div>
      )
};

export default AddCard;