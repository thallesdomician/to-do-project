import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 ">
       <Link href={"/register"} >Register</Link>
       <Link href={"/login"} >Login</Link>
    </main>
  );
}
