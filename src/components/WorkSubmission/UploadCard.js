import React, {Component} from 'react';
import firebase from '../../firebase/firebase'
import {Paper, Typography, Button, Snackbar, Toolbar} from '@material-ui/core'
import { Link } from 'react-router-dom'

class UploadCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: '',
      progress: 0,
      open: false,
      vertical: 'bottom',
      horizontal: 'center'
    }

    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState(() => ({file}));
    }
  }
  handleUpload = () => {
      const {file} = this.state;
      const uploadTask = firebase.fazStorage(file);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
        console.log(this.state)
        if(this.state.progress === 100){
            this.setState({open:true})
        }
        console.log(this.state)
      }, 
      (error) => {
           // error function ....
        alert("Erro ao enviar arquivo!");
      });
  }
  render() {
    if(!firebase.getCurrentUsername()) {
      // not logged in
      alert('Realize Login!')
      this.props.history.replace('/')
      return null
      } 
     
    const style = {
      width: '500px',
      height: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignText: 'center',
      alignSelf: 'center',
      margin: 'auto',
      marginTop: '8%'
    };

    async function logout() {
		await firebase.logout()
		this.props.history.push('/')
    }

    const handleClose = () => {
        this.setState({open: false });
        this.props.history.push('/homepage')
      };

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
        <Paper style={style}>
            <div>
                <Typography component="h1" variant="h5">Submissão de Trabalhos</Typography>
                <input type="file" onChange={this.handleChange}/>
                <Button onClick={this.handleUpload}>Upload</Button>
                <Button
                component={Link}
                to="/homepage">Voltar</Button>
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={this.state.open}
                onClose={handleClose}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Enviado com sucesso!</span>}
                autoHideDuration={2000}
            />
      </div>
        </Paper>
      </div>

    )
  }
}

export default UploadCard;