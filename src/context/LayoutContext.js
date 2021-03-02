// Context.js
import React, {useState} from "react"

const defaultContextValue = {
  dynamicSections: [],
  setSomeState: () => {}
}

export const LayoutContext = React.createContext(defaultContextValue)

const ContextProviderComponent = (props) => {

    const [state, setState] = useState(defaultContextValue)

    return (
        <LayoutContext.Provider value={{
            dynamicSections: state.dynamicSections,
            setSomeState: setState
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}

export default ContextProviderComponent
