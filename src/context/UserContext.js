import React, { createContext, useReducer } from 'react'
import { users } from '../SeedData'
import userReducer from '../Reducer/userReducer'
import {useState} from 'react'

export const UserContext = createContext()
export const DispatchContext = createContext()

export const UserProvider = (props) => {
    const [userState, dispatch] = useReducer(userReducer, users)
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    function login(){
        setIsLoggedIn(true)
    }
    function logout(){
        setIsLoggedIn(false)
    }
    return <UserContext.Provider value={userState}>
        <DispatchContext.Provider value={{dispatch,isLoggedIn,login,logout}}>
            {props.children}
        </DispatchContext.Provider>
    </UserContext.Provider>
}