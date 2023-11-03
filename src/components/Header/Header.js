import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

const Header = ({ handleLogout }) => {
  return (
    <header>
      <div className="headerContainer">
        <div className="innerContainer">
          <div className="showT">
            <Link to="/">ShowsTracker</Link>
          </div>
          <ul className="navbarLinks">
            <li>
              <button className="btn btn-main" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header