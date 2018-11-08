import React from 'react';
import {Link} from 'react-router-dom';
import './ButtonLink.css';

function ButtonLink({to, children}) {
  return <Link to={to}>{children}</Link>;
}

export default ButtonLink;