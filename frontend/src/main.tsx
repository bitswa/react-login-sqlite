import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './routes/App.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import ErrorPage from './error-page.tsx';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
