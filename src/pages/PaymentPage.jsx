import { supabase } from "../supabase/supabaseClient";

export default function PaymentPage() {
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

  return (
    <div className="font-oxygen font-bold min-h-screen flex items-center justify-center bg-primary ">
      <div className="flex flex-col">
        <button
          onClick={() => {
            sendTransaction("Approved");
          }}
          className="bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 border-b-4 border-lime-700 hover:border-lime-500 rounded mb-4"
        >
          Valid
        </button>
        <button
          onClick={() => {
            sendTransaction("Declined");
          }}
          className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded"
        >
          Fraudulent
        </button>
      </div>
    </div>
  );
}
