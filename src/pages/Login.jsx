import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../api';

function Login() {
	const navigate = useNavigate()
    const [userData, setUserData] = useState({ email: "", password: "" })
    const { email, password } = userData
    function onDataChange(e) {
        setUserData((prevData) => (({
            ...prevData,
            [e.target?.id]:e.target?.value
        })))
	}
	function submitUser() {
		if (email === "" || password === "")
			return toast.warning("Veuillez remplir les champs");
		fetch(`${BASE_URL}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}).then(async (r) => {
			if (r.status === 200) {
				toast.success("Bienvenue");
				const data = await r.json()
				sessionStorage.setItem("token",data?.token)
				return navigate("/");
			} else {
				toast.error("Invalid credential");
				return;
			}
		});
	}
  return (
		<div className='py-8 flex justify-center items-center'>
			<div>
				<h1 className='mb-5 text-4xl font-bold'>Connectez-vous</h1>
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
						Connexion
					</button>
					<Link to={"/register"}>Créer un compte</Link>
				</form>
			</div>
		</div>
	);
}

export default Login