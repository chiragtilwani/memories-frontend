import React,{createContext,useReducer} from 'react';
import {placesList} from '../SeedData';
import placeReducer from '../Reducer/placeReducer'

export const  PlaceContext =createContext()
export const DispatchContext = createContext()

export const PlaceProvider=(props)=>{
    const [placesListState,dispatch]=useReducer(placeReducer,placesList)
    return <PlaceContext.Provider value={placesListState}>
        <DispatchContext.Provider value={{dispatch}}>

        {props.children}
        </DispatchContext.Provider>
    </PlaceContext.Provider>
}