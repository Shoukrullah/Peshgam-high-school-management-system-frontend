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

  const onSubmit = async (data: FormShape) => {
    try {
      const req = await axiosInstance.post<FormShape>("/api/teachers", data);
      const name = req.data;
      toast.success(
        `${name.firstName} ${name.lastName} is added successfully`,
        {
          style: { textAlign: "center", color: "var(--dark-brand-1)" },
        }
      );
      navigate(-1);
      reset();
    } catch (error: any) {
      toast.error(error.response.data, {
        style: {
          textAlign: "center",
        },
      });
      // navigate(-1);
      console.log(error.response.data);
    }
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
