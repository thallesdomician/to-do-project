"use client";
import { useAuth } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type InputProfileData = {
  username: string;
};
const ProfileSchema = z.object({});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InputProfileData>({ resolver: zodResolver(ProfileSchema) });
  const { auth, removeAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("auth", auth);
    if (!auth) {
      removeAuth();
      router.push("/login");
    }
  });

  const onSubmit = async () => {
    console.log("tentou enviar");
  };

  return (
    <div className="flex flex-row min-w-full ">
      <div className="basis-2/3">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white m-16">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Perfil
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

              {errors.root && (
                <div>
                  <div className="text-red-500 font-light text-sm mt-3">
                    {errors.root?.message}
                  </div>
                </div>
              )}
            </form>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
            <div>teste</div>
          </div>
        </div>
      </div>
      <div className="basis-1/3">
        <div className="fixed">perfil</div>
      </div>
    </div>
  );
}
