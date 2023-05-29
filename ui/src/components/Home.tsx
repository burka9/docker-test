import React from 'react'
import '../styles/home.scss'

export default function Home() {
	const [user, setUser] = React.useState({
		name: 'User',
		time: new Date()
	})
	
	return (
		<div className='home'>
			{user.name} - {user.time.toDateString()}
		</div>
	)
}
