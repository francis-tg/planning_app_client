import { Button } from '@radix-ui/themes';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
	const navigate = useNavigate()
	function logout() {
		sessionStorage.removeItem("token");
		return navigate("/login")
	}
  return (
		<header>
			<nav className='flex p-3 items-center justify-between'>
				<div>
					<Link
						className='text-xl font-bold cursor-pointer uppercase'
						to={"/"}>
						Planning
					</Link>
				</div>
				<div className='flex items-center gap-5'>
					{sessionStorage.getItem("token") ? (
						<Button variant='solid' onClick={logout} className='bg-red-500'>Deconnexion</Button>
					) : (
						<Link
							to={"/login"}
							className='border border-teal-600 p-2 rounded-lg hover:bg-teal-600 duration-300 hover:text-white'>
							Connexion
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Navbar