import { supabase } from "../supabase/supabaseClient";
import axios from "axios";

export default function PaymentPage() {
  /*
  async function sendTransaction(status) {
    try {
      const { data, error } = await supabase.from("Transactions").insert([
        {
          id: Math.floor(Math.random() * 1000),
          status: status,
          amount: Math.floor(Math.random() * 100),
          merchantName: "Merchant" + Math.floor(Math.random() * 100),
          unixTimestamp: Math.floor(Date.now() / 1000),
        },
      ]);
      if (error) throw error;
    } catch (err) {
      console.error(err.message);
    }
  }
  */
  function getMerchant() {
    const merchants = [
      "Groceries",
      "Shopping",
      "Restaurants",
      "Travel",
      "Transport",
      "Entertainment",
      "Health",
      "General",
    ];
    return merchants[Math.floor(Math.random() * merchants.length)];
  }

  function getTransactionType() {
    const types = ["Web", "Credit", "Debit", "Other"];
    return types[Math.floor(Math.random() * types.length)];
  }

  function getTransactionDevice() {
    const devices = ["Computer", "Phone", "Physical"];
    return devices[Math.floor(Math.random() * devices.length)];
  }

  async function sendTransaction(status) {
    const outData = {
      TransactionId: Math.floor(Math.random() * 10000),
      UserId: 1,
      Fraudulent: status,
      Amount: Math.floor(Math.random() * 100),
      MerchantType: getMerchant(),
      DateTime: Math.floor(Date.now() / 1000),
      TransactionType: getTransactionType(),
      TransactionDevice: getTransactionDevice(),
      LocationId: Math.floor(Math.random() * 100),
      TimeSince: 0,
      MerchantFreq: 0,
    };

    axios
      .post(
        `http://hackathon.settler-slovenia.com/update_user_model`,
        {
          TransactionId: outData.TransactionId,
          UserId: outData.UserId,
          Fraudulent: outData.Fraudulent,
          Amount: outData.Amount,
          MerchantType: outData.MerchantType,
          DateTime: outData.DateTime,
          TransactionType: outData.TransactionType,
          TransactionDevice: outData.TransactionDevice,
          LocationId: outData.LocationId,
          TimeSince: outData.TimeSince,
          MerchantFreq: outData.MerchantFreq,
        },
        { withCredentials: true }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });

    try {
      const { data, error } = await supabase.from("Transaction").insert([
        {
          TransactionId: outData.TransactionId,
          UserId: outData.UserId,
          Fraudulent: outData.Fraudulent,
          Amount: outData.Amount,
          MerchantType: outData.MerchantType,
          DateTime: outData.DateTime,
          TransactionType: outData.TransactionType,
          TransactionDevice: outData.TransactionDevice,
          LocationId: outData.LocationId,
          TimeSince: outData.TimeSince,
          MerchantFreq: outData.MerchantFreq,
        },
      ]);
      if (error) throw error;
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div className="font-oxygen font-bold min-h-screen flex items-center justify-center bg-primary ">
      <div className="flex flex-col">
        <button
          onClick={() => {
            sendTransaction(0);
          }}
          className="bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded mb-4"
        >
          Valid
        </button>
        <button
          onClick={() => {
            sendTransaction(1);
          }}
          className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded"
        >
          Fraudulent
        </button>
      </div>
    </div>
  );
}
