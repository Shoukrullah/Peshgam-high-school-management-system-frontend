import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useBranches from "../hooks/useBranches";
import useClasses from "../hooks/useClasses";
import studentsSchema from "../types/schemas/studentsSchema";
import gender from "../utils/Gender";
import Form from "./Form";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import { useMutate } from "../hooks/useMutate";
import type { studentShape } from "../types/students";
import { QUERY_KEYS } from "../services/constants";
type FormShape = z.infer<typeof studentsSchema>;

function CreateStudent() {
  const { data: branches } = useBranches();
  const { data: classes } = useClasses();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({ resolver: zodResolver(studentsSchema) });
  const { mutate, isPending } = useMutate<studentShape, FormShape>({
    endpoint: "/api/students",
    method: "post",
    invalidateKeys: [QUERY_KEYS.STUDENTS],

    // ✅ Optimistic UI update
    optimisticUpdate: (oldData, newItem) => [
      ...oldData,
      {
        id: Date.now(),
        firstName: newItem.firstName,
        lastName: newItem.lastName,
        phone: newItem.phone,
        branchId: newItem.branchId,
        classId: newItem.classId,
      } as studentShape,
    ],

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
      HeadingLabel="Create a new Student"
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
        <label htmlFor="classId">Class</label>
        <Controller
          name="classId"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={classes?.classes || []}
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
    </Form>
  );
}

export default CreateStudent;
