import React from 'react';
import GameItem from './game-item-component';
import { gamesRef } from '../firebase-ref';

class GameList extends React.Component {

    constructor(){
        super();
        this.state = { games: [], gamesLoading: true}
    }

    componentDidMount(){
        gamesRef.limitToLast(10).on('value', snap => {
            const games = [];
            snap.forEach(shot => {
                games.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ games, gamesLoading: false });
        })
    }

    renderGames(){
        const { games } = this.state;
        return games.map((game) => <GameItem key={game.key} game={game} />).reverse();
    }

    render() {
        const { games, gamesLoading } = this.state;

        let gameList;
        if (gamesLoading) {
            gameList = (<div className="gameList-empty">Loading...</div>);
        } else if (games.length) {
            gameList = (<ul>{this.renderGames()}</ul>);
        } else {
            gameList = (<div className="gameList-empty">No Games</div>);
        }

        return (
            <div className="gameList">
                {gameList}
            </div>
        );
    }

}

export default GameList;