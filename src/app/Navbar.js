import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  let notificationBadge;
  if (numUnreadNotifications > 0) {
    notificationBadge = <span className="badge">{numUnreadNotifications}</span>;
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {notificationBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
