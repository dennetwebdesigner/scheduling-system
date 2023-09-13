"use client";
import Link from "next/link";
import Image from "next/image";
import menuIcon from "../../public/menuIcon.png";
import { useState } from "react";

export function Menu() {
  const [isOpen, setIsOpen] = useState<string>("-100%");
  function handleMenu(open: boolean) {
    if (open) {
      setIsOpen("0%");
      return;
    }

    setIsOpen("-100%");
  }
  return (
    <>
      <nav
        style={{ left: isOpen, transition: ".5s" }}
        className="absolute w-full h-screen z-10 bg-white p-2"
      >
        <article className="flex justify-end">
          <p
            className="text-2xl text-red-500 font-bold"
            onClick={() => handleMenu(false)}
          >
            x
          </p>
        </article>
        <article className="text-xl p-1">
          <Link href="/">Inicio</Link>
        </article>
        <article className="text-xl p-1">
          <Link href="/servicos">Serviços</Link>
        </article>
        <article className="text-xl p-1">
          <Link href="/">Sair</Link>
        </article>
      </nav>
      <header className="flex justify-between w-full max-w-[400px] items-center px-2 pt-2 mx-auto">
        <section className="flex-1">
          <Image
            src={menuIcon}
            alt="Menu icone"
            className="w-10"
            onClick={() => handleMenu(true)}
          />
        </section>
        <h1 className="flex-1 text-center">Agendamento</h1>
        <div className="flex-1"></div>
      </header>
    </>
  );
}
