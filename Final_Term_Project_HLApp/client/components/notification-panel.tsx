"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import { apiRequest, NotificationRecord } from "@/lib/api";

type NotificationPanelProps = {
  token: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function NotificationPanel({ token }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiRequest<NotificationRecord[]>("/notifications", { token })
      .then(setNotifications)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Could not load notifications");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <section className="management-section">
      <div className="management-heading">
        <div>
          <p className="eyebrow">Email and Mobile </p>
          <h2>Notifications</h2>
        </div>
        <div className="record-counts">
          <span>{notifications.length} notifications</span>
        </div>
      </div>

      {error ? <p className="form-error">{error}</p> : null}
      {isLoading ? <p className="loading-state">Loading notifications...</p> : null}

      <article className="record-list notification-list">
        {notifications.length === 0 && !isLoading ? <p className="empty-state">No notifications found.</p> : null}
        {notifications.map((notification) => {
          const Icon = notification.channel === "email" ? Mail : Smartphone;

          return (
            <div className="notification-row" key={notification._id}>
              <Icon aria-hidden="true" />
              <div>
                <strong>{notification.type} - {notification.channel}</strong>
                <span>{notification.message}</span>
                <span>Scheduled: {formatDate(notification.scheduledFor)}</span>
                <span>Status: {notification.status}</span>
                {notification.emailPreviewUrl ? (
                  <a className="notification-link" href={notification.emailPreviewUrl} target="_blank" rel="noreferrer">Open email preview</a>
                ) : null}
                {notification.errorMessage ? <span>Error: {notification.errorMessage}</span> : null}
              </div>
              <Bell aria-hidden="true" />
            </div>
          );
        })}
      </article>
    </section>
  );
}
