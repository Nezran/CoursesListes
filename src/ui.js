import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

const App = () => (
    <MuiThemeProvider>
        <MyAwesomeReactComponent />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
/**
 * Created by micka on 19/01/2017.
 */
