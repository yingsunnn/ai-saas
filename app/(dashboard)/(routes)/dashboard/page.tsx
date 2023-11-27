import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <div>
      <p className="text-6xl text-green-500">Hello home page</p>
      <UserButton />
    </div>
  );
}

export default DashboardPage;
