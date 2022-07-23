import React, { useContext, createContext, useReducer, useState } from 'react'

export const ContextCreate = createContext()



const UseContext = ({ initialState, reducer, children }) => 
 
    (
        <ContextCreate.Provider value={useReducer(reducer, initialState)} >
            {children}
        </ContextCreate.Provider>
    )




export default UseContext

export const UsarContext = () => useContext(ContextCreate)