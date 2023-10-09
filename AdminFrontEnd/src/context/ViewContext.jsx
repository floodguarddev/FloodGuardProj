import React, { useState, useContext } from "react"

const ViewContext = React.createContext([{}, () => {}])

let initialState = {
    selectedUser: null
}

const ViewProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <ViewContext.Provider value={[state, setState]}>
      {props.children}
    </ViewContext.Provider>
  )
}

const useView = () => {
  return useContext(ViewContext);
};

export { ViewContext, ViewProvider, useView }