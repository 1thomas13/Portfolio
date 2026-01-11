import { useMemo } from "react";

export default function SwitchLang({ size }) {

  return (
    <div
      className={`${size === "xl" ? "text-xl" : ""} text-secondary font-extrabold rounded-full h-full block`}
    >
      <a
        href={'/'}
        className="bg-white/20 text-white/50 py-2 px-4 border-2 border-secondary border-r-0 rounded-l-full"
      >
        ES
      </a>

      <a
        href={'/'}
        className=" py-2 px-4 border-2 border-secondary border-l-0 rounded-r-full"
      >
        EN
      </a>
    </div>
  );
}
