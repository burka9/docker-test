import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/home.scss'
import { MyProp, MyUser, clearAccessToken, getAccessToken, validateSession } from '../lib'
import Loading from './Loading'
import { AxiosResponse } from 'axios'

export default function Home({ axios }: MyProp) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(true)
	const [user, setUser] = React.useState<MyUser>({
		id: '',
		firstName: '',
		lastName: '',
		username: '',
		password: '',
	})

	React.useEffect(() => {
		validateSession(axios)
			.then(success => {
				if (success) {
					return axios.get('/api/user/user-info', {
						headers: {
							Authorization: `Bearer ${getAccessToken()}`
						}
					})
				} else {
					throw new Error()
				}
			})
			.then((response: AxiosResponse) => {
				if (response.data.success) {
					setUser(response.data.user)
					setIsLoading(false)
				} else {
					throw new Error()
				}
			})
			.catch(err => {
				console.error(err)
				clearAccessToken()
				navigate("/", { replace: true })
			})
	}, [])

	const logout = async (): Promise<void> => {
		try {
			const { data } = await axios.post('/api/session/logout', {}, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`
				}
			})

			if (data.success) {
				clearAccessToken()
				navigate("/", { replace: true })

				return
			}
		} catch (err: any) {
			console.error(err.message)
		}
	}

	return isLoading ? <Loading /> : (
		<div className='home'>
			<h1>{user.firstName} {user.lastName} - {new Date().toDateString()}</h1>
			<button onClick={logout}>Logout</button>
		</div>
	)
}
