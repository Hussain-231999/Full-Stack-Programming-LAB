"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarPlus, CheckCircle, ClipboardPlus, HeartPulse, RotateCcw, XCircle } from "lucide-react";
import { apiRequest, AppointmentRecord, DoctorRecord, Role, TreatmentRecord, TreatmentStatus } from "@/lib/api";
import { useToast } from "@/context/toast-context";

type TreatmentLifecycleProps = {
  role: Role;
  token: string;
  mode?: "all" | "appointments" | "treatments";
};

type TreatmentForm = {
  appointmentId: string;
  treatmentId: string;
  checkupNotes: string;
  diagnosis: string;
  bloodPressure: string;
  temperature: string;
  pulse: string;
  weight: string;
  observations: string;
  medicine: string;
  dosage: string;
  schedule: string;
  duration: string;
  followUpDate: string;
  followUpNotes: string;
  statusAfterVisit: TreatmentStatus;
  progressNotes: string;
};

const emptyTreatmentForm: TreatmentForm = {
  appointmentId: "",
  treatmentId: "",
  checkupNotes: "",
  diagnosis: "",
  bloodPressure: "",
  temperature: "",
  pulse: "",
  weight: "",
  observations: "",
  medicine: "",
  dosage: "",
  schedule: "",
  duration: "",
  followUpDate: "",
  followUpNotes: "",
  statusAfterVisit: "active",
  progressNotes: ""
};

function formatDate(value?: string) {
  if (!value) {
    return "Not scheduled";
  }

  return new Date(value).toLocaleString();
}

function treatmentForAppointment(treatments: TreatmentRecord[], appointmentId: string) {
  return treatments.find((record) => record.appointment?._id === appointmentId);
}

function prescriptionSummary(record: TreatmentRecord) {
  const prescriptions = [
    ...(record.prescriptions || []),
    ...(record.visits || []).flatMap((visit) => visit.prescriptions || [])
  ];

  return prescriptions.filter((prescription, index, list) => {
    const key = `${prescription.medicine}-${prescription.dosage}-${prescription.schedule}-${prescription.duration || ""}`;
    return list.findIndex((item) => `${item.medicine}-${item.dosage}-${item.schedule}-${item.duration || ""}` === key) === index;
  });
}

export function TreatmentLifecycle({ role, token, mode = "all" }: TreatmentLifecycleProps) {
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [booking, setBooking] = useState({ symptoms: "", requestedAt: "", doctor: "" });
  const [notesByAppointment, setNotesByAppointment] = useState<Record<string, string>>({});
  const [doctorByAppointment, setDoctorByAppointment] = useState<Record<string, string>>({});
  const [treatmentForm, setTreatmentForm] = useState<TreatmentForm>(emptyTreatmentForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const approvedDoctors = useMemo(
    () => doctors.filter((doctor) => doctor.approvalStatus === "approved" && doctor.isActive),
    [doctors]
  );
  const showAppointments = mode === "all" || mode === "appointments";
  const showTreatments = mode === "all" || mode === "treatments";

  async function loadLifecycle() {
    setIsLoading(true);
    const [appointmentData, treatmentData, doctorData] = await Promise.all([
      apiRequest<AppointmentRecord[]>("/appointments", { token }),
      apiRequest<TreatmentRecord[]>("/treatments", { token }),
      role !== "doctor" ? apiRequest<DoctorRecord[]>("/doctors", { token }) : Promise.resolve([])
    ]);
    setAppointments(appointmentData);
    setTreatments(treatmentData);
    setDoctors(doctorData);
    setIsLoading(false);
  }

  useEffect(() => {
    loadLifecycle().catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : "Could not load appointments and treatments");
      setIsLoading(false);
    });
  }, [role, token]);

  function showSuccess(text: string) {
    setMessage(text);
    setError("");
    showToast(text, "success");
  }

  function showError(requestError: unknown) {
    const message = requestError instanceof Error ? requestError.message : "Request failed";
    setMessage("");
    setError(message);
    showToast(message, "error");
  }

  async function bookAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await apiRequest("/appointments", {
        method: "POST",
        token,
        body: JSON.stringify({
          symptoms: booking.symptoms,
          requestedAt: booking.requestedAt,
          doctor: booking.doctor || undefined
        })
      });
      setBooking({ symptoms: "", requestedAt: "", doctor: "" });
      await loadLifecycle();
      showSuccess("Appointment booked successfully");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function assignDoctor(appointment: AppointmentRecord) {
    try {
      const doctor = doctorByAppointment[appointment._id] || appointment.doctor?._id;

      if (!doctor) {
        showError(new Error("Select a doctor before assigning"));
        return;
      }

      await apiRequest(`/appointments/${appointment._id}/assign-doctor`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ doctor, notes: notesByAppointment[appointment._id] })
      });
      await loadLifecycle();
      showSuccess("Doctor assigned to appointment");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function updateAppointmentStatus(appointment: AppointmentRecord, action: "confirm" | "reject") {
    if (action === "reject" && !window.confirm("Reject this appointment?")) {
      return;
    }

    if (action === "confirm" && !window.confirm("Confirm this appointment?")) {
      return;
    }

    try {
      await apiRequest(`/appointments/${appointment._id}/${action}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          doctor: doctorByAppointment[appointment._id] || appointment.doctor?._id,
          notes: notesByAppointment[appointment._id]
        })
      });
      await loadLifecycle();
      showSuccess(action === "confirm" ? "Appointment confirmed" : "Appointment rejected");
    } catch (requestError) {
      showError(requestError);
    }
  }

  function beginTreatment(appointment: AppointmentRecord, record?: TreatmentRecord) {
    setTreatmentForm({
      ...emptyTreatmentForm,
      appointmentId: appointment._id,
      treatmentId: record?._id || "",
      statusAfterVisit: record?.status || "active",
      progressNotes: record?.progressNotes || ""
    });
  }

  async function submitTreatment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (treatmentForm.statusAfterVisit === "completed" && !window.confirm("Mark this treatment as completed after this visit?")) {
      return;
    }

    const prescription = treatmentForm.medicine && treatmentForm.dosage && treatmentForm.schedule
      ? [{
        medicine: treatmentForm.medicine,
        dosage: treatmentForm.dosage,
        schedule: treatmentForm.schedule,
        duration: treatmentForm.duration
      }]
      : [];
    const payload = {
      appointment: treatmentForm.appointmentId,
      checkupNotes: treatmentForm.checkupNotes,
      diagnosis: treatmentForm.diagnosis,
      bloodPressure: treatmentForm.bloodPressure,
      temperature: treatmentForm.temperature,
      pulse: treatmentForm.pulse,
      weight: treatmentForm.weight,
      observations: treatmentForm.observations,
      prescriptions: prescription,
      followUpDate: treatmentForm.followUpDate || undefined,
      followUpNotes: treatmentForm.followUpNotes,
      progressNotes: treatmentForm.progressNotes,
      status: treatmentForm.statusAfterVisit,
      statusAfterVisit: treatmentForm.statusAfterVisit
    };

    try {
      const path = treatmentForm.treatmentId ? `/treatments/${treatmentForm.treatmentId}/visits` : "/treatments";

      await apiRequest(path, {
        method: "POST",
        token,
        body: JSON.stringify(payload)
      });
      setTreatmentForm(emptyTreatmentForm);
      await loadLifecycle();
      showSuccess(treatmentForm.treatmentId ? "Treatment visit recorded" : "Treatment started");
    } catch (requestError) {
      showError(requestError);
    }
  }

  return (
    <section className="lifecycle-section">
      <div className="management-heading">
        <div>
          <p className="eyebrow">Appointment lifecycle</p>
          <h2>{mode === "appointments" ? "Appointments" : mode === "treatments" ? "Treatment Records" : "Appointments & Treatment"}</h2>
        </div>
        <div className="record-counts">
          {showAppointments ? <span>{appointments.length} appointments</span> : null}
          {showTreatments ? <span>{treatments.length} treatments</span> : null}
        </div>
      </div>

      {message ? <p className="form-success">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      {isLoading ? <p className="loading-state">Loading appointment lifecycle...</p> : null}

      {showAppointments && role === "patient" ? (
        <form className="management-form lifecycle-booking" onSubmit={bookAppointment}>
          <h3>Book Appointment</h3>
          <textarea placeholder="Symptoms" value={booking.symptoms} onChange={(event) => setBooking({ ...booking, symptoms: event.target.value })} required />
          <input type="datetime-local" value={booking.requestedAt} onChange={(event) => setBooking({ ...booking, requestedAt: event.target.value })} required />
          <select value={booking.doctor} onChange={(event) => setBooking({ ...booking, doctor: event.target.value })}>
            <option value="">Preferred doctor optional</option>
            {approvedDoctors.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.user.name} - {doctor.specialty}</option>)}
          </select>
          <button className="form-button" type="submit">
            <CalendarPlus aria-hidden="true" />
            Book Appointment
          </button>
        </form>
      ) : null}

      <div className={showAppointments && showTreatments ? "lifecycle-grid" : "single-panel-grid"}>
        {showAppointments ? (
        <article className="record-list lifecycle-list">
          <h3>{role === "patient" ? "My Appointments" : "Appointment Queue"}</h3>
          {appointments.length === 0 && !isLoading ? <p className="empty-state">No appointments found.</p> : null}
          {appointments.map((appointment) => {
            const record = treatmentForAppointment(treatments, appointment._id);
            const selectedDoctor = doctorByAppointment[appointment._id] || appointment.doctor?._id || "";

            return (
              <div className="record-row lifecycle-row" key={appointment._id}>
                <div>
                  <strong>{appointment.patient?.name || "Deleted patient"}</strong>
                  <span>{formatDate(appointment.requestedAt)}</span>
                  <span>Status: {appointment.status}</span>
                  <span>Doctor: {appointment.doctor?.user?.name || "Not assigned"}</span>
                  <span>Symptoms: {appointment.symptoms}</span>
                  {appointment.notes ? <span>Notes: {appointment.notes}</span> : null}

                  {role === "admin" ? (
                    <>
                      <select value={selectedDoctor} onChange={(event) => setDoctorByAppointment({ ...doctorByAppointment, [appointment._id]: event.target.value })}>
                        <option value="">Assign doctor</option>
                        {approvedDoctors.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.user.name} - {doctor.specialty}</option>)}
                      </select>
                      <input placeholder="Decision notes" value={notesByAppointment[appointment._id] || ""} onChange={(event) => setNotesByAppointment({ ...notesByAppointment, [appointment._id]: event.target.value })} />
                    </>
                  ) : null}
                </div>

                <div className="record-actions">
                  {role === "admin" ? (
                    <button type="button" title="Assign doctor" onClick={() => assignDoctor(appointment)}><ClipboardPlus aria-hidden="true" /></button>
                  ) : null}
                  {(role === "admin" || role === "doctor") && appointment.status !== "confirmed" && appointment.status !== "completed" ? (
                    <button type="button" title="Confirm appointment" onClick={() => updateAppointmentStatus(appointment, "confirm")}><CheckCircle aria-hidden="true" /></button>
                  ) : null}
                  {(role === "admin" || role === "doctor") && appointment.status !== "rejected" && appointment.status !== "completed" ? (
                    <button type="button" title="Reject appointment" onClick={() => updateAppointmentStatus(appointment, "reject")}><XCircle aria-hidden="true" /></button>
                  ) : null}
                  {(role === "admin" || role === "doctor") && appointment.status === "confirmed" ? (
                    <button type="button" title={record ? "Record follow-up visit" : "Start treatment"} onClick={() => beginTreatment(appointment, record)}>
                      {record ? <RotateCcw aria-hidden="true" /> : <HeartPulse aria-hidden="true" />}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </article>
        ) : null}

        {showTreatments ? (
        <article className="record-list lifecycle-list">
          <h3>Treatment Progress</h3>
          {treatments.length === 0 && !isLoading ? <p className="empty-state">No treatment records found.</p> : null}
          {treatments.map((record) => {
            const prescriptions = prescriptionSummary(record);

            return (
              <div className="assignment-card" key={record._id}>
                <strong>{record.patient?.name || "Deleted patient"}</strong>
                <span>Status: {record.status}</span>
                <span>Doctor: {record.doctor?.user?.name || "Deleted doctor"}</span>
                <span>Latest checkup: {record.checkupNotes}</span>
                <span>Diagnosis: {record.diagnosis || "Not recorded"}</span>
                <span>Next follow-up: {formatDate(record.followUpDate)}</span>
                <span>Visits recorded: {record.visits?.length || 0}</span>
                {record.physicalCheckup?.observations ? <span>Physical checkup: {record.physicalCheckup.observations}</span> : null}
                {prescriptions.length ? (
                  <div className="prescription-list">
                    <strong>Prescriptions</strong>
                    {prescriptions.map((prescription) => (
                      <span key={`${prescription.medicine}-${prescription.dosage}-${prescription.schedule}`}>
                        {prescription.medicine} - {prescription.dosage} - {prescription.schedule}{prescription.duration ? ` - ${prescription.duration}` : ""}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>Prescriptions: None recorded</span>
                )}
                {record.followUpVisits?.length ? <span>Follow-up history: {record.followUpVisits.map((visit) => formatDate(visit.visitDate)).join(", ")}</span> : null}
              </div>
            );
          })}
        </article>
        ) : null}
      </div>

      {treatmentForm.appointmentId ? (
        <form className="management-form treatment-form" onSubmit={submitTreatment}>
          <h3>{treatmentForm.treatmentId ? "Record Follow-up Visit" : "Start Treatment"}</h3>
          <textarea placeholder="Checkup notes" value={treatmentForm.checkupNotes} onChange={(event) => setTreatmentForm({ ...treatmentForm, checkupNotes: event.target.value })} required />
          <input placeholder="Diagnosis" value={treatmentForm.diagnosis} onChange={(event) => setTreatmentForm({ ...treatmentForm, diagnosis: event.target.value })} />
          <div className="compact-grid">
            <input placeholder="Blood pressure" value={treatmentForm.bloodPressure} onChange={(event) => setTreatmentForm({ ...treatmentForm, bloodPressure: event.target.value })} />
            <input placeholder="Temperature" value={treatmentForm.temperature} onChange={(event) => setTreatmentForm({ ...treatmentForm, temperature: event.target.value })} />
            <input placeholder="Pulse" value={treatmentForm.pulse} onChange={(event) => setTreatmentForm({ ...treatmentForm, pulse: event.target.value })} />
            <input placeholder="Weight" value={treatmentForm.weight} onChange={(event) => setTreatmentForm({ ...treatmentForm, weight: event.target.value })} />
          </div>
          <textarea placeholder="Physical observations" value={treatmentForm.observations} onChange={(event) => setTreatmentForm({ ...treatmentForm, observations: event.target.value })} />
          <div className="compact-grid">
            <input placeholder="Medicine" value={treatmentForm.medicine} onChange={(event) => setTreatmentForm({ ...treatmentForm, medicine: event.target.value })} />
            <input placeholder="Dosage" value={treatmentForm.dosage} onChange={(event) => setTreatmentForm({ ...treatmentForm, dosage: event.target.value })} />
            <input placeholder="Schedule" value={treatmentForm.schedule} onChange={(event) => setTreatmentForm({ ...treatmentForm, schedule: event.target.value })} />
            <input placeholder="Duration" value={treatmentForm.duration} onChange={(event) => setTreatmentForm({ ...treatmentForm, duration: event.target.value })} />
          </div>
          <input type="datetime-local" value={treatmentForm.followUpDate} onChange={(event) => setTreatmentForm({ ...treatmentForm, followUpDate: event.target.value })} />
          <textarea placeholder="Follow-up notes" value={treatmentForm.followUpNotes} onChange={(event) => setTreatmentForm({ ...treatmentForm, followUpNotes: event.target.value })} />
          <textarea placeholder="Progress notes" value={treatmentForm.progressNotes} onChange={(event) => setTreatmentForm({ ...treatmentForm, progressNotes: event.target.value })} />
          <select value={treatmentForm.statusAfterVisit} onChange={(event) => setTreatmentForm({ ...treatmentForm, statusAfterVisit: event.target.value as TreatmentStatus })}>
            <option value="active">Active</option>
            <option value="follow-up">Follow-up required</option>
            <option value="completed">Completed</option>
          </select>
          <div className="form-row-actions">
            <button className="form-button" type="submit">
              <HeartPulse aria-hidden="true" />
              Save Visit
            </button>
            <button className="ghost-button" type="button" onClick={() => setTreatmentForm(emptyTreatmentForm)}>Cancel</button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
