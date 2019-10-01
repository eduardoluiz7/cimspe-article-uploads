import React from 'react';
import {Toolbar, Button, Typography, Paper} from '@material-ui/core'
import firebase from '../../firebase/firebase'

const handleChange= $event=>{
    console.log($event.srcElement.files)
    

}

const WorkSubmission = (props) => {
    return (  
        <div>
            <Toolbar style={{background: '#3f51b5',	
                    }} variant='dense'>
                <Typography style={{color: 'white'}} component="h4" variant="h5">
                    Olá, { firebase.getCurrentUsername() }!
                </Typography>
                <Button
                    style={{marginLeft:'auto',
                    color:'white'}}
                    type="submit"
                    onClick={logout}
                    >
                    Sair
                </Button>
            </Toolbar>
            <div>
                <Paper>
                    <Typography>Submissão de Trabalhos</Typography>
                    <input
                        accept='.pdf'
                        multiple
                        type="file"
                        onChange={handleChange}
                        />
                    
                    <Button>Voltar</Button>
                    <Button>Enviar</Button>
                </Paper>
            </div>
        </div>
    );
    async function logout() {
		await firebase.logout()
		props.history.push('/')
    }
    
}
 

export default WorkSubmission;