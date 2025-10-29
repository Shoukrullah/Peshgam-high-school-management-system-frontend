import { useEffect } from "react";
import {ClassesMutations, Error,Loading, Pagination,Table,Toolbar,} from '../components';
import {useAddQuery,useClasses} from '../hooks'
import { classHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Classes() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);
  const { data, isLoading, error } = useClasses(currentPage);

  useEffect(() => {
    document.title = "Peshgam - Classes";
  }, []);
  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
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