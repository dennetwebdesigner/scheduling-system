import { DateContext } from "@/app/home";
import { useContext } from "react";

export default function controlCalender() {
  const date = useContext(DateContext);

  function nextPrevious(bool: boolean) {
    date.setData(bool ? date.data + 1 : date.data - 1);
  }
  return (
    <div className="w-full h-6 p-2 mt-12 flex justify-center items-center">
      <button
        onClick={() => nextPrevious(false)}
        className="text-3xl font-bold  scale-[180%] mx-12 text-[#b84d86]"
      >
        &#10094;
      </button>
      <button
        onClick={() => nextPrevious(true)}
        className="text-3xl font-bold scale-[180%] mx-12 text-[#b84d86]"
      >
        &#10095;
      </button>
    </div>
  );
}
