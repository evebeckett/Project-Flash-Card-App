import React, { useState, useEffect } from "react";
import CardInput from "../Miscellaneous/CardInput";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, readDeck} from "../utils/api/index";

function EditCard() {
 const {deckId, cardId} = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const initialFormState = { front: card.front, back: card.back };
  console.log(initialFormState);
  // useState to handle the change when inputting into the fields
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const ac = new AbortController();
    const loadCard = () => {
      readCard(cardId, ac.signal)
        .then((theCard) => {
          setCard(theCard);
          setFormData(theCard);
        })
        .catch(console.error);
    };
    loadCard();
    return () => ac.abort();
  }, [setCard, cardId]);

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
              <li className="breadcrumb-item active">Edit Card</li>
            </ol>
        </nav>
    <CardInput newCard={false} done="Cancel" submit="Submit" />
    </div>
  );
}

export default EditCard;
