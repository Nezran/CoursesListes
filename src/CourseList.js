/**
 * Created by Mickael.LACOMBE on 23.01.2017.
 */

var React = require('react');
import Dialog from 'material-ui/Dialog';
// var FlatButton = require('material-ui/FlatButton');
import RaisedButton from 'material-ui/RaisedButton';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import SMSApi from 'swisscom-sms-api';


var CourseList = React.createClass({
    getInitialState: function(){
        return {
            open: false,
            products: [],
        }
    },
    componentDidMount: function(){
        console.log(SMSApi);
        var config = {
            smsApi: {
                sender: '+41798261595',
                clientId: 'ZJiQbz1DKfGYeAPr'
            }
        };

        var sms = {
            recipient: '+41798261595',
            messageText: 'hello world'
        };

        var gateway = new SMSApi(config.smsApi);

        gateway.on('sent', function() {
            return console.log('all messages sent');
        });

        gateway.on('error', function(error) {
            return console.log('an error occurred: ', error);
        });

        gateway.on('deliveryStatus', function(status) {
            return console.log('deliveryStatus: ', status);
        });

        gateway.send(sms.recipient, sms.messageText);
    },
    handleOpen: function(){
    this.setState({open: true});
    },

    handleClose: function(){
        this.setState({open: false});
    },
    render: function(){
        const actions=[
            <RaisedButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                icon={<ArrowRight />}

            />,
            <RaisedButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
                icon={<ArrowRight />}

            />,
        ];
        const Products=[

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
              >
                  {chelou}
              </Dialog>
          </div>
        );
    }
});

module.exports.CourseList = CourseList;

