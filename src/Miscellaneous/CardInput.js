import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { readCard, updateCard, createCard } from "../utils/api/index";

function CardInput(props) {
 
  const {cardId, deckId} = useParams();
  const [card, setCard] = useState({});
  const history = useHistory();
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



  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  function handleRedirect() {
    history.push(`/decks/${deckId}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    if (props.newCard) {
      console.log("The conditional is working")
      createCard(deckId, formData)
        .then(history.go(0))
        .catch(console.error);
    }

    updateCard(formData)
      .then(history.push(`/decks/${deckId}`))
      .catch(console.error);
  }
  

  return (
    <div>
       

    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front
          <br />
          <textarea
            id="front"
            name="front"
            rows="5"
            cols="100"
            onChange={handleChange}
            value={formData.front}
          />
        </label>
        <label htmlFor="back">
          Back
          <br />
          <textarea
            id="back"
            name="back"
            rows="5"
            cols="100"
            onChange={handleChange}
            value={formData.back}
          />
        </label>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleRedirect}
          value={props.done}
        >
          {props.done}
        </button>
        <button className="btn btn-primary" value={props.submit} type="submit">
          {props.submit}
        </button>
      </form>
    </div>
    </div>
  );
}

export default CardInput;
