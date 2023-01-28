import React, {useEffect} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import '../App.css'

const Index = (params) => {
  const axiosRequest = ['https://fierce-brook-63604.herokuapp.com/characters']

  const navigate = useNavigate()
 
 const getCharacters = () => { 
  Promise.all(axiosRequest.map((axiosRequest)=> axios.get(axiosRequest))).then(
  axios.spread((...allData) => {
    params.setCharacter(allData[0].data);
  })
  )
 }

  useEffect(()=>{
  getCharacters()
  }, []);

  const handleDelete = (character)=> {
    axios 
      .delete(`https://fierce-brook-63604.herokuapp.com/characters/${character}`)
      .then(()=> {
        axios 
          .get('https://fierce-brook-63604.herokuapp.com/characters')
          .then((response)=> {
            params.setCharacter(response.data)
          })
      })
  }

  const handleEdit= (character) => {
    navigate(`/characters/edit/${character}`)
}

  return (
    <Container sx={{maxWidth: 'xl', backgrounColor: "black"}}>
    <Box mt={2} sx={{ width: '100%' }}>
    <Grid container rowSpacing={{xs: .5, md:2}} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>

    {params.character.map((characters)=>{ 
                    return(
                        <>
                        <Grid xs={12} sm={6} md={4} lg={4} >
                        <Card sx={{backgroundColor: 'primary.main',
                            '&:hover': {
                            backgroundColor: 'primary.dark',
                            opacity: [0.9, 0.8, 0.7]}}}>
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="div" textAlign="center" sx={{color: 'white'}}  >
                                {characters.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center" sx={{color: 'white'}}  >
                                `{characters.class}: Level {characters.level}`
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center" sx={{color: 'white'}}  >
                                `{characters.race}:{characters.alignment}`
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button sx={{color: 'white'}} onClick={(event)=> {{handleDelete(characters._id)}}}> Delete </Button>                                
                        <Button sx={{color: 'white'}} onClick={(event)=>{{handleEdit(characters._id)}}}> Edit </Button>
                            </CardActions>
                            </Card>
                            </Grid>

                        </>  )})} 
                        </Grid>
                        </Box>
                        </Container>
  ) 
}

export default Index

