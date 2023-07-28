import React from "react"
import { Link, useNavigate } from "react-router-dom"
import '../styles/landing.scss'
import Loading from "./Loading"
import { MyProp, validateSession } from "../lib"

const Landing = ({ axios }: MyProp) => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = React.useState(true)

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

	return isLoading ? <Loading /> : (
		<div className="landing">
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
		</div>
	)
}

export default Landing