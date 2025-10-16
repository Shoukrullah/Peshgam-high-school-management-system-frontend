import { zodResolver } from "@hookform/resolvers/zod";
import delay from "delay";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useBranches from "../hooks/useBranches";
import useClasses from "../hooks/useClasses";
import axiosInstance from "../services/axios-instance";
import studentsSchema from "../types/schemas/studentsSchema";
import gender from "../utils/Gender";
import Button from "./Button";
import styles from "./FormStudent.module.css";
import Heading from "./Heading";
import Input from "./Input";
import DropDownStructure from "./reactDropDown/DropDownStructure";
type FormShape = z.infer<typeof studentsSchema>;

function FormStudent() {
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

  const onSubmit = async (data: FormShape) => {
    try {
      await delay(10000);
      const req = await axiosInstance.post<FormShape>("/api/students", data);
      const name = req.data;
      toast.success(
        `${name.firstName} ${name.lastName} is added successfully`,
        {
          style: { textAlign: "center", color: "var(--dark-brand-1)" },
        }
      );
      navigate(-1);

      // reset();
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
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Heading element="h4">Create a new Student</Heading>
      <div className={styles.allInputsContainer}>
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
          {errors.gender && (
            <p className={styles.error}>{errors.gender.message}</p>
          )}
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
                options={branches || []}
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
          {errors.branchId && (
            <p className={styles.error}>{errors.branchId.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="classId">Class</label>
          <Controller
            name="classId"
            control={control}
            render={({ field }) => (
              <DropDownStructure
                options={classes || []}
                labelKey="grade"
                valueKey="id"
                margin=".5rem 0"
                widthBtn="15rem"
                widthDropBtn="90%"
                heightForButton="2.7rem"
                field={field}
              />
            )}
          />
          {errors.classId && (
            <p className={styles.error}>{errors.classId.message}</p>
          )}
        </div>
      </div>
      <div className="flex justifyEnd">
        <Button
          type="submit"
          fontSize="1.2rem"
          padding=".8rem 2rem"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button
          bgcolor="var(--color-silver-100)"
          color="black"
          padding=".8rem 2rem"
          type="reset"
          margin="0 .7rem"
          fontSize="1.2rem"
        >
          Reset
        </Button>
      </div>
      <div className={styles.crossContainer} onClick={() => navigate(-1)}>
        <RxCross1 />
      </div>
    </form>
  );
}

export default FormStudent;
