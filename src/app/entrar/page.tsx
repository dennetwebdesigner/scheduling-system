"use client";
import { Menu } from "@/components/Menu";
import Head from "next/head";
import { setTitle } from "@/data/commom";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login as authLogin } from "@/repositories/authRepository";
export default function login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      alert("Os campos precisam ser preenchidos!");
      return;
    }

    authLogin(email, password);
  }
  return (
    <>
      <Head>
        <title>{setTitle("Entrar")}</title>
      </Head>
      <main className="w-full h-[93vh] p-2 max-w-[400px] m-auto ">
        <form
          className="border border-pink-400 h-full rounded-xl p-2 relative pt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black text-2xl text-center my-2">
            Agendamento - Entrar
          </h2>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
          </fieldset>

          <p
            className=" absolute bottom-3 left-3 cursor-pointer"
            onClick={() => router.push("cadastrar")}
          >
            Cadastrar
          </p>

          <button
            type="submit"
            className="bg-pink-400 p-3 text-white rounded-md absolute bottom-3 right-3 shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-100 hover:text-[1.1em] "
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
}
