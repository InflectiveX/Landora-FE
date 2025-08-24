import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const user =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user"))
          : null;
      router.replace(
        token
          ? user.role === "admin"
            ? "/admin/dashboard"
            : user.role === "citizen"
            ? "/citizen/dashboard"
            : "/officer/dashboard"
          : "/login"
      );
    } catch {
      router.replace("/login");
    }
  }, [router]);
  return null;
}
