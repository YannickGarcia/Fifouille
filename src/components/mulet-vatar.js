import React, { Component } from 'react';

class MuletVatar extends Component {

    render() {
        console.log(this.props.bgimg);
        return (
            <div style={{
                width:80,
                height:80,
                background: 'transparent url(' + this.props.bgimg + ') no-repeat center center',
                backgroundSize: 'cover',
                //float: 'left',
                borderRadius: '50px',
                margin: '5px 10px 0 0'
            }}>

            </div>
        );
    }
}

export default MuletVatar;