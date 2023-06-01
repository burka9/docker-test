import React from "react"
import { Link } from "react-router-dom"
import '../styles/landing.scss'
import Loading from "./Loading"
import { MyProp, validateSession } from "../lib"

const Landing = ({ axios }: MyProp) => {
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		validateSession(axios)
			.then(success => {
				if (success) {
					window.location.href = "/home"
				} else {
					setIsLoading(success)
				}
			})
			.catch(err => console.error(err))
	}, [])

	return isLoading ? <Loading /> : (
		<div className="landing">
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
		</div>
	)
}

export default Landing