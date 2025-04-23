import { FaCheckDouble } from "react-icons/fa";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <FaCheckDouble className="text-2xl size-7 md:size-9 grid place-content-center p-2 text-white bg-primary rounded-lg" />
      <h1 className="text-2xl md:text-[35px] font-bold">
        <span className="text-primary">Rapid</span> Task
      </h1>
    </div>
  );
};
