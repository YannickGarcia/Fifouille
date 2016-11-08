import React, { Component } from 'react';
import GameList from '../components/game-list-component';
import AddGame from '../components/add-game-component';

class Games extends Component {

    render() {
        return (
            <div style={{padding:'0'}}>
                <GameList />
                <div>
                    <AddGame />
                </div>
            </div>
        );
    }
}

export default Games;
