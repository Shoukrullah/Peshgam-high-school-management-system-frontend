import { useEffect } from "react";
import {
  Loading,
  Pagination,
  StudentsMutations,
  Table,
  Toolbar,
  Error,
} from "../components";
import { useAddQuery, useStudents } from "../hooks";
import { studentHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Student() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useStudents(currentPage);
  useEffect(() => {
    document.title = "Peshgam - Students";
  }, []);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;

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
