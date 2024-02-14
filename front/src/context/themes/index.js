import React, { useState } from "react";

export const ThemesContext = React.createContext();
ThemesContext.displayName = 'Themes';

export const ThemesProvider = ({ children }) => {

    var [dark, setDark] = useState(true)

    async function handleTheme(){
        setDark(!dark)
        console.log(dark)
    }

    return(
        <ThemesContext.Provider
            value={{
                dark,
                handleTheme
            }}
        >
            {children}
        </ThemesContext.Provider>
    )
}