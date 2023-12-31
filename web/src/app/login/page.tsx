"use client";
import { MUTATION_LOGIN } from "@/api";
import client from "@/config/client/api";
import { IAuth, useAuth } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type InputLoginData = {
  username: string;
  password: string;
};

const LoginSchema = z.object({
  username: z.string().min(1, { message: "campo username é obrigatório" }),
  password: z.string().min(1, { message: "campo senha é obrigatório" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm<InputLoginData>({ resolver: zodResolver(LoginSchema) });
  const router = useRouter();

  const { createAuth, auth, removeAuth } = useAuth();

  useEffect(() => {
    if (auth) {
      router.push("/admin/profile");
    }
  });

  const onSubmit = async (input: InputLoginData) => {
    console.log("vars", input);
    client
      .mutate({
        mutation: MUTATION_LOGIN,
        variables: {
          login: {
            username: input.username,
            password: input.password,
          },
        },
      })
      .then(({ data: { login } }) => {
        console.log("data", login);
        const newAuth: IAuth = {
          access_token: login.access_token,
          refresh_token: login.refresh_token,
        };
        createAuth(newAuth);
      })
      .catch((err) => {
        console.log("err", err);

        setError("root", { message: err.message });
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className=" w-min-96 w-96 w-max-4/5 bg-white">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    {...register("username")}
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                  {errors.username && (
                    <div className="text-red-500 font-light text-sm mt-3">
                      {errors.username?.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                  {errors.password && (
                    <div className="text-red-500 font-light text-sm mt-3">
                      {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>

              {errors.root && (
                <div>
                  <div className="text-red-500 font-light text-sm mt-3">
                    {errors.root?.message}
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link
                href="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
