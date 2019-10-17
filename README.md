# React Applications 101: A Junior's Guide to Understanding React 

Welcome to the world of software engineering. It is a daunting place as a junior with lots to learn and an overwhelming amount of resources out there that span the spectrum of comprehensible to what-the-heck, over your head content. This brief introduction to React will provide you with the basics of what you need to know about the framework to start experimenting with simple applications. I wrote it with beginners in mind, as I remember fondly what it was like to be lost.

### A Few Things Before We Get Started

I am assuming that as a reader, even though you may be new to React, you are not completely new to coding. To get through this tutorial, you should have a foundational understanding of CSS and HTML, and have experience using a terminal of choice with the basic know-how of CLI commands. I also assume you have a basic understanding of what an [API](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) is, as we will be using one, and loosely how it integrates with servers and databases, although the latter isn’t necessary for the tutorial.

Also, you have your editor of choice configured the way you like it. I use VS Code because of the integrations with React it has that are easily available for download via VS Code’s extension library built right into the editor.

[React](https://reactjs.org/) is something referred to as a [frontend framework](https://www.thebalancecareers.com/what-is-a-front-end-framework-and-why-use-one-2071948) which is dev speak for a suite of modules and pre-configured files that provide the developer with an easy, out-of-the-box solution for building user interfaces for web applications or websites. Those modules for React include everything you need to get started with the latest and greatest of the framework’s features and the latest version of JavaScript. Digging deeper into the important components of what powers React would be a wise step. Things like [webpack](https://webpack.js.org/) which bundles your JavaScript files and [Babel](https://babeljs.io/) which compiles those files are key to understanding how React does what it does with your code.

As for the API I mentioned above, we will be using the [Star Wars API](https://swapi.co/) - a free, open-source API - which we can call to get data about Star Wars movies for our components to render.

One last thing to note is that you will need a version of `node` that is 8.10 or higher. If you need to install a package manager checkout the `nvm` docs [here](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update).

I think that is about it for now. Let’s get started.

### Creating the React App

It is recommended that if you have installed the create-react-app toolchain globally using `npm install -g create-react-app` that you uninstall it so that `npx` uses the latest version of the toolchain. If you need to uninstall the toolchain run:

```shell
npm uninstall -g create-react-app
```

Now we are free and clear.

Navigate to the directory of your choice that will house your React app project. Once in the directory, simply run the following command:

```shell
npx create-react-app swapi-app
```

To break this command down a bit, have a look at the following:

`npx` - is the package manager we are using to run the command which invokes to create-react-app toolchain.

`create-react-app` - is the React toolchain which sets up the basic React project for us.

`swapi-app` - is the name I gave to the application. Something to note is that the name of the application must be lower case or React will throw an error complaining when running the above command. Camel-case syntax is not supported.

Once that command finishes installing all the dependencies, open the app in your code editor.

You will notice that the create-react-app command adds a lot of things to the project from the get-go. This means we will need to do some housekeeping to clean out the files and code we don’t need for our Star Wars App.

### The Housekeeping

Open the `/src` file. Right off the bat you can go ahead and delete the `logo.svg` file, as well as the `serviceWorker.js` file. Note, that if you try to run the application with `yarn start`, it now breaks with a `failed to compile` error which helps show us what our next step is. We need to remove the imports of the files we just deleted.

Quick note: `yarn start` will initiate the server and launch your application locally. Open a browser and type `localhost:3000` in the URL bar to see the application running if the `yarn start` command doesn’t do that automatically.

Navigate to `src/App.js` and delete the logo import at the top of the file, and replace the JSX code (essentially React’s version of HTML) between the `<div>` tags with the following code:

```js
<h2>Star Wars App</h2>
```

Your entire App.js file should now look like the following:

```js
import React from 'react'
import './App.css'

function App() {
  return (
    <div className='App'>
      <h2>Star Wars App</h2>
    </div>
  )
}

export default App
```

If you go back to your browser, you will still see the `failed to compile` error! Now, it is pointing us to the `src/index.js` file. Open that file and delete the service worker import and the service worker function call at the bottom, along with the comment.

Your `src/index.js` file should now look like the following:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

Opening the browser once again to `localhost:3000` finally displays our very simple Star Wars App! We are ready to develop our app!

### Converting a Functional (Stateless) Component into a Class Component

You can think of components in React as the building blocks for constructing your user interface or UI. React components are JavaScript classes (objects) or functions that programmatically describe how data should be rendered on the page. Some components you build might not even deal with data but all of them should return JSX or React Elements which form your component.

We will get to the important concepts of State and Props in React here in a bit because our application will need to manage data using state but first, let's convert our App component in `src/App.js` from a functional (stateless) component into a class component.

Note: using class components, although not always necessary, allows us to take advantage of a lot of React features making the component more useful, such as giving us the ability to instantiate a state object.

The first thing we need to do is import the Component class from the React library at the top of the file, like so:

```js
import React, { Component } from 'react'
```

Pro Tip: The brackets around “Component” allow us to take advantage of a power JavaScript feature known as [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

Next, we need to rewrite the App function so it can become a JavaScript class, like so:

```js
class App extends Component
```

Because we destructure the Component property from the React library imported at the top of the file, we don’t need to write `React.Component`. So, destructuring can allow us to write cleaner, more readable code.

Something important to know about class components in React is that they must contain the one mandatory [render()](https://reactjs.org/docs/react-component.html#render) method. All other methods built into the class are optional. The `render()` method is where we will house our return statement which returns the JSX for our application. So, your new class component in the App.js file should look like this:

```js
class App extends Component {
  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
      </div>
    )
  }
}
```

Open your browser, you should see the app running with no errors if you did everything correctly.

### Using Component Lifecycle Methods

Component life cycles refer to the different stages of when a component is rendered in the DOM and there are a series of methods or functions that exist that we can use that will be automatically called depending on the life cycle the component is in. One of the most common life cycle methods is the `componentDidMount()` method which gets called immediately after a component has rendered in the DOM. This is what we are going to use to do our API call to fetch some data from the Star Wars API.

The `componentDidMount()` method, like all class methods, lives as a part of a class component. So, we will build our `componentDidMount()` right into the App class component. Go ahead and add the `componentDidMount()` method to the App class like so:

```js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
      </div>
    )
  }
}

export default App
```

It is inside the brackets where we will write our code for fetching data from the API.

### Fetching Data from an External API

There are two ways we can write our data request (async-await and fetch().then() method chains) but I will go with the more modern async-await approach. To do that, we will convert our `componentDidMount()` method into an asynchronous method and add in the logic for the request like so:

```js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  async componentDidMount() {
    let response = await fetch('https://swapi.co/api/people')
    let data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
      </div>
    )
  }
}

export default App
```

Async functions in javaScript return something called a Promise which is beyond the scope of this tutorial but take a look [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for more information. Essentially, with this asynchronous function, we are making a call to a REST API [endpoint](https://smartbear.com/learn/performance-monitoring/api-endpoints/) to get a list of the names of characters in Star Wars movies and storing that data in the `response` variable. Then, we are converting that data into readable JSON by calling the `.json()` method on the response variable and storing the output of that method in the `data` variable. The `console.log()` is there to allow you to inspect the data with your developer tools in your browser and see what was returned as a result of the API call.

Now, that we have a bit of data to play with we need to store that data in React’s state by creating a state object inside the App class like so:

```js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    let response = await fetch('https://swapi.co/api/people')
    let data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
      </div>
    )
  }
}

export default App
```

Our state object contains a ‘people’ key which has an empty array as it’s value. This is where we will store the data we received from our API call about the Star Wars characters.

### React State

State in React, in the simplest of terms, is an object that stores data your app needs. A state object in React allows you to update, create and delete stored data that your application uses. Managing state correctly in React is very important to not produce hard to debug errors and one of the key things to remember is that you should never update state directly. This is because it can mess with how React checks to see if it needs to rerender components or the application.

So, something you should NOT do is take our array of characters we got back from our API call and do something like this:

```js
this.state.people.push(data.results)
```

### The setState Method

React provides us with a method to appropriately handle state updates and that is the `setState()` method. The `setState()` method will take an object of key-value pairs as an argument and update the corresponding key-value pairs in the state object. So, we can use the `setState()` method in our `componentDidMount()` to update state correctly, like so:

```js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    let response = await fetch('https://swapi.co/api/people')
    let data = await response.json()

    this.setState({ people: data.results })
  }

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
      </div>
    )
  }
}

export default App
```

The `data.results` gives us access to the array of characters we care about and updates the `people` property of our state object with the array of characters from our API call. Pretty cool stuff, huh?

### Displaying The Characters

Now that we have data in our state object, let’s get to work on how we can make a functional component to display the character names. This functional component will receive props - data derived from our state object - and use something called interpolation to display that data in the JSX and HTML elements we use to construct the component. Finally, the functional component will return JSX that makes up a custom-built React Element that we then can pass into our App class component so it can be rendered in the UI.

It is a lot! But let’s get started.

### Building a Functional Component

Our functional (stateless) React component differs in a lot of ways compared to class components, and one important way is the fact that functional components don’t need to worry about the state. Keep in mind, however, that in new releases of React, there do exist state hooks that allow functional components to update the state, providing an important break from traditional React. We won’t get into that in this tutorial as it is beyond the scope of what we are trying to do.

All our functional component worries about is ingesting data and correctly displaying that data in a rendered UI component so that it makes sense to the user. The functional component doesn’t need to carry any additional logic to process, update, or otherwise manipulate data. Nor does it need to worry about making API calls, or doing any CRUD interactions with databases. The goal is to simply display data.

So, to begin, first create a new file in the `src` directory called `DisplayCharacters.js`. The capitalization is important here as it follows the React convention for naming components. Now, insides of `DisplayCharacters.js`, we need to import the React library at the top of the file with the following line of code:

```js
import React from 'react'
```

Then, we can begin writing our function which will return a React Element. Let’s stick with ES6 JavaScript syntax for writing our function. So, our new component should look like the following:

```js
import React from 'react'

const DisplayCharacters = props => {
  return (
    <div>
      <h2>List of Characters</h2>
    </div>
  )
}

export default DisplayCharacters
```

You will need to export the `DisplayCharacters` function so it can be properly imported in the App.js file. You will notice that the `DisplayCharacters` function also takes props as an argument. Props will be an object that will contain the data we will need to render and we will go over how to cover passing props to the functional component later. For now, we know that the `people` property of the state object that we will pass as props to our functional child component will be an array of objects where each element in that array represents a person or character.

So, programmatically we can use the `.map()` method, to map over that array assigning each element to a `person` variable and then using interpolation to display the correct data in the JSX or HTML elements we use to build the component like so:

```js
import React from 'react'

const DisplayCharacters = props => {
  return (
    <div>
      <h2>List of Characters</h2>
      <ul>
        {props.people.map((person, index) => {
          return (
            <li
              key={index}
            >{`Name: ${person.name}, birth_year ${person.birth_year}`}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default DisplayCharacters
```

A neat thing you will notice about React is that you can execute logic in a return statement that is embedded in the HTML you write just as long as it is wrapped in brackets. This code pattern has its advantages but should be used cautiously to not complicate your return statements.

Another important thing to note here is that each of the list items in our unordered list has a `key` attribute assigned to the index of each element in our people array. React needs this key attribute for every similar child component that is rendered in a group. The reason is that React needs a way to be able to distinguish the uniqueness of each element so that it can keep track of whether or not the element undergoes some type of manipulation, and thus, trigger a rerender of the component. You can learn more about it [here](https://reactjs.org/docs/lists-and-keys.html)

Now, we are ready to import this custom child component into our parent App component and pass it the props it needs to render the list of characters.

### Passing Props to Child Components

This is how our App.js file now looks with our imported `DisplayCharacters` component.

```js
import React, { Component } from 'react'
import './App.css'
import DisplayCharacters from './DisplayCharacters'

class App extends Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    let response = await fetch('https://swapi.co/api/people')
    let data = await response.json()

    this.setState({ people: data.results })
  }

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
        <DisplayCharacters />
      </div>
    )
  }
}

export default App
```

You will notice the custom `DisplayCharacters` component being used directly in the return statement of the App class component. Syntactically it looks like a custom HTML element. This is a React Element and represents an important and powerful feature of the React framework. It allows you to build custom components and use those components with ease.

However, we need to pass our character data to the `DisplayCharacters` component to render the list of characters in our app. To do that, we will add a custom attribute to our React Element that will serve as the mechanism for passing props. Passing props to other components will always follow this code pattern. So, it makes it fairly easy to replicate. Have a look below.

```js
import React, { Component } from 'react'
import './App.css'
import DisplayCharacters from './DisplayCharacters'

class App extends Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    let response = await fetch('https://swapi.co/api/people')
    let data = await response.json()

    this.setState({ people: data.results })
  }

  render() {
    return (
      <div className='App'>
        <h2>Star Wars App</h2>
        <DisplayCharacters people={this.state.people} />
      </div>
    )
  }
}

export default App
```

In the `DisplayCharacters` element, we assign it a custom attribute we call `people`. The `people` attribute is then assigned to `this.state.people` giving the attribute access to the data stored in the state object - in other words, our array of characters. This is how our `DisplayCharacters` component receives its data. You can think of this custom attribute as a channel that is connected from the state object in the App class component to the child component making the data in state continually available to the child component. The connection between the state object and the child component is the custom attribute written onto the React Element in the parent component.

If you now open up your browser you will see the list of Star Wars characters and their birth years. Pretty cool!

### Things We Learned

In finishing up our tutorial, let’s recap things we covered:

- [x] How to initiate a create-react-app project</br>
- [x] The difference between stateful class components vs functional (stateless) components</br>
- [x] Component life cycles and the `componentDidMount()` life cycle method</br>
- [x] Asynchronous data calls using async-await with an external REST API</br>
- [x] The concept of state in React applications and how to use the `setState()` method</br>
- [x] The use of props in passing data from parent components to child components</br>
- [x] Dynamically rendering JSX based on the use of the `.map()` method</br>
- [x] And lastly, the use of the `key` attribute for child component rendered in a group</br>

Wow! A lot was covered! Keep playing with the application! Build more components, fetch different kinds of data. Keep building and experimenting!

I hope this was an enjoyable read and for you to keep digging in check out some of the following resources:

### Resources

[The React Documentation](https://reactjs.org/)</br>
[Thinking In React](https://reactjs.org/docs/thinking-in-react.html)</br>
[React State and Lifecycles](https://reactjs.org/docs/state-and-lifecycle.html)</br>
[Component Lifecycle Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)</br>
