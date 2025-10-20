import CreateStudent from "../components/CreateStudent";
import DeleteUser from "../components/DeleteUser";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import UpdateStudent from "../components/UpdateStudent";
import { useAddQuery } from "../hooks/useAddQuery";
import useStudents from "../hooks/useStudents";
import { studentHeader } from "../utils/headersForTables";
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
        <Table
          data={sortedData}
          isLoading={isLoading}
          error={error}
          headerData={studentHeader}
          type="students"
        />
        <Pagination totalPages={data?.totalPages || 1} />
      </div>
      {getQuery("add") === "student" && (
        <GlobalModalWindow>
          <CreateStudent />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Student" urlRoute="students" />
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
