import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  // const users = useLoaderData();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-black text-2xl font-semibold">
        This Is Dashboard Route
      </h1>
    </div>
  );
};

export default Dashboard;