# React

## JSX

JSX -> javascript à compiler
```
var myVar = <p>Hello</p>;
var myArray ={
    title : <h1>Hi</h1>,
    content : <p>Somes contents</p>

}
```

### JSX Attribute

a name -> equals sign -> value
```
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

**Tout les éléments doivent html doivent être dans un conteneur**
**Balise autofermée, obligatoire**


## ReactDOM
librairies

```
ReactDOM.render(
	<h1>Render me!</h1>,
  document.getElementById('app')
);
```

React va insérer l'html dans l'élément app

Insérer deux fois l'instruction ne changera rien

```
// This will add "Hello world" to the screen:

ReactDOM.render(hello, document.getElementById('app'));

// This won't do anything at all:

ReactDOM.render(hello, document.getElementById('app'));
```

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

## IF bourrin

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
## Props
A React component should use props to store information that can be changed, but can only be changed by a different component.

Passer des arguments
```
<Greeting myInfo={["top", "secret", "lol"]} />
<Greeting name="Frarthur" town="Flundon" age={2} haunted={false} />
```
Passer un objet`au props
```
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

```
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
```
module.exports = List;
```

## State
A React component should use state to store information that the component itself can change.

State par défaut

Appeler un state

Modifier un state

**Ne pas appeler this.setState dans un function render**

Any time that you call this.setState, this.setState AUTOMATICALLY calls render as soon as the state has changed.

```
  getInitialState: function () {
    return { mood: 'decent' };
  },
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
 
# Pattern

Our programming pattern uses two React components: a stateful component, and a stateless component. "Stateful" describes any component that has a getInitialState function; "stateless" describes any component that does not.

## From child to parent class
 your first React programming pattern: a stateful, parent component passes down a prop to a stateless, child component.
Parent
you learned that lesson 1's pattern is actually part of a larger pattern: a stateful, parent component passes down an event handler to a stateless, child component. The child component then uses that event handler to update its parent's state.
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

# Style
```
<h1 style={{ color: 'red' }}>Hello world</h1>
```

## Accéder au this de la class dans une function boucle


```
 this.state.products.map(function (item){
      return <RenderProducts onClick={this.onClickProduct} products={item}/>
 }.bind(this))
```
### OU ECMA 6


```
var.map((key) => {
            // do stuff
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
