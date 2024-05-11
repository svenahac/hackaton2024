import { useState } from "react";

export default function HomePage() {
  return (
    <div className="font-oxygen font-bold min-h-screen flex items-center justify-center bg-primary ">
      <div className="flex flex-col">
        <button className="bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded mb-4">
          Clean
        </button>
        <button className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded">
          Fraudulent
        </button>
      </div>
    </div>
  );
}
