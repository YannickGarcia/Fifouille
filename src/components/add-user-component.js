import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//import ContentAdd from 'material-ui/svg-icons/content/add';
import { rootRef, usersRef, muletsRef } from '../firebase-ref';
import MuletVatar from './mulet-vatar';

const menuItemStyle = {
    overflow:'auto',
    padding: '0 12px'
}

class AddUser extends Component {


    constructor() {
        super();

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = {
            open: false,
            submitDisabled: false,
            username:'',
            mulets: [],
            userMuletName:'',
            valueMulet: "-KUgtb6GaJBhj_8x1eJh",
            valueLevel: "Beginner"
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // Aller chercher tous les avatars
    componentDidMount(){
        muletsRef.on('value', snap => {
            const mulets = [];
            snap.forEach(shot => {
                mulets.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ mulets });
        })
    }

    renderMulets(){

        const { mulets } = this.state;
        // console.log(mulets[].available);

        return mulets.map((mulet, index) => {
                if(mulet.available) {
                    return (
                        <MenuItem
                            value={mulet.key}
                            innerDivStyle={menuItemStyle}
                            key={index}
                            disabled={false}
                            primaryText={mulet.name}
                            children={<MuletVatar bgimg={mulet.urlLocal}/>}
                        />
                    )
                }
                else{
                    // Aller chercher le nom du User selon l'avatar en cours
                    const userKey = mulet.userKey;
                    rootRef.child('users/' + userKey).once('value', snap => {
                        //this.setState({userMuletName:snap.val().url});
                    });
                    return(
                    <MenuItem
                        value={mulet.key}
                        key={index}
                        disabled={true}
                        innerDivStyle={menuItemStyle}
                        primaryText={mulet.name}
                        children={<MuletVatar bgimg={mulet.urlLocal}/>}
                    />
                    )
                }

        });
        //return featuredMulets;

       /* MAP plus facile, sans test:

       return mulets.map((mulet) =>
         <MenuItem
             value={mulet.key}
             disabled={mulet.available}
             primaryText={mulet.name}
             children={<MuletVatar bgimg={mulet.url}/>}
         />
         );*/

    };




    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    handleChangeMulet = (event, index, valueMulet, evt) => this.setState({valueMulet, picture: valueMulet});
   // handleChangeLevel = (event, index, valueLevel, evt) => this.setState({valueLevel, level: valueLevel});

    //onChange={(evt) => this.setState({ username: evt.target.value })}

// ajouter le USER et mettre à jour l'avatar
    handleSubmit(event) {
        event.preventDefault();

        // on récupère les données
        const newUser = {
            username: this.state.username.trim(),
            gamesLost: 0,
            gamesDraw: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            goalsFor: 0,
            goalsAgainst:0,
            muletKey: this.state.valueMulet,
            points:0,
            groupKey: '-KUh54HpGOGP850b2Tpu'
        };



        if (newUser.username.length) {

            // ajout normal du user sans récup sa Key
            // usersRef.push(newUser);

            // PUSH ET récupération de la key du nouveau user
            const newUserKey = usersRef.push(newUser).key;

            // récup de la Key du mulet sélectionné
            const muletKey = newUser.muletKey;

            // on set les nouvelles valeur du mulet
            const muletNewData = {
                available: false,
                userKey: newUserKey
            };

            // on mets à jour le mulet sélectionné avec les nouvelles valeurs
            rootRef.child('muletvatars/' + muletKey).update(muletNewData);

            // on reset les champs
            this.setState({ username: '', submitDisabled: false, valueMulet: "-KUgtb6GaJBhj_8x1eJh", });

            this.handleRequestClose();


            setTimeout(function(){ location.reload(); }, 500);

        }
    }

    render(){
        /*const style = {
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: '100'
        };*/

        /*const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];*/

        const { mulets } = this.state;

        let muletList;
        if (mulets.length) {
            muletList = (
                <SelectField
                value={this.state.valueMulet}
                floatingLabelText="Choose Your Mulet"
                onChange={this.handleChangeMulet}>
                    {this.renderMulets()}
                </SelectField>
            );
        } else {
            muletList = (<div className="muletList-empty">No Muletvatar available</div>);
        }


        const standardActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />,
            <FlatButton
                label="Add"
                primary={true}
                disabled={this.state.submitDisabled}
                onTouchTap={this.handleSubmit}
            />,
        ];

        return(
            <div>
                <Dialog
                    open={this.state.open}
                    title="Add Player"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >


                    <form onSubmit={this.handleSubmit} className="TaskInput-form">
                        <h4>Don't add fake Users</h4>
                        <TextField
                            hintText=""
                            floatingLabelText="Player Name"
                            onChange={(evt) => this.setState({ username: evt.target.value })}
                            value={this.state.username}
                        /><br /><br />
                        {muletList}
                    </form>
                </Dialog>
                <FlatButton primary={true} label="Add Player" onTouchTap={this.handleTouchTap} />
            </div>
        );
    }
}

export default AddUser;
