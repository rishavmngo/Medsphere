import { createContext, useState } from 'react'

export const StaticCompContext = createContext({
  leftSlideBarOpen: false,
  toggleLeftSlideBar: () => null,
  setLeftSlideBar: () => null,
})

const StaticCompProvider = ({ children }) => {
  const values = {}
  return (
    <StaticCompContext.Provider value={values}>
      {children}
    </StaticCompContext.Provider>
  )
}

export default StaticCompProvider
