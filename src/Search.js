/**
 * Created by micka on 27/12/2016.
 */

var React = require('react');

var Search = React.createClass({
    handleChange: function(e){
        var name = e.target.value;
        this.props.onChange(name);
    },
    handleSubmit: function(e){
        e.preventDefault();
        console.log("wsw");
        this.props.onSubmit();
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <p>Chercher un produit par son nom</p>
                    <input name="search" minLength="3" type="text" required onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
});

module.exports = Search;