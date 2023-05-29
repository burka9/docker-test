import React from 'react'
import '../styles/login.scss'

export default function Login() {
	return (
		<div className="login">
			<h1>Login</h1>

			<div className="form">
				<input type="text" placeholder='Username' />
				<input type="password" placeholder='Password' />
				<button>Login</button>
				<hr />
				<a href="#">Forgot Password?</a>
				<a href="/signup">Create New Account</a>
			</div>
		</div>
	)
}
