Documentation pour React
------------------------------

- Mickaël Lacombe
- 2017
- Syntaxe ECMA 5 et ECMA 6
- React version ^15.4.1

Liens à retenir

- http://reactpatterns.com/#layout-component
- http://egorsmirnov.me/2015/05/22/react-and-es6-part1.html
- https://babeljs.io/blog/2015/06/07/react-on-es6-plus
- http://buildwithreact.com/article/component-lifecycle


![React Logo](https://facebook.github.io/react/img/logo.svg)


# React

Framework Javascript de Facebook
Constitué de composants (components)

### JSX
JSX -> javascript à compiler

Tout les éléments doivent html doivent être dans un conteneur
**Balise autofermée, obligatoire**

a name -> equals sign -> value

```
var myVar = <p>Hello</p>;
var myArray ={
    title : <h1>Hi</h1>,
    content : <p>Somes contents</p>

}
my-attribute="myattribute-value"
var panda = <img src="images/panda.jpg" alt="panda" width="500px" height="500px" />;
```

**Multiline**

```
var myDiv = (
    <div className="ClassCss">
        <h1>Hello world</h1>
        <h1>{console.log("Code javascript")}</h1>
    </div>
);
```


## ReactDOM
Librairies pour afficher un composants React

```
ReactDOM.render(
	<h1>Render me!</h1>,
  document.getElementById('app')
);
```

React va insérer l'html dans l'élément app

Insérer deux fois l'instruction ne changera rien


## Evenement

CamelCase !

```
function makeDoggy (e) {
  e.target.setAttribute('src', 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg');
}

var kitty = (
	<img
	src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg"
    onClick={makeDoggy}
    />
);
```

## IF

3 types

### IF bourrin

```
if (user.age >= drinkingAge) {
  var message = (
    <h1>
      Hey, check out this alcoholic beverage!
    </h1>
  );
} else {
  var message = (
    <h1>
      Hey, check out these earrings I got at Claire's!
    </h1>
  );
}
```

### IF ternaire

```
var age = 20;
var pics = {
  kitty: 'react_photo-kitty.jpg',
  doggy: 'react_photo-puppy.jpeg'
};
var img = (
    <div>
        <img src={pics[coinToss() == 'heads' ? 'kitty' : 'doggy']} />
        <h1>
        { age >= 18 ? 'Buy Drink' : 'Do Teen Stuff' }
        </h1>
    </div>
);
```

### IF && operator

```
var age = 18;
var tasty = (
  <ul>
    <li>Applesauce</li>
    { !baby && <li>Pizza</li> }
    { age > 15 && <li>Brussels Sprouts</li> }
    { age > 20 && <li>Oysters</li> }
    { age > 25 && <li>Grappa</li> }
  </ul>
);
```

# Components

Doit toujours posséder une méthode render

ECMA 5
```
var Photo = React.createClass({
  handleDoubleTap: function(e) { … },
  render: function() { … },
});
```

ECMA 6
```
class Photo extends React.Component {
  handleDoubleTap(e) { … }
  render() { … }
}
```



## Props
On peut considérer le props comme les paramètres envoyés à une fonction.

A React component should use props to store information that can be changed, but can only be changed by a different component.

Passer des arguments
```
<Greeting myInfo={["top", "secret", "lol"]} />
<Greeting name="Frarthur" town="Flundon" age={2} haunted={false} />
```
Passer un objet`au props

```js
 talk: function () {
    for (var speech = '', i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
  },
  
  render: function () {
    return <Button talk={this.talk} />;
  }
```

Props par default

ECMA 5
```js
var Button = React.createClass({
  getDefaultProps: function (){
    return {text: 'I am a button'}
  },
  render: function () {
    return (
      <button>
        {this.props.text}
      </button>
    );
  }
});
```

ECMA 6 + proptypes

```js
class Video extends React.Component {
  static defaultProps = {
    autoPlay: false,
    maxLoops: 10,
  }
  static propTypes = {
    autoPlay: React.PropTypes.bool.isRequired,
    maxLoops: React.PropTypes.number.isRequired,
    posterFrameSrc: React.PropTypes.string.isRequired,
    videoSrc: React.PropTypes.string.isRequired,
  }  
}
```

## Props.children

If a component has more than one child between its JSX tags, then this.props.children will return those children in an array. However, if a component has only one child, then this.props.children will return the single child, not wrapped in an array.

```
var App = React.createClass({
  render: function () {
    return (
      <div>
        <List type='Living Musician'>
          <li>Sachiko M</li>
          <li>Harvey Sid Fisher</li>
        </List>
        <List type='Living Cat Musician'>
          <li>Nora the Piano Cat</li>
        </List>
      </div>
    );
  }
});

var List = React.createClass({
  render: function () {
    var titleText = 'Favorite ' + this.props.type;
    if (this.props.children instanceof Array) {
    	titleText += 's';
    }
    return (
      <div>
        <h1>{titleText}</h1>
        <ul>{this.props.children}</ul>
      </div>
    );
  }
});


```
## Importer une fonction / component d'un fichier

ECMA 5
```
module.exports = List;
```

ECMA 6
```
export default List;
```

## State

Un composant React devrait utiliser les states pour stocker des informations que le composant changera lui-même


**Ne pas appeler this.setState dans un function render**

Chaque fois que this.setState est appelé, la méthode du composant render est appelée dès que le state a été modifié.

ECMA 5
```
var Video = React.createClass({
  getInitialState: function() {
    return {
      mood: 'value',
    };
  }
});  
  render: function(){
      return (
        <h1>
          I'm feeling {this.state.mood}!
        </h1>
      );
    },
     moodSet: function () {
        this.setState({
          mood: 'foggy'
        });
      }
 ```
 
 ECMA 6
 
```
class Video extends React.Component {
state = {
  mood: 'value',
}
render(){
    return(
          <h1>
             I'm feeling {this.state.mood}!
           </h1>
    )
}
moodSet = () => {
  this.setState({
    moodSet: newState
  });
}
}

```
 # LifeCycle
 
 ##Mounting
 These methods are called when an instance of a component is being created and inserted into the DOM:
 
 - constructor()
 - componentWillMount()
 - render()
 - componentDidMount()
 
 ##Updating
 An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
 
 componentWillReceiveProps()
 shouldComponentUpdate()
 componentWillUpdate()
 render()
 componentDidUpdate()
 ##Unmounting
 This method is called when a component is being removed from the DOM:
 
 componentWillUnmount()
 
 ### componentWillMount()
 
 Travail d'un constructeur
 
 **Uniquement lors de la première fois !**
 
 ECMA5
 ```
 var EmbedModal = React.createClass({
   componentWillMount: function() { … },
 });
 ```
 ECMA 6
 ```
 class EmbedModal extends React.Component {
   constructor(props) {
     super(props);
     // Méthode du componentWillMount vont ici
   }
 }
 ```
 ### componentDidMount()
 La fonction sera appelée quand l'HTML du render aura finit d'etre généré.
 
 ### componentWillReceiveProps()
 La fonction est appelé quand le composant reçoit un props APRES avoir effectué son 1er render
 
 ```js
 var React = require('react');
 
 var Example = React.createClass({
   componentWillReceiveProps: function (nextProps) {
     alert("Check out the new props.text that "
     	+ "I'm about to get:  " + nextProps.text);
   }, 
 
   render: function () {
     return <h1>{this.props.text}</h1>;
   }
 });
 
 
 // The first render won't trigger
 // componentWillReceiveProps:
 ReactDOM.render(
 	<Example text="Hello world" />,
 	document.getElementById('app')
 );
 
 // After the first render, 
 // subsequent renders will trigger
 // componentWillReceiveProps:
 setTimeout(function () {
 	ReactDOM.render(
 		<Example text="Hello world" />,
 		document.getElementById('app')
 	);
 }, 1000);
 ```
 
 ### shouldComponentUpdate()
 
 ```js
 shouldComponentUpdate: function (nextProps, nextState) {
     if ((this.props.text == nextProps.text) && 
       (this.state.subtext == nextState.subtext)) {
       alert("Props and state haven't changed, so I'm not gonna update!");
       return false;
     } else {
       alert("Okay fine I will update.")
       return true;
     }
   },
 ```
 
 ### componentWillUpdate ()
 
You cannot call this.setState from the body of componentWillUpdate! Which begs the question, why would you use it?
 
The main purpose of componentWillUpdate is to interact with things outside of the React architecture.
If you need to do non-React setup before a component renders, such as checking the window size or interacting with an API,
then componentWillUpdate is a good place to do that.


 ```
    componentWillUpdate: function(nextProps, nextState){
        if(document.body.style.background != yellow && this.state.highest >= 950*1000){
          document.body.style.background = yellow;
        }else if(!this.props.game && nextProps.game){
          document.body.style.background = 'white';
        }
      }
 
 ```
 
 
 
 
 ### componentDidUpdate ()
 When a component instance updates, componentDidUpdate gets called after any rendered HTML has finished loading.
 componentDidUpdate automatically gets passed two arguments: prevProps and prevState. prevProps and prevState are references to the component's props and state before the current updating period began. You can compare them to the current props and state.
  
  ```
  componentDidUpdate: function (prevProps, prevState) {
      alert('Component is done rendering!');
    },
  ```
  
  componentDidUpdate is usually used for interacting with things outside of the React environment, like the browser or APIs. It's similar to componentWillUpdate in that way, except that it gets called after render instead of before.
 
 ### componentWillUnmount ()
 
 componentWillUnmount is the only unmounting lifecycle method!
 
 componentWillUnmount gets called right before a component is removed from the DOM.
  If a component initiates any methods that require cleanup, then componentWillUnmount is where you should put that cleanup.
 
 
 # Style
 
 ```js
 <h1 style={{ color: 'red' }}>Hello world</h1>
 ```
 
 En react les styles, pas de tiret (-) on colle les attributs...
 
 
 ```js
 var styles = {
   marginTop:       "20px",
   backgroundColor: "green"
 };
 ```
 
# Pattern

Our programming pattern uses two React components: a stateful component, and a stateless component.
"Stateful" describes any component that has a getInitialState function.
"stateless" describes any component that does not.

## From child to parent class
 your first React programming pattern: a stateful, parent component passes down a prop to a stateless, child component.
Parent
A stateful, parent component passes down an event handler to a stateless, child component. The child component then uses that event handler to update its parent's state.
```js
var Parent = React.createClass({
  getInitialState: function () {
    return { name: 'Frarthur' };
  },
  changeName: function(newName){
    this.setState({
      name: newName
    });
  },
  render: function () {
    return (
    	<Child 
    		name={this.state.name} onChange={this.changeName} />
    );
  }
});
```
Child 

```js
var Child = React.createClass({
  handleChange: function(e){
    var name = e.target.value;
    this.props.onChange(name);
  },
  render: function () {
    return (
      <div>
        <h1>
          Hey my name is {this.props.name}!
        </h1>
        <select id="great-names" onChange={this.handleChange}>
          <option value="Frarthur">Frarthur</option>
          <option value="Gromulus">Gromulus</option>
          <option value="Thinkpiece">Thinkpiece</option>
        </select>
      </div>
    );
  }
});
```



## Stateless Functional Components

```
// Normal way to display a prop:
var MyComponentClass = React.createClass({
  render: function () {
    return <h1>{this.props.title}</h1>;
  }
});

// Stateless functional component way to display a prop:
function MyComponentClass (props) {
  return <h1>{props.title}</h1>;
}

// Normal way to display a prop using a variable:
var MyComponentClass = React.createClass({
  render: function () {
  	var title = this.props.title;
    return <h1>{title}</h1>;
  }
});

// Stateless functional component way to display a prop using a variable:
function MyComponentClass (props) {
	var title = props.title;
  return <h1>{title}</h1>;
}
```
Steteless Function with props
```
function Navigation({ items }) {
  return (
    <nav><ul>{items.map(x => <li>{x.text}</li>}</ul></nav>;
  );
}
Navigation.propTypes = { items: PropTypes.array.isRequired };
 

```



# Tips React / Javascript

## Accéder au this de la class dans une function


```js
 this.state.products.map(function (item){
      return <RenderProducts onClick={this.onClickProduct} products={item}/>
 }.bind(this))
```

Ou indiquer dans le constructor ou componentWillMount



```js
class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleOptionsButtonClick = this.handleOptionsButtonClick.bind(this);
  }
  handleOptionsButtonClick(e) {
    // ...to ensure that 'this' refers to the component instance here.
    this.setState({showOptionsModal: true});
  }
}
```

### OU ECMA 6
La fonction n'écrase pas le this de la class

Fonction anonyme
```js
var.map((key) => {
            // do stuff
});
```
Fonction nommée
```js
handleOptionsButtonClick = (params) => {
    this.setState({showOptionsModal: true});
  }
```
## Three dots
As you know  ... are called spread operator which the name represents it allows an expression to be expanded.

var parts = ['two', 'three'];
var numbers = ['one', ...parts, 'four', 'five']; // ["one", "two", "three", "four", "five"]


//just assume we have an object like this:
var person= {
    name: 'Alex',
    age: 35 
}
**This:**

```
<Modal {...person} title='Modal heading' animation={false} />
```
**is equal to**

```
<Modal name={person.name} age={person.age} title='Modal heading' animation={false} />
```
So in short, it's a neat short-cut, we can say.

Passer des props au children

export default class MovieBrowser extends React.Component {
  render() {
    const currentPlayingTitle = 'Mad Max: Fury Road';
    const childrenWithExtraProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isPlaying: child.props.title === currentPlayingTitle
      });
    });

    return (
      <div className="movie-browser">
        {childrenWithExtraProp}
      </div>      
    );
  }
}
