import React from 'react';
import {Toolbar, Button, Typography, Paper} from '@material-ui/core'
import firebase from '../../firebase/firebase'
import UploadCard from './UploadCard';

const handleChange= $event=>{
    console.log($event.srcElement.files)
    

}

const WorkSubmission = (props) => {
    return (  
        <div>
            
        </div>
    );
    async function logout() {
		await firebase.logout()
		props.history.push('/')
    }
    
}
 

export default WorkSubmission;