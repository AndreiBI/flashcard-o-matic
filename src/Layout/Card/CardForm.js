import React from "react";

export const CardForm = ({ card, handleDone, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Front</label>
                <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    value={card.front} />
            </div>
            <div className="form group">
                <label>Back</label>
                <textarea
                    id="back"
                    name="back"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={card.back} />
            </div>
            <button className="btn btn-secondary" onClick={handleDone}>
                {card.id ? 'Cancel' : 'Done'}
            </button>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                Save
            </button>
        </form>
    );
}

export default CardForm;