import React,{createContext,useReducer} from 'react';
import {placesList} from '../SeedData';
import placeReducer from '../Reducer/placeReducer'

export const  PlaceContext =createContext()


export const PlaceProvider=(props)=>{
    const [placesListState,dispatch]=useReducer(placeReducer,placesList)
    return <PlaceContext.Provider value={{placesListState,dispatch}}>
        {props.children}
    </PlaceContext.Provider>
}