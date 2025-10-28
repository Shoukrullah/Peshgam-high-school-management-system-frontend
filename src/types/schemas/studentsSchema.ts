import { z } from "zod";

const studentsSchema = z.object({
  firstName: z.string().trim().min(1, "FirstName is required."),
  lastName: z.string().trim().min(1, "LastName is required."),
  photoUrl: z.string().trim().optional(),
  dob: z.string().optional(),
  phone: z
    .string({ required_error: "Phone filed is required." })
    .trim()
    .min(10, "Phone number is required.")
    .startsWith("07", "Phone number has to start with 07.")
    .max(10, "Invalid phone number."),
  branchId: z.number().min(1, "BranchId is required."),
  classId: z.number().min(1, "ClassId is required."),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  status: z.enum(["ACTIVE", "GRADUATED", "TRANSFERRED", "INACTIVE"]).optional(),
  address: z.string().optional()
});

export default studentsSchema;
