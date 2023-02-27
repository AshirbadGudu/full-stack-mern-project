import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { handleError } from "../utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { replace } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const body = JSON.stringify({ email, password });
      const response = await fetch(`http://localhost:1333/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const result = await response.json();
      if (!result.isSuccess) throw new Error(result?.msg);
      localStorage.setItem("access-token", result.data.accessToken);
      replace("/");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <Link href={"/register"}>
          <button className="bg-blue-100 hover:shadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign up
          </button>
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
