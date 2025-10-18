import { zodResolver } from "@hookform/resolvers/zod";
import delay from "delay";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import useClasses from "../hooks/useClasses";
import axiosInstance from "../services/axios-instance";
import { updateStudentSchema } from "../types/schemas/updateStudentSchema";
import extractNumbers from "../utils/extractNumber";
import gender from "../utils/Gender";
import Form from "./Form";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import studentsSchema from "../types/schemas/studentsSchema";
import useStudents from "../hooks/useStudents";
import { useEffect, useState } from "react";
import type { studentShape } from "../types/students";
import axios from "axios";
import status from "../utils/status";
type FormShape = z.infer<typeof studentsSchema>;

function UpdateStudent() {
  const { data: branches } = useBranches();
  const { data: classes } = useClasses();
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<studentShape | null>(null);
  const getId = () => {
    const editQuery = getQuery("edit");
    if (!editQuery?.includes("students-update")) return;
    const id = extractNumbers(editQuery);
    return parseInt(id);
  };
  const id = getId();

  useEffect(() => {
    const fetchUniqueStudent = async () => {
      const req = await axiosInstance.get("/api/students/" + id);
      setStudentData(req.data);
    };
    fetchUniqueStudent();
  }, [id]);
  useEffect(() => {
    if (studentData) {
      reset({
        branchId: studentData.branchId,
        classId: studentData.classId || undefined,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        phone: studentData.phone || undefined,
        dob: studentData.dob?.toString() || undefined,
        gender: studentData.gender,
        status: studentData.status
      });
    }
  }, [studentData]);
  console.log(studentData);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({
    resolver: zodResolver(studentsSchema),
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
        "/api/students/" + id,
        data
      );
      const name = req.data;
      toast.success(`${name.firstName} ${name.lastName} updated successfully`, {
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
        <label htmlFor="firstName">First Name</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="firstName"
          register={register}
          registerValue="firstName"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="lastName"
          register={register}
          registerValue="lastName"
        />
      </div>
      <div>
        <label htmlFor="dob">Birth-date</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="dob"
          register={register}
          registerValue="dob"
          type="date"
          color="var(--dark-brand-3)"
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="address"
          register={register}
          registerValue="address"
          placeholder="Share-now, Kabul"
        />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={gender}
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
        <label htmlFor="phone">Phone</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="phone"
          register={register}
          registerValue="phone"
          placeholder="07-xxx-xxxx"
        />
      </div>
      <div>
        <label htmlFor="branch">Branch</label>
        <Controller
          name="branchId"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={branches || []}
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
        <label htmlFor="classId">Class</label>
        <Controller
          name="classId"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={classes || []}
              labelKey="grade"
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
        <label htmlFor="status">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={status || []}
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
    </Form>
  );
}

export default UpdateStudent;
