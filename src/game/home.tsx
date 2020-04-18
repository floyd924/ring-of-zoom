import React from 'react';
import './styles/home.scss';

interface IHomeProps{
    startNewGameMethod: () => void;
}

export class Home extends React.Component<IHomeProps> {

    startNewGame = () => {
        this.props.startNewGameMethod();
    }

    render() {
        return(
            <div className="home-container">
                <h1 className="app-title ring">Ring</h1>
                <h1 className="app-title of">Of</h1>
                <h1 className="app-title zoom">Zoom</h1>
                <div className="start-container">
                    <div className="start-button" onClick={this.startNewGame}>
                        <h2 className="start-prompt">START</h2>
                    </div>
                </div>
            </div>
        )
    }
}