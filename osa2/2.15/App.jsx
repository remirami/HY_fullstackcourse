import { useState, useEffect } from 'react'
import phonebook from './services/phonebook';

const Filter = ({searchTerm, handleSearchChange}) => {
  return (
    <div>filter shown with:
      <input value={searchTerm} onChange={handleSearchChange}/>
    </div>
  );
}

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange}></input>
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}></input></div>
      <div><button type='submit'>add</button></div>
    </form>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      )}
    </div>
  );  
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    phonebook
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleDelete = (id) => {
    const personToDelete = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebook
      .deletePerson(id)
      .then(() => {
        setPersons(phonebook.filter(p => p.id !== id))
  })
  .catch(error => {
    console.error('Error deleting contact: ', error);
  })
}}
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} already exists in the phonebook. Do you want to update the number?`)
      if (confirmUpdate) {
        const updatedPerson = {...existingPerson, number: newNumber}
        phonebook.updatePerson(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
         setNewName('')
         setNewNumber('')
        })
        .catch(error => {
          console.error("There was an error updating the number", error)
        })
    }
  }
      else {
    const newPerson = {
      name: newName,
      number: newNumber
    };
    phonebook.create(newPerson)
    .then(response => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.error("There was an error adding the person", error);
    });
  }
  };
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
          </div>
    
  )

}

export default App