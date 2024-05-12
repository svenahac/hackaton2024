import { supabase } from "../supabase/supabaseClient";
import axios from "axios";
import { useEffect, useState } from "react";

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

  function reverseTransformations(data) {
    // Define reverse mappings
    const reverseMerchantTypeMapping = {
      Groceries: 1,
      Shopping: 2,
      Restaurants: 3,
      Travel: 4,
      Transport: 5,
      Entertainment: 6,
      Health: 7,
      General: 8,
    };
    const reverseTransactionTypeMapping = {
      Web: 1,
      Credit: 2,
      Debit: 3,
      Other: 4,
    };
    const reverseTransactionDeviceMapping = {
      Computer: 1,
      Phone: 2,
      Physical: 3,
    };

    // Replace the values based on the reverse mapping
    data.forEach((entry) => {
      entry["MerchantType"] = reverseMerchantTypeMapping[entry["MerchantType"]];
      entry["TransactionType"] =
        reverseTransactionTypeMapping[entry["TransactionType"]];
      entry["TransactionDevice"] =
        reverseTransactionDeviceMapping[entry["TransactionDevice"]];
    });

    console.log("Data has been reversed");
  }

  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isFraud, setIsFraud] = useState();

  function applyReverseTransformationsToArray(array) {
    return array.map((data) => {
      // Assuming reverseTransformations is defined elsewhere
      reverseTransformations(data);
      return data;
    });
  }

  useEffect(() => {
    getTransactions();
    getUserInfo();
  }, []);

  async function getTransactions() {
    try {
      const { data, error } = await supabase
        .from("Transaction")
        .select(
          "TransactionId, UserId, Amount, LocationId, DateTime, TimeSince, MerchantFreq, TransactionType, TransactionDevice, MerchantType"
        )
        .order("DateTime", { ascending: false })
        .eq("UserId", 2)
        .limit(9);
      if (error) throw error;
      if (data != null) {
        setTransactions(data);
        console.log(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getUserInfo() {
    try {
      const { data, error } = await supabase
        .from("UserInfo")
        .select("*")
        .eq("id", 2);
      if (error) throw error;
      if (data != null) {
        setUserInfo(data);
        console.log(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

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

  async function generateTransaction(
    TransactionId,
    UserId,
    Amount,
    LocationId,
    DateTime,
    TimeSince,
    MerchantFreq,
    TransactionType,
    TransactionDevice,
    MerchantType
  ) {
    transactions.unshift({
      TransactionId,
      UserId,
      Amount,
      LocationId,
      DateTime,
      TimeSince,
      MerchantFreq,
      TransactionType,
      TransactionDevice,
      MerchantType,
    });
  }

  async function sendTransaction() {
    const outData = {
      TransactionId: Math.floor(Math.random() * 80000),
      UserId: 2,
      Amount: Math.floor(Math.random() * 100),
      MerchantType: getMerchant(),
      DateTime: Math.floor(Date.now() / 1000),
      TransactionType: getTransactionType(),
      TransactionDevice: getTransactionDevice(),
      LocationId: Math.floor(Math.random() * 100),
      TimeSince: 0,
      MerchantFreq: 0,
    };
    /*
    axios
      .post(`http://localhost:5002/update_user_model`, {
        transaction: [
          outData.TransactionId,
          outData.UserId,
          outData.Amount,
          outData.LocationId,
          outData.DateTime,
          outData.TimeSince,
          outData.MerchantFreq,
          outData.MerchantType,
          outData.TransactionType,
          outData.TransactionDevice,
        ],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    */
    axios
      .post(`http://localhost:5002/detect_fraud`, {
        transaction_history: [transactions],
        user_session_id: 1,
        user_model: userInfo,
        class_names: ["Declined", "Approved"],
      })
      .then((response) => {
        console.log(response);
        setIsFraud(response.data);
      })
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

  function genRand() {
    return (
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 60000)) + 60001
    );
  }

  return (
    <div className="font-oxygen font-bold min-h-screen flex items-center justify-center bg-primary ">
      <div className="flex flex-col">
        <button
          onClick={() => {
            generateTransaction(
              genRand(),
              2,
              29.37,
              65,
              1707937439,
              0,
              0,
              1,
              1,
              2
            );
            sendTransaction();
          }}
          className="bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded mb-4"
        >
          Valid
        </button>
        <button
          onClick={() => {
            generateTransaction(
              genRand(),
              2,
              47.56,
              209,
              1707947780,
              0,
              0,
              1,
              2,
              6
            );
            sendTransaction();
          }}
          className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded"
        >
          Fraudulent
        </button>
      </div>
    </div>
  );
}
