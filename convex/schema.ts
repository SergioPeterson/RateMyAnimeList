import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  animes: defineTable({
    id: v.number(),
    title: v.string(),
    start_date: v.string(),
    synopsis: v.string(),
    mean: v.number(),
    rank: v.number(),
    popularity: v.number(),
    nsfw: v.string(),
    picture: v.string(),
    genres: v.array(v.number())
  })
});