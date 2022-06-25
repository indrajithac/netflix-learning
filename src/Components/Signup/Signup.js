import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import './Signup.css';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                async function uploadData() {
                    const docRef = await addDoc(collection(firestore, "users"), {
                        id: userCredential.user.uid,
                        username: username,
                        email:email,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    updateProfile(auth.currentUser, {
                        displayName: username
                    })

                }
                uploadData()

                console.log(userCredential);

            }).then(() => {
                navigate('/netflix-learning/login');
            })
    }

    return (
        <div className='signupBackground'>
            <div className="signupParentDiv">
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <br />
                    <input
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="name"
                        placeholder='Username'
                    />
                    <br />
                    <br />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder='Email'
                    />
                    <br />
                    
                    <br />
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder='Password'
                    />
                    <br />
                    <br />
                    <button>Signup</button>
                </form>
                <a href='/netflix-learning/login'>Login</a>
            </div>
        </div>
    )
}

export default Signup