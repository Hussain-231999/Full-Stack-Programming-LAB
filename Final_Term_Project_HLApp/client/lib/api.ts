export type Role = "admin" | "doctor" | "patient";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type DoctorRecord = {
  _id: string;
  user: AuthUser & { phone?: string };
  specialty: string;
  qualification: string;
  experienceYears: number;
  hospitalDepartment: string;
  availableDays: string[];
  consultationFee: number;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
};

export type PatientRecord = {
  _id: string;
  user: AuthUser & { phone?: string };
  assignedDoctor?: DoctorRecord;
  age: number;
  gender: "male" | "female" | "other";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address: string;
  city: string;
  emergencyContact: string;
  medicalHistory?: string;
  isActive: boolean;
};

export type AppointmentStatus = "pending" | "confirmed" | "rejected" | "completed" | "cancelled";

export type AppointmentRecord = {
  _id: string;
  patient: AuthUser & { phone?: string };
  doctor?: DoctorRecord;
  symptoms: string;
  requestedAt: string;
  status: AppointmentStatus;
  notes?: string;
};

export type PrescriptionRecord = {
  medicine: string;
  dosage: string;
  schedule: string;
  duration?: string;
};

export type TreatmentStatus = "active" | "follow-up" | "completed";

export type PhysicalCheckup = {
  bloodPressure?: string;
  temperature?: string;
  pulse?: string;
  weight?: string;
  observations?: string;
};

export type TreatmentVisit = {
  _id: string;
  visitDate: string;
  checkupNotes: string;
  diagnosis?: string;
  physicalCheckup?: PhysicalCheckup;
  prescriptions: PrescriptionRecord[];
  followUpDate?: string;
  statusAfterVisit: TreatmentStatus;
};

export type FollowUpVisit = {
  _id: string;
  visitDate: string;
  notes?: string;
  statusAfterVisit: TreatmentStatus;
};

export type TreatmentRecord = {
  _id: string;
  patient: AuthUser & { phone?: string };
  doctor: DoctorRecord;
  appointment: AppointmentRecord;
  checkupNotes: string;
  diagnosis?: string;
  physicalCheckup?: PhysicalCheckup;
  prescriptions: PrescriptionRecord[];
  followUpDate?: string;
  status: TreatmentStatus;
  progressNotes?: string;
  followUpVisits: FollowUpVisit[];
  visits: TreatmentVisit[];
};

export type NotificationRecord = {
  _id: string;
  user: string;
  type: "appointment" | "medication" | "follow-up";
  channel: "email" | "mobile";
  message: string;
  scheduledFor: string;
  emailPreviewUrl?: string;
  emailMessageId?: string;
  errorMessage?: string;
  sentAt?: string;
  status: "pending" | "sent" | "failed";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export function getRoleDashboardPath(role: Role) {
  return `/dashboard?role=${role}`;
}
