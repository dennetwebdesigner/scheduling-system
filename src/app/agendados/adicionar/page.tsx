"use client";
import { Menu } from "@/components/Menu";
import { redirect, useRouter } from "next/navigation";
import Head from "next/head";
import { getStorage, setTitle } from "@/data/commom";
import { useEffect, useState } from "react";

export default function addServices() {
  const router = useRouter();
  const [services, setServices] = useState<{ name: string; value: number }[]>([
    { name: "Escova", value: 10.5 },
    { name: "Chapinha", value: 10.5 },
  ]);
  const [time, setTime] = useState(null);

  const [displayComplet, setDisplayComplet] = useState<string>("none");

  const [allServices, setAllServices] = useState<
    { name: string; value: number; invoice: string }[]
  >([]);

  const [date, setDate] = useState<{
    day: string;
    month: string;
    year: string;
  }>({ day: "", month: "", year: "" });

  function handleRemoveService(index: number) {
    const left = [...services];
    left.splice(index, 1);
    setServices(left);
  }

  function getBDServices(value: string) {
    const bdServices: { name: string; value: number; invoice: string }[] = [
      { name: "Escova", value: 10.5, invoice: "0000000000000" },
      { name: "Chapinha", value: 10.5, invoice: "0000000000000" },
      { name: "Pintura", value: 10.5, invoice: "0000000000000" },
      { name: "Luzes", value: 10.5, invoice: "0000000000000" },
      { name: "Hidratação", value: 10.5, invoice: "0000000000000" },
      { name: "Alizamento", value: 10.5, invoice: "0000000000000" },
    ];
    const finders = bdServices.filter((item) => item.name.includes(value));
    const result = finders.length <= 0 ? [] : finders;
    setAllServices(result);
    return result;
  }

  useEffect(() => {
    const initialState = getStorage({ key: "date" });
    if (!initialState) redirect("/");
    setDate(initialState);
  }, []);

  return (
    <>
      <Head>
        <title>{setTitle("Adicionar Agendamento")}</title>
      </Head>
      <Menu />
      <main className="w-full h-[93vh] p-2 max-w-[400px] m-auto">
        <form className="border border-pink-400 h-full rounded-xl p-2 px-4 relative overflow-y-auto">
          <h2 className="text-black text-md text-center my-2">
            Agendando - {date.day} {date.month} {date.year}
          </h2>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Nome do Cliente
            </label>
            <input
              type="text"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
            />
          </fieldset>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Horário
            </label>
            <input
              type="time"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
            />
          </fieldset>
          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Contato
            </label>
            <input
              type="phone"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
            />
          </fieldset>

          <fieldset className="w-full flex flex-wrap mt-2 relative">
            <label htmlFor="" className="pl-2 pb-1">
              Serviços/Produtos
              {/* <span className="text-red-700 text-sm">*caso tenha</span> */}
            </label>
            <input
              type="text"
              className="w-full h-10 p-1 text-lg shadow-md rounded-xl"
              onChange={(e) => {
                clearTimeout(time as any);
                setDisplayComplet("none");
                setTime(
                  setTimeout(() => {
                    const data = getBDServices(e.target.value);
                    if (data.length >= 1) setDisplayComplet("block");
                  }, 1000) as any
                );
              }}
            />
            <section
              style={{ display: displayComplet }}
              className="w-full h-32 flex flex-wrap text-black bg-white rounded-md p-2 mt-2 overflow-y-auto"
            >
              {allServices.map((services, index) => (
                <div
                  className="w-full p-2 flex justify-around "
                  key={index}
                  onClick={() => {
                    setServices((state) => [
                      ...state,
                      { name: services.name, value: services.value },
                    ]);
                    setDisplayComplet("none");
                  }}
                >
                  <p>{services.name}</p>
                  <p>{services.value}R$</p>
                </div>
              ))}
            </section>
          </fieldset>

          <fieldset className="w-full flex flex-wrap mt-2">
            <label htmlFor="" className="pl-2 pb-1">
              Serviços escolhidos
            </label>
            <section className="w-full h-32 flex flex-wrap text-black bg-white rounded-md p-2 ">
              {services.map((item, index) => (
                <p
                  key={index}
                  className="border border-slate-500 p-1 rounded-lg m-1 h-8 hover:bg-pink-400 hover:cursor-pointer hover:text-slate-600"
                  onClick={() => handleRemoveService(index)}
                >
                  {item.name}
                </p>
              ))}
            </section>
          </fieldset>

          <footer className="w-full flex justify-between items-center my-2 mt-4">
            <p className="cursor-pointer" onClick={() => router.back()}>
              Voltar
            </p>

            <button
              type="submit"
              className="bg-pink-400 p-3 text-white rounded-md  shadow-sm shadow-black hover:shadow-md hover:shadow-black duration-100 hover:text-[1.1em] "
            >
              Cadastrar
            </button>
          </footer>
        </form>
      </main>
    </>
  );
}
