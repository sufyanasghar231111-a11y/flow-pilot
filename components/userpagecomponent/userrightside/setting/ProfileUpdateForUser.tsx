"use client"
import { Names } from "@/components/nameComponent/Names";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useUserUpdate } from "@/contexts/userMemberContext/UserMemberContext";
import { RiDeleteBackLine, RiImageAddLine, RiUser3Line } from "@remixicon/react";
import { useEffect } from "react";

export default function ProfileUpdateForUser() {
    const { user } = useAuth()
    const { userEmail, userName, removePfp, setRemovePfp, setUserEmail, setUserName, setUserPfp, UserUpdatePfp, userPreview, setUserPreview,
        errorType, errorPfpSize, errorEmailExist, setErrorType, setErrorEmailExist, setErrorPfpSize
    } = useUserUpdate()


    useEffect(() => {
        if (user) {
            setUserEmail(user?.email ?? '')
            setUserName(user?.username ?? '')
        }
    }, [setUserEmail, setUserName, user])

    return (
        <div className="w-[50%]   p-4 rounded-2xl border border-[#292E40] bg-gradient-to-b from-[#191D2B] to-[#141722]  shadow-[0_8px_30px_rgba(0,0,0,0.18)] ">
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

            <div className="flex flex-col items-center justify-center gap-5 pt-7">
                <div className="flex flex-col gap-2 items-center">
                    <label className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-2 border-[#343B52] bg-[#202638] shadow-[0_0_25px_rgba(59,130,246,0.12)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_28px_rgba(59,130,246,0.25)]">
                        <input onChange={(elem) => {
                            const file = elem.target.files?.[0]
                            if (file) {
                                setUserPfp(file)
                                setUserPreview(URL.createObjectURL(file))
                                setRemovePfp(false)
                                setErrorType(false)
                                setErrorPfpSize(false)
                            }

                        }} type="file" accept="image/*" className="hidden" />
                        {
                            (userPreview || user?.pfp) && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={userPreview || user?.pfp} key={userPreview || user?.pfp} className="w-full h-full absolute z-10 object-cover" alt="user-pfp" />
                            )
                        }
                        <div className="flex items-center justify-center  z-0 text-lg absolute w-full h-full ">
                            {
                                user?.username && (
                                    <Names userName={user?.username} />
                                )
                            }

                        </div>

                        {
                            userPreview ? (<div onClick={(e) => {
                                setUserPreview(null)
                                e.preventDefault()
                                e.stopPropagation()
                                setUserPfp(null)
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
                    <p className="pt-2 pb-3  text-xs text-gray-500">
                        Click to upload a new photo
                    </p>

                    {
                        errorPfpSize && (
                            <p className="mt-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                                Image must be less than 2 MB
                            </p>
                        )
                    }

                    {
                        errorType && (
                            <p className="mt-1 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                                Only JPEG, PNG, and WebP images are allowed
                            </p>
                        )
                    }

                </div>

                <div className="flex flex-col gap-3 w-full px-6">
                    <div className="mb-2">
                        <label className="mb-1 mx-1 block text-xs font-semibold tracking-wide text-gray-300">
                            Username
                        </label>
                        <input
                            onChange={(elem) => { setUserName(elem.target.value) }}
                            value={userName}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full rounded-xl border border-[#30364A] bg-[#10131E] px-4 py-3 text-sm text-gray-100 outline-none transition-all duration-200 placeholder:text-gray-600 hover:border-[#454D65] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mb-1 mx-1 block text-xs font-semibold tracking-wide text-gray-300">
                            Email
                        </label>
                        <input
                            onChange={(elem) => {
                                setUserEmail(elem.target.value)
                                setErrorEmailExist(false)
                            }}
                            value={userEmail}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-[#30364A] bg-[#10131E] px-4 py-3 text-sm text-gray-100 outline-none transition-all duration-200 placeholder:text-gray-600 hover:border-[#454D65] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                        {
                            errorEmailExist && (
                                <div className="pt-1 text-xs text-red-500">
                                    Email is already exist
                                </div>
                            )
                        }
                    </div>

                    <button onClick={UserUpdatePfp}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.18)] transition-all duration-200 hover:border-blue-300/40 hover:bg-blue-500 hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)] active:scale-[0.99]"
                    >
                        Update profile
                    </button>
                </div>
            </div>
        </div>
    )
}