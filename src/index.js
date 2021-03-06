import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import Engine from './Engine';

/* Material */
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    green500, cyan700,
    brown500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

var Template = React.createClass({
    render: function(){
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: green500,
                primary2Color: cyan700,
                primary3Color: grey400,
                accent1Color: green500,
                accent2Color: grey100,
                accent3Color: grey500,
                textColor: darkBlack,
                alternateTextColor: white,
                canvasColor: white,
                borderColor: grey300,
                pickerHeaderColor: green500,
                shadowColor: fullBlack,

            },
        });
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Engine />
                </MuiThemeProvider>
            </div>
        );
    }
});


ReactDOM.render(<Template />, document.getElementById('debug'));
