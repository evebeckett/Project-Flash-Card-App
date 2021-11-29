import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck () {
   
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const history = useHistory();
    const initialFormState = {name: "", description: "", id:""};
    console.log(initialFormState)
    // useState to handle the change when inputting into the fields
    const [formData,setFormData] = useState(initialFormState);
    

    useEffect(() => {
        const ac = new AbortController();
        const loadDeck = () => {
          readDeck(deckId, ac.signal)
            .then((theDeck) => {
                setDeck(theDeck)
                setFormData(theDeck)})
            .catch(console.error);
        };
        loadDeck();
        return () => ac.abort();
      }, [setDeck, deckId]);


    

      const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };

    function handleSubmit(event) {
        event.preventDefault();
        updateDeck(formData).then((newDeck) => history.push(`/decks/${newDeck.id}`))
        .catch(console.error)
    }

    return (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="breadcrumb-item active">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
              <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
          </nav>
    
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name
              <br />
              <input type="text" id="name" name="name" onChange={handleChange}
              value={formData.name}/>
            </label>
            <br />
            <label htmlFor="description">
              Description
              <br />
              <textarea id="description" name="description" rows="5" cols="100" onChange={handleChange}
              value={formData.description}/>
            </label>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
              Cancel
            </Link>
           
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }


export default EditDeck;
