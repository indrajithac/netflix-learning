import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import './Login.css';
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                // ...
            }).then(() => { alert("Logged In") }).then(() => {
                navigate('/netflix-learning/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log(errorCode);
            })
    }
    return (
        <div className='signupBackground'>
            <div className="signupParentDiv">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>


                    <br />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="fname"
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
                        id="lname"
                        name="password"                
                        placeholder='Password'
                    />
                    <br />
                    <br />
                    <button>Login</button>
                </form>
                <a href='/netflix-learning/signup'>Sign up</a>
            </div>
        </div>
    )
}

export default Login