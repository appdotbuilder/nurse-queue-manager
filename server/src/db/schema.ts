
import { serial, text, pgTable, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

// Define PostgreSQL enums
export const urgencyLevelEnum = pgEnum('urgency_level', ['low', 'medium', 'high', 'critical']);
export const patientStatusEnum = pgEnum('patient_status', ['waiting', 'in_progress', 'completed', 'cancelled']);

export const patientsTable = pgTable('patients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone_number: text('phone_number').notNull(),
  chief_complaint: text('chief_complaint').notNull(),
  urgency_level: urgencyLevelEnum('urgency_level').notNull(),
  status: patientStatusEnum('status').notNull().default('waiting'),
  queue_position: integer('queue_position').notNull(), // Position in the queue
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type Patient = typeof patientsTable.$inferSelect; // For SELECT operations
export type NewPatient = typeof patientsTable.$inferInsert; // For INSERT operations

// Important: Export all tables and relations for proper query building
export const tables = { patients: patientsTable };
