import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function Study() {
    const [currentDeck, setCurrentDeck] = useState({});
    const [cardList, setCardList] = useState([]);
    const [currentCardNumber, setCurrentCardNumber] = useState(1);
    const { deckId } = useParams();
    const [isFront, setIsFront] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDeckData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setCurrentDeck(deckResponse);
                setCardList(deckResponse.cards);
            } catch (error) {
                console.error("Unable to retrieve deck data", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchDeckData();
    }, [deckId]);

    function toggleCardSide() {
        setIsFront(!isFront);
    }

    function handleNextCard(index, totalCards) {
        if (index < totalCards) {
            setCurrentCardNumber(currentCardNumber + 1);
            setIsFront(true);
        } else {
            if (window.confirm(
                `Do you want to reset the cards? Select 'Cancel' to return to the home page.`
            )) {
                setCurrentCardNumber(1);
                setIsFront(true);
            } else {
                navigate("/");
            }
        }
    }

    function renderNextButton(cards, index) {
        if (isFront) {
            return null;
        } else {
            return (
                <button onClick={() => handleNextCard(index + 1, cards.length)} className="btn btn-primary">
                    Next
                </button>
            );
        }
    }

    function renderCards() {
        return (
            <div className="card">
                {cardList.map((card, index) => {
                    if (index === currentCardNumber - 1) {
                        return (
                            <div className="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cardList.length}`}
                                </div>
                                <div className="card-text">
                                    {isFront ? card.front : card.back}
                                </div>
                                <button onClick={toggleCardSide} className="btn btn-secondary">
                                    Flip
                                </button>
                                {renderNextButton(cardList, index)}
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
        );
    }

    function renderNotEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cardList.length} cards in this deck.
                </p>
                <Link to={`/decks/${currentDeck.id}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
            </div>
        );
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
                <li className="breadcrumb-item active">Study</li>
            </ol>
            <div>
                <h2>{`Study: ${currentDeck.name}`}</h2>
                <div>
                    {cardList.length === 0
                        ? renderNotEnoughCards()
                        : cardList.length > 2
                            ? renderCards()
                            : renderNotEnoughCards()}
                </div>
            </div>
        </div>
    );
}

export default Study;
