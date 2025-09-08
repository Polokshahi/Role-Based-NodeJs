import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const users = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-[#1d232a]">
      {/* Header */}
      <header className="p-4 bg-[#1d232a] text-yellow-400 text-center font-bold">
        My App Header
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-5">
        <div className="px-5 py-10 bg-[#262626] rounded-xl shadow-lg max-w-5xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">
            Dashboard - All Users
          </h1>

          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              <thead>
                <tr>
                  <th className="text-gray-700">Name</th>
                  <th className="text-gray-700">Email</th>
                  <th className="text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user.image || "https://via.placeholder.com/150"}
                              alt={user.name}
                            />
                          </div>
                        </div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role || "user"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    
    </div>
  );
};

export default Dashboard;
