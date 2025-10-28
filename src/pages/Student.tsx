import Pagination from "../components/pagination/Pagination";
import StudentsMutations from "../components/StudentsMutations";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { useAddQuery } from "../hooks/useAddQuery";
import useStudents from "../hooks/useStudents";
import { studentHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Student() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useStudents(currentPage);

  const query = getQuery("sort") as SortOrder;
  const sortedData = sortByQuery(data?.students, "firstName", query);
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
      <StudentsMutations />
    </>
  );
}

export default Student;
