import CreateClass from "../components/CreateClass";
import DeleteUser from "../components/DeleteUser";
import GlobalModalWindow from "../components/GlobalModalWindow";
import Pagination from "../components/pagination/Pagination";
import Table from "../components/Table";
import Toolbar from "../components/Toolbar";
import UpdateClass from "../components/UpdateClass";
import { useAddQuery } from "../hooks/useAddQuery";
import useClasses from "../hooks/useClasses";
import { classHeader } from "../utils/headersForTables";

function Classes() {
  const { getQuery } = useAddQuery();
  const currentPage = parseInt(getQuery("page") || "1", 10);

  const { data, isLoading, error } = useClasses(currentPage);

  const query = getQuery("sort");
  let sortedData = data?.classes ? [...data.classes] : [];

  if (query === "asc") {
    sortedData.sort((a, b) => `${a.grade}`.localeCompare(`${b.grade}`));
  } else if (query === "desc") {
    sortedData.sort((a, b) => `${b.grade}`.localeCompare(`${a.grade}`));
  }
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
      {getQuery("add") === "class" && (
        <GlobalModalWindow>
          <CreateClass />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("classes-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Class" urlRoute="classes" />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("classes-update") && (
        <GlobalModalWindow>
          <UpdateClass  />
        </GlobalModalWindow>
      )}
    </>
  );
}

export default Classes;
