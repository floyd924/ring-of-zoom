import React from 'react';
import { Rule } from './interfaces/IRule';
import { DeckResponse } from './interfaces/IDeckResponse';
import { CardResponse } from './interfaces/ICardResponse';
import { mapCardDTOsToCards, sortByCardNumber } from './utils';

import cup from './images/ring-of-fire-1.png'

import './styles/game.scss';
import { Card } from './interfaces/ICard';

interface IGameState {
    currentPlayer: string,
    nextPlayer: string,
    deck: Card[],
    usedCards: Card[],
    currentCard: Card | null,
    breakTheCircle: number,
    circleIsBroken: boolean
}

interface IGameProps {
    players: string[],
    rules: Map<number, Rule>,
    startNewGameMethod: () => void
}

export class Game extends React.Component<IGameProps> {

    state: IGameState = {
        currentPlayer: "",
        nextPlayer: this.props.players[0] || "",
        deck: [],
        usedCards: [],
        currentCard: null,
        breakTheCircle: 0,
        circleIsBroken: false
    }

    componentDidMount = () => {
        this.fetchNewDeck();
        this.setBreakTheCircle();
    }

    fetchNewDeck = () => {
        let deckId: string = "";
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle').then((response) => {
            response.json().then((response: DeckResponse) => {
                deckId = response.deck_id;
            }).then(() => {this.saveAllCards(deckId)})
        })
    }

    setBreakTheCircle = () => {
        // random card between 20 and 45
        const randomCardNumber = Math.floor(Math.random() * Math.floor(15)) + 30;
        this.setState({breakTheCircle: randomCardNumber});
    }

    saveAllCards = (deckId: string) => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`).then((response) => {
            response.json().then((response: CardResponse) => {
                this.setState({deck: mapCardDTOsToCards(response.cards)})
            })
        })
    }

    drawNextCard = () => {

        if(this.state.circleIsBroken){
            this.setState({circleIsBroken: false})
        }

        if(this.state.usedCards.length === this.state.breakTheCircle){
            // if(this.state.deck.length === 50){
            // this player has broken the circle!
            this.setState({circleIsBroken: true})
        }

        const nextCard: Card | undefined = this.state.deck.shift();

        if(nextCard === undefined){
            // no more cards! game over!
        } else {        
            const playedCards: Card[] = this.state.usedCards;
            playedCards.push(nextCard);
            this.setState({currentPlayer: this.state.nextPlayer, usedCards: playedCards, currentCard: nextCard})
            this.setNextPlayer();
        }
    }

    setupNewGame = () => {
        this.props.startNewGameMethod();
    }

    setNextPlayer = () => {
        const currentNextPlayerIndex: number = this.props.players.indexOf(this.state.nextPlayer);
        if(this.props.players.length < currentNextPlayerIndex+2){
            this.setState({nextPlayer: this.props.players[0]})
        } else {
            this.setState({nextPlayer: this.props.players[currentNextPlayerIndex + 1]})
        }
    }

    getCardImage = (): JSX.Element => {
        return(
            <img src={this.state.currentCard? this.state.currentCard.image : cup} />
        )
    }

    getRuleName = (): JSX.Element => {
        const ruleName: string | null | undefined = this.state.currentCard && this.props.rules.get(this.state.currentCard?.number)?.name;
        return(<p>{ruleName}</p>)
    }

    getRuleInstructions = () => {
        const ruleDescription: string | null | undefined = this.state.currentCard && this.props.rules.get(this.state.currentCard?.number)?.description;
        return(<p>{ruleDescription}</p>)
    }

    getPlayerElements = (): JSX.Element[] => {
        const elementsToReturn: JSX.Element[] = [];
        this.props.players.forEach((player: string) => {
            if(player === this.state.currentPlayer){
                elementsToReturn.push(
                    <div className="player current-player">
                        <p className="player-name">{player}</p>
                    </div>
                )
            } else {
                elementsToReturn.push(
                    <div className="player">
                        <p className="player-name">{player}</p>
                    </div>
                )
            }
        })

        return elementsToReturn;
    }

    getplayedCardImages = (): JSX.Element[] => {
        const elementsToReturn: JSX.Element[] = []
        const allCards: Card[] = [...this.state.usedCards]
        allCards.sort(sortByCardNumber).reverse();
        allCards.forEach((usedCard: Card) => {
            elementsToReturn.push(
                <img className="played-card-image" src={usedCard.image} />
            )
        })
        return elementsToReturn;
    }

    getNextPlayerGreeting = (): JSX.Element => {
        const randomNumber = Math.floor(Math.random() * Math.floor(5));
        if (this.state.usedCards.length === 0){
        return <p>The first player is {this.state.nextPlayer}</p>
        } else if(this.state.usedCards.length === 51){
            return <p>And {this.state.nextPlayer} will turn the final card</p>
        }
        switch (randomNumber) {
            case 1:
                return <p>the next player is {this.state.nextPlayer}...</p>;
            case 2:
                return <p>{this.state.nextPlayer} is up next...</p>;
            case 3:
                return <p>{this.state.nextPlayer} is getting ready to draw...</p>
            case 4:
                return <p>{this.state.nextPlayer} is next to draw...</p>
            case 5:
                return <p>Are you ready, {this.state.nextPlayer}?</p>
            case 6:
                return <p>Next up it's {this.state.nextPlayer}...</p>;
            case 7:
                return <p>{this.state.nextPlayer} is drawing the next card...</p>
            default:
                return <p>{this.state.nextPlayer}, it's your turn...</p>;
        }
    }

    render() {   
        return(
            <div className="game-container">
                <div className="game-top">
                    <div className="card-count-container">
                        <div className="cards-count-container">
                            <p className="cards-count-text">Cards remaining: {this.state.deck.length}</p>
                        </div>
                        <div className="cards-count-container">
                            <p className="cards-count-text">Cards played: {this.state.usedCards.length}</p>
                        </div>
                    </div>
                    <div className="game-content">
                        <div className="current-card">
                            {this.getCardImage()}
                        </div>

                        <div className="game-info">
                            {this.state.circleIsBroken ? <p>Oh no! {this.state.currentPlayer} just broke the circle!</p>:null}
                            {this.state.currentCard ? <p>{this.state.currentPlayer} drew the {this.state.currentCard.value} of {this.state.currentCard.suit}!</p>:null}

                            {this.state.currentCard ?     
                            <div className="card-rules">
                                <p className="rule-name">{this.getRuleName()}</p>
                                <p className="rule-instructions">{this.getRuleInstructions()}</p>
                            </div>
                            : null }
                                
                                
                                
                            {this.state.usedCards.length !== 52 ? this.getNextPlayerGreeting() : null}
                            
                            
                            
                            {this.state.usedCards.length === 52 ? 
                            <div className="game-over">
                                <h3>Game over!</h3>
                                <div className="button restart" onClick={this.setupNewGame}>
                                    <h3>Setup new game</h3>
                                </div>
                            </div>
                            
                            :
                            <div className="button" onClick={this.drawNextCard}>
                                <h3>Draw next card</h3>
                            </div>
                            
                            }
                        </div>

                        <div className="played-cards-container">
                            {this.getplayedCardImages()}
                        </div>
                        
                    </div>
                    
                </div>
                <div className="game-bottom">
                    {this.getPlayerElements()}
                </div>
            </div>

        )
    }
}