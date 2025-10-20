import { z } from "zod";

const classSchema = z.object({
  grade: z.enum(["PESHGAM_1", "PESHGAM_2", "PESHGAM_3", "PESHGAM_4"], {
    required_error: "Grade is required.",
  }),
  branchId: z
    .number({ required_error: "Branch ID is required." })
    .min(1, "Branch is required."),
  teacherId: z
    .number({ required_error: "Teacher ID is required." })
    .min(1, "Teacher is required."),
});

export default classSchema;
