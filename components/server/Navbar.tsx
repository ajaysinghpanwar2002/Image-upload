import { authOptions } from "@/helper/auth";
import { getServerSession } from "next-auth"
import UserAccountNav from "../client/UserAccountNav";

const Navbar: React.FC = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
            <a href="/" className="text-lg font-semibold">Blinkit</a>
            <div>
                {
                    session ? (
                        <UserAccountNav />
                    ) : (
                        <div className="">
                            <a href="/sign-in" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-150 ease-in-out mr-4">SignIn</a>
                            <a href="/sign-up" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-150 ease-in-out ml-4">SignUp</a>
                        </div>
                    )}
            </div>
        </nav>
    );
};

export default Navbar;
