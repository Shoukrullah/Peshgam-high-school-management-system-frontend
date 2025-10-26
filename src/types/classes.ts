export type classes = ({
  branch: {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    address: string;
    city: string;
  };
  teacher: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    phone: string | null;
    branchId: number;
    degree: string | null;
    homeAddress: string | null;
  } | null;
} & {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  branchId: number;
  name: string;
  grade: "PESHGAM_1" | "PESHGAM_2" | "PESHGAM_3" | "PESHGAM_4";
  teacherId: number | null;
});
