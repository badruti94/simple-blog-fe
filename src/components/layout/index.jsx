import React from "react"
import Header from "../header"
import Footer from "../footer"

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <main
                className="px-5"
                style={{ minHeight: '100vh', padding: 50 }}>
                {children}
            </main>
            <Footer />
        </React.Fragment>

    )
}

export default Layout