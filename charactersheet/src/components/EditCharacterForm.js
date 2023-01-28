import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


const EditCharacterForm = (props) => {

    const navigate = useNavigate()
    const parameter = useParams()

    console.log(parameter.id)

    const handleChange = (event)=> {
        const {name, value, type, checked} = event.target
        props.setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked: value
        })) 
    }

    const handleEditCharacter = (parameter) => {
        axios.put(
          `https://fierce-brook-63604.herokuapp.com/characters/edit/${parameter}`,
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
                        <h1>Edit Character</h1>

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
        <Button variant="contained" type='submit' onClick={(event)=>{{handleEditCharacter(parameter.id)}}}>Submit</Button>

        </Container>
        
        </>




    )
}

export default EditCharacterForm;