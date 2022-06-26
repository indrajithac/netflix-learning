import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Context';
import { getAuth, signOut } from "firebase/auth";

import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const handleLogout = ()=>{
        const auth = getAuth();
            signOut(auth).then(() => {
              navigate('/netflix-learning/login');
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
          
    }
    return (
        <div className="navbar">
            <Link to="/netflix-learning/">
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflic Logo" />
            </Link>
            <div className='avatar'>
                <span>{user ? `${user.displayName}` : <span onClick={() => navigate('/netflix-learning/login')}>Login</span>}</span>

                <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar logo" onClick={handleLogout}/>

            </div>

        </div>
    )
}

export default NavBar
