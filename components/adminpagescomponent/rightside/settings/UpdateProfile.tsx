"use client"
import { Names } from "@/components/nameComponent/Names";
import { useAuth, useUpdate } from "@/contexts/authContext/AuthContext";
import { RiDeleteBackLine, RiImageAddLine, RiUser3Line } from "@remixicon/react";
import { useEffect } from "react";

export default function UpdateProfile() {
    const { user, setUser } = useAuth()
    const { handleUpdate, setUpdateEmail, setUpdatePfp, setUpdateUsername, updateEmail, updateUsername, updatePreview, setUpdatePreview,
        pfpType, pfpSize, alreadyExist, setAlreadyExist, setPfpSize, setPfpType, setRemovePfp
    } = useUpdate()


    useEffect(() => {
        if (user) {
            setUpdateEmail(user.email)
            setUpdateUsername(user.username)
        }
    }, [setUpdateEmail, setUpdateUsername, user])

    return (
        <div className="mb-4 mt-3 w-full rounded-2xl border border-[#292E40] bg-gradient-to-b from-[#191D2B] to-[#141722] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] sm:p-6 lg:w-[45%]">
            <div className="flex items-center gap-3 border-b border-[#292E40] pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 shadow-[0_0_18px_rgba(59,130,246,0.08)]">
                    <RiUser3Line className="text-blue-400" size={21} />
                </div>

                <div className="min-w-0">
                    <h1 className="text-sm font-semibold tracking-wide text-white">
                        Profile information
                    </h1>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                        Update your personal details and profile picture
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 pt-7">
                <div className="flex flex-col items-center">

                    <label className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-2 border-[#343B52] bg-[#202638] shadow-[0_0_25px_rgba(59,130,246,0.12)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_28px_rgba(59,130,246,0.25)]">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(elem) => {
                                const file = elem.target.files?.[0];
                                if (file) {
                                    setUpdatePfp(file);
                                    setUpdatePreview(URL.createObjectURL(file));
                                    setRemovePfp(false)
                                }
                                setPfpType(false)
                                setPfpSize(false)
                            }}
                        />

                        {(updatePreview || user?.pfp) && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={updatePreview || user?.pfp}
                                src={updatePreview || user?.pfp}
                                alt="Profile picture"
                                className="absolute inset-0 z-10 h-full w-full object-cover"
                            />
                        )}

                        <div className="absolute inset-0 z-0 flex items-center justify-center bg-blue-900">
                            {user?.username && (
                                <Names userName={user.username} />
                            )}
                        </div>

                        {
                            updatePreview ? (<div onClick={(e) => {
                                setUpdatePreview(null)
                                e.preventDefault()
                                e.stopPropagation()
                                setUpdatePfp(null)
                                setRemovePfp(true)
                            }} className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-black/65 text-white opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                                <RiDeleteBackLine size={24} />
                                <span className="text-[10px] font-semibold tracking-wide">
                                    Remove Photo
                                </span>
                            </div>) : (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-black/65 text-white opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                                    <RiImageAddLine size={24} />
                                    <span className="text-[10px] font-semibold tracking-wide">
                                        Change photo
                                    </span>
                                </div>
                            )
                        }
                    </label>

                    <p className="pb-1 pt-3 text-xs text-gray-500">
                        Click to upload a new photo
                    </p>

                    {pfpSize && (
                        <p className="mt-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                            Image must be less than 2 MB
                        </p>
                    )}

                    {pfpType && (
                        <p className="mt-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                            Only JPEG, PNG, and WebP images are allowed
                        </p>
                    )}
                </div>

                <div className="w-full px-0 sm:px-3">
                    <div className="mb-5">
                        <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-300">
                            Username
                        </label>
                        <input
                            onChange={(elem) => {
                                setUpdateUsername(elem.target.value);
                            }}
                            value={updateUsername}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full rounded-xl border border-[#30364A] bg-[#10131E] px-4 py-3 text-sm text-gray-100 outline-none transition-all duration-200 placeholder:text-gray-600 hover:border-[#454D65] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-300">
                            Email address
                        </label>
                        <input
                            onChange={(elem) => {
                                setUpdateEmail(elem.target.value);
                                setAlreadyExist(false)
                            }}
                            value={updateEmail}
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full rounded-xl border bg-[#10131E] px-4 py-3 text-sm text-gray-100 outline-none transition-all duration-200 placeholder:text-gray-600 hover:border-[#454D65] focus:ring-4 focus:ring-blue-500/10 ${alreadyExist
                                ? "border-red-500/60 focus:border-red-500"
                                : "border-[#30364A] focus:border-blue-500"
                                } `}
                        />

                        {alreadyExist && (
                            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-red-400">
                                This email address is already in use.
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.18)] transition-all duration-200 hover:border-blue-300/40 hover:bg-blue-500 hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)] active:scale-[0.99]"
                    >
                        Update profile
                    </button>
                </div>
            </div>
        </div>

    )
}