import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<{ email: string }>();
  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("access-token");
      if (!accessToken) return;
      const response = await fetch(
        `http://localhost:1333/api/v1/auth/currentUser`,
        { headers: { "x-access-token": accessToken } }
      );
      const result = await response.json();
      if (result.isSuccess) setCurrentUser(result.data.user);
    })();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Full stack MERN project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome {currentUser ? " " : "to "}
          <a
            className="text-blue-600"
            href="https://github.com/AshirbadGudu/full-stack-mern-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentUser?.email ?? "Full stack MERN project"}
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Click here to{" "}
          {currentUser ? (
            <button
              className="rounded-md bg-gray-100 p-3 font-mono text-lg"
              onClick={() => {
                localStorage.clear();
                setCurrentUser(undefined);
              }}
            >
              logout
            </button>
          ) : (
            <Link href={"/login"}>
              <button className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                login
              </button>
            </Link>
          )}
        </p>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/AshirbadGudu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create by <b>Ashirbad</b>
        </a>
      </footer>
    </div>
  );
};

export default Home;
