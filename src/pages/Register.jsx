import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {BASE_URL} from "../api/index"
function Register() {
	const navigate = useNavigate()
    const [userData, setUserData] = useState({ email: "", password: "" });
		const { email, password,username } = userData;
		function onDataChange(e) {
			setUserData((prevData) => ({
				...prevData,
				[e.target?.id]: e.target?.value,
			}));
	}
	function submitUser() {
		if (email === "" || password === "" || username === "") return toast.warning("Veuillez remplir les champs")
		fetch(`${BASE_URL}/user/add`, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body:JSON.stringify(userData)
		}).then(async(r) => {
			if (r.status === 201) {
				toast.success("Votre compte a été bien créé")
				return navigate("/login")
			} else {
				toast.error("Invalid credential");
				return
			}
		}).catch((error) => {
			console.log(error)
		})
	}
  return (
		<div className='py-8 flex justify-center items-center'>
			<div>
				<h1 className='mb-5 text-4xl font-bold'>Créer un compte</h1>
				<form
					action=''
					method='post'>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='email'>Votre email</label>
						<input
							type='email'
							id='email'
							className='border outline-none w-full xl:w-96 p-2 border-teal-600 rounded-lg'
							placeholder=''
							onChange={onDataChange}
						/>
					</div>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='username'>Nom d'utilisateur</label>
						<input
							type='text'
							id='username'
							className='border outline-none w-full xl:w-96 p-2 border-teal-600 rounded-lg'
							placeholder=''
							onChange={onDataChange}
						/>
					</div>
					<div className='flex flex-col gap-1 mb-3'>
						<label htmlFor='password'>Votre mot de passe</label>
						<input
							type='password'
							id='password'
							className='border outline-none w-full xl:w-96 p-2 border-teal-600 rounded-lg'
							placeholder=''
							onChange={onDataChange}
						/>
					</div>
					<button
					  type='button'
					  onClick={submitUser}
						className='border border-teal-600 text-white bg-teal-600 p-3 w-full rounded-lg'>
						Créer un compte
					</button>
					<Link to={"/login"}>Se connecter</Link>
				</form>
			</div>
		</div>
	);
}

export default Register