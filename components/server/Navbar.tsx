import { authOptions } from "@/helper/auth";
import { getServerSession } from "next-auth"
import LogoutButton from "../client/LogoutButton";
import { HOME_URL, SIGN_IN_URL, SIGN_UP_URL } from "@/constants";

const Navbar: React.FC = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
            <a href={HOME_URL} className="text-lg font-semibold">Blinkit</a>
            <div>
                {
                    session ? (
                        <LogoutButton />
                    ) : (
                        <div className="">
                            <a href={SIGN_IN_URL} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-150 ease-in-out mr-4">SignIn</a>
                            <a href={SIGN_UP_URL} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-150 ease-in-out ml-4">SignUp</a>
                        </div>
                    )}
            </div>
        </nav>
    );
};

export default Navbar;
