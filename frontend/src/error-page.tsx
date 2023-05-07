import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: unknown = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
