import DisplayImage from "@/components/client/DisplayImage";
import ImageUpload from "@/components/client/ImageUpload";
import { authOptions } from "@/helper/auth";
import { getServerSession } from "next-auth";

const LoginPage = () => (
  <div className="flex justify-center items-center min-h-screen p-4">
    <h1 className="absolute z-10 top-60 font-bold text-2xl font-sans text-opacity-80 antialiased tracking-wide">Login to upload/view Images</h1>
    <DisplayImage userEmail="" />
  </div>
);

type Session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

const UserPage = ({ session }: { session: Session }) => (
  <div className="max-w-4xl mx-auto p-4 space-y-6">
    <h1 className="text-2xl font-semibold text-gray-800">Welcome {session?.user?.name}</h1>
    <ImageUpload userEmail={session?.user?.email ?? ''} />
    <DisplayImage userEmail={session?.user?.email ?? ''} />
  </div>
);

async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginPage />;
  }

  return <UserPage session={session} />;
}

export default HomePage;