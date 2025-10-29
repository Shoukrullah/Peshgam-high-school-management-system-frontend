import { useEffect } from "react";
import {
  Error,
  Loading,
  Pagination,
  TeachersMutations,
  Table,
  Toolbar,
} from "../components";
import { useTeacher, useAddQuery } from "../hooks";
import { teacherHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Teacher() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1");
  const { data, isLoading, error } = useTeacher(currentPage);
  useEffect(() => {
    document.title = "Peshgam - Teachers";
  }, []);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
  const query = getQuery("sort") as SortOrder;
  const sortedData = sortByQuery(data?.teachers, "firstName", query);

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
      <TeachersMutations />
    </>
  );
}

export default Teacher;
