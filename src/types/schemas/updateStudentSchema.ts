// updateStudentSchema.ts
import { z } from "zod";
import studentsSchema from "./studentsSchema";

// Convert all fields to optional (deeply)
export const updateStudentSchema = studentsSchema.deepPartial().transform(obj => {
  // automatically convert empty strings to undefined
  const clean: Record<string, unknown> = {};
  Object.entries(obj).forEach(([key, value]) => {
    clean[key] = value === "" ? undefined : value;
  });
  return clean;
});

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
