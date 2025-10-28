import { zodResolver } from "@hookform/resolvers/zod";
import delay from "delay";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useBranches from "../hooks/useBranches";
import axiosInstance from "../services/axios-instance";
import teacherSchema from "../types/schemas/teacherSchema";
import Form from "./Form";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import degree from "../utils/degree";
import { useMutate } from "../hooks/useMutate";
import type { teacherShape } from "../types/teachers";
import { QUERY_KEYS } from "../services/constants";
type FormShape = z.infer<typeof teacherSchema>;

function CreateTeacher() {
  const { data: branches } = useBranches();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({ resolver: zodResolver(teacherSchema) });
  const { mutate, isPending } = useMutate<teacherShape, FormShape>({
    endpoint: "/api/teachers",
    method: "post",
    invalidateKeys: [QUERY_KEYS.TEACHERS],

    // ✅ Optimistic UI update
    optimisticUpdate: (oldData, newItem) => {
      const prev = Array.isArray(oldData) ? oldData : [];
      return [
        ...prev,
        {
          id: Date.now(),
          branchId: newItem.branchId,
          degree: newItem.degree,
          firstName: newItem.firstName,
          homeAddress: newItem.homeAddress,
          lastName: newItem.lastName,
          phone: newItem.phone,
        } as teacherShape,
      ];
    },

    onSuccess: (data) => {
      toast.success(
        `${data.firstName} ${data.lastName} is added successfully`,
        {
          style: { textAlign: "center", color: "var(--dark-brand-1)" },
        }
      );
      navigate(-1);
      reset();
    },

    onError: (error: any) => {
      const message =
        error?.response?.data || "Something went wrong, please try again.";
      toast.error(message, { style: { textAlign: "center" } });
      console.error("Class creation failed:", message);
    },
  });

  const onSubmit = (data: FormShape) => {
    mutate(data);
  };
  // Create a new Student
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Create a new Teacher"
      isSubmitting={isSubmitting}
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

export default CreateTeacher;
