export type teacherShape = ({
    branch: {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        address: string;
        city: string;
    };
    classes: {
        id: number;
        createdAt: Date;
        name: string;
        updatedAt: Date | null;
        branchId: number;
        grade: "PESHGAM_1" | "PESHGAM_2" | "PESHGAM_3" | "PESHGAM_4";
        teacherId: number | null;
    }[];
} & {
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
})

