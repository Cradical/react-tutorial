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
