import React from 'react';
//import { speedsRef } from '../firebase-ref';

class SpeedItem extends React.Component {


    render() {

        const { speed } = this.props;

        return (
            <div>
                <h1>{speed.vitesse}</h1>
            </div>
        );
    }
}

export default SpeedItem;