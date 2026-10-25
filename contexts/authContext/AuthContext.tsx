"use client"

import { removeAccessToken, setAccessToken } from "@/libs/axios/accessTokenGeneration";
import { loginApi, logoutApi, profileImageApi, refreshToken, registerApi, updateAdminProfile } from "@/services/Frontend/authApi";
import { timeZoneApi } from "@/services/Frontend/settingsApi";
import { userType } from "@/types/usertype";
import { tryCatch } from "@/utils/tryCatch";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";



type authUser = {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

type LogInUser = {
    email: string;
    password: string;
}

type AuthContextType = {
    login: LogInUser;
    setLogin: React.Dispatch<React.SetStateAction<LogInUser>>;
    handleChangeLogin: (e: { target: { name: string; value: string } }) => void;
    handleLogin: (e: { preventDefault: () => void; }) => void;
    loginLoading: boolean,
    authReady: boolean
}

type LogoutType = {
    handleLogout: () => void
}

type RegisterStateType = {
    username: string;
    email: string;
    password: string;
}

type RegisterType = {
    register: RegisterStateType;
    setRegister: React.Dispatch<React.SetStateAction<RegisterStateType>>;
    handleSubmit: (e: { preventDefault: () => void; }) => void;
    handleRegisterChange: (e: { target: { name: string, value: string } }) => void
}


type UpdateType = {
    handleUpdate: () => void;
    updatePfp: File | null;
    setUpdatePfp: React.Dispatch<React.SetStateAction<File | null>>;
    updateUsername: string
    setUpdateUsername: React.Dispatch<React.SetStateAction<string>>;
    updateEmail: string
    setUpdateEmail: React.Dispatch<React.SetStateAction<string>>;
    updatePreview: string | null
    setUpdatePreview: React.Dispatch<React.SetStateAction<string | null>>;
    pfpSize: boolean;
    pfpType: boolean;
    alreadyExist: boolean;
    setAlreadyExist: React.Dispatch<React.SetStateAction<boolean>>;
    setPfpSize: React.Dispatch<React.SetStateAction<boolean>>;
    setPfpType: React.Dispatch<React.SetStateAction<boolean>>;
    removePfp: boolean
    setRemovePfp: React.Dispatch<React.SetStateAction<boolean>>
}

const authProvider = createContext<authUser | null>(null)
const loginProvider = createContext<AuthContextType | null>(null)
const logoutProvider = createContext<LogoutType | null>(null)
const registerProvider = createContext<RegisterType | null>(null)
const updateProvider = createContext<UpdateType | null>(null)

export function AuthContext({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<userType | null>(null)

    const [login, setLogin] = useState<LogInUser>({
        email: '',
        password: ''
    })

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    const [authReady, setAuthReady] = useState(false)
    const [updatePfp, setUpdatePfp] = useState<File | null>(null)
    const [updateUsername, setUpdateUsername] = useState<string>('')
    const [updateEmail, setUpdateEmail] = useState<string>('')
    const [removePfp, setRemovePfp] = useState<boolean>(false)
    const [updatePreview, setUpdatePreview] = useState<string | null>(null)
    const [pfpSize, setPfpSize] = useState(false)
    const [pfpType, setPfpType] = useState(false)
    const [alreadyExist, setAlreadyExist] = useState(false)

    function handleChangeLogin(e: { target: { name: string; value: string; }; }) {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const router = useRouter()

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        const [res, error] = await tryCatch(registerApi(
            {
                username: register.username,
                email: register.email,
                password: register.password
            }
        ))

        if (error) {
            console.log(error);
        }

        setAccessToken(res?.data.accessToken)
        setUser(res?.data.user)

        if (res?.data.user) {
            router.push('/dashboard')
        }
    }

    async function handleLogin(e: { preventDefault: () => void; }) {
        e.preventDefault()
        setLoginLoading(true)
        const [res, error] = await tryCatch(loginApi(
            {
                email: login.email,
                password: login.password
            }
        ))

        setAuthReady(true)


        if (error) {
            console.log(error)
        }

        setAccessToken(res?.data.accessToken)

        setUser(res?.data.user)
        if (res?.data.user) {
            router.push('/dashboard')
        }
        setLoginLoading(false)
    }

    const initailization = async () => {
        const [res, error] = await tryCatch(refreshToken())

        if (!res?.data.accessToken) {
            setAccessToken(null)
            return
        }

        if (error) {
            setAccessToken(null)
            setUser(null)
            console.log(error)
        }

        setAccessToken(res?.data.accessToken)
        setUser(res?.data.user)
        setAuthReady(true)
    }
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        initailization()
    }, [])

    async function handleLogout() {
        try {
            await logoutApi()
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setAccessToken(null)
            removeAccessToken()
            setUser(null)
            router.replace('/')
        }
    }

    function handleRegisterChange(e: { target: { name: string; value: string; }; }) {
        setRegister(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleUpdate() {

        const formData = new FormData()
        if (updatePfp) {
            formData.append('pfp', updatePfp)
        }
        formData.append('username', updateUsername)
        formData.append('email', updateEmail)
        formData.append('removePfp', String(removePfp))

        const [res, error] = await tryCatch(updateAdminProfile(formData))

        if (error) {
            if (axios.isAxiosError(error) && error?.response?.status === 409) {
                setAlreadyExist(true)
            }
            if (axios.isAxiosError(error) && error?.response?.status === 404) {
                setPfpType(true)
            }
            if (axios.isAxiosError(error) && error?.response?.status === 400) {
                setPfpSize(true)
            }

            return
        }

        const updateAdmin = res?.data?.updateAdminProfile
        await initailization()
        if (updateAdmin) {
            setUser(prev => {
                if (!prev) return prev

                return {
                    ...prev,
                    username: updateAdmin.username ?? prev.username,
                    email: updateAdmin.email ?? prev.email,
                    pfp: updateAdmin.pfp?.startsWith("https://") ? updateAdmin.pfp : prev.pfp
                }
            })
        }
        setUpdatePreview(null)

    }

    useEffect(() => {
        if (!user?.pfp) return

        async function profileImage() {
            const [res, error] = await tryCatch(profileImageApi())

            if (error) {
                console.log(error);
                return
            }

            setUser(prev => {
                if (!prev?.pfp) return prev

                return {
                    ...prev,
                    pfp: res?.data.signedUrl
                }
            })

        }

        const interval = setInterval(
            profileImage,
            50 * 60 * 1000
        )

        return () => clearInterval(interval)

    }, [user?.pfp])



    return (
        <authProvider.Provider value={{ user, setUser }}>
            <loginProvider.Provider value={{ login, setLogin, handleChangeLogin, handleLogin, loginLoading, authReady }}>
                <logoutProvider.Provider value={{ handleLogout }}>
                    <registerProvider.Provider value={{ handleSubmit, register, setRegister, handleRegisterChange }}>
                        <updateProvider.Provider value={{ handleUpdate, setUpdateEmail, setUpdatePfp, setUpdateUsername, updateEmail, updatePfp, updateUsername, updatePreview, setUpdatePreview, pfpType, pfpSize, alreadyExist, setAlreadyExist, setPfpSize, setPfpType, removePfp, setRemovePfp }}>
                            {children}
                        </updateProvider.Provider>
                    </registerProvider.Provider>
                </logoutProvider.Provider>
            </loginProvider.Provider>
        </authProvider.Provider>
    )
}

export function useAuth() {
    const context = useContext(authProvider)
    if (!context) {
        throw new Error("auth context is not found")
    }
    return context
}

export function useLogin() {
    const context = useContext(loginProvider)
    if (!context) {
        throw new Error('Login context is not found')
    }

    return context
}


export function useLogout() {
    const context = useContext(logoutProvider)

    if (!context) {
        throw new Error('Logout context is not found')
    }

    return context
}

export function useRegister() {
    const context = useContext(registerProvider)

    if (!context) {
        throw new Error('Register context is not found')
    }

    return context
}

export function useUpdate() {
    const context = useContext(updateProvider)

    if (!context) {
        throw new Error('updateProvider context is must inside useUpdate')
    }

    return context
}