import { Toaster } from "react-hot-toast";
import CreateStudent from "../components/CreateStudent";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { useAddQuery } from "../hooks/useAddQuery";
import useStudents from "../hooks/useStudents";
import DeleteStudent from "../components/DeleteStudent";
import Pagination from "../components/pagination/Pagination";
import UpdateStudent from "../components/UpdateStudent";
// const length = getQuery('edit')?.length
// console.log(getQuery('edit')?.charAt(length! -1 ))

function Student() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useStudents(currentPage);

  const query = getQuery("sort");
  let sortedData = data?.students ? [...data.students] : [];

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
        <Pagination totalPages={data?.totalPages || 1} />
      </div>
      {getQuery("add") === "student" && (
        <GlobalModalWindow>
          <CreateStudent />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-delete") && (
        <GlobalModalWindow>
          <DeleteStudent />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-update") && (
        <GlobalModalWindow>
          <UpdateStudent />
        </GlobalModalWindow>
      )}
    </>
  );
}

export default Student;
