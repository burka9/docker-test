import React from 'react'
import '../styles/singup.scss'

export default function Signup() {
	return (
		<div className="login">
			<h1>Signup</h1>

			<div className="form">
				<div>
					<input type="text" placeholder='First Name' />
					<input type="text" placeholder='Last Name' />
				</div>
				<input type="text" placeholder='Username' />
				<input type="password" placeholder='Password' />
				<input type="password" placeholder='Confirm Password' />
				<button>Login</button>
				<hr />
				<a href="/login">I already have an account</a>
			</div>
		</div>
	)
}
