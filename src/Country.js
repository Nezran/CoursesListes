/**
 * Created by Mickael.LACOMBE on 17.01.2017.
 */

var React = require('react');
var $ = require('jquery');

var Country = React.createClass({

    getInitialState: function(){
        return {
            countries: []
        }
    },
    componentDidMount: function(){
        this.loadCountry();
    },
    handleChange(country){
        this.props.onChange(country.target.value);
    },
    loadCountry(){
        return $.getJSON("https://world.openfoodfacts.org/countries.json").then((data) =>{
            this.setState({countries: data.tags});
            console.log("callback des countries ", data);
        });
    },
    render: function(){
        return (
            <div>
                {console.log(this.state.countries)}
                <select onChange={this.handleChange} value={this.props.country}>

                    {
                        this.state.countries.map(function(item,index) {
                                if (item.products > 400) {
                                    return (
                                        <option key={index} value={item.name}>
                                            { item.name }
                                            ( {item.products} )
                                        </option>
                                    )
                                }
                            }
                        )
                    }
                </select>
            </div>
        );
    }
});

module.exports = Country;