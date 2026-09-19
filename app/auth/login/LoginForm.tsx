'use client'
import { useState } from "react";
import {
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
    RiArrowRightLine,
    RiGoogleFill,
    RiGithubFill,
    RiLoader2Fill,
} from "@remixicon/react";

import logo from "@/assets/icons/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useLogin } from "@/contexts/authContext/AuthContext";

export default function LoginInForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { login, handleChangeLogin, handleLogin, loginLoading } = useLogin()
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-4">

            <div className="w-full max-w-md">

                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-5 sm:p-6">

                    <div className="flex items-center justify-center mb-6">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                            <Image
                                src={logo}
                                className="w-full h-full object-cover"
                                alt="flow-pilot logo"
                            />
                        </div>

                        <span className="font-bold text-xl tracking-tight text-slate-900 ml-2">
                            FlowPilot
                        </span>
                    </div>

                    <div className="w-full text-center mb-6">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1.5">
                            Welcome back
                        </h1>

                        <p className="text-sm text-slate-500">
                            Sign in to your account to continue to FlowPilot.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleLogin}
                        className="w-full flex flex-col gap-4">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Email address
                            </label>

                            <div className="flex py-1 items-center w-full rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

                                <div className="pl-3 pr-2 text-slate-400">
                                    <RiMailLine className="w-[18px] h-[18px]" />
                                </div>

                                <input
                                    onChange={handleChangeLogin}
                                    name='email'
                                    type="email"
                                    value={login.email}
                                    placeholder="your@company.com"
                                    className="w-full py-2.5 pr-3 text-sm text-slate-900 outline-none bg-transparent placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1.5 font-semibold text-slate-700">
                                Password
                            </label>

                            <div className="flex py-1.5 items-center w-full rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

                                <div className="pl-3 pr-2 text-slate-400">
                                    <RiLockLine className="w-[18px] h-[18px]" />
                                </div>

                                <input
                                    onChange={handleChangeLogin}
                                    value={login.password}
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full py-2.5 text-sm text-slate-900 outline-none bg-transparent placeholder:text-slate-400"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="px-3 text-slate-400 hover:text-slate-600 transition-colors"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <RiEyeOffLine className="w-[18px] h-[18px]" />
                                    ) : (
                                        <RiEyeLine className="w-[18px] h-[18px]" />
                                    )}
                                </button>

                            </div>
                        </div>

                        <div className="flex items-center justify-end -mt-1">
                            <Link
                                href=""
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        {
                            loginLoading ? (
                                <button disabled={loginLoading}
                                    type="submit"
                                    className={"w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 opacity-55 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"}
                                >
                                    <RiLoader2Fill />

                                </button>
                            ) : (
                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center opacity-100 gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
                                >
                                    Sign in

                                    <RiArrowRightLine className="w-5 h-5" />
                                </button>
                            )
                        }


                    </form>

                    <div className="flex items-center w-full pt-5 gap-3">

                        <div className="h-px flex-1 bg-slate-200" />

                        <span className="text-xs font-medium text-slate-400">
                            or continue with
                        </span>

                        <div className="h-px flex-1 bg-slate-200" />

                    </div>

                    <div className="flex items-center w-full pt-3 gap-3">

                        <button
                            className="flex items-center justify-center gap-2 w-1/2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 py-2.5 rounded-xl text-sm font-semibold text-slate-700 transition-all duration-200"
                        >
                            <RiGoogleFill className="w-[18px] h-[18px] text-[#4285F4]" />
                            Google
                        </button>

                        <button
                            className="flex items-center justify-center gap-2 w-1/2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 py-2.5 rounded-xl text-sm font-semibold text-slate-700 transition-all duration-200"
                        >
                            <RiGithubFill className="w-[18px] h-[18px] text-black" />
                            GitHub
                        </button>

                    </div>

                    <p className="pt-5 text-sm text-center text-slate-500">
                        Don&apos;t have an account?{" "}

                        <Link
                            href="/auth/register"
                            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                        >
                            Create one
                        </Link>
                    </p>

                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                    © 2026 FlowPilot. All rights reserved.
                </p>

            </div>
        </div >
    )
}