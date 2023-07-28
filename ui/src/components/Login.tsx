import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.scss'
import { MyProp, clearAccessToken, getAccessToken, setAccessToken, setValueOnKeyDown, validateSession } from '../lib'
import Loading from './Loading'

export default function Login({ axios }: MyProp) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(true)
	const [loginLoading, setLoginLoading] = React.useState(false)
	const [username, setUsername] = React.useState("")
	const [password, setPassword] = React.useState("")

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

	const login = async (): Promise<void> => {
		setLoginLoading(true)
		try {
			const { data } = await axios.post('/api/session/login', { username, password }, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`
				}
			})

			if (data.success) {
				setAccessToken(data['access_token'])
				navigate("/home", { replace: true })
			} else {
				throw new Error()
			}
		} catch (err: any) {
			console.error(err.message)
			setLoginLoading(false)
			clearAccessToken()
		}
	}

	const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			login()
		}
	}

	return isLoading ? <Loading /> : (
		<div className="login">
			<h1>Login</h1>

			<div className="form">
				<input onKeyDown={e => onEnter(e)} type="text" placeholder='Username' onChange={e => setValueOnKeyDown(e.target.value, setUsername)} />
				<input onKeyDown={e => onEnter(e)} type="password" placeholder='Password' onChange={e => setValueOnKeyDown(e.target.value, setPassword)} />
				<button disabled={loginLoading} onClick={login}>Login</button>
				<hr />
				<a href="#">Forgot Password?</a>
				<a href="/signup">Create New Account</a>
			</div>
		</div>
	)
}
