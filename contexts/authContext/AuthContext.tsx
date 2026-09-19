"use client"

import { removeAccessToken, setAccessToken } from "@/libs/axios/accessTokenGeneration";
import { loginApi, logoutApi, refreshToken, registerApi } from "@/services/Frontend/authApi";
import { userType } from "@/types/usertype";
import { tryCatch } from "@/utils/tryCatch";
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

const authProvider = createContext<authUser | null>(null)
const loginProvider = createContext<AuthContextType | null>(null)
const logoutProvider = createContext<LogoutType | null>(null)
const registerProvider = createContext<RegisterType | null>(null)

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

    useEffect(() => {
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

    return (
        <authProvider.Provider value={{ user, setUser }}>
            <loginProvider.Provider value={{ login, setLogin, handleChangeLogin, handleLogin, loginLoading, authReady }}>
                <logoutProvider.Provider value={{ handleLogout }}>
                    <registerProvider.Provider value={{ handleSubmit, register, setRegister, handleRegisterChange }}>
                        {children}
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