import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signout } from '../../../helpers/auth';

export default class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  render() {
    const { title, icon, path } = this.props;

    return (
      <Link
        className="topbar__link"
        to={path}
        onClick={() => {
          if (title === 'Log Out') {
            signout(() => {
              toast.error('Signout Successfully');
              return <Redirect to="/log_in" />;
            });
          }
        }}
      >
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </Link>
    );
  }
}
