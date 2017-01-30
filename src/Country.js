/**
 * Created by Mickael.LACOMBE on 17.01.2017.
 */

var React = require('react');
var $ = require('jquery');
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var Country = React.createClass({

    getInitialState: function(){
        return {
            countries: [],
        }
    },
    componentDidMount: function(){
        this.loadCountry();
    },
    // handleChange(country){
    //     console.log(country);
    //     this.props.onChange(country.target.value);
    // },
    loadCountry(){
        return $.getJSON("https://world.openfoodfacts.org/countries.json").then((data) =>{
            this.setState({countries: data.tags});
            console.log("callback des countries ", data);
        });
    },
    handleChange: function handleChange(event, index, value) {
        console.log(value);
        this.props.onChange(value);
        // return this.setState({ value: value });
    },
    render: function(){
        const items = [];
        this.state.countries.map(function(item,index) {
                if (item.products > 400) {
                    items.push(<MenuItem key={index} value={item.name} primaryText={ item.name + " (" + item.products + ") " } />);
                }
            }
        )
        return (
            <div>
                {/*{console.log(this.props.country)}*/}
                <SelectField
                    floatingLabelText="Choisir le pays"
                    onChange={this.handleChange}
                    value={this.props.country}
                    fullWidth="true"
                >
                    {items }
                </SelectField>
                {/*{console.log(this.props.country)}*/}



            </div>
        );
    }
});

module.exports = Country;

/*
* <select onChange={this.handleChange} value={this.props.country}>

 {
 this.state.countries.map(function(item,index) {
 if (item.products > 400) {
 return (
 <option key={index} value={item.name} >
 { item.name }
 ( {item.products} )
 </option>
 )
 }
 }
 )
 }
 </select>
* */