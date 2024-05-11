import React, { useEffect, useState } from "react";

export default function Transaction({ transaction }) {
  const [color, setColor] = useState("text-secondaryHighlight");

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date +
      " " +
      month +
      " " +
      year +
      " " +
      a.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    return time;
  }

  useEffect(() => {
    if (transaction.status === "Approved") {
      setColor("text-green ");
    } else {
      setColor("text-red");
    }
  }, []);

  return (
    <div className="text-secondaryHighlight text-xl font-bold flex flex-row items-center justify-between bg-white p-4 rounded-lg mb-4">
      <p className="w-1/4">{transaction.merchantName}</p>
      <p className="w-1/4">{timeConverter(transaction.unixTimestamp)}</p>
      <p className="w-1/4">{transaction.amount}€</p>
      <p className={color}>{transaction.status}</p>
    </div>
  );
}
