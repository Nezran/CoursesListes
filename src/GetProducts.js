/**
 * Created by micka on 27/12/2016.
 */
var React = require('react');
var $ = require('jquery');

var GetProducts = React.createClass({

    updateData: function(data){
        this.props.onLoad(data);
    },
    componentDidMount: function() {
        console.log("sss");
        //ReactDOM.render(console.log(search), document.getElementById('debug'));
        return $.getJSON('https://ssl-api.openfoodfacts.org/cgi/search.pl?search_terms=' + this.props.search + '&search_simple=1&action=process&json=1')
            .then((data) => {
                this.updateData(data);
                console.log("callback de l'api", data);
                // this.setState({products: data.products, total: data.count});
            });
    },
    render: function () {
        return <div></div>;
    }
});

module.exports = GetProducts;