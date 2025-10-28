import { useAddQuery } from "../hooks/useAddQuery";
import CreateBranch from "./CreateBranch";
import DeleteUser from "./DeleteUser";
import GlobalModalWindow from "./GlobalModalWindow";
import UpdateBranch from "./UpdateBranch";

function BranchesMutations() {
  const { getQuery } = useAddQuery();

  return (
    <div>
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
    </div>
  );
}

export default BranchesMutations;
