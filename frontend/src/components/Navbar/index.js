import React from 'react';
import useToken from '../App/useToken';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElement';

const RenderSignInBtn = () => {
    const { token, setToken } = useToken();
    if (token) {
        return (
            <>
            <NavLink to='/sign-up' activeStyle>
                Sign Up
            </NavLink>
            <NavBtn>
                <NavBtnLink to='/signin'>Sign In</NavBtnLink>
            </NavBtn>
            </>
        )
    }
}

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/dashboard' activeStyle>
			Dashboard
		</NavLink>
		<NavLink to='/preferences' activeStyle>
			Logout
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
        {RenderSignInBtn}
	</Nav>
	</>
);
};

export default Navbar;
