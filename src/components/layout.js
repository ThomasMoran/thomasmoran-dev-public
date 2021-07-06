import React from 'react'

import Cookie from './Cookie'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <Header />
        <main>{children}</main>
      </div>
      <Cookie />
      <Footer />
    </>
  )
}

export default Layout
