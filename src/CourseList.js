/**
 * Created by Mickael.LACOMBE on 23.01.2017.
 */

var React = require('react');
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';

const APISecret = '';
const APICliendID = '';

var CourseList = React.createClass({
    getInitialState: function(){
        return {
            open: false,
            products: [],
            openSms: false,
            confirmSMS: false,
            phoneNumber:'',
            toggled: true,
            confirmWunderlist: false,
            openWunderlist: false,
            email:'',
        }
    },
    loadWunderlist(){

            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Access-Token': APISecret,
                    'X-Client-ID': APICliendID,
                },
                'type': 'POST',
                'url':  "https://a.wunderlist.com/api/v1/lists",
                'data': JSON.stringify({ title: "Course Liste" }),
                'dataType': 'json',
                'success': (data) => {
                    console.log(data.id);
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-Access-Token': APISecret,
                            'X-Client-ID': APICliendID,
                        },
                        'type': 'POST',
                        'url':  "https://a.wunderlist.com/api/v1/memberships",
                        'data': JSON.stringify({ list_id: data.id, email: this.state.email }),
                        'dataType': 'json',
                        'success': (data) => {
                            console.log(data);

                            this.props.product.map((key, index) => {

                                // prepare = prepare + key.name + " ; ";
                                $.ajax({
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'X-Access-Token': APISecret,
                                        'X-Client-ID': APICliendID,
                                    },
                                    'type': 'POST',
                                    'url':  "https://a.wunderlist.com/api/v1/tasks",
                                    'data': JSON.stringify({ list_id: data.list_id, title: key.name }),
                                    'dataType': 'json',
                                    'success': (data) => {
                                        console.log(data);
                                        $.ajax({
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'X-Access-Token': APISecret,
                                                'X-Client-ID': APICliendID,
                                            },
                                            'type': 'POST',
                                            'url':  "https://a.wunderlist.com/api/v1/notes",
                                            'data': JSON.stringify({ task_id: data.id, content: key.image }),
                                            'dataType': 'json',
                                            'success': (data) =>{
                                                console.log(data);
                                                this.setState({confirmWunderlist: true});

                                            }
                                        });

                                    }
                                });



                            });


                        }
                    });

                }
            });

    },
    ApiSMSSwisscom: function(text){
        $.post( "http://mickael-lacombe.com/smsapi/api.php", { num: this.state.phoneNumber, text: text })
            .done(( data)  => {
                console.log( "Data Loaded: " + JSON.stringify(data) );
                this.setState({confirmSMS:true, openSms:false});
        })
            .fail(function(data){
            console.log(data);
        });
    },
    handleOpen: function(){
        this.setState({open: true});
    },
    handleChangePhone: function(email){
        var value = email.target.value;
        if(value.startsWith("0")){
            value = value.substring(1);
        }
        this.setState({
            phoneNumber: value,
        });
    },
    handleChangeEmail: function(email){
        var value = email.target.value;

        this.setState({
            email: value,
        });
    },
    handleSms: function(){
        this.setState({openSms: true});
        this.setState({open: false});

    },
    handleSendWunderlist: function(){
        this.loadWunderlist();
    },
    handleWunderlist: function(){
        // this.loadWunderlist();
        this.setState({openWunderlist:true, open:false});
    },
    handleOrderClose:  function () {
        this.setState({open: false});

    },
    handleAllClose: function () {
        this.setState({open: false, openSms: false, openWunderlist:false});
    },
    handleDeleteProduct: function(product){
        console.log(product);
    },
    handleSend: function () {
        console.log("email", this.state.phoneNumber);
        if(!this.state.toggled){
            var prepare = '';
            this.props.product.map((key, index) => {
                prepare = prepare + key.name + " ; ";
            });
            this.ApiSMSSwisscom(prepare);
        }else{
            var prepare = '';
            this.props.product.map((key, index) => {
                prepare = prepare + key.name + " - " + key.image + " ; ";
            });
            this.ApiSMSSwisscom(prepare);
        }

        console.log(prepare);
        this.loadWunderlist();

    },
    handleToggle: function(){
        this.setState({toggled: !this.state.toggled});
        console.log(this.state.toggled)
    },
    handleCloseModal: function(){
        this.setState({confirmSMS:false, confirmWunderlist: false,openWunderlist: false});
    },
    handleClose: function(){
        this.setState({open:false, openSms: false,openWunderlist:false});
    },

    render: function(){
        const actions=[
            <FlatButton
                label="Fermer la fenêtre"
                primary={true}
                onTouchTap={this.handleOrderClose}
                icon={<NavigationClose />}

            />,
            <FlatButton
                label="Envoyer la liste par sms"
                primary={true}
                onTouchTap={this.handleSms}
                icon={<ArrowRight />}

            />,
            <FlatButton
                label="Créer une todolist sur wunderlist"
                primary={true}
                onTouchTap={this.handleWunderlist}
                icon={<ArrowRight />}
            />,
        ];
        const actionsSms=[
            <FlatButton
                label="Fermer la fenêtre"
                primary={true}
                onTouchTap={this.handleAllClose}
                icon={<NavigationClose />}

            />,
            <FlatButton
                label="Envoyer par sms"
                primary={true}
                onTouchTap={this.handleSend}
                disabled={typeof this.props.product[0] !== 'undefined' ? false : true}
                icon={<ArrowRight />}

            />,
        ];

        const actionsWunderlist=[
            <FlatButton
                label="Fermer la fenêtre"
                primary={true}
                onTouchTap={this.handleAllClose}
                icon={<NavigationClose />}

            />,
            <FlatButton
                label="Créer la todolist"
                primary={true}
                onTouchTap={this.handleSendWunderlist}
                disabled={typeof this.props.product[0] !== 'undefined' ? false : true}
                icon={<ArrowRight />}

            />,
        ];

        var styles = {
            container: {
                width: 'calc(25% - 10px)',
                padding: '5px',
                float: "left",
                textAlign: 'center',

            },
            text:{
                overflow: 'hidden',
                 height: '41px',
            },
            image:{
              maxWidth: 30, maxHeight: 53,
            },
            toggle: {
                maxWidth: 250,
            },
        };

        // var chelou = this.props.product.map(function(key, index){
        //     return (
        //         <div style={styles.container}>
        //             <a onClick={this.handleDeleteProduct(key)}>x</a>
        //             {/*<FlatButton*/}
        //                 {/*label="Supp"*/}
        //                 {/*primary={false}*/}
        //                 {/*onTouchTap={this.handleDeleteProduct(key)}*/}
        //                 {/*icon={<NavigationClose />}*/}
        //
        //             {/*/>*/}
        //             <img style={styles.image} src={key.image_thumb} alt="image product" />
        //              <p style={styles.text}>{key.name}</p>
        //          </div>
        //     );
        // }.bind(this));

        // var items =  this.props.product.map(function (item){
        //     return (
        //         <div style={styles.container}>
        //             {console.log(item)}
        //             <img style={styles.image} src={item.image_thumb} alt="image product" />
        //             <p style={styles.text}>{item.name}</p>
        //         </div>
        //     );
        // });
        return (
          <div>
               <RaisedButton
                  label="Voir mon panier"
                  primary={true}
                  onTouchTap={this.handleOpen}
                  icon={<ActionShoppingCart />}

              />
              <Dialog
                  title="Votre liste de course"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={typeof this.props.product[0] !== 'undefined' ? true : false}
              >
                  {
                      typeof this.props.product[0] !== 'undefined' ?
                          this.props.product.map(function(key, index){
                          return (
                                  <div style={styles.container} key={index}>
                                      <img style={styles.image} src={key.image_thumb} alt="image product" />
                                      <p style={styles.text}>{key.name}</p>
                                  </div>
                              );
                          }.bind(this))
                      :
                        "Aucun produit sélectionné"
                  }
              </Dialog>

              <Dialog
                  title="Indiquer votre numéro de téléphone"
                  actions={actionsSms}
                  modal={false}
                  open={this.state.openSms}
                  onRequestClose={this.handleClose}
              >
                  <TextField
                      id="text-field-controlled"
                      hintText="Indiquer votre numéro de téléphone"
                      onChange={this.handleChangePhone}
                      type="number"

                  />
                  <Toggle
                      label="Insérer le lien des images dans le sms"
                      defaultToggled={true}
                      style={styles.toggle}
                      onToggle={this.handleToggle}
                      toggled={this.state.toggled}

                  />
              </Dialog>

              <Dialog
                  title="Indiquer votre adresse email lié à Wunderlist"
                  actions={actionsWunderlist}
                  modal={false}
                  open={this.state.openWunderlist}
                  onRequestClose={this.handleClose}
              >
                  <TextField
                      id="text-field-controlled"
                      hintText="Email lié à votre contre Wunderlist"
                      onChange={this.handleChangeEmail}
                  />

              </Dialog>
              <Snackbar open={this.state.confirmSMS} message="Le sms a été bien envoyé" autoHideDuration={4000} onRequestClose={this.handleCloseModal} />
              <Snackbar open={this.state.confirmWunderlist} message="Todolist bien créer" autoHideDuration={4000} onRequestClose={this.handleCloseModal} />

          </div>
        );
    }
});

module.exports = CourseList;

