import { useEffect, useState } from "react";
import { useAddQuery } from "../hooks/useAddQuery";
import useClasses from "../hooks/useClasses";
import useStudents from "../hooks/useStudents";
import type { studentShape } from "../types/students";
import Button from "./Button";
import DropDownForURL from "./DropDownForURL";
import styles from './SelectClass.module.css'

interface Props {
  OnUpdateAttendance: (data: studentShape[]) => void;
}

function SelectClass({ OnUpdateAttendance }: Props) {
  const { data: classes } = useClasses();
  const { getQuery,setQuery } = useAddQuery();
  const [classId, setClassId] = useState(0);
  const getClassid = getQuery("classId") || undefined;
  const { data } = useStudents(undefined, classId, { enabled: !!classId });
  const [isLoading, setLoading] = useState(false);

  const handelClick = async () => {
    setLoading(true);
    setClassId(parseInt(getQuery("classId")!));
    setLoading(false);
  };

  useEffect(() => {
    if (data?.students) {
      OnUpdateAttendance(data.students);
    }
  }, [data, OnUpdateAttendance]);

  // console.log(error)
  // console.log(data);
  if (!classes?.classes.length) return <p>No classes found.</p>;
  return (
    <div className={styles.selectClassContainer}>
      <p>Select Class</p>
      <DropDownForURL
        widthBtn="21rem"
        heightForButton="3rem"
        widthDropBtn="19rem"
        options={classes?.classes || []}
        labelKey="name"
        valueKey="id"
        queryKey="classId"
      />
      <Button
        disabled={!getClassid || isLoading}
        onHandelFunction={handelClick}
        padding="1rem"
        margin="2rem 0 0 0"
        borderRadius=".4rem"
      >
        Get Students List {isLoading && "..."}
      </Button>
    </div>
  );
}

export default SelectClass;
