import { Toaster } from "react-hot-toast";
import FormStudent from "../components/FormStudent";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { useAddQuery } from "../hooks/useAddQuery";
import useStudents from "../hooks/useStudents";
import DeleteStudent from "../components/DeleteStudent";
// const length = getQuery('edit')?.length
// console.log(getQuery('edit')?.charAt(length! -1 ))

function Student() {
  const { data, isLoading, error } = useStudents();
  const { getQuery } = useAddQuery();

  const query = getQuery("sort");
  let sortedData = data ? [...data] : [];

  if (query === "asc") {
    sortedData.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      )
    );
  } else if (query === "desc") {
    sortedData.sort((a, b) =>
      `${b.firstName} ${b.lastName}`.localeCompare(
        `${a.firstName} ${a.lastName}`
      )
    );
  }

  return (
    <>
      <div>
        <Toolbar add="student" route="Students" />
        <Table data={sortedData} isLoading={isLoading} error={error} />
      </div>
      {getQuery("add") === "student" && (
        <GlobalModalWindow>
          <FormStudent />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-delete") && (
        <GlobalModalWindow>
          <DeleteStudent />
        </GlobalModalWindow>
      )}
    </>
  );
}

export default Student;
