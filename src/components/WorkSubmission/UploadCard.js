import React, {Component} from 'react';
import firebase from '../../firebase/firebase'
import {Paper, Typography, Button, Snackbar, Toolbar, Select, FormControl, InputLabel, MenuItem} from '@material-ui/core'
import { Link } from 'react-router-dom'

class UploadCard extends Component {
  tipos = [{name: "Resumo Simples"},{name: "Resumo Estendido"},{name: "Artigo"}];
  categorias = [{name: "Oral"},{name: "Poster"}];
  submissoes = []
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: '',
      progress: 0,
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      tipo: '',
      categoria:'',
      isResumoSimples: true
    }


    firebase.getCurrentUserSubmissions().then((algo)=>{
      console.log('cheguei')
      if(!((typeof algo) === "undefined")){
        this.submissoes = algo.submissao
        console.log(this.submissoes)
        
      }
    }).catch(erro =>{
      console.log("We have an error: " + erro.message)
      this.submissoes = []
    });

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

  logout = async ()=> {
    await firebase.logout()
    localStorage.clear();
    this.props.history.push('/')
}

  handleUpload = () => {
      if(this.state.file === null || this.state.tipo ===''){
        alert("Insira um arquivo e o tipo de submissão")
      }else{

        this.submissoes.push({arquivo: this.state.file.name,
          tipo:this.state.tipo,
          data: new Date(),
          categoria: this.state.categoria})
        console.log(this.submissoes)

        firebase.addSubmission({
          userName: firebase.getCurrentUsername(),
          userId: firebase.getCurrentUserId(),
          email: firebase.getCurrentUserEmail(),
          submissao: this.submissoes
        }).then(()=>{

          console.log("saved")
        })
        const {file} = this.state;
        const uploadTask = firebase.fazStorage(file);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
          if(this.state.progress === 100){
              this.setState({open:true})
          }
        }, 
        (error) => {
            // error function ....
          alert("Erro ao enviar arquivo!");
          console.log(error.message)
        });
      }
  }
  
  render() {
    if(!firebase.getCurrentUsername()) {
      // not logged in
      alert('Realize Login!')
      this.props.history.replace('/')
      return null
      } 
     
    const style = {
      width: '450px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignText: 'center',
      alignSelf: 'center',
      margin: 'auto',
      marginTop: 'auto'
    };

    const handleClose = () => {
        this.setState({open: false });
        this.props.history.push('/homepage')
      };

    const tipoSelected = event => {
        if(event.target.value === 'Resumo Estendido' || event.target.value === 'Artigo'){
          this.setState({isResumoSimples: false});
        }
        if(event.target.value === 'Resumo Simples'){
          this.setState({isResumoSimples: true, categoria: ''});
        }
        this.setState(() => {
          return {
            tipo: event.target.value
          }
        })
      };
    
    const categoriaSelected = event => {
      this.setState(() => {
        return {
          categoria: event.target.value
        }
      })
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
                onClick={this.logout}
                >
                Sair
            </Button>
        </Toolbar>
        <Paper style={style}>
                <Typography style={{marginBottom: '40px'}} component="h1" variant="h5">Submissão de Trabalhos</Typography>
                <form>
                  <FormControl style={{width: '300px', marginLeft: '65px', marginBottom: '20px'}}>
                    <InputLabel htmlFor="tipos">Tipo</InputLabel>
                    <Select
                      value={this.state.tipo}
                      onChange={tipoSelected}
                    >
                      {this.tipos.map(tipo => (
                        <MenuItem value={tipo.name} key={tipo.name}>
                          {tipo.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl style={{width: '300px', marginLeft: '65px', marginBottom: '20px'}}>
                    <InputLabel htmlFor="categorias">Categoria</InputLabel>
                    <Select
                      value={this.state.categoria}
                      onChange={categoriaSelected}
                      disabled={this.state.isResumoSimples}
                    >
                      {this.categorias.map(cat => (
                        <MenuItem value={cat.name} key={cat.name}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </form>
                
                <input style={{margin: '10px'}}  type="file" onChange={this.handleChange}/>
                <div style={{marginTop: '20px'}}>
                  <Button style={{margin:'10px'}} variant='contained' color='secondary'
                  component={Link}
                  to="/homepage">Voltar</Button>
                  <Button style={{margin:'10px'}} variant='contained' color='primary' onClick={this.handleUpload}>Enviar</Button>
                </div>
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
        </Paper>
      </div>
    )
  }
}

export default UploadCard;