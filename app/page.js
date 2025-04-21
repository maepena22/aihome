"use client"
import { useEffect, useState } from "react";

const services = {
  "Invoice AI": "https://0vdbxrng-3004.asse.devtunnels.ms/",
  "Receipt AI": "https://0vdbxrng-3000.asse.devtunnels.ms/",
  "KPI Tracker": "https://0vdbxrng-3002.asse.devtunnels.ms/",
  "Business Card AI": "https://0vdbxrng-3001.asse.devtunnels.ms/",
  "Sales Assessment AI": "https://0vdbxrng-3003.asse.devtunnels.ms/",
};

export default function Home() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const entries = Object.entries(services);
      const results = await Promise.all(
        entries.map(async ([name, url]) => {
          try {
            await fetch(url, { method: "HEAD", mode: "no-cors" });
            return [name, true];
          } catch {
            return [name, false];
          }
        })
      );
      setStatus(Object.fromEntries(results));
      setLoading(false);
    };
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-[#f8fafc] border-2 border-red-500 shadow-xl rounded-3xl p-10 max-w-lg w-full">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl font-extrabold text-red-500 text-center">AI Services</h1>
          <p className="text-lg text-gray-700 text-center">
            Select an AI-powered tool below. Offline services are disabled.
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <svg className="animate-spin h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          ) : (
            <div className="flex flex-col space-y-5 w-full">
              {Object.entries(services).map(([name, url]) => {
                const isOnline = status[name] !== false;
                return (
                  <a
                    key={name}
                    href={isOnline ? url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-8 py-5 rounded-2xl text-xl font-bold transition-all duration-200 shadow-lg
                      ${isOnline
                        ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer scale-100 hover:scale-105"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                      }`}
                    style={{ pointerEvents: isOnline ? "auto" : "none" }}
                    aria-disabled={!isOnline}
                  >
                    <span>{name}</span>
                    <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold
                      ${isOnline ? "bg-green-100 text-green-700 border border-green-500" : "bg-gray-200 text-gray-500"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}