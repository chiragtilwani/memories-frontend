import React, { createContext, useReducer } from 'react'
import { users } from '../SeedData'
import userReducer from '../Reducer/userReducer'
import { useState } from 'react'

export const UserContext = createContext()
export const DispatchContext = createContext()

export const UserProvider = (props) => {
    const [userState, dispatch] = useReducer(userReducer, users)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUserID, setCurrentUserID] = useState(null)

    function login(uid) {
        setIsLoggedIn(true)
        setCurrentUserID(uid)
    }
    function logout() {
        setIsLoggedIn(false)
        setCurrentUserID(null)
    }
    return <UserContext.Provider value={userState}>
        <DispatchContext.Provider value={{ dispatch, isLoggedIn, login, logout, currentUserID }}>
            {props.children}
        </DispatchContext.Provider>
    </UserContext.Provider>
}