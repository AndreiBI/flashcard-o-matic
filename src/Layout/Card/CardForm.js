import React from "react";

function CardForm( {card, handleChange, handleDone, handleSubmit} ) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Front</label>
                <textarea
                    id="front"
                    name="front"
                    className="form-control"
                    onChange={handleChange}
                    value={card.front}
                    required
                />
            </div>
            <div className="form group">
                <label>Back</label>
                <textarea
                    id="back"
                    name="back"
                    className="form-control"
                    onChange={handleChange}
                    value={card.back}
                    required
                />
            </div>
            <button className="btn btn-secondary" onClick={handleDone}>
                {card.id ? 'Cancel' : 'Done'}
            </button>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                {card.id ? "Submit" : "Save"}
            </button>
        </form>
    );
}

export default CardForm;