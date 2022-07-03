import {useState} from 'react'

function useToggler(initialState=false){
    const [state,setState] = useState(initialState)

    function toggleState(){
        setState(!state)
    }
    return [state,toggleState]
}

export default useToggler