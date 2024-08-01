import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from '../../utils/api';

function EditCard() {
    const { deckId, cardId } = useParams();
    const navigate = useNavigate();
    const initialDeckDetails = {
        id: "",
        name: "",
        description: ""
    };
    const initialCardDetails = {
        id: "",
        frontText: "",
        backText: "",
        associatedDeckId: "",
    };
    const [currentCard, setCurrentCard] = useState(initialCardDetails);
    const [currentDeck, setCurrentDeck] = useState(initialDeckDetails);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchDeckAndCardData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                const cardResponse = await readCard(cardId, abortController.signal);
                setCurrentDeck(deckResponse);
                setCurrentCard(cardResponse);
            } catch (error) {
                console.error("Failed to load deck and card information.", error);
            }
        }
        fetchDeckAndCardData();
        return () => {
            abortController.abort();
        };
    }, [cardId, deckId]);

    function handleDone() {
        navigate(`/decks/${deckId}`);
    }

    function handleInputChange({ target }) {
        setCurrentCard({...currentCard, [target.name]: target.value});
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        updateCard({ ...currentCard }, abortController.signal).then(() => {
            navigate(`/decks/${deckId}`);
        });
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <CardForm
                card={currentCard}
                handleChange={handleInputChange}
                handleDone={handleDone}
                handleSubmit={handleFormSubmit} />
        </div>
    );
}

export default EditCard;
