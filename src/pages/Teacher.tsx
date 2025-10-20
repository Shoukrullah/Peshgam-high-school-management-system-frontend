import CreateTeacher from "../components/CreateTeacher";
import DeleteUser from "../components/DeleteUser";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import UpdateTeacher from "../components/UpdateTeacher";
import { useAddQuery } from "../hooks/useAddQuery";
import useTeacher from "../hooks/useTeachers";
import { teacherHeader } from "../utils/headersForTables";

function Teacher() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useTeacher(currentPage);

  const query = getQuery("sort");
  let sortedData = data?.teachers ? [...data.teachers] : [];

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
  console.log(data?.totalPages);
  return (
    <>
      <div>
        <Toolbar add="teacher" route="Teachers" />
        <Table
          data={sortedData}
          error={error}
          headerData={teacherHeader}
          isLoading={isLoading}
          type="teachers"
        />
        <Pagination totalPages={data?.totalPages || 1} />
      </div>
      {getQuery("add") === "teacher" && (
        <GlobalModalWindow>
          <CreateTeacher />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("teachers-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Teacher" urlRoute="teachers" />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("teachers-update") && (
        <GlobalModalWindow>
          <UpdateTeacher />
        </GlobalModalWindow>
      )}
    </>
  );
}

export default Teacher;
