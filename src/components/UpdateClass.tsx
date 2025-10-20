import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import useTeacher from "../hooks/useTeachers";
import axiosInstance from "../services/axios-instance";
import type { classes } from "../types/classes";
import classSchema from "../types/schemas/classSchema";
import extractNumbers from "../utils/extractNumber";
import grades from "../utils/grade";
import Form from "./Form";
import DropDownStructure from "./reactDropDown/DropDownStructure";
type FormShape = z.infer<typeof classSchema>;

function UpdateClass() {
  const { data: branches } = useBranches();
  const { data: teachers } = useTeacher();

  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const [classesData, setClassesData] = useState<classes | null>(null);
  const getId = () => {
    const editQuery = getQuery("edit");
    if (!editQuery?.includes("classes-update")) return;
    const id = extractNumbers(editQuery);
    return parseInt(id);
  };
  const id = getId();

  useEffect(() => {
    const fetchUniqueClass = async () => {
      const req = await axiosInstance.get("/api/classes/" + id);
      setClassesData(req.data);
    };
    fetchUniqueClass();
  }, [id]);
  //   console.log(teacherData)
  useEffect(() => {
    if (classesData) {
      reset({
        grade: classesData?.grade,
        branchId: classesData?.branchId,
        teacherId: classesData.teacherId!,
      });
    }
  }, [classesData]);
  const {
    handleSubmit,
    reset,
    control,
    formState: {  dirtyFields, isSubmitting },
  } = useForm<FormShape>({
    resolver: zodResolver(classSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormShape) => {
    try {
      if (!id) return;

      // Check if there are any changes
      if (Object.keys(dirtyFields).length === 0) {
        toast("No changes detected", { style: { textAlign: "center" } });
        return;
      }

      const req = await axiosInstance.patch<FormShape>(
        "/api/classes/" + id,
        data
      );
      const name = req.data;
      toast.success(`updated successfully`, {
        style: { textAlign: "center", color: "var(--dark-brand-1)" },
      });
      navigate(-1);
    } catch (error: any) {
      toast.error(error?.response?.data || "Something went wrong", {
        style: { textAlign: "center" },
      });
      console.log(error?.response?.data || error);
    }
  };

  // Create a new Student
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Update a Student"
      isSubmitting={isSubmitting}
      isUpdating
    >
      <div>
        <label htmlFor="grade">Grade</label>
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={grades || []}
              labelKey="label"
              valueKey="value"
              margin=".5rem 0"
              widthBtn="15rem"
              widthDropBtn="90%"
              heightForButton="2.7rem"
              field={field}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="branchId">Branch</label>
        <Controller
          name="branchId"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={branches?.branches || []}
              labelKey="name"
              valueKey="id"
              margin=".5rem 0"
              widthBtn="15rem"
              widthDropBtn="90%"
              heightForButton="2.7rem"
              field={field}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="teacher">Instructor</label>
        <Controller
          name="teacherId"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={teachers?.teachers || []}
              labelKey="firstName"
              valueKey="id"
              margin=".5rem 0"
              widthBtn="15rem"
              widthDropBtn="90%"
              heightForButton="2.7rem"
              field={field}
            />
          )}
        />
      </div>
    </Form>
  );
}

export default UpdateClass;
