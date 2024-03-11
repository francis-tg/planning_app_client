import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react'
import { BASE_URL } from '../api';
import { toast } from 'react-toastify';

function Modal() {
	const [todoData, setTodoData] = useState({
		label: "",
		description: "",
		date: "",
	});
	const {label,description,date} = todoData

	function onDataChange(e) {
		setTodoData((prevData) => ({
			...prevData,
			[e.target?.id]: e.target?.value,
		}));
	}
	function submitTodo() {
		if (label === "" || date === "")
			return toast.warning("Veuillez remplir les champs");
		fetch(`${BASE_URL}/todo/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization":`Bearer ${sessionStorage.getItem("token")}`
			},
			body: JSON.stringify(todoData),
		}).then(async (r) => {
			if (r.status === 201) {
				toast.success("Evenement ajoutée");
				window.location.reload()
				return 
			} else {
				toast.error("Invalid credential");
				return;
			}
		});
	}
  return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button className='bg-teal-600 p-3 mx-3 my-5'> Ajouter</Button>
			</Dialog.Trigger>

			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Planining</Dialog.Title>
				<Dialog.Description
					size='2'
					mb='4'>
					Ajouter une tâche à votre calendrier
				</Dialog.Description>

				<Flex
					direction='column'
					gap='3'>
					<label>
						<Text
							as='div'
							size='2'
							mb='1'
							weight='bold'>
							Titre
						</Text>
						<TextField.Input
							defaultValue=''
							placeholder=''
							id='label'
							onChange={onDataChange}
						/>
					</label>
					<label>
						<Text
							as='div'
							size='2'
							mb='1'
							weight='bold'>
							Date
						</Text>
						<TextField.Input
							type='datetime-local'
							defaultValue=''
							placeholder=''
							id='date'
							onChange={onDataChange}
						/>
					</label>
					<label>
						<Text
							as='div'
							size='2'
							mb='1'
							weight='bold'>
							Description
						</Text>
						<TextArea
							defaultValue={description}
							placeholder='Description'
							id='description'
							onChange={onDataChange}
						/>
					</label>
				</Flex>

				<Flex
					gap='3'
					mt='4'
					justify='end'>
					<Dialog.Close>
						<Button
							variant='soft'
							color='gray'>
							Fermer
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button
							variant='soft'
							color='teal' onClick={submitTodo}>
							Ajouter
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default Modal