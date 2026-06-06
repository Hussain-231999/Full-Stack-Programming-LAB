"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle, Edit, Save, Trash2, UserPlus, Users, XCircle } from "lucide-react";
import { apiRequest, DoctorRecord, PatientRecord } from "@/lib/api";
import { useToast } from "@/context/toast-context";

type AdminManagementProps = {
  token: string;
  mode?: "all" | "doctors" | "patients";
};

type DoctorForm = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  qualification: string;
  experienceYears: string;
  hospitalDepartment: string;
  consultationFee: string;
  availableDays: string;
};

type PatientForm = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  gender: "male" | "female" | "other";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address: string;
  city: string;
  emergencyContact: string;
  medicalHistory: string;
  assignedDoctor: string;
};

const emptyDoctor: DoctorForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  specialty: "",
  qualification: "",
  experienceYears: "",
  hospitalDepartment: "",
  consultationFee: "",
  availableDays: "Monday, Wednesday, Friday"
};

const emptyPatient: PatientForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  gender: "male",
  bloodGroup: "O+",
  address: "",
  city: "",
  emergencyContact: "",
  medicalHistory: "",
  assignedDoctor: ""
};

function doctorToForm(doctor: DoctorRecord): DoctorForm {
  return {
    id: doctor._id,
    name: doctor.user.name,
    email: doctor.user.email,
    password: "",
    phone: doctor.user.phone || "",
    specialty: doctor.specialty,
    qualification: doctor.qualification,
    experienceYears: String(doctor.experienceYears),
    hospitalDepartment: doctor.hospitalDepartment,
    consultationFee: String(doctor.consultationFee),
    availableDays: doctor.availableDays.join(", ")
  };
}

function patientToForm(patient: PatientRecord): PatientForm {
  return {
    id: patient._id,
    name: patient.user.name,
    email: patient.user.email,
    password: "",
    phone: patient.user.phone || "",
    age: String(patient.age),
    gender: patient.gender,
    bloodGroup: patient.bloodGroup,
    address: patient.address,
    city: patient.city,
    emergencyContact: patient.emergencyContact,
    medicalHistory: patient.medicalHistory || "",
    assignedDoctor: patient.assignedDoctor?._id || ""
  };
}

export function AdminManagement({ token, mode = "all" }: AdminManagementProps) {
  const { showToast } = useToast();
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [doctorForm, setDoctorForm] = useState<DoctorForm>(emptyDoctor);
  const [patientForm, setPatientForm] = useState<PatientForm>(emptyPatient);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sortedDoctors = useMemo(
    () => [...doctors].sort((a, b) => a.user.name.localeCompare(b.user.name)),
    [doctors]
  );

  async function loadRecords() {
    setIsLoading(true);
    const [doctorData, patientData] = await Promise.all([
      apiRequest<DoctorRecord[]>("/doctors", { token }),
      apiRequest<PatientRecord[]>("/patients", { token })
    ]);
    setDoctors(doctorData);
    setPatients(patientData);
    setIsLoading(false);
  }

  useEffect(() => {
    loadRecords().catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : "Could not load management records");
      setIsLoading(false);
    });
  }, [token]);

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

  async function submitDoctor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload: Record<string, string | number | string[] | undefined> = {
        id: doctorForm.id,
        name: doctorForm.name,
        email: doctorForm.email,
        password: doctorForm.password || undefined,
        phone: doctorForm.phone,
        specialty: doctorForm.specialty,
        qualification: doctorForm.qualification,
        hospitalDepartment: doctorForm.hospitalDepartment,
        experienceYears: Number(doctorForm.experienceYears),
        consultationFee: Number(doctorForm.consultationFee),
        availableDays: doctorForm.availableDays.split(",").map((day) => day.trim()).filter(Boolean)
      };
      const path = doctorForm.id ? `/doctors/${doctorForm.id}` : "/doctors";
      const method = doctorForm.id ? "PATCH" : "POST";

      if (doctorForm.id && !payload.password) {
        delete payload.password;
      }

      await apiRequest(path, { method, token, body: JSON.stringify(payload) });
      setDoctorForm(emptyDoctor);
      await loadRecords();
      showSuccess(doctorForm.id ? "Doctor updated successfully" : "Doctor added successfully");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function submitPatient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload: Record<string, string | number | undefined> = {
        id: patientForm.id,
        name: patientForm.name,
        email: patientForm.email,
        password: patientForm.password || undefined,
        phone: patientForm.phone,
        age: Number(patientForm.age),
        gender: patientForm.gender,
        bloodGroup: patientForm.bloodGroup,
        address: patientForm.address,
        city: patientForm.city,
        emergencyContact: patientForm.emergencyContact,
        medicalHistory: patientForm.medicalHistory,
        assignedDoctor: patientForm.assignedDoctor || undefined
      };
      const path = patientForm.id ? `/patients/${patientForm.id}` : "/patients";
      const method = patientForm.id ? "PATCH" : "POST";

      if (patientForm.id && !payload.password) {
        delete payload.password;
      }

      await apiRequest(path, { method, token, body: JSON.stringify(payload) });
      setPatientForm(emptyPatient);
      await loadRecords();
      showSuccess(patientForm.id ? "Patient updated successfully" : "Patient added successfully");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function deleteDoctor(id: string) {
    if (!window.confirm("Delete this doctor record? Assigned patients will be unassigned.")) {
      return;
    }

    try {
      await apiRequest(`/doctors/${id}`, { method: "DELETE", token });
      await loadRecords();
      showSuccess("Doctor deleted successfully");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function updateDoctorApproval(id: string, approvalStatus: "approved" | "rejected") {
    if (approvalStatus === "rejected" && !window.confirm("Reject this doctor profile?")) {
      return;
    }

    try {
      await apiRequest(`/doctors/${id}/approval`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ approvalStatus })
      });
      await loadRecords();
      showSuccess(approvalStatus === "approved" ? "Doctor approved" : "Doctor rejected");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function deletePatient(id: string) {
    if (!window.confirm("Delete this patient record?")) {
      return;
    }

    try {
      await apiRequest(`/patients/${id}`, { method: "DELETE", token });
      await loadRecords();
      showSuccess("Patient deleted successfully");
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function assignDoctor(patientId: string, doctorId: string) {
    if (!doctorId) {
      showError(new Error("Select a doctor before assigning"));
      return;
    }

    try {
      await apiRequest(`/patients/${patientId}/assign-doctor`, {
        method: "PATCH",
        token,
        body: JSON.stringify({ doctorId })
      });
      await loadRecords();
      showSuccess("Doctor assigned to patient");
    } catch (requestError) {
      showError(requestError);
    }
  }

  const assignableDoctors = sortedDoctors.filter((doctor) => doctor.approvalStatus === "approved" && doctor.isActive);
  const showDoctors = mode === "all" || mode === "doctors";
  const showPatients = mode === "all" || mode === "patients";

  return (
    <section className="management-section">
      <div className="management-heading">
        <div>
          <p className="eyebrow">Hospital management</p>
          <h2>{mode === "doctors" ? "Doctor Records" : mode === "patients" ? "Patient Records" : "Doctor & Patient Records"}</h2>
        </div>
        <div className="record-counts">
          {showDoctors ? <span>{doctors.length} doctors</span> : null}
          {showPatients ? <span>{patients.length} patients</span> : null}
        </div>
      </div>

      {message ? <p className="form-success">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      {!isLoading && assignableDoctors.length === 0 ? (
        <p className="form-error">No approved active doctors are available for assignment. Approve a doctor first.</p>
      ) : null}
      {isLoading ? <p className="loading-state">Loading records...</p> : null}

      <div className={showDoctors && showPatients ? "management-grid" : "single-panel-grid"}>
        {showDoctors ? (
        <form className="management-form" onSubmit={submitDoctor}>
          <h3>{doctorForm.id ? "Update Doctor" : "Add Doctor"}</h3>
          <input placeholder="Name" value={doctorForm.name} onChange={(event) => setDoctorForm({ ...doctorForm, name: event.target.value })} required />
          <input placeholder="Email" type="email" value={doctorForm.email} onChange={(event) => setDoctorForm({ ...doctorForm, email: event.target.value })} required />
          <input placeholder={doctorForm.id ? "New password optional" : "Password"} type="password" minLength={8} value={doctorForm.password} onChange={(event) => setDoctorForm({ ...doctorForm, password: event.target.value })} required={!doctorForm.id} />
          <input placeholder="Phone" value={doctorForm.phone} onChange={(event) => setDoctorForm({ ...doctorForm, phone: event.target.value })} required />
          <input placeholder="Specialty" value={doctorForm.specialty} onChange={(event) => setDoctorForm({ ...doctorForm, specialty: event.target.value })} required />
          <input placeholder="Qualification" value={doctorForm.qualification} onChange={(event) => setDoctorForm({ ...doctorForm, qualification: event.target.value })} required />
          <input placeholder="Experience years" type="number" min="0" value={doctorForm.experienceYears} onChange={(event) => setDoctorForm({ ...doctorForm, experienceYears: event.target.value })} required />
          <input placeholder="Department" value={doctorForm.hospitalDepartment} onChange={(event) => setDoctorForm({ ...doctorForm, hospitalDepartment: event.target.value })} required />
          <input placeholder="Consultation fee" type="number" min="0" value={doctorForm.consultationFee} onChange={(event) => setDoctorForm({ ...doctorForm, consultationFee: event.target.value })} required />
          <input placeholder="Available days, comma separated" value={doctorForm.availableDays} onChange={(event) => setDoctorForm({ ...doctorForm, availableDays: event.target.value })} required />
          <div className="form-row-actions">
            <button className="form-button" type="submit">
              {doctorForm.id ? <Save aria-hidden="true" /> : <UserPlus aria-hidden="true" />}
              {doctorForm.id ? "Update Doctor" : "Add Doctor"}
            </button>
            {doctorForm.id ? <button className="ghost-button" type="button" onClick={() => setDoctorForm(emptyDoctor)}>Cancel</button> : null}
          </div>
        </form>
        ) : null}

        {showPatients ? (
        <form className="management-form" onSubmit={submitPatient}>
          <h3>{patientForm.id ? "Update Patient" : "Add Patient"}</h3>
          <input placeholder="Name" value={patientForm.name} onChange={(event) => setPatientForm({ ...patientForm, name: event.target.value })} required />
          <input placeholder="Email" type="email" value={patientForm.email} onChange={(event) => setPatientForm({ ...patientForm, email: event.target.value })} required />
          <input placeholder={patientForm.id ? "New password optional" : "Password"} type="password" minLength={8} value={patientForm.password} onChange={(event) => setPatientForm({ ...patientForm, password: event.target.value })} required={!patientForm.id} />
          <input placeholder="Phone" value={patientForm.phone} onChange={(event) => setPatientForm({ ...patientForm, phone: event.target.value })} required />
          <input placeholder="Age" type="number" min="0" max="120" value={patientForm.age} onChange={(event) => setPatientForm({ ...patientForm, age: event.target.value })} required />
          <select value={patientForm.gender} onChange={(event) => setPatientForm({ ...patientForm, gender: event.target.value as PatientForm["gender"] })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select value={patientForm.bloodGroup} onChange={(event) => setPatientForm({ ...patientForm, bloodGroup: event.target.value as PatientForm["bloodGroup"] })}>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => <option key={group} value={group}>{group}</option>)}
          </select>
          <input placeholder="Address" value={patientForm.address} onChange={(event) => setPatientForm({ ...patientForm, address: event.target.value })} required />
          <input placeholder="City" value={patientForm.city} onChange={(event) => setPatientForm({ ...patientForm, city: event.target.value })} required />
          <input placeholder="Emergency contact" value={patientForm.emergencyContact} onChange={(event) => setPatientForm({ ...patientForm, emergencyContact: event.target.value })} required />
          <select
            value={patientForm.assignedDoctor}
            onChange={(event) => setPatientForm({ ...patientForm, assignedDoctor: event.target.value })}
            disabled={assignableDoctors.length === 0}
          >
            <option value="">Assign doctor</option>
            {assignableDoctors.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.user.name} - {doctor.specialty}</option>)}
          </select>
          <textarea placeholder="Medical history" value={patientForm.medicalHistory} onChange={(event) => setPatientForm({ ...patientForm, medicalHistory: event.target.value })} />
          <div className="form-row-actions">
            <button className="form-button" type="submit">
              {patientForm.id ? <Save aria-hidden="true" /> : <Users aria-hidden="true" />}
              {patientForm.id ? "Update Patient" : "Add Patient"}
            </button>
            {patientForm.id ? <button className="ghost-button" type="button" onClick={() => setPatientForm(emptyPatient)}>Cancel</button> : null}
          </div>
        </form>
        ) : null}
      </div>

      <div className={showDoctors && showPatients ? "record-lists" : "single-panel-grid"}>
        {showDoctors ? (
        <article className="record-list">
          <h3>Doctors</h3>
          {doctors.map((doctor) => (
            <div className="record-row" key={doctor._id}>
              <div>
                <strong>{doctor.user.name}</strong>
                <span>{doctor.specialty} - {doctor.qualification}</span>
                <span>{doctor.user.phone} - Rs. {doctor.consultationFee}</span>
                <span>Status: {doctor.approvalStatus}</span>
              </div>
              <div className="record-actions">
                {doctor.approvalStatus !== "approved" ? (
                  <button type="button" title="Approve doctor" onClick={() => updateDoctorApproval(doctor._id, "approved")}><CheckCircle aria-hidden="true" /></button>
                ) : null}
                {doctor.approvalStatus !== "rejected" ? (
                  <button type="button" title="Reject doctor" onClick={() => updateDoctorApproval(doctor._id, "rejected")}><XCircle aria-hidden="true" /></button>
                ) : null}
                <button type="button" title="Edit doctor" onClick={() => setDoctorForm(doctorToForm(doctor))}><Edit aria-hidden="true" /></button>
                <button type="button" title="Delete doctor" onClick={() => deleteDoctor(doctor._id)}><Trash2 aria-hidden="true" /></button>
              </div>
            </div>
          ))}
        </article>
        ) : null}

        {showPatients ? (
        <article className="record-list">
          <h3>Patients</h3>
          {patients.map((patient) => (
            <div className="record-row" key={patient._id}>
              <div>
                <strong>{patient.user.name}</strong>
                <span>{patient.age} years - {patient.city} - {patient.bloodGroup}</span>
                <span>Doctor: {patient.assignedDoctor?.user.name || "Not assigned"}</span>
                <select
                  value={patient.assignedDoctor?._id || ""}
                  onChange={(event) => assignDoctor(patient._id, event.target.value)}
                  disabled={assignableDoctors.length === 0}
                >
                  <option value="">Assign doctor</option>
                  {assignableDoctors.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.user.name}</option>)}
                </select>
              </div>
              <div className="record-actions">
                <button type="button" title="Edit patient" onClick={() => setPatientForm(patientToForm(patient))}><Edit aria-hidden="true" /></button>
                <button type="button" title="Delete patient" onClick={() => deletePatient(patient._id)}><Trash2 aria-hidden="true" /></button>
              </div>
            </div>
          ))}
        </article>
        ) : null}
      </div>
    </section>
  );
}
