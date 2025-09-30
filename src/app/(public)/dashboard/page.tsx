import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";


const Dashboardpage = async() => {
    const session = await getServerSession(authOptions)

    console.log(session);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default  Dashboardpage;