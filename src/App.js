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
