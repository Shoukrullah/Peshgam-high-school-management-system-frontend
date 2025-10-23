import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import useTeacher from "../hooks/useTeachers";
import axiosInstance from "../services/axios-instance";
import type { classes } from "../types/classes";
import classSchema from "../types/schemas/classSchema";
import extractNumbers from "../utils/extractNumber";
import grades from "../utils/grade";
import Form from "./Form";
import DropDownStructure from "./reactDropDown/DropDownStructure";
import SuggestionsInput from "./SuggestionsInput";
import Input from "./Input";
import branchesSchema from "../types/schemas/branchesSchema";
import type { branches } from "../types/branches";
import afghanistanProvinces from "../utils/afghanistanProvinces";
type FormShape = z.infer<typeof branchesSchema>;

function UpdateBranch() {
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const [branchesData, setBranchesData] = useState<branches | null>(null);
  const getId = () => {
    const editQuery = getQuery("edit");
    if (!editQuery?.includes("branches-update")) return;
    const id = extractNumbers(editQuery);
    return parseInt(id);
  };
  const id = getId();

  useEffect(() => {
    const fetchUniqueBranch = async () => {
      const req = await axiosInstance.get("/api/branches/" + id);
      setBranchesData(req.data);
    };
    fetchUniqueBranch();
  }, [id]);
  //   console.log(teacherData)
  useEffect(() => {
    if (branchesData) {
      reset({
        city: branchesData.city,
        address: branchesData.address,
        name: branchesData.name,
      });
    }
  }, [branchesData]);
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { dirtyFields, isSubmitting,errors },
  } = useForm<FormShape>({
    resolver: zodResolver(branchesSchema),
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
        "/api/branches/" + id,
        data
      );
      const name = req.data;
      toast.success(`updated successfully`, {
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
      HeadingLabel="Update a Class"
      isSubmitting={isSubmitting}
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
