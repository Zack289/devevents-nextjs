"use server";

import Booking from "@/database/booking.model";
import connectDB from "@/lib/mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    // ✅ Return both success and error
    return { success: true, error: null };
    // eslint-disable-next-line
  } catch (e: any) {
    console.error("create booking failed", e);

    // ✅ Handle duplicate key error nicely
    if (e.code === 11000) {
      return {
        success: false,
        error: "You’ve already booked this event with this email.",
      };
    }

    return { success: false, error: "Server error" };
  }
};
