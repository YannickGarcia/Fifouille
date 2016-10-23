import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { rootRef, usersRef, muletsRef } from '../firebase-ref';
import MuletVatar from './mulet-vatar';

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

        return mulets.map(mulet => {
            return (mulet.available
                ? <MenuItem
                    value={mulet.key}
                    disabled={false}
                    primaryText={mulet.name}
                    children={<MuletVatar bgimg={mulet.url}/>}
                />
                :
                <MenuItem
                    value={mulet.key}
                    disabled={true}
                    primaryText={mulet.name}
                    children={<MuletVatar bgimg={mulet.url}/>}
                />
            );
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
    handleChangeLevel = (event, index, valueLevel, evt) => this.setState({valueLevel, level: valueLevel});

    //onChange={(evt) => this.setState({ username: evt.target.value })}

// ajouter le USER et mettre à jour l'avatar
    handleSubmit(event) {
        event.preventDefault();

        // on récupère les données
        const newUser = {
            username: this.state.username.trim(),
            gamesLost: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            level: this.state.valueLevel,
            muletKey: this.state.valueMulet,
            points:1000,
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
        }
    }

    render(){
        const style = {
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: '100'
        };

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
                label="Submit"
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

                        <TextField
                            hintText=""
                            floatingLabelText="Player Name"
                            onChange={(evt) => this.setState({ username: evt.target.value })}
                            value={this.state.username}
                        /><br /><br />
                        {muletList}
                        <br /><br />

                        <SelectField value={this.state.valueLevel} onChange={this.handleChangeLevel}
                                     floatingLabelText="What's your level">
                            <MenuItem value={"Beginner"} primaryText="Beginner" />
                            <MenuItem value={"Intermediate"} primaryText="Intermediate" />
                            <MenuItem value={"Expert"} primaryText="Expert" />
                        </SelectField>
                    </form>
                </Dialog>
                <FloatingActionButton style={style} onTouchTap={this.handleTouchTap}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default AddUser;
