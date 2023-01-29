import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'



const CharacterForm = (props) => {
    const navigate = useNavigate()

    const handleChange = (event)=> {
        const {name, value, type, checked} = event.target
        props.setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked: value
        })) 
    }
    
    const handleNewCharacter = (g) => {
        axios.post(
          'https://fierce-brook-63604.herokuapp.com/characters',
          {
            name: props.formData.name,
            class: props.formData.class,
            level: props.formData.level,
            background: props.formData.background,
            race: props.formData.race,
            alignment: props.formData.alignment

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
                        <h1>Add New Character</h1>

      <div>
        <TextField
          type='text' 
          name='name' 
          onChange={handleChange}
          value={props.formData.name}
          required
          id="outlined-required"
          label="Name"
        />

        <TextField
        type='text'
        name='class'
        onChange={handleChange}
        value={props.formData.class}
        required
        id="outlined-required"
        label="Class"
        />

        <TextField
        type='text'
        name='level'
        onChange={handleChange}
        value={props.formData.level}
        required
        id="outlined-required"
        label="Level"
        />

        <TextField
        type='text'
        name='background'
        onChange={handleChange}
        value={props.formData.background}
        required
        id="outlined-required"
        label="Background"
        />

        <TextField
        type='text'
        name='race'
        onChange={handleChange}
        value={props.formData.race}
        required
        id="outlined-required"
        label="Race"
        />

<TextField
        type='text'
        name='alignment'
        onChange={handleChange}
        value={props.formData.alignment}
        required
        id="outlined-required"
        label="Alignment"
        />

        </div>

        </Box>
        <Button variant="contained" type='submit' onClick={handleNewCharacter}>Submit</Button>

        </Container>
        
        </>
        )
        }


export default CharacterForm