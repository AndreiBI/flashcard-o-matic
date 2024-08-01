import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [deckForm, setDeckForm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const abortCtrl = new AbortController();
        async function fetchDeck() {
            try {
                const result = await readDeck(deckId, abortCtrl.signal);
                setCurrentDeck(result);
                setDeckForm(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDeck();
        return () => abortCtrl.abort();
    }, [deckId]);

    const handleInputChange = ({ target }) => {
        setDeckForm({
            ...deckForm,
            [target.name]: target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const abortCtrl = new AbortController();
        updateDeck(deckForm, abortCtrl.signal).then(() => {
            navigate(`/decks/${currentDeck.id}`);
        });
    };

    const handleCancelClick = () => {
        navigate(`/decks/${currentDeck.id}`);
    };

    if (!deckForm) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Edit Deck
                        </li>
                    </ol>
                </nav>
            </div>

            <h1>Edit Deck</h1>

            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="deckName"
                        name="name"
                        onChange={handleInputChange}
                        value={deckForm.name}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        id="deckDescription"
                        name="description"
                        onChange={handleInputChange}
                        value={deckForm.description}
                    />
                </div>
                <button
                    className="btn btn-secondary mr-2"
                    type="button"
                    onClick={handleCancelClick}
                >
                    <i className="bi bi-x-circle-fill"> </i>Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    <i className="bi bi-stars"> </i>Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;
