import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "../services/axios-instance";
import branchesSchema from "../types/schemas/branchesSchema";
import afghanistanProvinces from "../utils/afghanistanProvinces";
import Form from "./Form";
import Input from "./Input";
import SuggestionsInput from "./SuggestionsInput";
type FormShape = z.infer<typeof branchesSchema>;

function CreateBranch() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
    setValue,
  } = useForm<FormShape>({ resolver: zodResolver(branchesSchema) });

  const onSubmit = async (data: FormShape) => {
    try {
      const req = await axiosInstance.post<FormShape>("/api/branches", data);
      const branch = req.data;
      toast.success(`${branch.name} is added successfully`, {
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
      HeadingLabel="Create a new Branch"
      isSubmitting={isSubmitting}
    >
      <div>
        <label htmlFor="name">Branch Name</label>
        <Input
          isWithZod
          dirtyFields={dirtyFields}
          errors={errors}
          id="name"
          register={register}
          registerValue="name"
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
        <label htmlFor="city">City</label>
        <SuggestionsInput
          isWithZod
          register={register}
          registerValue="city"
          errors={errors}
          dirtyFields={dirtyFields}
          setValue={setValue}
          placeholder="Kabul"
          suggestions={afghanistanProvinces}
        />
      </div>
    </Form>
  );
}

export default CreateBranch;
