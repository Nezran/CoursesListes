
/**
 * Created by micka on 27/12/2016.
 */
var React = require('react');
var Search = require('./Search');
var $ = require('jquery');
var Paging = require('./Paging');
var RenderProducts = require('./RenderProducts');
var Country = require('./Country');
// import {CourseList} from './CourseList';
require('./App.css');
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

// import CourseList from'./CourseList';
let CourseList = require('./CourseList').CourseList;
import AppBar from 'material-ui/AppBar';

var Loader = require('react-loaders').Loader;


var Engine = React.createClass({
    propTypes:{
      page : React.PropTypes.number,
    },
    getInitialState: function(){
        return {
            products: [],
            total: 0,
            search: '',
            pages: 1,
            productsPerPage: 20,
            storeChoose: '*',
            stores: [],
            shopProducts: [],
            country: 'france',
            value: "1",
            loading: true,
        }
    },
    componentDidMount: function() {
        this.testSwisscom();
        this.loadWunderlist();
        this.loadData(this.state.search,1,this.state.productsPerPage,this.state.storeChoose);
        // this.loadStore();
    },
    testSwisscom: function(){

        // $.post( "http://mickael-lacombe.com/smsapi/api.php", { num: "798261595", text: "https://ssl-api.openfoodfacts.org/product/5449000000996/coca-cola" })
        //     .done(function( data ) {
        //         console.log( "Data Loaded: " + data );
        //     });
        // var data = {
        //     num: "798261595",
        //     text: "coucou from react"
        // };
        // $.ajax({
        //     type: "POST",
        //     url: "http://mickael-lacombe.com/smsapi/api.php",
        //     data: JSON.stringify(data),
        //     success: function(data){
        //         console.log(data);
        //     },
        //     error: function(resultat, statut, erreur){
        //         console.log(resultat, statut, erreur);
        //     }
        // });
        // var data = {outboundSMSMessageRequest: {
        //     address: ["tel:798261595"],
        //     senderAddress: "tel:798261595",
        //     senderName: "mick",
        //     outboundSMSTextMessage: {
        //         message: "hello"
        //     }
        // }};
        // fetch('https://api.swisscom.com/v1/messaging/sms/outbound/tel%3A%2B41798261595/requests', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // $.ajaxSetup({
        //     headers : {
        //         'client_id': 'KmSSuzyQsjtLgwvjilQSfZfbOQ15myMA',
        //         'Content-Type': 'application/json; charset=utf-8'
        //     }
        // });
        // var data = {outboundSMSMessageRequest: {
        //         address: ["tel:798261595"],
        //         senderAddress: "tel:798261595",
        //         senderName: "mick",
        //         outboundSMSTextMessage: {
        //         message: "hello"
        //     }
        // }};
        // $.ajax({
        //     type: "POST",
        //     url: "https://api.swisscom.com/v1/messaging/sms/outbound/tel%3A%2B41798261595/requests",
        //     data: JSON.stringify(data),
        //     dataType: 'jsonp',
        //     success: function(data){
        //         console.log(data);
        //     },
        //     error: function(resultat, statut, erreur){
        //         console.log(resultat, statut, erreur);
        //     }
        // });

        // $.ajaxSetup({
        //     headers : {
        //         'client_id': 'KmSSuzyQsjtLgwvjilQSfZfbOQ15myMA',
        //     }
        // });
        // $.getJSON('https://api.swisscom.com/v1/messaging/sms/outbound/tel%3A%2B41798261595/requests', function(data) { alert("Success"); console.log("getWunderlist",data); });
    },
    handleChange(string) {
        this.setState({search: string, pages:1});
    },
    // handleLoad(data){
    //     this.setState({products: data.products, total: data.count});
    // },
    // handlePages(page){
    //     this.setState({pages:page});
    // },
    handleSearchSubmit(search){
        this.setState({pages: 1});
        this.loadData(search,1,this.state.productsPerPage,this.state.storeChoose);
    },
    handlePagingSubmit(page){
        // console.log("tu recoi ? "+page);
        this.setState({pages: page});
        this.loadData(this.state.search, page, this.state.productsPerPage,this.state.storeChoose);
    },
    // handleStoreChange(string){
    //     console.log("magasing", string);
    //     var store = string.target.value;
    //     this.setState({pages: 1});
    //     // this.setState({storeChoose: string.target.value});
    //     this.setState({storeChoose: store}, function(){
    //         console.log("CALLBACK ?",this.state.storeChoose === store); // true
    //         if(this.state.storeChoose === store){
    //             this.loadData(this.state.search, this.state.pages, this.state.productsPerPage, this.state.storeChoose);
    //         }
    //     }.bind(this));
    // },
    handleStoreChange: function handleChange(event, index, value) {
        console.log(value);
        console.log("magasing", value);
        var store = value;
        this.setState({pages: 1});
        // this.setState({storeChoose: string.target.value});
        this.setState({storeChoose: store}, function(){
            console.log("CALLBACK ?",this.state.storeChoose === store); // true
            if(this.state.storeChoose === store){
                this.loadData(this.state.search, this.state.pages, this.state.productsPerPage, this.state.storeChoose);
            }
        }.bind(this));
    },
    handleCountryChange(country){
        this.setState({country: country}, function(){
            if(this.state.country === country) {
                this.loadData(this.state.search, this.state.pages, this.state.productsPerPage, this.state.storeChoose);
            }
        }.bind(this));
    },
    // handleStoreSubmit(event){
    //     event.preventDefault();
    //     this.loadData(this.state.search, this.state.pages, this.state.productsPerPage, this.state.storeChoose);
    // },
    handleReset(event){
        event.preventDefault();
        // this.replaceState(this.getInitialState());
        this.setState(this.getInitialState());
    },
    handleClickProduct(product){
        var shopProducts = this.state.shopProducts;
        var shopProduct =  {
            name: product.product_name_fr,
            code: product.code,
            image: product.image_url,
            image_thumb: product.image_front_thumb_url,
        };
        var code = product.code;
        shopProducts[code] = shopProduct;
        this.setState({shopProducts});
    },
    loadData(search, page, productsPerPage, storeChoose){
        this.setState({loading: true}, function(){
            return $.getJSON(
                'https://ssl-api.openfoodfacts.org/cgi/search.pl?' +
                'action=process&search_terms='
                + search +
                '&tagtype_0=countries&tag_contains_0=contains&tag_0='+ this.state.country +
                '&tagtype_1=stores&tag_contains_1=contains&tag_1='+storeChoose+
                '&search_simple=1&json=1&page='
                + page +
                '&page_size='
                + productsPerPage
                + '')
                .then((data) => {
                    // this.handleLoad(data);
                    this.setState({products: data.products, total: data.count, pages: data.page, search: search});
                    console.log("callback de l'api", data);
                    // this.setState({products: data.products, total: data.count});
                    this.setState({loading: false});
                });
        });

    },
    loadStore(){
        return $.getJSON(
            'https://world.openfoodfacts.org/stores.json')
            .then((data) =>{
            this.setState({stores: data});
                console.log("callback des stores ", data);
            }
        );
    },
    loadWunderlist(){

        // $.ajaxSetup({
        //     headers : {
        //         'X-Access-Token': '0152bda4413acc6044f24e11736657839d6318fc5155bf917d64ecd1ed6c',
        //         'X-Client-ID': '5764457c678b01bd15f5',
        //     }
        // });
        // $.getJSON('https://a.wunderlist.com/api/v1/lists/251762132', function(data) { alert("Success"); console.log("getWunderlist",data); });

    },
    handleTouchShop(event){
        console.log(event);
    },
    renderStores(){
           return (
               <span>

                    <SelectField
                        floatingLabelText="Choisir le magasin"
                        value={this.state.storeChoose} onChange={this.handleStoreChange}
                        fullWidth="true"
                    >
                        <MenuItem primaryText="Tous" value="*" />
                        <MenuItem primaryText="Migros" value="migros" />
                        <MenuItem primaryText="Denner" value="denner" />
                        <MenuItem primaryText="Coop" value="coop" />
                        <MenuItem primaryText="Intermarché" value="intermarché" />
                        <MenuItem primaryText="Cora" value="cora" />

                </SelectField>
               </span>
           )
    },
    handleRequestClose() {
        this.setState({
            open: false,
        });
    },
    render: function(){

        var styles = {
            container: {
                display: 'none'
            },
        };

        return (
          <div>
              <AppBar
                  title="Courses Listes"
                  iconElementRight={<ActionShoppingCart/>}
                  onRightIconButtonTouchTap={this.handleTouchShop}
              />

              {/*{console.log("search"+ this.state.search, "Page " + this.state.pages)}*/}
              <div>
              <div className="header">
                  <h1>Courses Listes</h1>
                  <CourseList product={this.state.shopProducts} />
                  <i>Périmètre de la recherche : {this.state.country}</i>
                  {/*<GetProducts search={this.state.search} onLoad={this.handleLoad}/>*/}
                  <Search onSubmit={this.handleSearchSubmit} />
                  <div>{this.renderStores()}</div>
                  <Country onChange={this.handleCountryChange} country={this.state.country}/>
                  <RaisedButton
                      label="Réinitialiser"
                      labelPosition="before"
                      primary={true}
                      onClick={this.handleReset}
                  />
                  <Paging page={this.state.pages} total={this.state.total} productsPerPage={this.state.productsPerPage} onSubmit={this.handlePagingSubmit} />
              </div>
                  </div>

                  <div className="section group">
                  {
                      this.state.products.map(function (item){
                          return <RenderProducts onClick={this.handleClickProduct} products={item}/>
                      }.bind(this))
                  }
                  </div>

          </div>
      );
    }
});

module.exports = Engine;