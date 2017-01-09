
/**
 * Created by micka on 27/12/2016.
 */
var React = require('react');
var Search = require('./Search');
var $ = require('jquery');
var Paging = require('./Paging');


var Engine = React.createClass({
    getInitialState: function(){
        return {
            products: [],
            total: "",
            search: "",
            pages: 1,
            productsPage: 20
        }
    },
    componentDidMount: function() {
        this.loadData();
    },
    handleChange(string) {
        this.setState({search: string, pages:1});
    },
    handleLoad(data){
        this.setState({products: data.products, total: data.count});
    },
    handlePages(page){
        this.setState({pages:page});
    },
    loadData(){
        return $.getJSON(
            'https://ssl-api.openfoodfacts.org/cgi/search.pl?search_terms='
            + this.state.search +
            '&search_simple=1&action=process&json=1&page='
            + this.state.pages +
            '&page_size='
            + this.state.productsPage +
            '')
            .then((data) => {
                this.handleLoad(data);
                console.log("callback de l'api", data);
                // this.setState({products: data.products, total: data.count});
            });
    },
    renderItems(){
        return this.state.products.map((item,i) =>{
            return (
                <span className="items">
                    <p key={'produit-' + i}>{item.product_name_fr ? item.product_name_fr : 'Produit sans nom'}</p>
                    <img src={item.image_front_small_url} alt="s"/>
                </span>
            )
        });
    },
    render: function(){
        return (
          <div>
              {console.log("produit"+this.state.products, "search"+ this.state.search, "Page" + this.state.pages)}
              <h1>Courses Listes</h1>
              {/*<GetProducts search={this.state.search} onLoad={this.handleLoad}/>*/}
              <Search onChange={this.handleChange} onSubmit={this.loadData} />
              <Paging page={this.state.page} total={this.state.total} onClick={this.handlePages} productsPage={this.state.productsPage} onSubmit={this.loadData} />
              <div>{this.renderItems()}</div>
          </div>
      );
    }
});

module.exports = Engine;