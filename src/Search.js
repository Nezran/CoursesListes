/**
 * Created by micka on 27/12/2016.
 */

var React = require('react');

var Search = React.createClass({
    // handleChange: function(e){
    //     var name = e.target.value;
    //     this.props.onChange(name);
    // },
    handleSubmit: function(e){
        e.preventDefault();
        // console.log(document.getElementsByName('search')[0].value);
        this.props.onSubmit(document.getElementsByName('search')[0].value);
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <p>Chercher un produit par son nom</p>
                    {/*onChange={this.handleChange}*/}
                    <input name="search" minLength="3" type="text" required ref="search"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
});

module.exports = Search;