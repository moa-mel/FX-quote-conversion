'use client'

import React, { useState } from "react";
import Image from "next/image";
import inimage from "../../public/assests/Section (1).png"

export default function Home() {
  const [currency, setCurrency] = useState({
    sourcecurrency: '',
    destinationcurrency: '',
    amount: ''
  })

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-2xl font-light  text-gray-700">FX Currency Converter</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome! enter your details to convert
          </span>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Source Currency</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-gray-700"
              value={currency.sourcecurrency}
              id="sourcecurrency"
              onChange={(e) => setCurrency({...currency, sourcecurrency: e.target.value})}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Destination Currency</span>
            <input
              type="text"
              value={currency.destinationcurrency}
              id="destinationcurrency"
              onChange={(e) => setCurrency({...currency, destinationcurrency: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-md text-gray-700"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Amount</span>
            <input
              type="number"
              value={currency.amount}
              id="amount"
              onChange={(e) => setCurrency({...currency, amount: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-md text-gray-700"
            />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Convert
          </button>
        </div>

        {/* right side */}
        <div className="relative">
          <Image
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            src={inimage}
            alt="Picture of the author"
          />
        </div>

      </div>
    </main>
  );
}
