import { RxDash } from "react-icons/rx";
import type { studentShape } from "../types/students";
import { studentHeader } from "../utils/headersForTables";
import toCamelCase from "../utils/toCamelCase";
import styles from "./Table.module.css";
import TableEditButtons from "./TableEditButtons";
import TableImage from "./TableImage";
import Th from "./Th";


interface Props {
  data: studentShape[];
  error: Error | null;
  isLoading: boolean
}


function Table({data,error,isLoading}:Props) {
  if(isLoading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          {studentHeader.map((head, i) => (
            <Th key={i}>{head}</Th>
          ))}
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {data.map((stu) => (
          <tr key={stu.id}>
            <td className={styles.imgContainer}>
              <TableImage stu={stu} />
            </td>
            <td>{toCamelCase(stu.class?.grade!)}</td>
            <td>{stu.branch.name}</td>
            <td>{stu.phone || <RxDash />}</td>
            <td>{stu.address || <RxDash />}</td>
            <td>
              <TableEditButtons route={'students'} id={stu.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
