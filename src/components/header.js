import React from 'react';
import { Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <h3><Link to="/" className="item">Streamer</Link></h3>

      <div className="right menu">
        <Link to="/" className="item">All Streams</Link>
        <Link to="/streams/new" className="item"><GoogleAuth /></Link>
      </div>
    </div>
  )
}
export default Header;