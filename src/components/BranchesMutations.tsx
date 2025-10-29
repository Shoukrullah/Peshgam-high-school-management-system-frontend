import {
  CreateBranch,
  DeleteUser,
  GlobalModalWindow,
  UpdateBranch,
} from "../components";
import { useAddQuery } from "../hooks";

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
