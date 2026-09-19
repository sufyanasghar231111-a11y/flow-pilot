"use client";

import { useState } from "react";
import {
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
    RiArrowRightLine,
    RiUserLine,
} from "@remixicon/react";

import logo from "@/assets/icons/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRegister } from "@/contexts/authContext/AuthContext";

export default function RegisterForm() {

    const { register, setRegister, handleSubmit, handleRegisterChange } = useRegister()

    const [showPassword, setShowPassword] = useState(false);

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
                        className="w-full flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Full Name
                            </label>

                            <div className="flex py-1 items-center w-full rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

                                <div className="pl-3 pr-2 text-slate-400">
                                    <RiUserLine className="w-[18px] h-[18px]" />
                                </div>

                                <input
                                    onChange={handleRegisterChange}
                                    value={register.username}
                                    name="username"
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full py-2.5 pr-3 text-sm text-slate-900 outline-none bg-transparent placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Email address
                            </label>

                            <div className="flex py-1 items-center w-full rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">

                                <div className="pl-3 pr-2 text-slate-400">
                                    <RiMailLine className="w-[18px] h-[18px]" />
                                </div>

                                <input
                                    onChange={handleRegisterChange}
                                    value={register.email}
                                    name="email"
                                    type="email"
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
                                    onChange={handleRegisterChange}
                                    value={register.password}
                                    name="password"
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

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
                        >
                            Create account

                            <RiArrowRightLine className="w-5 h-5" />
                        </button>

                    </form>

                    <p className="pt-5 text-sm text-center text-slate-500">
                        Already have an account?{" "}

                        <Link
                            href="/auth/login"
                            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                    © 2026 FlowPilot. All rights reserved.
                </p>

            </div>
        </div>
    );
}
