import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import arrow from '../assets/icons/arrow-right.svg';
import google from '../assets/icons/google.svg';
import facebook from '../assets/icons/facebook.svg';
import illustration from '../assets/illustration.svg';

function Login() {
	const navigate = useNavigate();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			axios
				.get(`http://localhost:${import.meta.env.VITE_PORT}/`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then(() => {
					navigate('/');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const handleLoginSubmit = (event: FormEvent) => {
		event.preventDefault();

		const email = emailRef?.current?.value?.toLowerCase();

		const password = passwordRef?.current?.value;
		if (password && password?.length < 6) return;

		axios
			.post(`http://localhost:${import.meta.env.VITE_PORT}/login`, {
				email,
				password,
			})
			.then(({ data }) => {
				localStorage.setItem('token', data.token);
				return navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="flex items-center justify-center lg:justify-around p-6 h-screen bg-[#FFF]">
			<div className="w-full max-w-xl lg:w-[576px] flex flex-col h-full justify-around">
				<div className="flex justify-between lg:flex-col gap-6">
					<h1 className="font-bold text-3xl md:text-4xl">Sign in</h1>
					<div className="hidden lg:flex items-center gap-6">
						<span className="border-2 border-[#000] h-[1px] w-[80px]" />
						<span className="font-bold text-[16px]">Login with</span>
					</div>
					<div className="flex gap-6">
						<button className="flex items-center justify-around lg:py-2 lg:px-4 lg:h-[50px] lg:w-full lg:border border-[#627C85] rounded-xl">
							<img src={google} alt="Google" />
							<span className="hidden lg:block text-[16px]">
								Login with Google
							</span>
						</button>
						<button className="flex items-center justify-around lg:py-2 lg:px-4 lg:h-[50px] lg:w-full lg:border border-[#627C85] rounded-xl">
							<img src={facebook} alt="Facebook" />
							<span className="hidden lg:block text-[16px]">
								Login with Facebook
							</span>
						</button>
					</div>
				</div>
				<form onSubmit={handleLoginSubmit} method="post">
					<div className="flex flex-col gap-6">
						<span className="flex flex-col gap-1 w-full">
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
								required
								ref={emailRef}
							/>
						</span>

						<span className="flex flex-col gap-1 max-w-full">
							<label
								className="pl-3 text-sm md:text-[16px] font-medium"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="h-[50px] rounded-xl text-gray-500 outline-none bg-[#627C85] bg-opacity-10 border border-[#627C85] p-2"
								type="password"
								name="password"
								id="password"
								required
								minLength={6}
								ref={passwordRef}
							/>
						</span>
					</div>

					<button
						className="flex justify-center items-center mt-6 bg-[#F34848] hover:bg-opacity-90 active:bg-opacity-90 rounded-3xl w-[60px] h-[60px] md:w-[70px] md:h-[70px] shadow-xl"
						type="submit"
					>
						<img src={arrow} alt="send" />
					</button>
				</form>

				<span className="text-sm md:text-[16px]">
					Don't have an account yet?{' '}
					<Link to="/register" className="text-[#627C85] underline">
						Sign up
					</Link>
				</span>
			</div>
			<div className="my-auto">
				<img
					src={illustration}
					alt="illustration"
					className="hidden w-[500px] lg:block"
				/>
			</div>
		</div>
	);
}

export default Login;
