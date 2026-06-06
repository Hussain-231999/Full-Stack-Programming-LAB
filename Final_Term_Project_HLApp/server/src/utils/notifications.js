import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { sendEmail } from "./email.js";

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function scheduleOffsets(schedule = "") {
  const normalized = schedule.toLowerCase();

  if (normalized.includes("weekly")) {
    return [0, 7, 14, 21];
  }

  if (normalized.includes("twice") || normalized.includes("2 times")) {
    return [0, 0.5, 1, 1.5, 2, 2.5];
  }

  if (normalized.includes("thrice") || normalized.includes("three") || normalized.includes("3 times")) {
    return [0, 0.33, 0.66, 1, 1.33, 1.66];
  }

  return [0, 1, 2];
}

function scheduledMedicationDate(baseDate, offset) {
  const date = new Date(baseDate);
  date.setTime(date.getTime() + offset * 24 * 60 * 60 * 1000);
  return date;
}

async function sendEmailNotification(notification) {
  if (notification.channel !== "email") {
    return notification;
  }

  try {
    const user = await User.findById(notification.user).select("email name");

    if (!user?.email) {
      notification.status = "failed";
      notification.errorMessage = "Recipient email not found";
      await notification.save();
      return notification;
    }

    const result = await sendEmail({
      to: user.email,
      subject: `Healthcare ${notification.type} notification`,
      text: notification.message
    });

    notification.status = "sent";
    notification.sentAt = new Date();
    notification.emailPreviewUrl = result.previewUrl || undefined;
    notification.emailMessageId = result.messageId;
    await notification.save();
  } catch (error) {
    notification.status = "failed";
    notification.errorMessage = error.message;
    await notification.save();
  }

  return notification;
}

async function createNotifications(items) {
  const notifications = await Notification.insertMany(items);
  await Promise.all(notifications.map((notification) => sendEmailNotification(notification)));
  return notifications;
}

export async function createAppointmentConfirmationNotifications(appointment) {
  if (!appointment?.patient) {
    return [];
  }

  const scheduledFor = new Date();
  const doctorName = appointment.doctor?.user?.name || "your assigned doctor";
  const appointmentDate = appointment.requestedAt ? new Date(appointment.requestedAt).toLocaleString() : "your appointment time";
  const message = `Your appointment for ${appointmentDate} has been confirmed with ${doctorName}.`;

  return createNotifications([
    {
      user: appointment.patient._id || appointment.patient,
      type: "appointment",
      channel: "email",
      message,
      scheduledFor
    },
    {
      user: appointment.patient._id || appointment.patient,
      type: "appointment",
      channel: "mobile",
      message,
      scheduledFor
    }
  ]);
}

export async function createMedicationReminderNotifications(patientId, prescriptions = [], baseDate = new Date()) {
  const reminders = [];

  for (const prescription of prescriptions) {
    for (const offset of scheduleOffsets(prescription.schedule)) {
      reminders.push({
        user: patientId,
        type: "medication",
        channel: "mobile",
        message: `Medication reminder: take ${prescription.medicine} (${prescription.dosage}) ${prescription.schedule}.`,
        scheduledFor: scheduledMedicationDate(baseDate, offset)
      });
    }

    reminders.push({
      user: patientId,
      type: "medication",
      channel: "email",
      message: `Medication schedule: ${prescription.medicine}, dosage ${prescription.dosage}, ${prescription.schedule}${prescription.duration ? ` for ${prescription.duration}` : ""}.`,
      scheduledFor: new Date(baseDate)
    });
  }

  return reminders.length > 0 ? createNotifications(reminders) : [];
}

export async function createFollowUpReminderNotifications(patientId, followUpDate, notes) {
  if (!followUpDate) {
    return [];
  }

  const visitDate = new Date(followUpDate);
  const reminderDate = addDays(visitDate, -1);
  const scheduledFor = reminderDate.getTime() > Date.now() ? reminderDate : new Date();
  const message = `Follow-up visit reminder for ${visitDate.toLocaleString()}${notes ? `: ${notes}` : "."}`;

  return createNotifications([
    {
      user: patientId,
      type: "follow-up",
      channel: "email",
      message,
      scheduledFor
    },
    {
      user: patientId,
      type: "follow-up",
      channel: "mobile",
      message,
      scheduledFor
    }
  ]);
}
