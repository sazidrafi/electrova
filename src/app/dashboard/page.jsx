"use client";
import { ThemeSwitch } from "@/Components/ThemeSwitch";
import { Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin"); // redirect to login page
        },
      },
    });
  };
  return (
    <div className="container mx-auto m-10 p-5">
      <h2>This is dashboard page!</h2>
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
};

export default DashboardPage;
