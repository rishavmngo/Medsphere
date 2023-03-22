import { createContext, useState } from 'react'

export const StaticCompContext = createContext({
  leftSlideBarOpen: false,
  toggleLeftSlideBar: () => null,
  setLeftSlideBar: () => null,
})

const StaticCompProvider = ({ children }) => {
  const [leftSlideBarOpen, setLeftSlideBar] = useState(false)
  function toggleLeftSlideBar() {
    setLeftSlideBar(!leftSlideBarOpen)
  }

  const values = {
    leftSlideBarOpen,
    toggleLeftSlideBar,
    setLeftSlideBar,
  }
  return (
    <StaticCompContext.Provider value={values}>
      {children}
    </StaticCompContext.Provider>
  )
}

export default StaticCompProvider
