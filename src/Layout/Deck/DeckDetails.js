import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";

export const DeckDetails = () => {
    const [currentDeck, setCurrentDeck] = useState({});
    const [deckCards, setDeckCards] = useState([]);
    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchController = new AbortController();

        async function fetchDeckData() {
            try {
                const fetchedDeck = await readDeck(deckId, fetchController.signal);
                setCurrentDeck(fetchedDeck);
                setDeckCards(fetchedDeck.cards);
            } catch (error) {
                console.error("Error loading the deck data", error);
            }

            return () => {
                fetchController.abort();
            };
        }
        fetchDeckData();
    }, [deckId]);

    function handleDeckDelete(deck) {
        const deleteController = new AbortController();

        if (window.confirm(`Delete this deck? You will not be able to recover it.`)) {
            navigate("/");
            deleteDeck(deck.id, deleteController.signal);
        }
    }

    function handleCardDelete(card) {
        const deleteController = new AbortController();

        if (window.confirm(`Delete this card? You will not be able to recover it.`)) {
            navigate(0);
            deleteCard(card.id, deleteController.signal);
        }
    }

    function handleDeckEdit() {
        navigate(`/decks/${deckId}/edit`);
    }

    function handleDeckStudy() {
        navigate(`/decks/${deckId}/study`);
    }

    function handleCardAdd() {
        navigate(`/decks/${deckId}/cards/new`);
    }

    function handleCardEdit(card) {
        navigate(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    if (deckCards.length > 0) {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                    </li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{currentDeck.name}</h2>
                        <p>{currentDeck.description}</p>
                        <button onClick={handleDeckEdit} className="btn btn-secondary">
                            Edit
                        </button>
                        <button onClick={handleDeckStudy} className="btn btn-primary">
                            Study
                        </button>
                        <button onClick={handleCardAdd} className="btn btn-primary">
                            Add Cards
                        </button>
                        <button onClick={() => handleDeckDelete(currentDeck)} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {deckCards.map((card) => {
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button onClick={() => handleCardEdit(card)} className="btn btn-secondary">
                                            Edit
                                        </button>
                                        <button onClick={() => handleCardDelete(card)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }
}

export default DeckDetails;
