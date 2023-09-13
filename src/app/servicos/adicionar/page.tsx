"use client";
import { Menu } from "@/components/Menu";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { setTitle } from "@/data/commom";
import { createService } from "@/services/services/create";
import { FormEvent, useState } from "react";
export default function addServices() {
  const router = useRouter();
  const [inputs, setInputs] = useState<{
    name: string;
    value: number;
    invoice: string;
  }>({ name: "", value: 0, invoice: "" });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createService(inputs)
      .then((data) => {
        setInputs({ name: "", value: 0, invoice: "" });
        alert(data);
      })
      .catch((e) => {
        console.error(e.message);
        alert(e.message);
      });
  }
  return (
    <>
      <Head>
        <title>{setTitle("Adicionar Serviços")}</title>
      </Head>
      <Menu />
      <main className="w-full h-[93vh] p-2 max-w-[400px] m-auto">
        <form
          className="border border-pink-400 h-full rounded-xl p-2 relative"
          onSubmit={handleSubmit}
        >
          <h2 className="text-black text-2xl text-center my-2">
            Adicionar Serviços/Produtos
          </h2>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Nome do Serviço/Produto
            </label>
            <input
              type="text"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              value={inputs.name}
              onChange={(e) => {
                setInputs({ ...inputs, name: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Valor
            </label>
            <input
              type="number"
              value={inputs.value}
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  value: parseInt(e.target.value),
                });
              }}
            />
          </fieldset>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              codigo fiscal
              <span className="text-red-700 text-sm">*caso tenha</span>
            </label>
            <input
              type="text"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              value={inputs.invoice}
              onChange={(e) => {
                setInputs({ ...inputs, invoice: e.target.value });
              }}
            />
          </fieldset>

          <p
            className=" absolute bottom-3 left-3 cursor-pointer"
            onClick={() => router.back()}
          >
            Voltar
          </p>

          <button
            type="submit"
            className="bg-pink-400 p-3 text-white rounded-md absolute bottom-3 right-3 shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-100 hover:text-[1.1em] "
          >
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}
