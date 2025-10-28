import { useAddQuery } from "../hooks/useAddQuery";
import CreateTeacher from "./CreateTeacher";
import DeleteUser from "./DeleteUser";
import GlobalModalWindow from "./GlobalModalWindow";
import UpdateTeacher from "./UpdateTeacher";

function TeachersMutations() {
  const { getQuery } = useAddQuery();
  return (
    <div>
      {getQuery("add") === "teacher" && (
        <GlobalModalWindow>
          <CreateTeacher />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("teachers-delete") && (
        <GlobalModalWindow>
          <DeleteUser singleRoute="Teacher" urlRoute="teachers" />
        </GlobalModalWindow>
      )}
      {getQuery("edit")?.includes("teachers-update") && (
        <GlobalModalWindow>
          <UpdateTeacher />
        </GlobalModalWindow>
      )}
    </div>
  );
}

export default TeachersMutations;
