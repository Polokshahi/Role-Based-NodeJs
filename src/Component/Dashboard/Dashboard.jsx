import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const users = useLoaderData();
  console.log(users);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d232a]">
      <div className="px-5 py-10 bg-[#262626] rounded-xl shadow-lg max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Dashboard - All Users
        </h1>

        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="text-gray-700">Name</th>
                <th className="text-gray-700">Email</th>
                <th className="text-gray-700">Role</th>
              </tr>
            </thead>

            {/* Table Body */}
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
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
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
    </div>
  );
};

export default Dashboard;
