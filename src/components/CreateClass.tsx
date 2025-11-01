import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useBranches from "../hooks/useBranches";
import { useMutate } from "../hooks/useMutate";
import useTeacher from "../hooks/useTeachers";
import { QUERY_KEYS } from "../services/constants";
import type { classes } from "../types/classes";
import classSchema from "../types/schemas/classSchema";
import grades from "../utils/grade";
import Form from "./Form";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
type FormShape = z.infer<typeof classSchema>;

function CreateClass() {
  const { data: teachers } = useTeacher();
  const { data: branches } = useBranches();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({ resolver: zodResolver(classSchema) });

  const { mutate, isPending } = useMutate<classes, FormShape>({
    endpoint: "/api/classes",
    method: "post",
    invalidateKeys: [QUERY_KEYS.CLASSES],

    // ✅ Optimistic UI update

    optimisticUpdate: (oldData, newItem) => {
      const prev = Array.isArray(oldData) ? oldData : [];
      return [
        ...prev,
        {
          id: Math.random(), // temporary client-side ID
          name: newItem.name,
          grade: newItem.grade,
          branchId: newItem.branchId,
          teacherId: newItem.teacherId,
        },
      ] as classes[];
    },

    onSuccess: (data) => {
      toast.success(`${data.name} class is added successfully`, {
        style: { textAlign: "center", color: "var(--dark-brand-1)" },
      });
      reset();
      navigate(-1);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data || "Something went wrong, please try again.";
      toast.error(message, { style: { textAlign: "center" } });
      console.error("Class creation failed:", message);
    },
  });

  const onSubmit = (data: FormShape) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Create a new Class"
      isSubmitting={isSubmitting}
    >
      <div>
        <label htmlFor="name">Class Name</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="name"
          register={register}
          registerValue="name"
          placeholder="P-1-QotaSanqi"
        />
      </div>
      <div>
        <label htmlFor="grade">Grade</label>
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <DropDownStructure
              options={grades}
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
              widthDropBtn="100%"
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

export default CreateClass;
