"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).lean();

    if (!event) return [];

    const similarEvents = await Event.find({
      _id: { $ne: event._id },  //ignore the event with same id
      tags: { $in: event.tags }, //find the events with the similar tags
    }).lean();

    // eslint-disable-next-line
    const serialized = similarEvents.map((item: any) => ({
      ...item,
      _id: item._id.toString(), // convert ObjectId
      createdAt: item.createdAt?.toString(),
      updatedAt: item.updatedAt?.toString(),
    }));

    return serialized;
  } catch (error) {
    console.error(error);
    return [];
  }
};