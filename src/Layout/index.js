import React from "react";
import { Routes, Route } from 'react-router-dom';
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";
import CreateDeck from "./Deck/CreateDeck";
import DeckDetails from "./Deck/DeckDetails";
import EditDeck from "./Deck/EditDeck";
import Study from "./Deck/Study";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/decks/new" element={<CreateDeck />} />
                    <Route path="/decks/:deckId" element={<DeckDetails />} />
                    <Route path="/decks/:deckId/study" element={<Study />} />
                    <Route path="/decks/:deckId/edit" element={<EditDeck />} />
                    <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
                    <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default Layout;
