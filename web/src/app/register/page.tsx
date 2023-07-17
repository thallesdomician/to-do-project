"use client";
import { MUTATION_REGISTER } from "@/api/mutation";
import client from "@/config/client/api";
import { IAuth, useAuth } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type InputsData = {
  username: string;
  password: string;
  repeatPassword: string;
};
const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "campo username é obrigatório" })
      .min(6, { message: "mínimo 6 caracteres" }),
    password: z
      .string()
      .min(1, { message: "campo senha é obrigatório" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          "precisa ter no mínimo 8 caracteres, letras, números e caracteres especiais",
      }),
    repeatPassword: z
      .string()
      .min(1, { message: "campo Repetir senha é obrigatório" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "senhas precisam ser iguais",
    path: ["repeatPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm<InputsData>({ resolver: zodResolver(RegisterSchema) });
  const router = useRouter();
  const { createAuth, auth } = useAuth();

  useEffect(() => {
    if (auth) router.push("/profile");
  });

  const onSubmit = async (input: InputsData) => {
    client
      .mutate({
        mutation: MUTATION_REGISTER,
        variables: {
          register: {
            password: input.password,
            username: input.username,
          },
        },
      })
      .then(({ data: { register } }) => {
        const newAuth: IAuth = {
          access_token: register.access_token,
          refresh_token: register.refresh_token,
        };
        createAuth(newAuth);
        router.push("/profile");
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
              Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    {...register("username")}
                    type="string"
                    autoComplete="username"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3"
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
                    Senha
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                  />
                  {errors.password && (
                    <div className="text-red-500 font-light text-sm mt-3">
                      {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Repetir Senha
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="repeatPassword"
                    {...register("repeatPassword")}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3"
                  />
                  {errors.repeatPassword && (
                    <div className="text-red-500 font-light text-sm mt-3">
                      {errors.repeatPassword?.message}
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
                  Registrar
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Login?
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
