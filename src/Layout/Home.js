import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

const Home = () => {
    const [deckList, setDeckList] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchDecks = async () => {
            const abortCtrl = new AbortController();
            try {
                const deckData = await listDecks(abortCtrl.signal);
                setDeckList(deckData);
            } catch (err) {
                console.error("Something went wrong", err);
            }
            return () => {
                abortCtrl.abort();
            };
        };
        fetchDecks();
    }, []);

    const handleDeckDelete = async (deck) => {
        if (window.confirm(`Deleting this deck is permanent. Are you sure you want to proceed?`)) {
            const abortCtrl = new AbortController();
            try {
                await deleteDeck(deck.id, abortCtrl.signal);
                setDeckList((prevDeckList) => prevDeckList.filter((d) => d.id !== deck.id));
                navigateTo(0);
            } catch (err) {
                console.error("Deck deletion failed. An error occurred.", err);
            }
        }
    };

    return (
        <main className="container">
            <section className="row">
                <Link to="decks/new">
                    <button>+ Create Deck</button>
                </Link>
            </section>
            <section className="row">
                {deckList.map((deck) => (
                    <div className="card" key={deck.id} style={{ width: "32rem" }}>
                        <div className="card-title">{`${deck.name}`}</div>
                        <div className="card-subtitle text-muted">{`${deck.cards.length} cards`}</div>
                        <div className="card-text">{`${deck.description}`}</div>
                        <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                            View
                        </Link>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                            Study
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDeckDelete(deck)}>
                            Delete
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Home;
