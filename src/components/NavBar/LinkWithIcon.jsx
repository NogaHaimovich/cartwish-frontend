import React from "react"
import { NavLink } from 'react-router-dom'

import "./LinkWithIcon.css"

const LinkWithIcon = ({title, emoji, sidebar, link}) => {
  return (
    <NavLink to={link} className={
      sidebar ? "align_center sidebar_link": "align_center"}>
        {title}
        <img src={emoji} className="navbar_emoji"/>
    </NavLink>
  )
}
export default LinkWithIcon 