export interface Classes {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  branchId: number;
  grade: "PESHGAM_1" | "PESHGAM_2" | "PESHGAM_3" | "PESHGAM_4";
  teacherId: number | null;
}
