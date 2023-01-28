import React, {useEffect} from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    <>
    {params.character.map((characters)=>{ 
                    return(
                        <>
                        <Box key={characters._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {characters.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button onClick={(event)=> {{handleDelete(characters._id)}}}> Delete </Button>                                
                            <Button onClick={(event)=>{{handleEdit(characters._id)}}}> Edit </Button>
                            </CardActions>
                            </Card>
                        
                        </Box>
                        </>  )})} 
        </>
               
                
  ) 
}

export default Index

