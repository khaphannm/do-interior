// Context.js
import React, {useState} from "react"

const defaultContextValue = {
  dynamicSections: [],
  setDynamicSections: () => {}
}

export const LayoutContext = React.createContext(defaultContextValue)

const ContextProviderComponent = (props) => {

    const [state, setState] = useState(defaultContextValue)

    return (
        <LayoutContext.Provider value={{
            dynamicSections: state.dynamicSections,
            setDynamicSections: setState
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}

export default ContextProviderComponent
