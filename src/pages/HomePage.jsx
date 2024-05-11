import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { PiVaultBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Transaction from "../components/Transaction";

export default function HomePage() {
  const transactionArray = [
    {
      id: 1,
      status: "Approved",
      amount: 7.45,
      merchantName: "Mercator",
      unixTimestamp: 1706463696,
    },
    {
      id: 2,
      status: "Declined",
      amount: 3.45,
      merchantName: "Spar",
      unixTimestamp: 1707006505,
    },
    {
      id: 3,
      status: "Approved",
      amount: 10.45,
      merchantName: "Lidl",
      unixTimestamp: 1707704110,
    },
    {
      id: 4,
      status: "Approved",
      amount: 5.45,
      merchantName: "Hofer",
      unixTimestamp: 1708373120,
    },
    {
      id: 5,
      status: "Declined",
      amount: 2.45,
      merchantName: "Tuš",
      unixTimestamp: 1708757772,
    },
  ];
  function sortByNewestFirst(array) {
    return array.slice().sort((a, b) => b.unixTimestamp - a.unixTimestamp);
  }

  const sortedTransactions = sortByNewestFirst(transactionArray);

  return (
    <div className="font-oxygen font-bold min-h-screen flex flex-row bg-secondary ">
      <div className="bg-primary w-96 lg:w-1/4 min-h-screen flex flex-col items-center text-white">
        <h1 className="text-4xl mt-32 mb-56">Famnit Bank</h1>
        <div>
          <div className="flex flex-row items-center mb-4">
            <MdDashboard size={36} />
            <p className="text-3xl ml-4">Dashboard</p>
          </div>
          <div className="bg-primaryHighlight rounded-md p-1 mb-4">
            <div className="flex flex-row items-center">
              <GrTransaction size={36} />
              <p className="text-3xl ml-4">Transactions</p>
            </div>
          </div>
          <div className="flex flex-row items-center mb-4 ">
            <PiVaultBold size={36} />
            <p className="text-3xl ml-4">Vault</p>
          </div>
          <div className="flex flex-row items-center mb-4">
            <FaUser size={36} />
            <p className="text-3xl ml-4">Profile</p>
          </div>
          <div className="flex flex-row items-center mb-4">
            <IoSettingsSharp size={36} />
            <p className="text-3xl ml-4">Settings</p>
          </div>
        </div>
      </div>
      <div className="w-3/4 min-h-screen">
        <h1 className="text-5xl text-primary mt-20 ml-8">Transactions</h1>
        <div className="mt-20 ml-8 mr-8">
          <div className="text-3xl mb-3">Transaction History</div>
          {sortedTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
