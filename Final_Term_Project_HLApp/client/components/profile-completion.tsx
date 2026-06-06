"use client";

import { FormEvent, useState } from "react";
import { ClipboardPlus, Stethoscope } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/context/toast-context";

type ProfileCompletionProps = {
  role: "doctor" | "patient";
  token: string;
  onCompleted: () => void;
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function ProfileCompletion({ role, token, onCompleted }: ProfileCompletionProps) {
  const { showToast } = useToast();
  const [form, setForm] = useState<Record<string, string>>({
    phone: "",
    age: "",
    gender: "male",
    bloodGroup: "O+",
    address: "",
    city: "",
    emergencyContact: "",
    medicalHistory: "",
    specialty: "",
    qualification: "",
    experienceYears: "",
    hospitalDepartment: "",
    consultationFee: "",
    availableDays: "Monday, Wednesday, Friday"
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (role === "patient") {
        await apiRequest("/patients/me/profile", {
          method: "POST",
          token,
          body: JSON.stringify({
            phone: form.phone,
            age: Number(form.age),
            gender: form.gender,
            bloodGroup: form.bloodGroup,
            address: form.address,
            city: form.city,
            emergencyContact: form.emergencyContact,
            medicalHistory: form.medicalHistory
          })
        });
      } else {
        await apiRequest("/doctors/me/profile", {
          method: "POST",
          token,
          body: JSON.stringify({
            phone: form.phone,
            specialty: form.specialty,
            qualification: form.qualification,
            experienceYears: Number(form.experienceYears),
            hospitalDepartment: form.hospitalDepartment,
            consultationFee: Number(form.consultationFee),
            availableDays: form.availableDays.split(",").map((day) => day.trim()).filter(Boolean)
          })
        });
      }

      onCompleted();
      showToast(role === "patient" ? "Patient profile saved" : "Doctor profile submitted", "success");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Could not save profile";
      setError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const Icon = role === "patient" ? ClipboardPlus : Stethoscope;

  return (
    <section className="profile-completion">
      <div>
        <Icon aria-hidden="true" />
        <h2>{role === "patient" ? "Complete Patient Profile" : "Submit Doctor Profile"}</h2>
        <p>
          {role === "patient"
            ? "Add your medical details so the hospital can assign a doctor and manage your treatment record."
            : "Add your professional details. An admin must approve your profile before patients can be assigned to you."}
        </p>
      </div>

      <form className="management-form" onSubmit={submitProfile}>
        <input placeholder="Phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} required />

        {role === "patient" ? (
          <>
            <input placeholder="Age" type="number" min="0" max="120" value={form.age} onChange={(event) => update("age", event.target.value)} required />
            <select value={form.gender} onChange={(event) => update("gender", event.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select value={form.bloodGroup} onChange={(event) => update("bloodGroup", event.target.value)}>
              {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
            <input placeholder="Address" value={form.address} onChange={(event) => update("address", event.target.value)} required />
            <input placeholder="City" value={form.city} onChange={(event) => update("city", event.target.value)} required />
            <input placeholder="Emergency contact" value={form.emergencyContact} onChange={(event) => update("emergencyContact", event.target.value)} required />
            <textarea placeholder="Medical history" value={form.medicalHistory} onChange={(event) => update("medicalHistory", event.target.value)} />
          </>
        ) : (
          <>
            <input placeholder="Specialty" value={form.specialty} onChange={(event) => update("specialty", event.target.value)} required />
            <input placeholder="Qualification" value={form.qualification} onChange={(event) => update("qualification", event.target.value)} required />
            <input placeholder="Experience years" type="number" min="0" value={form.experienceYears} onChange={(event) => update("experienceYears", event.target.value)} required />
            <input placeholder="Hospital department" value={form.hospitalDepartment} onChange={(event) => update("hospitalDepartment", event.target.value)} required />
            <input placeholder="Consultation fee" type="number" min="0" value={form.consultationFee} onChange={(event) => update("consultationFee", event.target.value)} required />
            <select value={form.availableDays} onChange={(event) => update("availableDays", event.target.value)}>
              <option value="">Available days</option>
              {weekdays.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
            <input placeholder="Available days, comma separated" value={form.availableDays} onChange={(event) => update("availableDays", event.target.value)} required />
          </>
        )}

        {error ? <p className="form-error">{error}</p> : null}
        <button className="form-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
}
