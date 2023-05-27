import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import edit from '../assets/pen-to-square.svg';

interface User {
	id: number;
	name: string;
	photo_url: string;
	email: string;
	created_at: string;
}

export default function App() {
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(null);
	const [enableNameInput, setEnableNameInput] = useState(true);
	const [enablePhotoInput, setEnablePhotoInput] = useState(true);

	const nameRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/login');
		}

		axios
			.get(`http://localhost:${import.meta.env.VITE_PORT}/`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(({ data }) => {
				setUser(data);
				if (nameRef.current !== null) nameRef.current.value = data?.name;
				if (photoRef.current !== null) photoRef.current.value = data?.photo_url;
				if (emailRef.current !== null) emailRef.current.value = data?.email;
			})
			.catch((err) => {
				console.log(err);
				navigate('/login');
			});
	}, []);

	const handleSignOut = () => {
		localStorage.removeItem('token');
		return navigate('/login');
	};

	const handleUpdate = () => {
		setEnableNameInput(true);
		setEnablePhotoInput(true);
		axios
			.post(`http://localhost:${import.meta.env.VITE_PORT}/update`, {
				id: user?.id,
				name: nameRef?.current?.value,
				photo: photoRef?.current?.value,
			})
			.then(({ data }) => {
				setUser(data);
				if (nameRef.current !== null) nameRef.current.value = data?.name;
				if (photoRef.current !== null) photoRef.current.value = data?.photo_url;
				if (emailRef.current !== null) emailRef.current.value = data?.email;
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="h-screen flex flex-col gap-8 justify-center items-center">
			<div>
				<img
					className="w-16 h-16 rounded-full"
					src={user?.photo_url}
					alt="photo_url"
				/>
			</div>
			<div>
				<ul className="flex flex-col gap-8">
					<li className="flex flex-col gap-1 w-full">
						<label
							className="pl-3 text-sm md:text-[16px] font-medium"
							htmlFor="name"
						>
							Name
						</label>
						<span className="h-[50px] rounded-xl text-gray-500 bg-[#627C85] bg-opacity-10 border border-[#627C85] flex justify-between overflow-hidden">
							<input
								className="outline-none p-2"
								type="text"
								name="name"
								id="name"
								ref={nameRef}
								disabled={enableNameInput}
							/>
							<button
								onClick={() => setEnableNameInput((prev) => !prev)}
								className="h-full grid place-items-center px-4"
							>
								<img className="w-4 h-4" src={edit} alt="edit" />
							</button>
						</span>
					</li>

					<li className="flex flex-col gap-1 w-full">
						<label
							className="pl-3 text-sm md:text-[16px] font-medium"
							htmlFor="photo"
						>
							Photo URL
						</label>
						<span className="h-[50px] rounded-xl text-gray-500 bg-[#627C85] bg-opacity-10 border border-[#627C85] flex justify-between overflow-hidden">
							<input
								className="outline-none p-2"
								type="text"
								name="photo"
								id="photo"
								ref={photoRef}
								disabled={enablePhotoInput}
							/>
							<button
								onClick={() => setEnablePhotoInput((prev) => !prev)}
								className="h-full grid place-items-center px-4"
							>
								<img className="w-4 h-4" src={edit} alt="edit" />
							</button>
						</span>
					</li>

					<li className="flex flex-col">
						<label
							className="pl-3 text-sm md:text-[16px] font-medium"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="h-[50px] rounded-xl text-gray-500 outline-none bg-[#627C85] bg-opacity-10 border border-[#627C85] p-2"
							type="email"
							name="email"
							id="email"
							ref={emailRef}
							disabled
						/>
					</li>
					<li className="flex flex-col text-center">
						<label className="pl-3 text-sm md:text-[16px] font-medium">
							Criado em
						</label>
						<span>{user?.created_at}</span>
					</li>
				</ul>
			</div>
			<div className="flex gap-6">
				<button
					className="bg-[#000] text-[#FFF] px-4 py-2"
					onClick={handleSignOut}
				>
					Sair
				</button>
				<button
					className="bg-[#000] text-[#FFF] px-4 py-2"
					onClick={handleUpdate}
				>
					Atualizar
				</button>
			</div>
		</div>
	);
}
