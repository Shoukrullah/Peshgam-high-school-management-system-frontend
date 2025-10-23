import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useClasses from "../hooks/useClasses";
import axiosInstance from "../services/axios-instance";
import classSchema from "../types/schemas/classSchema";
import Form from "./Form";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import useTeacher from "../hooks/useTeachers";
import grades from "../utils/grade";
import useBranches from "../hooks/useBranches";
type FormShape = z.infer<typeof classSchema>;

function CreateClass() {
  const { data: classes } = useClasses();
  const { data: teachers } = useTeacher();
  const {data: branches} = useBranches()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<FormShape>({ resolver: zodResolver(classSchema) });

  const onSubmit = async (data: FormShape) => {
    try {
      const req = await axiosInstance.post<FormShape>("/api/classes", data);
      const name = req.data;
      toast.success(`Class is added successfully`, {
        style: { textAlign: "center", color: "var(--dark-brand-1)" },
      });
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
      HeadingLabel="Create a new Class"
      isSubmitting={isSubmitting}
    >
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

export default CreateClass;
