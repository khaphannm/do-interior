// Context.js
import React, {useState} from "react"
import { siteMetadata } from "../../gatsby-config"

const defaultContextValue = {
  data: {dynamicSections: []},
  set: () => {}
}

const LayoutContext = React.createContext(defaultContextValue)

const ContextProviderComponent = (props) => {
    const setData = (data) => {
        setState({
            ...state,
            ...data
        })
    }
    const [state, setState] = useState({
        ...defaultContextValue, set: setData
    })

    

    return <LayoutContext.Provider value={state}>{props.children}</LayoutContext.Provider>
}

export { LayoutContext as default, ContextProviderComponent }