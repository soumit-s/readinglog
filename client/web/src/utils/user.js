'use client'

import { createContext, useContext } from "react"
import { useUser } from "./api"

export const UserContext = createContext({
    isLoading: true,
})

export function UserProvider({children}) {
    const user = useUser()

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}