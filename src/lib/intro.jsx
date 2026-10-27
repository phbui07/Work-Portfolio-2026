import { createContext, useContext } from 'react'

/**
 * True once the loading curtain has lifted. The hero waits on this so its
 * entrance animation plays *after* the curtain instead of behind it.
 */
const IntroContext = createContext(true)

export const IntroProvider = IntroContext.Provider
export const useIntroDone = () => useContext(IntroContext)
