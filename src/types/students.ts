export type studentShape = ({
    branch: {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        address: string;
        city: string;
    };
    class: {
        id: number;
        createdAt: Date;
        name: string;
        updatedAt: Date | null;
        branchId: number;
        grade: 'PESHGAM_1' | 'PESHGAM_2' | 'PESHGAM_3' | 'PESHGAM_4';
        teacherId: number | null;
    } | null;
} & {
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
})
