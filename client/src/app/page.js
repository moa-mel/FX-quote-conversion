'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import inimage from "../../public/assests/Section (1).png";
import axios from "axios";

export default function Home() {
  const [currency, setCurrency] = useState({
    sourceCurrency: "",
    destinationCurrency: "",
    amount: ""
  });
  const [convertedAmount, setConvertedAmount] = useState("");
  const [fxQuote, setFxQuote] = useState('');
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = "ca03na188ame03u1d78620de67282882a84";
      const response = await axios.post(
        "http://localhost:3003/convert",
        {
          sourceCurrency: currency.sourceCurrency,
          destinationCurrency: currency.destinationCurrency,
          amount: currency.amount
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
          }
        }
      );
      console.log(response.data);
      setConvertedAmount(response.data.convertedAmount);
      setError('');
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        setError(error.message);
      }
    }
  };

  const fetchFxQuote = async () => {
    try {
      const response = await axios.post('http://localhost:3003/quote');
      const { baseCurrency, quoteCurrency, exchangeRate, timestamp } = response.data;
      const formattedTimestamp = new Date(timestamp).toLocaleString();

      setFxQuote({baseCurrency,
        quoteCurrency,
        exchangeRate,
        timestamp: formattedTimestamp});
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError(error.message);
      }
    }
  };

  // Fetch FX quote when the component mounts
  useEffect(() => {
    fetchFxQuote();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-2xl font-light text-gray-700">FX Currency Converter</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome! Enter your details to convert
          </span>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Source Currency</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-gray-700"
              value={currency.sourceCurrency}
              id="sourceCurrency"
              onChange={(e) => setCurrency({ ...currency, sourceCurrency: e.target.value })}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Destination Currency</span>
            <input
              type="text"
              value={currency.destinationCurrency}
              id="destinationCurrency"
              onChange={(e) => setCurrency({ ...currency, destinationCurrency: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-md text-gray-700"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-400">Amount</span>
            <input
              type="number"
              value={currency.amount}
              id="amount"
              onChange={(e) => setCurrency({ ...currency, amount: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light text-md text-gray-700"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Convert
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        {/* {convertedAmount && (
          <div>
          <p>Converted Amount: {convertedAmount}</p>
          </div>
          )} */}

        {/* right side */}
        <div className="relative">
          <Image
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            src={inimage}
            alt="Picture of the author"
          />
        </div>
      </div>
      {/* Render converted amount */}
      {convertedAmount && (
        <div className="absolute bottom-10 right-10 bg-white p-4 rounded-md shadow-md">
          <p className="text-gray-700">Converted Amount: {convertedAmount}</p>
          {fxQuote && (
            <>
              <p className="text-gray-700">Base Currency: {fxQuote.baseCurrency}</p>
              <p className="text-gray-700">Quote Currency: {fxQuote.quoteCurrency}</p>
              <p className="text-gray-700">Exchange Rate: {fxQuote.exchangeRate}</p>
              <p className="text-gray-700">Timestamp: {fxQuote.timestamp}</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
