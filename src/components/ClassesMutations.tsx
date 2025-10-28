import { useAddQuery } from "../hooks/useAddQuery";
import CreateClass from "./CreateClass";
import DeleteUser from "./DeleteUser";
import GlobalModalWindow from "./GlobalModalWindow";
import UpdateClass from "./UpdateClass";

function ClassesMutations() {
      const { getQuery } = useAddQuery();
    
  return (
    <div>
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
          <UpdateClass />
        </GlobalModalWindow>
      )}
    </div>
  );
}

export default ClassesMutations;
