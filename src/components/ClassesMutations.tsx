import { useAddQuery } from "../hooks";
import {
  CreateClass,
  DeleteUser,
  GlobalModalWindow,
  UpdateClass,
} from "../components";

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
