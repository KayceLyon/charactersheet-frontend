import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const showCharacter = (props) => {
        const parameter = useParams()

        const axiosRequest = [`https://fierce-brook-63604.herokuapp.com/characters/${parameter.id}`]
             
       const getCharacters = () => { 
        Promise.all(axiosRequest.map((axiosRequest)=> axios.get(axiosRequest))).then(
        axios.spread((...allData) => {
          props.setCharacter(allData[0].data);
        })
        )
       }
      
        useEffect(()=>{
        getCharacters()
        }, []);

    return (
        <>
        <Container>
            <Box>
                <Typography> {props.character.name} </Typography>
            </Box>
        </Container>
        </>
    )
}

export default showCharacter