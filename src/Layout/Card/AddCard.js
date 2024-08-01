import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from '../../utils/api';

function AddCard() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const initialCardState = {
        front: "",
        back: ""
    };
    const [cardData, setCardData] = useState(initialCardState);
    const [currentDeck, setCurrentDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchDeckData() {
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setCurrentDeck(deckResponse);
            } catch (error) {
                console.error("Deck data could not be fetched.", error);
            }
        }
        fetchDeckData();
        return () => {
            abortController.abort();
        };
    }, [deckId]);

    function handleFormSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, { ...cardData }, abortController.signal).then(() => {
            navigate(0);
            setCardData(initialCardState);
        });
    }

    function handleInputChange({ target }) {
        setCardData({...cardData, [target.name]: target.value});
    }

    function handleDoneClick() {
        // navigate(`/decks/${deckId}`);
        navigate(`/decks/${deckId}`);
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <CardForm
                cardData={cardData}
                onChange={handleInputChange}
                onDone={handleDoneClick}
                onSubmit={handleFormSubmit} />
        </div>
    );
}

export default AddCard;
