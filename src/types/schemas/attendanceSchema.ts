import { z } from "zod";

const attendanceSchema = z.object({
  studentId: z.number().min(1, "StudentId is req"),
  classId: z.number().min(1, "ClassId is required."),
  date: z.string().min(1, "Date is required.").date(),
  status: z.enum(["PRESENT", "ABSENT", "PROBLEM"], {
    required_error: "Status is required.",
  }),
});

export default attendanceSchema;
