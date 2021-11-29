import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    console.log(history);
    const initialFormState = {name:"",description:""}
    // useState to handle the change when inputting into the fields
    const [formData,setFormData] = useState(initialFormState)
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
   
    function handleSubmit(event) {
        event.preventDefault();
        createDeck(formData).then((newDeck) => history.push(`/decks/${newDeck.id}`)).catch(console.error)
        console.log(history)

    
    }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="{'/'}">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <form>
        <label htmlFor="name">
          Name
          <br />
          <input type="text" id="name" name="name" onChange={handleChange}/>
        </label>
        <br />
        <label htmlFor="description">
          Description
          <br />
          <textarea id="description" name="description" rows="5" cols="100" onChange={handleChange}/>
        </label>
        <Link to={`/`} className="btn btn-secondary">
          Cancel
        </Link>
       
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
