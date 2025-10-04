import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name || "User";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-gray-800">
      <div className="text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">
          Welcome back, <span className="text-main">{username}</span> 👋
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your projects, blogs, and personal updates all from one place.
        </p>
      </div>
    </main>
  );
};

export default DashboardPage;
