import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase/firebase'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '50%',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing(3),
	},
});

function SignIn(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Senha</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.submit}>
						Entrar
          			</Button>
				</form>
				<Typography style={{marginTop: '20px'}}>Novo aqui? <a style={{textDecoration: 'none', fontWeight: 'bold', color: '#f50057'}} href='http://cimspe.com/#inscricao'>Se inscreva!</a></Typography>
			</Paper>
			<div style={{marginLeft: 'auto',
				marginTop: '10px',
				textAlign: 'center'
				}}>
				<h5>Problemas com o login? Envie email para sitecimespe@gmail.com</h5>
			</div>
		</main>
	)

	async function login() {
		try {
			await firebase.login(email, password)
			props.history.replace('/homepage')
		} catch(error) {
			alert("Email ou senha inválidos!")
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))