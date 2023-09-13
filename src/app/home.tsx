"use client";
import { useEffect, useState, createContext } from "react";
import ControlCalender from "@/components/calender/controlCalender";
import { dateMonth, dateDay, Dictionary } from "../data/date";
import Calender from "@/components/calender/calender";
import { Menu } from "@/components/Menu";
export const DateContext = createContext<any>(null);

export default function home() {
  const [date, setDate] = useState<Date>(new Date());
  let [data, setData] = useState<number>(1);
  const [itemList, setItemList] = useState<
    { day: string; nameDay: string; indexDay: number }[]
  >([]);
  const [Months, setMonths] = useState<Dictionary<string>>(dateMonth);
  const [Days, setDays] =
    useState<Dictionary<{ name: string; index: number }>>(dateDay);
  const [monthName, setMonthName] = useState<string>("");
  const [year, setYear] = useState<number>(0);

  const [selectDay, setSelectDay] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  function getLastDay() {
    //((1 - 8) + 1)
    const dataMonth = new Date(date.getFullYear(), date.getMonth() + data, 0)
      .toString()
      .split(" ");
    return {
      dayname: dataMonth[0],
      month: dataMonth[1],
      days: dataMonth[2],
      year: dataMonth[3],
    };
  }

  function getNameDay(month: number, day: any) {
    return new Date(date.getFullYear(), month, day).toString().split(" ")[0];
  }

  function setInfoCalender(month: string, year: any) {
    setMonthName(Months[month]);
    setYear(year);
  }

  async function showDays(month: any, totalDays: any) {
    setItemList([]);
    let fIndex = Object.keys(Months).findIndex((item) => month == item);
    for (let index = 0; index < totalDays; index++) {
      const nameday = getNameDay(fIndex, index + 1);

      setItemList((items) => [
        ...items,
        {
          day: (index + 1) as any as string,
          nameDay: Days[nameday].name,
          indexDay: Days[nameday].index,
        },
      ]);
    }
  }

  useEffect(() => {
    let lastDay = getLastDay();
    setInfoCalender(lastDay.month, lastDay.year);
    showDays(lastDay.month, lastDay.days);
  }, [data]);

  return (
    <DateContext.Provider
      value={{
        setData,
        data,
        monthName,
        year,
        itemList,
        setItemList,
        setSelectDay,
        selectDay,
      }}
    >
      <Menu />
      <Calender />
      <ControlCalender />
      <main className="max-w-[400px] mx-auto mt-10 bg-[#f1f1f1] p-2">
        <section className="w-full">
          <h2 className="m-2 text-xl">
            Serviços {selectDay?.day ? selectDay?.day + " de " : ""}{" "}
            {selectDay?.month}
          </h2>
          <article className="flex w-full">
            <div className="w-3/6 px-2 border text-center py-1">Nome</div>
            <div className="w-3/6 px-2 border text-center py-1">Horas</div>
          </article>
          <article className="flex w-full">
            <div className="w-3/6 px-2 border text-center py-1">
              joatan Dennet
            </div>
            <div className="w-3/6 px-2 border text-center py-1">12:30</div>
          </article>
        </section>
      </main>
    </DateContext.Provider>
  );
}
