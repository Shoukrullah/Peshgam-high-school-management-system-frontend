import { RxDash } from "react-icons/rx";
import { TableEditButtons, TableImage, Th } from "../components";
import type { studentShape } from "../types/students";
import toCamelCase from "../utils/toCamelCase";
import styles from "./Table.module.css";
import { Link } from "react-router-dom";
import LinkTo from "./LinkTo";
import type { branches } from "../types/branches";
import type { classes } from "../types/classes";

interface CommonProps {
  id: number;
}

interface BranchShape extends CommonProps {
  name: string;
  address: string;
  city: string;
}

interface ClassShape extends CommonProps {
  name: string;
  grade: string;
  branch: { name: string };
  teacher?: { firstName: string; lastName: string } | null;
}

interface TeacherShape extends CommonProps {
  firstName: string;
  lastName: string;
  phone?: string | null;
  degree?: string | null;
  branch: { name: string };
  homeAddress?: string | null;
}

interface StudentShape extends CommonProps {
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  class?: { grade: string } | null;
  branch: { name: string };
  phone?: string | null;
  address?: string | null;
}

type TableData = StudentShape | TeacherShape | BranchShape | ClassShape ;

interface Props<T extends TableData> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  headerData: string[];
  type: "students" | "teachers" | "branches" | "classes";
}

function Table<T extends TableData>({
  data,
  isLoading,
  error,
  headerData,
  type,
}: Props<T>) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          {headerData.map((head, i) => (
            <Th key={i}>{head}</Th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => {
          switch (type) {
            case "students": {
              const stu = item as StudentShape;
              return (
                <tr key={stu.id}>
                  <td className={styles.imgContainer}>
                    <TableImage stu={stu as studentShape} />
                  </td>
                  <td>{toCamelCase(stu.class?.grade || "")}</td>
                  <td>{stu.branch.name}</td>
                  <td>{stu.phone || <RxDash />}</td>
                  <td>{stu.address || <RxDash />}</td>
                  <td>
                    <TableEditButtons route="students" id={stu.id} />
                  </td>
                </tr>
              );
            }

            case "teachers": {
              const teacher = item as TeacherShape;
              return (
                <tr key={teacher.id}>
                  <td className={styles.imgContainer}>
                    <TableImage stu={teacher} />
                  </td>
                  <td>{teacher.branch.name}</td>
                  <td>{teacher.phone || <RxDash />}</td>
                  <td>{teacher.degree || <RxDash />}</td>
                  <td>{teacher.homeAddress || <RxDash />}</td>
                  <td>
                    <TableEditButtons route="teachers" id={teacher.id} />
                  </td>
                </tr>
              );
            }

            case "branches": {
              const branch = item as BranchShape;
              return (
                <tr key={branch.id}>
                  <td>
                    <LinkTo href={`/branches/${branch.id}`}>
                      {branch.name}
                    </LinkTo>
                  </td>
                  <td>{branch.city}</td>
                  <td>{branch.address}</td>
                  <td>
                    <TableEditButtons route="branches" id={branch.id} />
                  </td>
                </tr>
              );
            }

            case "classes": {
              const cls = item as ClassShape;
              return (
                <tr key={cls.id}>
                  <td>{toCamelCase(cls.name)}</td>
                  <td>{toCamelCase(cls.grade)}</td>
                  <td>{cls.branch.name}</td>
                  <td>
                    {cls.teacher ? (
                      `${cls.teacher.firstName} ${cls.teacher.lastName}`
                    ) : (
                      <RxDash />
                    )}
                  </td>
                  <td>
                    <TableEditButtons route="classes" id={cls.id} />
                  </td>
                </tr>
              );
            }

            default:
              return null;
          }
        })}
      </tbody>
    </table>
  );
}

export default Table;
