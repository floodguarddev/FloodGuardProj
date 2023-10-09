import React, { useState, useContext } from "react"

const UserContext = React.createContext([{}, () => {}])

let initialState = {}

const UserProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider, useUser }