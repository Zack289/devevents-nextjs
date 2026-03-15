"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { createBooking } from "@/lib/actions/booking.action";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 🔹 NEW: added error state so we can show messages when booking fails
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 CHANGED: destructure both success and error from createBooking
    const { success, error } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      setError(null); // 🔹 NEW: clear any previous error
      posthog.capture("event_booked", { eventId, slug, email });
    } else {
      // 🔹 CHANGED: set error state instead of only console.error
      setError(error || "Booking creation failed");
      posthog.capture("booking_failed", { eventId, slug, email });
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm text-green-600">🎉 Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button type="submit" className="button-submit">Submit</button>

          {/* 🔹 NEW: render error message if booking fails */}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default BookEvent;