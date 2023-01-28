import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
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
            name: props.formData.name
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


        </div>

        </Box>
        <Button variant="contained" type='submit' onClick={handleNewCharacter}>Submit</Button>

        </Container>
        
        </>
        )
        }


export default CharacterForm