import CreateBranch from "../components/CreateBranch";
import DeleteUser from "../components/DeleteUser";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import UpdateBranch from "../components/UpdateBranch";
import { useAddQuery } from "../hooks/useAddQuery";
import useBranches from "../hooks/useBranches";
import { branchHeader } from "../utils/headersForTables";

function Branch() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useBranches(currentPage);

  const query = getQuery("sort");
  let sortedData = data?.branches ? [...data.branches] : [];

  if (query === "asc") {
    sortedData.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`));
  } else if (query === "desc") {
    sortedData.sort((a, b) => `${b.name}`.localeCompare(`${a.name}`));
  }
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
      {getQuery("add") === "branch" && (
        <GlobalModalWindow>
          <CreateBranch />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("branches-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Branch" urlRoute="branches" />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("branches-update") && (
        <GlobalModalWindow>
          <UpdateBranch />
        </GlobalModalWindow>
      )}
    </>
  );
}

export default Branch;
