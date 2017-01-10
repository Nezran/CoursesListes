
/**
 * Created by micka on 27/12/2016.
 */
var React = require('react');
var Search = require('./Search');
var $ = require('jquery');
var Paging = require('./Paging');


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
            productsPerPage: 20
        }
    },
    componentDidMount: function() {
        this.loadData(this.state.search,1,this.state.productsPerPage);
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
        this.loadData(search,1,this.state.productsPerPage);
    },
    handlePagingSubmit(page){
        console.log("tu recoi ? "+page);
        this.loadData(this.state.search, page, this.state.productsPerPage);
    },
    loadData(search, page, productsPerPage){
        return $.getJSON(
            'https://ssl-api.openfoodfacts.org/cgi/search.pl?search_terms='
            + search +
            '&search_simple=1&action=process&json=1&page='
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
    renderItems(){
        return this.state.products.map((item,i) =>{
            return (
                <span className="items">
                    <p key={'produit-' + i}>{item.product_name_fr ? item.product_name_fr : 'Produit sans nom'}</p>
                    <img src={item.image_front_small_url} alt="image_product"/>
                </span>
            )
        });
    },
    render: function(){
        return (
          <div>
              {console.log("produit"+this.state.products, "search"+ this.state.search, "Page " + this.state.pages)}
              <h1>Courses Listes</h1>
              {/*<GetProducts search={this.state.search} onLoad={this.handleLoad}/>*/}
              <Search onSubmit={this.handleSearchSubmit} />
              <Paging page={this.state.pages} total={this.state.total} productsPerPage={this.state.productsPerPage} onSubmit={this.handlePagingSubmit} />
              <div>{this.renderItems()}</div>
          </div>
      );
    }
});

module.exports = Engine;