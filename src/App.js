import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            total: "",
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.GetProducts();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.GetProducts();
    }

    handleChange(event) {
        this.setState({search: event.target.value});
    }

    GetProducts() {
        //ReactDOM.render(console.log(search), document.getElementById('debug'));

        return $.getJSON('https://ssl-api.openfoodfacts.org/cgi/search.pl?search_terms=' + this.state.search + '&search_simple=1&action=process&json=1&page=20&page_size=20')
            .then((data) => {
                console.log("callback de l'api", data);
                this.setState({products: data.products, total: data.count});
            });
    }

    renderItems(){
        return this.state.products.map((item,i) =>{
            return (
                <span className="items">
                    <p key={'produit-' + i}>{item.product_name_fr ? item.product_name_fr : 'Produit sans nom'}</p>
                    <img src={item.image_front_small_url}/>
                </span>
            )
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>Power of react</h1>

                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <p>Chercher un produit par son nom</p>
                            <input minlength="3" type="text" value={this.state.value} required onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div>
                    <cite>Total : {this.state.total} produits</cite>
                    <hr />
                </div>
                <div>{this.renderItems()}</div>
            </div>
        );
    }
}

export default App;
