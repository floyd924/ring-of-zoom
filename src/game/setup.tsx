import React, { ChangeEvent } from 'react';
import { Rule } from './interfaces/IRule';
import './styles/setup.scss';
import { getAllRules, getDefaultRules } from './data';

interface ISetupProps {
    allRules: Rule[],
    defaultAssignedRules: Map<number, Rule>,
    startGameMethod: (players: string[], rules: Map<number, Rule>) => void
}

interface ISetupState {
    assignedRules: Map<number, Rule>,
    playerMap: Map<number, string>,
    // players: string[],
    numberOfPlayers: number
}

export class Setup extends React.Component<ISetupProps> {

    state: ISetupState = {
        assignedRules: new Map(this.props.defaultAssignedRules),
        playerMap: new Map<number, string>(),
        // players: [],
        numberOfPlayers: 2
    }

    getPlayerNameBoxes = (): JSX.Element[] => {
        const elementsToReturn: JSX.Element[] = [];
        for (let i = 0; i < this.state.numberOfPlayers; i++) {
        elementsToReturn.push(
            <div key={i+1} className="player-row">
                <p>Player {i+1}:</p>
                <input className="name-input" id={`${i+1}`} type="text" onChange={this.updatePlayerMap}></input>
            </div>)
            
        }
        return elementsToReturn;
    }

    updatePlayerMap = (event: any) => {
        // add timeout here
        
        
        const existingMap = this.state.playerMap;
        existingMap.set(parseInt(event.target.id), event.target.value);
        console.log("MAP IS:", existingMap)
        this.setState({playerMap: existingMap})
    }

    getDropdownOptions = (currentCardIndex: number): JSX.Element[] => {
        // currentCardIndex will only ever be 1-13
        // this method should return 20
        const elementsToReturn: JSX.Element[] = [];

        const allRules: Rule[] = getAllRules();

        for (let i = 0; i < allRules.length; i++) {
            const rule = allRules[i];


            const currentRule = this.state.assignedRules.get(currentCardIndex+1);
            // console.log("rules in loop is", rule);
            // console.log("selected rule is ", this.state.assignedRules.get(currentCardIndex+1))
            
            // if(currentRule?.id == 20){
            //     console.log("Rule 50/50 is currently selected in State")
            //     if(currentRule != undefined && currentRule.id === rule.id){
            //         console.log("its a 50/50 match!")
            //     }
            // }
            if(currentRule != undefined && currentRule.id === rule.id){
                // console.log("setting selected rule to be", rule.id)
                // console.log("its a match!")
                if(currentRule.id == 20){
                    // console.log("YES WE HAVE A MATCH ON ID 20")
                }
                elementsToReturn.push(
                    <option key={i+1} value={i} selected={true}>{rule.name}</option>
                )
            } else {
                elementsToReturn.push(
                    <option key={i+1} value={i}>{rule.name}</option>
                )
            }

            
            
            
        }


        return elementsToReturn;
    }

    getRuleSelectionElements = (): JSX.Element[] => {
        const elementsToReturn: JSX.Element[] = [];
        const cards: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


        // event.target.value is this SELECT tag. Value = card number to start with
        // event.target contains 20 children, and when one is selected the Event.target.value
        // is updated to show the index of this child rule

        // we need the event to include the current card number as well
        for (let i = 0; i < cards.length; i++) {
            const assignedRule = this.state.assignedRules.get(i+1);
            elementsToReturn.push(
                <div key={i+1} className="rule-row">
                    <p className="card-value">{cards[i]}</p>
                    <select className="rule-dropdown" onChange={(e) => this.setRule(e, i)} value={assignedRule ? assignedRule.id -1 : i}>
                        {this.getDropdownOptions(i)}
                    </select>
                </div>
            )
            
        }

        return elementsToReturn;
    }

    getAllRuleElements = (): JSX.Element[] => {
        const elementsToReturn: JSX.Element[] = [];
        let keyCount = 1;
        getAllRules().forEach(rule => {
            elementsToReturn.push(
                <div key={keyCount} className="rule-container">
                    <p className="rule-name">{rule.name}</p>
                    <p className="rule-description">{rule.description}</p>
                </div>
            )
            keyCount++;
        });
        return elementsToReturn;
    }

    increasePlayers = () => {
        this.setState({numberOfPlayers: this.state.numberOfPlayers +1})
    }

    decreasePlayers = () => {
        this.setState({numberOfPlayers: this.state.numberOfPlayers -1})
    }

    startNewGame = () => {

        const players: string[] = [];
        for (let i = 0; i < this.state.playerMap.size; i++) {
            const player: string | undefined = this.state.playerMap.get(i+1);
            if(player != undefined){
                players.push(player);
            }            
        }


        this.props.startGameMethod(players, this.state.assignedRules);
    }

    resetRules = () => {
        this.setState({assignedRules: this.props.defaultAssignedRules})
        console.log("THIS METHOD DOES NOT WORK YET")
    }

    setRule = (event: any, currentCardIndex: number) => { // the fuck is this supposed to be?
        // also number should probs be lower case everywhere else, too.....
        
        // console.log("logging a change to:", event.target.value)
        const rules: Map<number, Rule> = this.state.assignedRules;

        // this is correct
        console.log("new rule to set will be" , getAllRules()[event.target.value])

        // this is correct
        // console.log("current card index is", currentCardIndex)

        console.log("settin a new rule for card number:", currentCardIndex+1)
        rules.set(currentCardIndex+1, getAllRules()[event.target.value])
        this.setState({assignedRules: rules})
        // console.log("saving new rules to state")
    }

    render() {
        // console.log("inside render method, state is", this.state.assignedRules)
        console.log("this.props.defaultRules are", this.props.defaultAssignedRules)
        return(
            <div className="setup-container">
                <div className="setup-left">
                    <div className="player-counter player-row">
                        <p className="players-count-prompt">Players:</p>
                        <div className="minus symbol" onClick={this.decreasePlayers}>-</div>
                        <p className="players-count">{this.state.numberOfPlayers}</p>
                        <div className="plus symbol" onClick={this.increasePlayers}>+</div>
                    </div>
                    {this.getPlayerNameBoxes()}
                </div>
                <div className="setup-right">
                    <div className="rules-container">
                        <div className="rules-container-left">
                            {this.getRuleSelectionElements()}
                        </div>
                        <div className="rules-container-right">
                            <div className="reset-container">
                                <div className="reset-rules-button" onClick={this.resetRules}><h3>Reset rules to default</h3></div>
                            </div>
                            <div className="suggestions-container">
                                {this.getAllRuleElements()}
                            </div>
                        </div>
                    </div>
                    <div className="start-container">
                        <div className="start-game-button" onClick={this.startNewGame}><h2>Start Game!</h2></div>
                    </div>
                </div>
            </div>
        )
    }
}