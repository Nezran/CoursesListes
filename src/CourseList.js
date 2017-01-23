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
var $ = require('jquery');
import TextField from 'material-ui/TextField';

var CourseList = React.createClass({
    getInitialState: function(){
        return {
            open: false,
            products: [],
            openSms: false,
            phoneNumber:'',
        }
    },
    ApiSMSSwisscom: function(text){
        $.post( "http://mickael-lacombe.com/smsapi/api.php", { num: this.state.phoneNumber, text: text })
            .done(function( data ) {
                console.log( "Data Loaded: " + data );
        });
    },
    handleOpen: function(){
        this.setState({open: true});
    },
    handleChangeEmail: function(email){
        this.setState({
            phoneNumber: email.target.value,
        });
        console.log("email", this.state.phoneNumber);
    },
    handleSms: function(){
        this.setState({openSms: true});
        this.setState({open: false});

    },
    handleOrderClose:  function () {
        this.setState({open: false});

    },
    handleAllClose: function () {
        this.setState({open: false, openSms: false});
    },
    handleSend: function () {
        console.log("email", this.state.phoneNumber);
        var prepare = '';
         Object.keys(this.props.product).map((key, index) => {
             prepare = prepare + this.props.product[key].name + " ; ";
        });
        this.ApiSMSSwisscom(prepare);
        console.log(prepare);

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
                label="Envoyer par sms"
                primary={true}
                onTouchTap={this.handleSms}
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
                icon={<ArrowRight />}

            />,
        ];

        var styles = {
            container: {
                width: '100%',
                float: "left",

            },
            text:{
               float: "left",
            },
            image:{
              float: "left",
              maxWidth: 30,
            }
        };

        var chelou = Object.keys(this.props.product).map((key, index) => {
            return (
                <div style={styles.container}>
                    <img style={styles.image} src={this.props.product[key].image_thumb} alt="image product" />
                     <p style={styles.text}>{this.props.product[key].name}</p>
                 </div>
            );
        });

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
                  autoScrollBodyContent={true}
              >
                  {chelou}
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
                      onChange={this.handleChangeEmail}
                  />
              </Dialog>
          </div>
        );
    }
});

module.exports.CourseList = CourseList;

