import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { PiVaultBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function DashboardPage() {
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
        <h1 className="text-5xl text-primary mt-20 ml-8">Dashboard</h1>
        <div className="mt-20 ml-8 mr-8 h-100 border-2 border-primary rounded-md">
          <h1>Welcome</h1>
        </div>
      </div>
    </div>
  );
}
