export type branches = ({
    students: {
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        address: string | null;
        firstName: string;
        lastName: string;
        photoUrl: string | null;
        gender: 'MALE' | 'FEMALE';
        phone: string | null;
        dob: Date | null;
        branchId: number;
        classId: number | null;
        status: "ACTIVE"| "GRADUATED" | "TRANSFERRED" | "INACTIVE";
    }[];
    classes: {
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        branchId: number;
        grade: "PESHGAM_1" | "PESHGAM_2" | "PESHGAM_3" | "PESHGAM_4";
        teacherId: number | null;
    }[];
    teachers: {
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
    }[];
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    address: string;
    city: string;
})
