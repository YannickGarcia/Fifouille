import React, { Component } from 'react';
import GameList from '../components/game-list-component';
import AddGame from '../components/add-game-component';
import TaskInput from '../components/add-game-bis';

class Games extends Component {

    render() {
        return (
            <div>
                <GameList />
                <TaskInput />
                <div>
                 <AddGame />
                </div>
            </div>
        );
    }
}

export default Games;
