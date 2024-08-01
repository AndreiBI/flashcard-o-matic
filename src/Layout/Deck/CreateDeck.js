import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateNewDeck() {
    const navigate = useNavigate();
    const initialDeckState = {
        name: "",
        description: ""
    };
    const [deckDetails, setDeckDetails] = useState(initialDeckState);
    const abortController = new AbortController();

    function handleInputChange({ target }) {
        setDeckDetails({
            ...deckDetails, [target.name]: target.value,
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        createDeck(deckDetails, abortController.signal
        ).then((newDeck) => {
            navigate(`/decks/${newDeck.id}`);
        }).catch((error) => {
            console.error("Failed to create deck", error);
        });
    }

    function handleCancelClick() {
        navigate("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
            <form onSubmit={handleFormSubmit}>
                <h1>Create New Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="deckName"
                        name="deckName"
                        className="form-control"
                        onChange={handleInputChange}
                        type="text"
                        value={deckDetails.deckName}
                        placeholder="Deck name"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="deckDescription"
                        name="deckDescription"
                        className="form-control"
                        onChange={handleInputChange}
                        value={deckDetails.deckDescription}
                        placeholder="Brief description of the deck"
                    />
                </div>
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={handleCancelClick}>
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateNewDeck;
