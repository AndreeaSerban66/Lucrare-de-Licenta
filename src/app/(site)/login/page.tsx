"use client";
import Container from "@/app/components/Container";
import LoginPage from "@/app/components/login/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Login() {
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data, status);
  if (status === "loading") {
    return <>Loading...</>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <Container className="bg-pale_dogwood">
      <LoginPage />
    </Container>
  );
}
