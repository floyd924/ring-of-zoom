import { Rule } from "./interfaces/IRule";
import { Page } from "./interfaces/Pages";
import { getDefaultRules, getAllRules } from "./data";
import React from 'react';
import { Home } from "./home";
import { Setup } from "./setup";
import { Game } from "./game";

import './styles/brain.scss';

interface IBrainState {
    displayingPage: Page,
    players: string[],
    // currentPlayer: string,
    // nextPlayer: string,
    rules: Map<number, Rule>
}

export class Brain extends React.Component {
    state: IBrainState = {
        displayingPage: Page.Home,
        players: [],
        // currentPlayer: "player 1",
        // nextPlayer: "player 2",
        rules: new Map<number, Rule>()
    }

    componentDidMount = () => {
        this.setState({rules: this.createRuleObject(getDefaultRules())})
    }

    createRuleObject = (rules: Rule[]): Map<number, Rule> => {
        const ruleMap = new Map<number, Rule>();
        for (let i = 0; i < rules.length; i++) {
            const element = rules[i];
            ruleMap.set(i+1, element);
        }
        return ruleMap;
    }

    getActivePage(): JSX.Element {
        switch (this.state.displayingPage) {
            case Page.Home:
                return(<Home startNewGameMethod={this.showSetup} />)
            case Page.Setup:
                return(<Setup startGameMethod={this.startNewGame} allRules={getAllRules()} defaultAssignedRules={this.state.rules} />)
            case Page.Game:
                return(<Game players={this.state.players} rules={this.state.rules} startNewGameMethod={this.showSetup}/>)
            default:
                return(<Home startNewGameMethod={this.showSetup} />)
        }
    }

    showSetup = () => {
        this.setState({displayingPage: Page.Setup})
    }

    startNewGame = (players: string[], rules: Map<number, Rule>) => {
        // console.log("updating Brain with new rules and players, ready to start new game")
        this.setState({displayingPage: Page.Game, rules: rules, players: players})
    }

    render() {
        return(
            <div className="brain-container">
                {this.state.displayingPage !== Page.Home ? 
                    <div className="decoration-container">
                        <div className="decoration-one side"></div>
                        <div className="decoration-one top"></div>
                        <div className="decoration-one opposite"></div>
                    </div>
                : null}
                {this.getActivePage()}
            </div>
        )
    }
}