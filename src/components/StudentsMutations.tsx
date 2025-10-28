import { useAddQuery } from "../hooks/useAddQuery";
import CreateStudent from "./CreateStudent";
import DeleteUser from "./DeleteUser";
import GlobalModalWindow from "./GlobalModalWindow";
import UpdateStudent from "./UpdateStudent";

function StudentsMutations() {
  const { getQuery } = useAddQuery();
  return (
    <div>
      {getQuery("add") === "student" && (
        <GlobalModalWindow>
          <CreateStudent />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Student" urlRoute="students" />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("students-update") && (
        <GlobalModalWindow>
          <UpdateStudent />
        </GlobalModalWindow>
      )}
    </div>
  );
}

export default StudentsMutations;
