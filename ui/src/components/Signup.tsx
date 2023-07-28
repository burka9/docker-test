import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/singup.scss'
import { MyProp, clearAccessToken, getAccessToken, setAccessToken, setValueOnKeyDown, validateSession } from '../lib'
import Loading from './Loading'

export default function Signup({ axios }: MyProp) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(true)
	const [signupLoading, setSignupLoading] = React.useState(false)
	const [firstName, setFirstName] = React.useState("")
	const [lastName, setLastName] = React.useState("")
	const [username, setUsername] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [confirmPassword, setConfirmPassword] = React.useState("")

	React.useEffect(() => {
		validateSession(axios)
			.then(success => {
				if (success) {
					navigate("/home", { replace: true })
				} else {
					setIsLoading(success)
				}
			})
			.catch(err => console.error(err))
	}, [])

	const signup = async (): Promise<void> => {
		setSignupLoading(true)
		try {
			if (!firstName || !lastName || !username || !password) throw new Error('missing fields')
			if (password !== confirmPassword) throw new Error('passwords dont match')

			const { data } = await axios.post('/api/session/signup', {
				firstName, lastName, username, password
			}, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`
				}
			})

			if (data.success) {
				setAccessToken(data['access_token'])
				navigate("/home", { replace: true })

				return
			}

			throw new Error()
		} catch (err: any) {
			console.error(err.message)
			setSignupLoading(false)
			clearAccessToken()
		}
	}

	return isLoading ? <Loading /> : (
		<div className="login">
			<h1>Signup</h1>

			<div className="form">
				<div>
					<input type="text" placeholder='First Name' onChange={e => setValueOnKeyDown(e.target.value, setFirstName)} />
					<input type="text" placeholder='Last Name' onChange={e => setValueOnKeyDown(e.target.value, setLastName)} />
				</div>
				<input type="text" placeholder='Username' onChange={e => setValueOnKeyDown(e.target.value, setUsername)} />
				<input type="password" placeholder='Password' onChange={e => setValueOnKeyDown(e.target.value, setPassword)} />
				<input type="password" placeholder='Confirm Password' onChange={e => setValueOnKeyDown(e.target.value, setConfirmPassword)} />
				<button disabled={signupLoading} onClick={signup}>Signup</button>
				<hr />
				<a href="/login">I already have an account</a>
			</div>
		</div>
	)
}
