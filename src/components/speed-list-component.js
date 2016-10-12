// import _ from 'lodash';
import React from 'react';
import SpeedItem from './speed-item';
import { speedsRef } from '../firebase-ref';


class SpeedList extends React.Component {

    constructor(){
        super();
        this.state = { speeds: [], speedsLoading: true}
    }

    componentDidMount(){
        speedsRef.on('value', snap => {
            const speeds = [];
            snap.forEach(shot => {
                speeds.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ speeds, speedsLoading: false });
        })
    }

    renderSpeeds(){
        const { speeds } = this.state;
        return speeds.map((speed) => <SpeedItem key={speed.key} speed={speed} />);
    }

    render() {
        const { speeds, speedsLoading } = this.state;

        let speedList;
        if (speedsLoading) {
            speedList = (<div className="TaskList-empty">Loading...</div>);
        } else if (speeds.length) {
            speedList = (<ul>{this.renderSpeeds()}</ul>);
        } else {
            speedList = (<div className="TaskList-empty">No Speeds</div>);
        }

        return (
            <div className="TaskList">
                {speedList}
            </div>
        );
    }

}

export default SpeedList;