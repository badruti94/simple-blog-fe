import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [navItemLink, setNavItemLink] = useState([])

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        const isLogin = localStorage.getItem('login')

        let navItemLink;
        if (!isLogin) {
            navItemLink = [
                { to: '/', title: 'Home', onClick: () => { } },
                { to: '/login', title: 'Login', onClick: () => { } },
                { to: '/register', title: 'Register', onClick: () => { } },
            ]
        } else {
            navItemLink = [
                { to: '/', title: 'Home', onClick: () => { } },
                { to: '/post', title: 'Post', onClick: () => { } },
                { to: null, title: 'Logout', onClick: handleLogout },
            ]
        }

        setNavItemLink(navItemLink)

    }, [])


    return (
        <div>
            <Navbar color='light' light expand='md' container='fluid' >
                <NavbarBrand href="/">Simple Blog</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        {navItemLink.map(link =>
                            <NavItem key={link.to}>
                                <Link className='nav-link' to={link.to} onClick={link.onClick}>{link.title}</Link>
                            </NavItem>
                        )}
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header