import { parseISO } from "date-fns";
import { formatDistanceToNow } from "date-fns/esm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import classnames from "classnames";
import {
  allNotificationsRead,
  selectAllNotifications,
} from "./notificationsSlice";

export const NotificationsList = () => {
  const allNotifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();
  useEffect(() => dispatch(allNotificationsRead()));

  const renderedNotifications = allNotifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user);

    const notificationClassname = classnames("notification", {
      new: notification.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
