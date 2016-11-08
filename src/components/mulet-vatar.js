import React, { Component } from 'react';

class MuletVatar extends Component {

    render() {
        console.log(this.props.bgimg);
        return (
            <div style={{
                width:80,
                height:80,
                background: 'transparent url(./muletvatars/' + this.props.bgimg + ') no-repeat center center',
                backgroundSize: 'cover',
                //float: 'left',
                borderRadius: '50px',
                margin: '5px 10px 5px 0',
                float:'left'
            }}>

            </div>
        );
    }
}

export default MuletVatar;