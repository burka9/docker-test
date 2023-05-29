import React from "react"
import { Link } from "react-router-dom"
import '../styles/landing.scss'
import Loading from "./Loading"

const Landing = () => {
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		setTimeout(() => setIsLoading(false), 2500)
	}, [])

	return isLoading ? <Loading /> : (
		<div className="landing">
			<Link to="/login">Login</Link>
			<Link to="/singup">Signup</Link>
		</div>
	)
}

export default Landing