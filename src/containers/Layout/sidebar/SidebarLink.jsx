import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signout } from '../../../helpers/auth';

const SidebarLink = ({
  title, icon, newLink, route, onClick,
}) => (
  <NavLink
    to={route}
    onClick={() => {
      if (title === 'Log Out') {
        signout(() => {
          toast.error('Signout Successfully');
          return <Redirect to="/log_in" />;
        });
      } else {
        onClick();
      }
    }}
    activeClassName="sidebar__link-active"
  >
    <li className="sidebar__link">
      {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ''}
      <p className="sidebar__link-title">
        {title}
        {newLink ? <Badge className="sidebar__link-badge"><span>New</span></Badge> : ''}
      </p>
    </li>
  </NavLink>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
};

export default SidebarLink;
