import _ from 'lodash';
import React from 'react';
import GameItem from './game-item-component';

export default class SpeedList extends React.Component {


    renderItems() {
        const props = _.omit(this.props, 'games');

        return _.map(this.props.games, (game, index) => <GameItem key={index} {...game} {...props} />);
    }

    render() {

        console.log(this.props.games);
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}