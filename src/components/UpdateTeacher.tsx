import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import axiosInstance from "../services/axios-instance";
import teacherSchema from "../types/schemas/teacherSchema";
import type { teacherShape } from "../types/teachers";
import degree from "../utils/degree";
import extractNumbers from "../utils/extractNumber";
import Form from "./Form";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import { useMutate } from "../hooks/useMutate";
import { QUERY_KEYS } from "../services/constants";
type FormShape = z.infer<typeof teacherSchema>;

function UpdateTeacher() {
  const { data: branches } = useBranches();
  console.log(branches);
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState<teacherShape | null>(null);
  const getId = () => {
    const editQuery = getQuery("edit");
    if (!editQuery?.includes("teachers-update")) return;
    const id = extractNumbers(editQuery);
    return parseInt(id);
  };
  const id = getId();

  useEffect(() => {
    const fetchUniqueTeacher = async () => {
      const req = await axiosInstance.get("/api/teachers/" + id);
      setTeacherData(req.data);
    };
    fetchUniqueTeacher();
  }, [id]);
  console.log(teacherData);
  useEffect(() => {
    if (teacherData) {
      reset({
        firstName: teacherData?.firstName,
        lastName: teacherData?.lastName,
        branchId: teacherData?.branchId,
        degree: teacherData?.degree || undefined,
        homeAddress: teacherData?.homeAddress || undefined,
        phone: teacherData?.phone || undefined,
      });
    }
  }, [teacherData]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {},
  });
  const { mutate, isPending } = useMutate<FormShape, FormShape>({
    endpoint: `/api/teachers/${id}`,
    method: "patch",
    invalidateKeys: [QUERY_KEYS.TEACHERS],
    onSuccess: (data) => {
      toast.success(`${data.firstName} ${data.lastName} updated successfully`, {
        style: { textAlign: "center", color: "var(--dark-brand-1)" },
      });
      navigate(-1);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || "Something went wrong", {
        style: { textAlign: "center" },
      });
      console.error(error);
    },
    // (Optional) optimistic update
    optimisticUpdate: (oldData, newItem) => {
      return oldData.map((students: any) =>
        students.id === id ? { ...students, ...newItem } : students
      );
    },
  });

  // ✅ Handle form submission
  const onSubmit = (data: FormShape) => {
    if (!id) return;

    if (Object.keys(dirtyFields).length === 0) {
      toast("No changes detected", { style: { textAlign: "center" } });
      return;
    }

    mutate(data);
  };

  // Create a new Student
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Update a Teacher"
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
        <label htmlFor="homeAddress">Address</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="homeAddress"
          register={register}
          registerValue="homeAddress"
          placeholder="Share-now, Kabul"
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
        <label htmlFor="degree">Degree</label>
        <Controller
          name="degree"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={degree || []}
              labelKey="degree"
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

export default UpdateTeacher;
