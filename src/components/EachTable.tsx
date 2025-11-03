import { RxDash } from "react-icons/rx";
import { TableEditButtons, TableImage, Th } from "../components";
import type { classes } from "../types/classes";
import type { studentShape } from "../types/students";
import type { teacherShape } from "../types/teachers";
import toCamelCase from "../utils/toCamelCase";
import styles from "./Table.module.css";
import type { CSSProperties } from "react";
import SpecialText from "./SpecialText";
import LinkTo from "./LinkTo";
interface CommonProps {
  id: number;
}

interface ClassShape extends CommonProps {
  name: string;
  grade: string;
}

interface TeacherShape extends CommonProps {
  firstName: string;
  lastName: string;
  phone?: string | null;
  degree?: string | null;
  homeAddress?: string | null;
}

interface StudentShape extends CommonProps {
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  phone?: string | null;
  address?: string | null;
  status: "ACTIVE" | "GRADUATED" | "TRANSFERRED" | "INACTIVE";
  gender: "MALE" | "FEMALE";
}

type TableData = StudentShape | TeacherShape | ClassShape;

interface Props<T extends TableData> {
  data: T[];
  headerData: string[];
  type: "students" | "teachers" | "classes";
  tableFontSize?: string;
  rowBgColor?: string;
}

function EachTable<T extends TableData>({
  data,
  headerData,
  type,
  tableFontSize,
  rowBgColor,
}: Props<T>) {
  //Table style
  const tableStyle: CSSProperties = {
    fontSize: tableFontSize,
  };
  // Table row styles

  const rowStyle: CSSProperties = {
    backgroundColor: rowBgColor,
    // boxShadow: '0 0 5px 2px rgba(0,0,0,0.05)'
  };
  const border: CSSProperties = {
    border: "1px solid var(--dark-brand-4)",
  };

  return (
    <table className={styles.tableContainer} style={tableStyle}>
      <thead>
        <tr>
          {headerData.map((head, i) => (
            <Th key={i}>{head}</Th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, i) => {
          switch (type) {
            case "students": {
              const stu = item as studentShape;
              return (
                <tr key={stu.id} style={rowStyle}>
                  <td style={border}>{i + 1}</td>
                  <td style={border}>
                    <LinkTo href={`/students/${stu.id}`}>
                      {stu.firstName + " " + stu.lastName}
                    </LinkTo>
                  </td>
                  <td style={border}>
                    {
                      <SpecialText
                        bgColor="var(--green-brand-2)"
                        borderRadius=".3rem"
                      >
                        {toCamelCase(stu.gender || "")}{" "}
                      </SpecialText>
                    }
                  </td>
                  <td style={border}>{stu.phone || <RxDash />}</td>
                  <td style={border}>{stu.address || <RxDash />}</td>
                </tr>
              );
            }

            case "teachers": {
              const teacher = item as teacherShape;
              return (
                <tr style={rowStyle} key={teacher.id}>
                  <td style={border}>{i + 1}</td>
                  <td style={border}>
                    <LinkTo href={`/teachers/${teacher.id}`}>
                      {teacher.firstName + " " + teacher.lastName}
                    </LinkTo>
                  </td>
                  <td style={border}>{teacher.phone || <RxDash />}</td>
                  <td style={border}>{teacher.degree || <RxDash />}</td>
                  <td style={border}>{teacher.homeAddress || <RxDash />}</td>
                </tr>
              );
            }

            case "classes": {
              const cls = item as classes;
              return (
                <tr style={i % 2 === 0 ? rowStyle : {}} key={cls.id}>
                  <td style={border}>{i + 1}</td>
                  <td style={border}>
                    <LinkTo href={`/classes/${cls.id}`}>
                      {toCamelCase(cls.name)}
                    </LinkTo>
                  </td>
                  <td style={border}>{toCamelCase(cls.grade)}</td>
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

export default EachTable;
