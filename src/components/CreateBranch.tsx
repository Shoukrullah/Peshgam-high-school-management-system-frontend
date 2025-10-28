import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import branchesSchema from "../types/schemas/branchesSchema";
import afghanistanProvinces from "../utils/afghanistanProvinces";
import Form from "./Form";
import Input from "./Input";
import SuggestionsInput from "./SuggestionsInput";
import { useMutate } from "../hooks/useMutate";
import { QUERY_KEYS } from "../services/constants";
import type { branches } from "../types/branches";

type FormShape = z.infer<typeof branchesSchema>;

function CreateBranch() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
    setValue,
  } = useForm<FormShape>({
    resolver: zodResolver(branchesSchema),
  });

  const { mutate, isPending } = useMutate<branches, FormShape>({
    endpoint: "/api/branches",
    method: "post",
    invalidateKeys: [QUERY_KEYS.BRANCH],

    // ✅ Optimistic UI update
    optimisticUpdate: (oldData, newItem) => [
      ...oldData,
      {
        // Temporary ID (used for instant UI feedback)
        id: Math.random(),
        name: newItem.name,
        address: newItem.address,
        city: newItem.city || "",
        // Optional empty arrays to satisfy the `branches` type
        students: [],
        classes: [],
        teachers: [],
        createdAt: new Date(),
        updatedAt: null,
      } as branches,
    ],
  

    onSuccess: (data) => {
      toast.success(`${data.name} added successfully!`, {
        style: { textAlign: "center", color: "var(--dark-brand-1)" },
      });
      reset();
      navigate(-1);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data || "Something went wrong, please try again.";
      toast.error(message, { style: { textAlign: "center" } });
      console.error("Branch creation failed:", message);
    },
  });

  const onSubmit = (data: FormShape) => {
    mutate(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Create a New Branch"
      isSubmitting={isSubmitting || isPending}
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
