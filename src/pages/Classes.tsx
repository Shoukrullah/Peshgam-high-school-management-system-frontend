import ClassesMutations from "../components/ClassesMutations";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { useAddQuery } from "../hooks/useAddQuery";
import useClasses from "../hooks/useClasses";
import { classHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Classes() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);
  const { data, isLoading, error } = useClasses(currentPage);
  const query = getQuery("sort") as SortOrder;
  const sortedData = sortByQuery(data?.classes, "name", query);
  return (
    <>
      <div>
        <Toolbar add="class" route="Classes" />
        <Table
          data={sortedData}
          error={error}
          headerData={classHeader}
          isLoading={isLoading}
          type="classes"
        />
        <Pagination totalPages={data?.totalPages || 1} />
      </div>
      <ClassesMutations />
    </>
  );
}

export default Classes;
