import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


const EditCharacterForm = (props) => {
    let edit = {name: " "}
    const [formData, setFormData] = useState(edit)

    const navigate = useNavigate()
    const parameter = useParams()

    const handleChange = (event)=> {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked: value
        })) 
    }

    console.log(`https://fierce-brook-63604.herokuapp.com/characters/${parameter.id}`)
    console.log(parameter.id)
    const handleEditCharacter = () => {
        axios.put(
          `https://fierce-brook-63604.herokuapp.com/characters/${parameter.id}`,
          {
            name: formData.name,
            class: formData.class,
            level: formData.level,
            background: formData.background,
            race: formData.race,
            alignment: formData.alignment
          }).then(()=>{
            axios
            .get('https://fierce-brook-63604.herokuapp.com/characters')
            .then((response)=>{
              props.setCharacter(response.data)
            })
          })
          navigate("/characters", {replace: true})
    }

    return (
        <>
        <Container>
                <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
                        <h1>Edit Character</h1>

      <div>
        <TextField
          type='text' 
          name='name' 
          onChange={handleChange}
          value={formData.name}
          required
          id="outlined-required"
          label="Name"
        />

        <TextField
        type='text'
        name='class'
        onChange={handleChange}
        value={formData.class}
        required
        id="outlined-required"
        label="Class"
        />

        <TextField
        type='text'
        name='level'
        onChange={handleChange}
        value={formData.level}
        required
        id="outlined-required"
        label="Level"
        />

        <TextField
        type='text'
        name='background'
        onChange={handleChange}
        value={formData.background}
        required
        id="outlined-required"
        label="Background"
        />

        <TextField
        type='text'
        name='race'
        onChange={handleChange}
        value={formData.race}
        required
        id="outlined-required"
        label="Race"
        />

<TextField
        type='text'
        name='alignment'
        onChange={handleChange}
        value={formData.alignment}
        required
        id="outlined-required"
        label="Alignment"
        />

        </div>

        </Box>
        <Button variant="contained" type='submit' onClick={handleEditCharacter}>Submit</Button>

        </Container>
        
        </>




    )
}

export default EditCharacterForm;