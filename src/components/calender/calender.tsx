"use client";
import { useContext, useEffect, useRef } from "react";
import { DateContext } from "@/app/home";
import { setStorage } from "@/data/commom";
import { useRouter } from "next/navigation";
export default function calender() {
  const router = useRouter();
  const { monthName, year, itemList, setItemList, setSelectDay, selectDay } =
    useContext(DateContext);
  const listDaysEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (itemList[0]?.indexDay != 1) {
      setItemList((state: any) => [
        { nameDay: "", day: "", indexDay: itemList[0]?.indexDay - 1 },
        ...state,
      ]);
    }
  }, [itemList]);

  function handleClickDay(date: { day: string; year: string; month: string }) {
    setSelectDay(date);
    setStorage({ key: "date", data: date });
    router.push("/agendados");
  }

  useEffect(() => {
    const children = listDaysEl.current!.childNodes;
    const checkDay = `${selectDay.day}-${selectDay.month}-${selectDay.year}`;
    children.forEach((item: any, i) => {
      if (item.dataset["id"] == checkDay) {
        item.style.borderBottom = "2px solid #C65A86";
      } else {
        item.style.borderBottom = "2px solid #c1c1c1";
      }
    });
  }, [selectDay]);
  return (
    <>
      <div className="w-full max-w-[400px] m-auto">
        <div className="flex text-center items-center p-2 bg-[#f1f1f1] w-[97%] m-auto rounded-lg px-3 my-2 text-xl text-[#b84d86]">
          <div className=" m-auto mr-2">{monthName}</div>
          <div className="m-auto ">{year}</div>
        </div>
        <ul className="flex flex-wrap text-center items-center p-2 bg-[#f1f1f1] w-[90%] mx-auto rounded-tl-lg rounded-tr-lg mt-2 text-xl text-[#b84d86]">
          <li className="w-[13.5%]">S</li>
          <li className="w-[13.5%]">T</li>
          <li className="w-[13.5%]">Q</li>
          <li className="w-[13.5%]">Q</li>
          <li className="w-[13.5%]">S</li>
          <li className="w-[13.5%]">S</li>
          <li className="w-[13.5%]">D</li>
        </ul>
        <div
          className="flex flex-wrap p-1 w-[90%] mx-auto h-[55vh] place-items-start bg-[#f1f1f1]"
          ref={listDaysEl}
        >
          {itemList.map((item: any, index: number) => (
            <div
              className="flex items-center w-[13.5%] min-h-[60px] p-1 hover:cursor-pointer "
              style={{ borderBottom: "1px solid #c1c1c1" }}
              key={index}
              onClick={() =>
                handleClickDay({ day: item.day, year, month: monthName })
              }
              data-id={`${item.day}-${monthName}-${year}`}
            >
              <span className="w-full block text-center text-[1.6em] text-black">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
