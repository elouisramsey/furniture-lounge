import { createContext, useContext } from 'react'

// create context
const AuthContext = createContext()

// export provider
export function AuthProvider(props) {
  const { value, children } = props

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// export useContext hook

export function useAuthContext() {
  return useContext(AuthContext)
}
