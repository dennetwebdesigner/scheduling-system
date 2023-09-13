"use client";
import Image from "next/image";
import Trash from "../../../public/trash.png";
import Edit from "../../../public/edit.png";
import { Menu } from "@/components/Menu";
import Link from "next/link";
import Head from "next/head";
import { setTitle } from "@/data/commom";
import { useEffect, useState } from "react";
import { findAllServicesByUser } from "@/repositories/ServicesRepositories";

export default function services() {
  const [allServices, setAllServices] = useState<any[]>([]);
  useEffect(() => {
    findAllServicesByUser().then((data) => {
      console.log(data);
      
      setAllServices(data)
    });
  }, []);
  return (
    <>
      <Head>
        <title>{setTitle("Serviços")}</title>
      </Head>
      <Menu />
      <main className="w-full h-[93vh] p-2 max-w-[400px] m-auto ">
        <section className="my-1 mb-5 text-center">
          <Link
            href="/servicos/adicionar"
            className="border-b-2 pb-2  border-pink-300 text-2xl text-pink-500"
          >
            Adicionar Novo Serviço
          </Link>
        </section>
        <ul>
          <li className="flex w-full justify-between p-2 font-semibold">
            <span className="w-[50%]">Serviço</span>
            <span className="w-[20%]">Valor</span>
            <div className="w-[30%]"></div>
          </li>
          {allServices.map((item, index) => (
            <li className="flex w-full justify-between p-2" key={index}>
              <span className="w-[50%]">{item!.name}</span>
              <span className="w-[20%]"> {item!.value} R$</span>
              <div className="flex w-[30%] justify-end">
                <Image className="w-8 " src={Edit} alt="editar" />
                <Image className="w-8 " src={Trash} alt="lixeira" />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
