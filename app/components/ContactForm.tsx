"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

const ORG_TYPES = [
  "Museum",
  "Cultural Institution",
  "Collection",
  "Gallery",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [orgType, setOrgType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      "form-name": "schedule-call",
      orgType,
      orgName,
      email,
      firstName,
      lastName,
    };

    try {
      const res = await fetch("/forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString(),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again, or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successBox}>
        <p className={styles.successHeading}>Thank you.</p>
        <p className={styles.successBody}>
          We&apos;ve received your request and will be in touch shortly to schedule a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="bot-field"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.selectWrap}>
        <select
          required
          value={orgType}
          onChange={(e) => setOrgType(e.target.value)}
          className={styles.select}
        >
          <option value="" disabled className={styles.selectPlaceholder}>
            Organization Type
          </option>
          {ORG_TYPES.map((type) => (
            <option key={type} value={type} className={styles.selectOption}>
              {type}
            </option>
          ))}
        </select>
        <svg
          className={styles.selectChevron}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <input
        required
        type="text"
        placeholder="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        className={styles.input}
      />

      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <input
        required
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={styles.input}
      />

      <input
        required
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={styles.input}
      />

      <button type="submit" disabled={status === "submitting"} className={styles.submitButton}>
        {status === "submitting" ? "Sending…" : "Schedule Call"}
      </button>

      {status === "error" && <p className={styles.errorText}>{errorMessage}</p>}
    </form>
  );
}
