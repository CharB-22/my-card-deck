import React, { Component } from "react";
import Card from './Card';
import './Deck.css';
import axios from "axios";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";

class Deck extends Component{
    constructor(props) {
        super(props);
        // initialize data
        this.state = {deck: null, cards: []};
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        // load data
        let deck = await axios.get(API_URL);
        // Set the data as the state
        this.setState({deck : deck.data })
    }


    async getCard() {
        let deck_id = this.state.deck.deck_id;
        // Draw a card until we reach the limit of the stack

        try {
            let cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`);
            // if no card remain, throw an error:
            if (!cardRes.data.success) {
                throw new Error ("No card remaining")
            }

            // Otherwise just add the card to the existant array
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                cards: [...st.cards, {id: card.code, image: card.image, name: `${card.value} ${card.suit}`}]}))
    } catch (err) {
        alert(err);
    }

    }

    render() {
        return (
            <div className="Deck">
                <h1>Deck of cards</h1>
                <h2>A little demo with React</h2>
                <button className="Deck-button" onClick= {this.getCard}>Draw a card</button>
                <div className="Deck-card">
                {this.state.cards.map((card) => <Card key={card.id} id={card.id} image={card.image} alt={card.name} />)}
                </div>
            </div>
        )
    }
}

export default Deck;