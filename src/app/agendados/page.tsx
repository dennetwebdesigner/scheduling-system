"use client";
import Head from "next/head";
import { getStorage, setTitle } from "@/data/commom";
import { Menu } from "@/components/Menu";
import { useEffect, useState, useRef } from "react";
import { redirect, useRouter } from "next/navigation";

export default function scheduled() {
  const router = useRouter();
  const items = useRef<HTMLElement>(null);
  const [date, setDate] = useState<{
    day: string;
    month: string;
    year: string;
  }>({ day: "", month: "", year: "" });
  const [dates, setDates] = useState<any[]>([
    {
      services: [
        { name: "Escova", value: 10.5 },
        { name: "Pintura", value: 12.5 },
      ],
      hour: "08:00",
      client: "Joatan Dennet",
      contact: "99 9 9999-9999",
    },
    {
      services: [
        { name: "Escova", value: 10.5 },
        { name: "Pintura", value: 12.5 },
      ],
      hour: "08:00",
      client: "Renata Gabriela",
      contact: "99 9 9999-9999",
    },
  ]);

  function handleClickList(select: string) {
    const children = items.current!.childNodes;
    children.forEach((item: any, index: number) => {
      const dropDown = item!.querySelector("div");
      if (select == item.dataset["id"]) {
        dropDown!.style.display =
          dropDown!.style.display == "block" ? "none" : "block";
        item!.style.border =
          dropDown!.style.display == "block" ? "pink 1px solid" : "none";
      }
    });
  }

  useEffect(() => {
    const initialState = getStorage({ key: "date" });
    if (!initialState) redirect("/");
    setDate(initialState);
  }, []);

  return (
    <>
      <Head>
        <title>{setTitle("Agendados")}</title>
      </Head>
      <Menu />
      <main className="w-full h-[93vh] p-2 max-w-[400px] m-auto ">
        <section className=" w-5/6 m-auto my-1 mb-5 text-center">
          <p
            onClick={() => router.push("/agendados/adicionar")}
            className="border-b-2 pb-2  border-pink-300 text-2xl text-pink-500"
          >
            Agendar Cliente
          </p>
        </section>
        <div className="flex justify-between text-center items-center p-2 bg-[#f1f1f1] w-[94%] m-auto rounded-lg px-3 my-2 text-xl text-[#b84d86]">
          <div>
            <p onClick={() => router.back()}>voltar</p>
          </div>
          <div className="flex">
            <div className="m-auto mr-2">{date.day}</div>
            <div className="m-auto mr-2">{date.month}</div>
            <div className="m-auto ">{date.year}</div>
          </div>
        </div>
        <section
          ref={items}
          className="flex  flex-wrap flex-col overflow-y-auto mx-auto p-2 bg-[#f1f1f1] w-[97%] h-[72vh] max-w-[400px] rounded-lg px-3 my-2 text-md text-[#b84d86]"
        >
          <article
            data-id="d-none"
            className="w-full h-10 mb-2 py-3 flex justify-around"
          >
            <p className="h-10 text-left flex-1">Clientes</p>
            <p className="h-10 flex-1 text-center">Horário</p>
          </article>
          {dates.map((d, i) => (
            <article
              onClick={() => handleClickList(`${d.client}-${d.hour}`)}
              className="w-full min-h-10 mb-2 px-3 pt-3 flex flex-wrap justify-around  rounded-md"
              key={i}
              data-id={`${d.client}-${d.hour}`}
            >
              <p className="h-6 text-left flex-1">{d!.client}</p>
              <p className="h-6 flex-1 text-center">{d!.hour}</p>
              <div
                className=" w-full p-1 py-2 rounded-md"
                style={{ display: "none" }}
              >
                <p>contato: {d.contact}</p>
                <p>
                  Serviços:
                  {d.services.map((ds: any, di: number) => (
                    <span key={`s-${di}`} className="ml-1">
                      {ds.name}
                      {di < d.services.length - 1 ? "," : ""}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
