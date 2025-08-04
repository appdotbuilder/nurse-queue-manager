
import { z } from 'zod';

// Urgency level enum
export const urgencyLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
export type UrgencyLevel = z.infer<typeof urgencyLevelSchema>;

// Patient status enum
export const patientStatusSchema = z.enum(['waiting', 'in_progress', 'completed', 'cancelled']);
export type PatientStatus = z.infer<typeof patientStatusSchema>;

// Patient schema
export const patientSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  phone_number: z.string(),
  chief_complaint: z.string(),
  urgency_level: urgencyLevelSchema,
  status: patientStatusSchema,
  queue_position: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Patient = z.infer<typeof patientSchema>;

// Input schema for creating patients
export const createPatientInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  urgency_level: urgencyLevelSchema
});

export type CreatePatientInput = z.infer<typeof createPatientInputSchema>;

// Input schema for updating patients
export const updatePatientInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  phone_number: z.string().min(1).optional(),
  chief_complaint: z.string().min(1).optional(),
  urgency_level: urgencyLevelSchema.optional(),
  status: patientStatusSchema.optional()
});

export type UpdatePatientInput = z.infer<typeof updatePatientInputSchema>;

// Input schema for deleting patients
export const deletePatientInputSchema = z.object({
  id: z.number()
});

export type DeletePatientInput = z.infer<typeof deletePatientInputSchema>;

// Input schema for marking patient as seen/completed
export const markPatientSeenInputSchema = z.object({
  id: z.number()
});

export type MarkPatientSeenInput = z.infer<typeof markPatientSeenInputSchema>;
