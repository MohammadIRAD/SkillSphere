import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  fullName: text("full_name"),
  bio: text("bio"),
  avatar: text("avatar"),
  skills: text("skills").array(),
  experience: text("experience"),
  socialLinks: jsonb("social_links").$type<{ linkedin?: string; github?: string; twitter?: string }>(),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  companyLogo: text("company_logo"),
  budget: integer("budget"),
  location: text("location"),
  type: text("type").notNull(),
  skills: text("skills").array(),
  postedBy: varchar("posted_by").notNull().references(() => users.id),
  applicants: text("applicants").array().default(sql`ARRAY[]::text[]`),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail"),
  instructor: varchar("instructor").notNull().references(() => users.id),
  instructorName: text("instructor_name"),
  category: text("category").notNull(),
  level: text("level").notNull(),
  duration: integer("duration"),
  price: integer("price").default(0),
  rating: integer("rating").default(0),
  enrolledStudents: text("enrolled_students").array().default(sql`ARRAY[]::text[]`),
  lessons: jsonb("lessons").$type<{ id: string; title: string; duration: number; videoUrl?: string }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const competitions = pgTable("competitions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  participants: text("participants").array().default(sql`ARRAY[]::text[]`),
  deadline: timestamp("deadline").notNull(),
  prize: text("prize"),
  submissions: jsonb("submissions").$type<{ userId: string; content: string; score: number; submittedAt: Date }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolios = pgTable("portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  title: text("title"),
  tagline: text("tagline"),
  projects: jsonb("projects").$type<{ id: string; title: string; description: string; image?: string; liveUrl?: string; githubUrl?: string; tags: string[] }[]>(),
  certificates: jsonb("certificates").$type<{ id: string; title: string; issuer: string; date: string }[]>(),
  viewCount: integer("view_count").default(0),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const partTimeJobs = pgTable("part_time_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  type: text("type").notNull(),
  pay: integer("pay").notNull(),
  location: text("location").notNull(),
  distance: text("distance"),
  postedBy: varchar("posted_by").notNull().references(() => users.id),
  applicants: text("applicants").array().default(sql`ARRAY[]::text[]`),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  likes: text("likes").array().default(sql`ARRAY[]::text[]`),
  comments: jsonb("comments").$type<{ id: string; userId: string; username: string; content: string; createdAt: Date }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const connections = pgTable("connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  connectedUserId: varchar("connected_user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => partTimeJobs.id),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id),
  reviewedUserId: varchar("reviewed_user_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true, createdAt: true, applicants: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true, createdAt: true, enrolledStudents: true });
export const insertCompetitionSchema = createInsertSchema(competitions).omit({ id: true, createdAt: true, participants: true, submissions: true });
export const insertPortfolioSchema = createInsertSchema(portfolios).omit({ id: true, createdAt: true, viewCount: true, likes: true });
export const insertPartTimeJobSchema = createInsertSchema(partTimeJobs).omit({ id: true, createdAt: true, applicants: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, likes: true, comments: true });
export const insertConnectionSchema = createInsertSchema(connections).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCompetition = z.infer<typeof insertCompetitionSchema>;
export type Competition = typeof competitions.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPartTimeJob = z.infer<typeof insertPartTimeJobSchema>;
export type PartTimeJob = typeof partTimeJobs.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type Connection = typeof connections.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
