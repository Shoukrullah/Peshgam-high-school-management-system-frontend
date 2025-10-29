import { useEffect } from "react";
import {BranchesMutations,Error,Loading,Pagination,Table,Toolbar} from '../components'
import {useBranches,useAddQuery} from "../hooks";
import { branchHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Branch() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1");
  const { data, isLoading, error } = useBranches(currentPage);
  useEffect(() => {
    document.title = "Peshgam - Branches";
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const query = getQuery("sort") as SortOrder;
  const sortedData = sortByQuery(data?.branches, "name", query);
  return (
    <>
      <div>
        <Toolbar add="branch" route="Branches" />
        <Table
          data={sortedData}
          error={error}
          headerData={branchHeader}
          isLoading={isLoading}
          type="branches"
        />
        <Pagination totalPages={data?.totalPages || 1} />
      </div>
      <BranchesMutations />
    </>
  );
}

export default Branch;
