import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAddQuery } from "../hooks/useAddQuery";
import { useMutate } from "../hooks/useMutate";
import axiosInstance from "../services/axios-instance";
import extractNumbers from "../utils/extractNumber";
import Form from "./Form";
import Input from "./Input";
import SuggestionsInput from "./SuggestionsInput";
import afghanistanProvinces from "../utils/afghanistanProvinces";
import branchesSchema from "../types/schemas/branchesSchema";
import type { branches } from "../types/branches";
import { QUERY_KEYS } from "../services/constants";

type FormShape = z.infer<typeof branchesSchema>;

function UpdateBranch() {
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const [branchesData, setBranchesData] = useState<branches | null>(null);

  // ✅ Get id from query string
  const getId = () => {
    const editQuery = getQuery("edit");
    if (!editQuery?.includes("branches-update")) return;
    const id = extractNumbers(editQuery);
    return parseInt(id);
  };
  const id = getId();

  // ✅ Fetch existing branch for prefill
  useEffect(() => {
    const fetchUniqueBranch = async () => {
      if (!id) return;
      const { data } = await axiosInstance.get(`/api/branches/${id}`);
      setBranchesData(data);
    };
    fetchUniqueBranch();
  }, [id]);

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { dirtyFields, isSubmitting, errors },
  } = useForm<FormShape>({
    resolver: zodResolver(branchesSchema),
  });

  // ✅ Prefill when data loads
  useEffect(() => {
    if (branchesData) {
      reset({
        city: branchesData.city,
        address: branchesData.address,
        name: branchesData.name,
      });
    }
  }, [branchesData, reset]);

  // ✅ Use global mutation hook
  const { mutate, isPending } = useMutate<FormShape, FormShape>({
    endpoint: `/api/branches/${id}`,
    method: "patch",
    invalidateKeys: [QUERY_KEYS.BRANCH],
    onSuccess: () => {
      toast.success("Branch updated successfully!", {
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
      return oldData.map((branch: any) =>
        branch.id === id ? { ...branch, ...newItem } : branch
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      HeadingLabel="Update Branch"
      isSubmitting={isSubmitting || isPending}
      isUpdating
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

export default UpdateBranch;
