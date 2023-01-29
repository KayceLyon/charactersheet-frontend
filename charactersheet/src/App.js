import React, {useState} from 'react'
import{Routes, Route, Navigate} from 'react-router-dom'
import './App.css';

import Navigation from './components/Navigation'
import Index from './components/Index'
import CharacterForm from './components/CharacterForm'
import EditCharacterForm from './components/EditCharacterForm'
import showCharacter from './components/showCharacter'

const App = () => {
  const [character, setCharacter] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    level: "",
    background: "",
    race: "",
    alignment: ""
  })
  
  return (
    <>
    <Routes>
      <Route path = "/characters" element={<Navigation />}>
        <Route path = "/characters" element={<Index character={character} setCharacter={setCharacter} formData={formData} setFormData={setFormData}/>} /> 
        <Route path="new" element={<CharacterForm character={character} setCharacter={setCharacter} formData={formData} setFormData={setFormData}/>} />
        <Route path="edit/:id" element={<EditCharacterForm character={character} setCharacter={setCharacter} formData={formData} setFormData={setFormData}/>} />
        <Route path=":id" element={<showCharacter character={character} setCharacter={setCharacter} formData={formData} setFormData={setFormData}/>} />
      </Route>
      <Route path="/" element={<Navigate to="/characters" />} />
    </Routes>
    </>
  );
}

export default App;
