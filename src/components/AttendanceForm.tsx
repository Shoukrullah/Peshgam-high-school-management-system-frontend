import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiStackOverflowLogoBold, PiWarning } from "react-icons/pi";
import { RxCheck } from "react-icons/rx";
import { z } from "zod";
import axiosInstance from "../services/axios-instance";
import attendanceSchema from "../types/schemas/attendanceSchema";
import type { studentShape } from "../types/students";
import styles from "./AttendanceDescription.module.css";
import { AttendanceTable, Button, Input } from "../components";
import { useNavigate } from "react-router-dom";

type FormShape = z.infer<typeof attendanceSchema>;
export type AttendanceStatus = "PRESENT" | "ABSENT" | "PROBLEM";

interface StudentWithStatus extends studentShape {
  attendanceStatus?: AttendanceStatus; // optional, placeholder if not marked
}

interface Props {
  studentData: studentShape[];
}

function AttendanceForm({ studentData }: Props) {
  const [students, setStudents] = useState<StudentWithStatus[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Whenever studentData (from parent) changes, we create a fresh copy in local state.
    setStudents(studentData.map((stu) => ({ ...stu })));
  }, [studentData]);
  const {
    register,
    watch,
    formState: { dirtyFields, errors },
  } = useForm<FormShape>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: { date: new Date().toISOString().slice(0, 10) },
  });

  const selectedDate = watch("date");
  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "MMMM dd, yyyy")
    : "";

  const handleStatusChange = (id: number, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((stu) =>
        stu.id === id ? { ...stu, attendanceStatus: status } : stu
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((stu) => ({ ...stu, attendanceStatus: "PRESENT" }))
    );
  };

  const handleSave = () => {
    const noMarkAtAll = students.every((stu) => !stu.attendanceStatus);
    const anyUnmarked = students.some((stu) => !stu.attendanceStatus);
    if (noMarkAtAll) {
      toast("Cannot save: All students are unmarked", {
        icon: <PiWarning size={30} color="var(--ternary-color)" />,
        style: {
          textAlign: "center",
        },
      });
      console.log("Cannot save: Some students are still unmarked");
      return; // do not send request
    }

    if (anyUnmarked) {
      toast("Cannot save: Some students are still unmarked", {
        icon: <PiWarning size={30} color="var(--ternary-color)" />,
        style: {
          textAlign: "center",
        },
      });
      console.log("Cannot save: Some students are still unmarked");
      return; // do not send request
    }

    // all students are marked, send payload
    const payload = students.map((stu) => ({
      studentId: stu.id,
      classId: stu.classId,
      date: selectedDate,
      status: stu.attendanceStatus,
    }));
    const postData = async () => {
      try {
        await Promise.all(
          payload.map((pay) =>
            axiosInstance.post<FormShape>("/api/attendances", pay)
          )
        );

        toast.success("Attendance of the class is successfully saved.", {
          style: { textAlign: "center" },
        });
        navigate("/attendances");
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
          toast.error((err.response.data as any)?.message || "Bad request.", {
            style: { textAlign: "center", fontSize: "1.2rem" },
          });
        } else {
          toast.error(err.message, {
            style: { textAlign: "center", fontSize: "1.2rem" },
          });
        }
      }
    };
    postData();
  };

  return (
    <>
      <div className={styles.mainChild}>
        <div>
          <Input
            type="date"
            width="18rem"
            isWithZod
            dirtyFields={dirtyFields}
            errors={errors}
            register={register}
            registerValue="date"
          />
        </div>

        <p>Session: class for date {formattedDate}</p>

        <div className="flex">
          <Button
            bgcolor="var(--light-brand-1)"
            color="var(--dark-brand-2)"
            boxShadow="0 0 2px .5px rgba(0,0,0,0.2)"
            height="3.7rem"
            onHandelFunction={markAllPresent}
          >
            <RxCheck /> Mark All Present
          </Button>

          <Button height="3.7rem" onHandelFunction={handleSave}>
            <PiStackOverflowLogoBold /> Save Changes
          </Button>
        </div>
      </div>
      <AttendanceTable
        studentData={students}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}

export default AttendanceForm;
