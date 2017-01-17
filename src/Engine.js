
/**
 * Created by micka on 27/12/2016.
 */
var React = require('react');
var Search = require('./Search');
var $ = require('jquery');
var Paging = require('./Paging');
var RenderProducts = require('./RenderProducts');
var Country = require('./Country');
require('./App.css');
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
            country: 'switzerland',
        }
    },
    componentDidMount: function() {
        this.loadData(this.state.search,1,this.state.productsPerPage,this.state.storeChoose);
        // this.loadStore();
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
        console.log("tu recoi ? "+page);
        this.setState({pages: page});
        this.loadData(this.state.search, page, this.state.productsPerPage,this.state.storeChoose);
    },
    handleStoreChange(string){
        var store = string.target.value;
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
    loadData(search, page, productsPerPage, storeChoose){
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
    renderStores(){
           return (
               <span>
                   <form>
                        <select value={this.state.storeChoose} onChange={this.handleStoreChange}>
                            <option value="*">Tous</option>
                            <option value="migros">Migros</option>
                            <option value="denner">Denner</option>
                            <option value="coop">Coop</option>
                            <option value="intermarché">Intermarché</option>
                            <option value="cora">Cora</option>
                        </select>
                        {/*<input type="submit" value="Submit"/>*/}
                    </form>
               </span>
           )
    },
    render: function(){
        return (
          <div>
              {console.log("search"+ this.state.search, "Page " + this.state.pages)}
              <div className="header">
                  <h1>Courses Listes</h1>
                  <i>Périmètre de la recherche : {this.state.country}</i>
                  {/*<GetProducts search={this.state.search} onLoad={this.handleLoad}/>*/}
                  <Search onSubmit={this.handleSearchSubmit} />
                  <div>{this.renderStores()}</div>
                  <Country onChange={this.handleCountryChange} country={this.state.country}/>
                  <button type="button" onClick={this.handleReset}>Réinitialiser</button>
                  <Paging page={this.state.pages} total={this.state.total} productsPerPage={this.state.productsPerPage} onSubmit={this.handlePagingSubmit} />
              </div>

              <div className="section group">
              {
                  this.state.products.map(function(item){
                        return <RenderProducts products={item}/>;
                      }
                  )
              }
              </div>

          </div>
      );
    }
});

module.exports = Engine;