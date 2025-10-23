export type attendance = ({
  student: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    address: string | null;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
    gender: "MALE" | "FEMALE";
    phone: string | null;
    dob: Date | null;
    branchId: number;
    classId: number | null;
    status: "ACTIVE" | "GRADUATED" | "TRANSFERRED" | "INACTIVE";
  };
  class: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    branchId: number;
    grade: "PESHGAM_1" | "PESHGAM_2" | "PESHGAM_3" | "PESHGAM_4";
    teacherId: number | null;
  } | null;
} & {
  id: number;
  createdAt: Date;
  classId: number | null;
  status: "PRESENT" | "ABSENT" | "PROBLEM";
  studentId: number;
  date: Date;
  note: string | null;
});



