import { useContext } from "react";

import { userProvider } from '@/contexts/userContext'

export function useUser(){
    const context = useContext(userProvider)

    if(!context){
        throw new Error('useUser must be used inside UserProvider')
    }

    return context
}