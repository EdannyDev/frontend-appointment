import { useEffect, useState } from "react";
import {
  Container,
  NotificationItem,
  IconWrapper,
  Message
} from "@/styles/notification.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// Sistema de notificaciones global basado en pub/sub
let listeners = [];
let notifications = [];

const notify = (type, message, duration = 3000) => {
  const id = Date.now();

  notifications = [...notifications, { id, type, message }];
  listeners.forEach((l) => l(notifications));

  setTimeout(() => {
    notifications = notifications.filter((n) => n.id !== id);
    listeners.forEach((l) => l(notifications));
  }, duration);
};

export const Notification = {
  success: (message) => notify("success", message),
  error: (message) => notify("error", message),
  info: (message) => notify("info", message),
  warning: (message) => notify("warning", message),
};

const iconByType = {
  success: faCircleCheck,
  error: faCircleXmark,
  info: faCircleInfo,
  warning: faCircleExclamation,
};

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listeners.push(setItems);
    return () => {
      listeners = listeners.filter((l) => l !== setItems);
    };
  }, []);

  return (
    <Container>
      {items.map((n) => (
        <NotificationItem key={n.id} type={n.type}>
          <IconWrapper type={n.type}>
            <FontAwesomeIcon icon={iconByType[n.type]} />
          </IconWrapper>
          <Message>{n.message}</Message>
        </NotificationItem>
      ))}
    </Container>
  );
}