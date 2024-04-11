import { createContext, useEffect, useState } from "react";

export const CustomContext = createContext(undefined, undefined)
export const AuthContext = createContext(undefined, undefined)
export const FormContext = createContext(undefined, undefined)
export const AuthUserContext = createContext(undefined, undefined)
export const MenuContext = createContext(undefined, undefined)

export const Context = (props) => {

    const [user, setUser] = useState()
    const value = {
        user,
        setUser
    }

    const [auth, setAuth] = useState()
    const token = {
        auth,
        setAuth
    }

    const [form, setForm] = useState('Login')
    const whatForm = {
        form,
        setForm
    }

    const [authUser, setAuthUser] = useState()
    const AuthUser = {
        authUser,
        setAuthUser
    }

    const [menu, setMenu] = useState("LK")
    const Menu = {
        menu,
        setMenu
    }


    return  <MenuContext.Provider value={Menu}>
    <AuthUserContext.Provider value={AuthUser}>
    <FormContext.Provider value={whatForm}>
    <AuthContext.Provider value={token}>
        <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
    </AuthContext.Provider>
    </FormContext.Provider>
    </AuthUserContext.Provider>
    </MenuContext.Provider>
}