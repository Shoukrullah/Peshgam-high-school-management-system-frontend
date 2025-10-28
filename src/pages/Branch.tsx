import BranchesMutations from "../components/BranchesMutations";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import { branchHeader } from "../utils/headersForTables";
import { sortByQuery, type SortOrder } from "../utils/sortedQuery";

function Branch() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);
  const { data, isLoading, error } = useBranches(currentPage);

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
