import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error: any = useRouteError();

	return (
		<div className="flex flex-col gap-8 justify-center items-center h-screen text-center">
			<h1 className="text-4xl font-bold">Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p className="text-slate-400">
				<i>
					{(error as Error)?.message ||
						(error as { statusText?: string })?.statusText}
				</i>
			</p>
		</div>
	);
}
