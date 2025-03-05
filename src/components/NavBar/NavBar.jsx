import {React, useContext} from "react";
import { Link, NavLink } from "react-router-dom";

import './NavBar.css';
import SearchForm from "./SearchForm";
import LinkWithIcon from "./LinkWithIcon";
import UserContext from "../../Contexts/UserContext";

import Rocket from "../../assets/rocket.png";
import Star from "../../assets/glowing-star.png";
import Package from "../../assets/package.png";
import Lock from "../../assets/locked.png"
import IdButton from "../../assets/id-button.png"
import Memo from "../../assets/memo.png"
import CartContext from "../../Contexts/CartContext";

const NavBar = () => {
  const user = useContext(UserContext)
  const {cart} = useContext(CartContext)
  
  return (

    <nav className='navbarContainer align_center'>
        <div className="navbar_heading align_center">
            <Link to="/">CartWish</Link>
            <SearchForm/>
        </div>
        <div className='navbar-links align_center'>
            <LinkWithIcon title="Home" link="/" emoji={Rocket}/>
            <LinkWithIcon title="Products" link="/products" emoji={Star}/>
            {!user && 
              <>
                <LinkWithIcon title="LogIn" link="/login" emoji={IdButton}/>
                <LinkWithIcon title="SignUp" link="/signup" emoji={Memo}/>
              </>
            }
            {user &&
              <>
                <LinkWithIcon title="My Orders" link="/orders" emoji={Package}/>
                <LinkWithIcon title="LogOut" link="/logout" emoji={Lock}/>
                <NavLink to="/cart" className="align_center">
                  Cart
                  <p className="align_center cart_counts">{cart.length}</p>
                </NavLink>
              </>
            }
      </div>
    </nav>
  )
}
export default NavBar 