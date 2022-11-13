import React, { createContext, useReducer } from 'react'
import { users } from '../SeedData'
import userReducer from '../Reducer/userReducer'
import { useState } from 'react'

export const UserContext = createContext()
export const UserDispatchContext = createContext()

export const UserProvider = (props) => {
    const [userState, dispatch] = useReducer(userReducer, users)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUserID, setCurrentUserID] = useState(null)
    const [token, setToken] = useState()

    function login(uid,token) {
        setIsLoggedIn(true)
        setCurrentUserID(uid)
        localStorage.setItem('userData',JSON.stringify({userId:uid,token:token}))
        setToken(token)
    }
    function logout() {
        setIsLoggedIn(false)
        setCurrentUserID(null)
        setToken(null)
    }
    return <UserContext.Provider value={userState}>
        <UserDispatchContext.Provider value={{ dispatch, isLoggedIn:!!token,token, login, logout, currentUserID }}>
            {props.children}
        </UserDispatchContext.Provider>
    </UserContext.Provider>
}