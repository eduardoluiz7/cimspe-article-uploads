import React, {useRef, useState} from 'react'
import { Typography, Paper, Grid, Button, Toolbar } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../../firebase/firebase'
import { withRouter, Link } from 'react-router-dom'

const styles = theme => ({
	root: {
		flexGrow: 1,
	  },
	paper: {
		padding: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%'
	},
	grid:{
		padding: '0px'
	},
	submit: {
		marginTop: theme.spacing(3),
	},
	wrapper: {
		padding: theme.spacing(2)
	}
})

const HomePage = (props) => {
	const [stado, setStado] = useState('')
	const { classes } = props
	const userData = useRef({})
	var email = firebase.getCurrentUserEmail()
		firebase.getCurrentUserSubmissions().then((algo)=>{
			console.log(algo)
			userData.current = algo
			console.log(userData.current.submissao.length)
			setStado(' ') 
			}).catch(erro =>{
			console.log(erro.message)
			});



	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Realize login!')
		props.history.replace('/')
		return null
	}
	
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
			<div className={classes.wrapper}>
			<Grid className={classes.grid} alignItems='stretch' container spacing={2} direction="row">
				<Grid item xs={6}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Submissão de trabalhos
					</Typography>
					<Typography component="p" variant="body1">
						Realize sua submissão
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						component={Link}
						to="/submeterTrabalhos"
						className={classes.submit}>
						Enviar Trabalhos
					</Button>
				</Paper>
				</Grid>
				<Grid item xs={6} >
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Orientações aos autores
					</Typography>
					<Typography component="p" variant="body1">
						Veja as orientações para a submissão de trabalhos.
					</Typography>
					<Button
						variant="contained"
						color="secondary"
						href="https://drive.google.com/file/d/0BzRk5F8tbyz7Si1abUVaQlhrYVdLeFl1TkpOZDRKb0d6WWpJ/view"
						className={classes.submit}
						target='_blank'>
						Download
					</Button>
				</Paper>
				</Grid>
				</Grid>
				<Grid className={classes.grid} container spacing={2} direction="row">
				<Grid item xs={11} sm={6}>
				<Paper className={classes.paper}>
					<Typography style={{marginBottom:'15px'}} component="h1" variant="h5">
						Informes para confecção de poster
					</Typography>
					<Typography style={{textAlign:'left'}} component="p" variant="body1">
					O painel deverá ter, no máximo, 0,80m de largura por 1,20m de altura. O texto deverá ser legível a uma distância de dois metros. Para tanto, sugere-se utilizar o tamanho de fonte 70 a 80 para títulos e subtítulos; e de 30 a 40 para texto.
					</Typography>
					<Typography style={{textAlign:'left'}} component="p" variant="body1">
					O trabalho deverá ter o mesmo título que aquele submetido e aprovado, tanto para o painel quando na sessão de comunicação oral; bem como o nome e ordem dos autores. Caso haja figuras, tabelas e fotos, estas devem ser apresentadas em tamanho suficiente para uma boa visualização.
					</Typography>
					<Typography style={{textAlign:'left'}} component="p" variant="body1">
					Os órgãos de fomento (caso existam) devem ser exibidos nos cantos superiores ou inferiores, direito ou esquerdo.
					Deve conter as referências significativas.
					</Typography>
					<Typography style={{textAlign:'left'}} component="p" variant="body1" >
					O trabalho deve ter conteúdo autoexplicativo, já que a categoria “Pôster” será expositiva e não apresentada.
					</Typography>
					<Typography style={{textAlign:'left'}} component="p" variant="body1">
					A confecção e impressão dos pôsteres é de responsabilidade do(s) autor(es), bem como o transporte do mesmo.
					</Typography>
				</Paper>
				</Grid>
				<Grid item xs={11} sm={6}>
				<Paper className={classes.paper}>
					<Typography style={{marginBottom:'15px'}} component="h1" variant="h5">
						Dados
					</Typography>
					<Typography component="h1" variant="body1">
						Apenas os dois últimos envios serão aceitos
					</Typography>
					<div>
						<ul>
							<li>
								<h3>E-mail: {email}</h3>
							</li>
							<li>
								<h3>Submissões: { userData.current.submissao? userData.current.submissao.length : 0}/2</h3>
							</li>
							<li>
								<h3>Envios 1:</h3> 
								<h4>{ (typeof userData.current.submissao !== "undefined") && (userData.current.submissao.length>0) ? userData.current.submissao[0].arquivo : "Ainda não há envio"}</h4>
							</li>
							<li>
								<h3>Envio 2:</h3> 
								<h4>{ (typeof userData.current.submissao !== "undefined") && (userData.current.submissao.length>1) ? userData.current.submissao[1].arquivo : "Ainda não há envio"}</h4>
							</li>
						</ul>
					</div>
				</Paper>
				</Grid>
			</Grid>
			</div>
		</div>
	)

	async function logout() {
		await firebase.logout()
		localStorage.clear();
		props.history.push('/')
	}

}

export default withRouter(withStyles(styles)(HomePage))