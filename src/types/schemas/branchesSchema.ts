import { z } from "zod";

const branchesSchema = z.object({
  name: z.string().trim().min(1, "Name is is required."),
  address: z.string().trim().min(3, "Address is required."),
  city: z.string().trim().min(1, "City is required.").optional(),
});

export default branchesSchema;
