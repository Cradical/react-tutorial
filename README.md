# React Applications 101: A Juniors Guide to Understanding React

Welcome to the world of software engineering. It is a daunting place as a junior with lots to learn and an overwhelming amount of resources out there that span the spectrum of comprehensible to what-the-heck, over your head content. This brief introduction into React will provide you with the basics of what you need to know about the framework in order to start experimenting with simple applications. I wrote it with beginners in mind, as I remember fondly what it was like to be totally lost.

### A few things before we get started.

I am making the assumption that as a reader, even though you may be new to React, you are not completely new to coding. In order to get through this tutorial, you should have a foundational understanding of CSS and HTML, and have experience using a terminal of choice with basic know-how of CLI commands. I also assume you have a basic understanding of what an API (link) is, as we will be using one, and loosely how it integrates with servers and databases, although the latter isn’t necessary for the tutorial.

Also, you have your editor of choice configured the way you like it. I use VS Code (link) because of the integrations with React it has that are easily available for download via VS Code’s extension library built right into the editor.

React (link) is something referred to as a frontend framework (link) which is dev speak for a suite of modules and pre-configured files that provide the developer with an easy, out-of-the-box solution for building user interfaces for web applications or websites. Those modules for React include everything you need to get started with the latest and greatest of the framework’s features, and the latest version of JavaScript. Digging deeper into the important components of what powers React would be a wise step. Things like webpack (link) which bundles your JavaScript files and Babel (link) which compiles those files are key to understanding how React does what it does with your code.

As for the API I mentioned above, we will be using the Star Wars API (link) - a free, open-source API - which we can make a request to in order to get data about Star Wars movies for our components to render.

One last thing to note, is that you will need a version of `node` that is 8.10 or higher. If you need to install a package manager checkout the `nvm` docs [here](https://github.com/nvm-sh/nvm/blob/master/README.md#installation-and-update)

I think that is about it for now. Let’s get started.

### Creating the React App

It is recommended that if you have installed the create-react-app toolchain globally using `npm install -g create-react-app` that you uninstall it so that `npx` uses the latest version of the toolchain. If you need to uninstall the toolchain run:

```shell
Npm uninstall -g create-react-app
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

You will notice that the create-react-app command adds a lot of things to the project from the get go. This means we will need to do some housekeeping to clean out the files and code we don’t need for our Star Wars App.

### The Housekeeping

Open the `/src` file. Right off the bat you can go ahead and delete the logo.svg file, as well as the serviceWorker.js file. Note, that if you try to run the application (`yarn start`), it now breaks with a `failed to compile error` which is helpful in showing up what our next step is. We need to remove the imports of the files we just deleted.

Quick note: `yarn start` will initiate the server and launch your application locally. Open a browser and type localhost:3000 in the URL bar to see the application running if the `yarn start` command doesn’t do that automatically.

Navigate to `src/App.js` and delete the logo import at the top of the file, and replace the JSX code (essentially React’s version of HTML) between the <div> tags with the following code:

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

Opening the browser once again to localhost:3000 finally displays our very simple Star Wars App! We are ready to develop our app!

### Converting a Functional (Stateless) Component into a Class Component

You can think of components in React as building block for constructing your user interface or UI. React components are JavaScript classes (objects) or functions that programmatically describe how data should be rendered on the page. Some components you build might not even deal with data but all of them should return JSX or React Elements which form your component.

We will get to the important concepts of State and Props in React here in a bit because our application will need to manage data using State but first lets convert our App component in `src/App.js` from a functional (stateless) component into a class component.

Note: using class components, although not always necessary, allows us to take advantage of a lot of React features making the component more useful.

The first thing we need to do is import the Component class from the React library at the top of the file, like so:

```js
import React, { Component } from 'react'
```

Pro Tip: The brackets around “Component” allow us to take advantage of a power JavaScript feature known as destructuring.

Next we need to rewrite the App function so it can become a JavaScript class, like so:
class App extends Component

Because we destructure the component property from the React library imported at the top of the file, we don’t need to write `React.Component`. So, destructuring can allow us to write cleaner, more readable code.

Something important to know about class components in React is that they must contain the one mandatory render() (https://reactjs.org/docs/react-component.html#render) method. All other methods built into the class are optional. The render() method is where we will house our return statement which returns the JSX for our application. So, your new class component in the App.js file should look like this:

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

Component life cycles refer to the different stages of when a component is rendered in the DOM and there are a series of methods or functions that exists that we can use that will be automatically called depending on the life cycle the component is in. One of the most common life cycle methods is the ComponentDidMount() method which gets called immediately after a component has rendered in the DOM. This is what we are going to use in order to do our API call to fetch some data from the Star Wars API.

The ComponentDidMount() method, like all class methods, lives as a part of a class component. So, we will build our ComponentDidMount() right into the App class component. Go ahead and add the ComponentDidMount() method to the App class like so:

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

There are two ways we can write our data request (async-await and fetch().then() method chains) but I will go with the more modern async-await approach. In order to do that, we will convert our componentDidMount() method into an asynchronous method and add in the logic for the request like so:

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

Async functions in javaScript return something called a Promise which is beyond the scope of this tutorial but have a look here (link) for more information. Essentially, with this asynchronous function we are making a call to a REST API endpoint (‘https://swapi.co/api/people/’) to get a list of the names of characters in Star Wars movies and storing that data in the response variable. Then, we are converting that data into readable json by calling the json() method on the response variable and storing the output of that method in the data variable. The console.log() is there to allow you to inspect the data with your developer tools in your browser and see what was returned as a result of the API call.

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

State in React in the most simplest of terms is an object that stores data the your app needs. A state object in React allows you to update, create and delete stored data that your application uses. Managing state correctly in React is very important so as to not produce hard to debug errors and one of the key things to remember is that you should never update state directly. This is because it can mess with how React checks to see if it needs to rerender components or the application.

So, something you should NOT do is take our array of characters we got back from our API call and do something like this:

this.state.people.push(data.results)

### The setState Method

React provides us with a method to appropriately handle state updates and that is the `setState()` method. The `setState()` method will take an object of key-value pairs as an argument and update the corresponding key-value pairs in state. So, we can use the `setState()` method in our `componentDidMount()` in order to update state correctly, like so:

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

### Displaying The Data

The whole reason why we are going through all this trouble is learn about how we
