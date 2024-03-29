import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage';
import 'firebase/firebase-firestore'

var firebaseConfig = {
    apiKey: "AIzaSyASjK9PKAXRm9mv8NO47M_HXjKu19foGtg",
    authDomain: "vicimspe.firebaseapp.com",
    databaseURL: "https://vicimspe.firebaseio.com",
    projectId: "vicimspe",
    storageBucket: "vicimspe.appspot.com",
    messagingSenderId: "926049833538",
    appId: "1:926049833538:web:86b28562f172bc704b53db"
  };
  
class Firebase {
	constructor() {
    	app.initializeApp(firebaseConfig)
    	this.storage = app.storage()
		this.auth = app.auth()
		this.db = app.firestore()

	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
	}

	updateName(name){
		console.log("name a ser add " + name)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addSubmission(submission) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_cimspe/${this.auth.currentUser.uid}`).set({
			submission
		},{merge: true})
	}

	getCurrentUserId(){
		return this.auth.currentUser.uid
	}

	getCurrentUserEmail(){
		return this.auth.currentUser.email
	}


	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserSubmissions() {
		const submission = await this.db.doc(`users_cimspe/${this.auth.currentUser.uid}`).get().then(data=> data)
		return submission.get('submission')
	}

	fazStorage(file){
		return this.storage.ref(`submissoes/${this.auth.currentUser.uid}/${file.name}`).put(file)
	}

	resetPassword(email){
		return this.auth.sendPasswordResetEmail(email)
	}
}

export default new Firebase()