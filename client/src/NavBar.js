import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className='NavBar'>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            {props.currentUser
                ? (
                    <span>
                        <Link to="/posts/new">New Post</Link>
                        <Link to="/user/:id">Profile</Link>
                        <Link to="/logout">Log Out</Link>
                    </span>
                )
                : (
                    <span>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </span>
                )
            }
        </div>
    )
}

export default NavBar