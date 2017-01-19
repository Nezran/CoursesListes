/**
 * Created by micka on 27/12/2016.
 */

var React = require('react');
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

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
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500,
            },
        });
        return (
            <MuiThemeProvider muiTheme={muiTheme}>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Chercher un produit par son nom</p>
                        {/*onChange={this.handleChange}*/}
                        {/*<input name="search" type="text"  ref="search"/>*/}
                    </label>
                    <TextField name="search" type="text"  ref="search"
                        hintText="Hint Text"
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </MuiThemeProvider>

        );
    }
});

module.exports = Search;