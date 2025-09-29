import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User management
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Companies table
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(), // cybersecurity, mobile, cloud, etc.
  founded: integer("founded"),
  headquarters: text("headquarters"),
  website: text("website"),
  valuation: text("valuation"), // market cap or valuation
  riskLevel: text("risk_level").notNull(), // high, medium, low
  employeeCount: integer("employee_count"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Applications table
export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  platform: text("platform").notNull(), // android, ios, web, desktop
  downloads: text("downloads"), // download count as string to handle large numbers
  playStoreUrl: text("play_store_url"),
  appStoreUrl: text("app_store_url"),
  websiteUrl: text("website_url"),
  category: text("category").notNull(),
  permissions: text("permissions").array(), // array of permissions
  dataCollected: text("data_collected").array(), // types of data collected
  riskScore: integer("risk_score").notNull(), // 0-100
  securityIssues: text("security_issues").array(),
  privacyRisks: text("privacy_risks").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Risk assessments
export const riskAssessments = pgTable("risk_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityId: varchar("entity_id").notNull(), // company or app id
  entityType: text("entity_type").notNull(), // company or application
  riskCategory: text("risk_category").notNull(),
  riskDescription: text("risk_description").notNull(),
  severity: text("severity").notNull(), // critical, high, medium, low
  impact: text("impact"),
  mitigation: text("mitigation"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Sources and references
export const sources = pgTable("sources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  url: text("url"),
  type: text("type").notNull(), // report, article, press_release, official_doc
  publishedDate: timestamp("published_date"),
  isConfidential: boolean("is_confidential").default(false),
  reliability: text("reliability").notNull(), // verified, probable, possible
  createdAt: timestamp("created_at").defaultNow(),
});

// Create schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertRiskAssessmentSchema = createInsertSchema(riskAssessments).omit({
  id: true,
  createdAt: true,
});

export const insertSourceSchema = createInsertSchema(sources).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertRiskAssessment = z.infer<typeof insertRiskAssessmentSchema>;
export type RiskAssessment = typeof riskAssessments.$inferSelect;

export type InsertSource = z.infer<typeof insertSourceSchema>;
export type Source = typeof sources.$inferSelect;

// Enums for better type safety
export const RiskLevel = {
  CRITICAL: 'critical',
  HIGH: 'high', 
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export const CompanyCategory = {
  CYBERSECURITY: 'cybersecurity',
  MOBILE_APPS: 'mobile_apps',
  CLOUD_SERVICES: 'cloud_services',
  AI_SECURITY: 'ai_security',
  FINTECH: 'fintech',
  INFRASTRUCTURE: 'infrastructure',
  DEFENSE_TECH: 'defense_tech'
} as const;

export const Platform = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
  DESKTOP: 'desktop'
} as const;