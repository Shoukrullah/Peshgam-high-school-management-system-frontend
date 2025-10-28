import { type CSSProperties } from "react";
import { FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useAddQuery } from "../hooks/useAddQuery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import extractNumbers from "../utils/extractNumber";
import Button from "./Button";
import { useMutate } from "../hooks/useMutate";
import { QUERY_KEYS, type QueryKey } from "../services/constants";

interface Props {
  urlRoute: string; //keyof typeof QUERY_KEYS; // e.g. "STUDENTS", "BRANCH"
  singleRoute: string; // e.g. "student"
}

function DeleteUser({ singleRoute, urlRoute }: Props) {
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();

  // ✅ Extract ID from query
  const getId = () => {
    const query = getQuery("edit");
    const isToDelete = query?.includes(`${[urlRoute]}-delete`);
    if (!isToDelete) return;
    const id = extractNumbers(query as string);
    return parseInt(id);
  };

  const id = getId();

  // ✅ Mutation hook with optimistic update
  const { mutate, isPending } = useMutate({
    endpoint: `/api/${urlRoute}/${id}`,
    method: "delete",
    invalidateKeys: [urlRoute as QueryKey],

    // 🔮 Optimistic Update (remove item instantly)
    optimisticUpdate: (oldData: any[], newItem: any) => {
      if (!Array.isArray(oldData)) return oldData;
      // Assume items have an "id" field — filter the deleted one out
      return oldData.filter((item) => item.id !== id);
    },

    onSuccess: () => {
      toast.success(`${singleRoute} deleted successfully!`);
      navigate(-1);
    },
    onError: () => {
      toast.error(`Failed to delete ${singleRoute}!`);
    },
  });

  const handleDelete = () => {
    if (!id) return toast.error("Invalid ID!");
    mutate({ id });
  };

  const style: CSSProperties = {
    width: "35rem",
    padding: "1rem 2rem",
    backgroundColor: "var(--light-brand-1)",
    borderRadius: "0.3rem",
    boxShadow: "0 2px 5px 4px rgba(0, 0, 0, 0.27)",
  };

  return (
    <div style={style}>
      <p style={{ paddingBottom: "2rem", fontSize: "1.4rem" }}>
        {singleRoute === "Branch"
          ? `Are you sure you want to delete this ${singleRoute} and all it's corresponding data?`
          : `
        Are you sure you want to delete this ${singleRoute}?`}
      </p>
      <div className="flex justifyEnd">
        <Button
          padding=".6rem 1.5rem"
          bgcolor="var(--red-brand-1)"
          disabled={isPending}
          onHandelFunction={handleDelete}
        >
          {isPending ? "Deleting..." : <FaTrash size="1.2rem" />}
        </Button>
        <Button
          margin="0 0 0 .5rem"
          padding=".6rem 1rem"
          bgcolor="var(--dark-brand-3)"
          onHandelFunction={() => navigate(-1)}
        >
          <RxCross1 />
        </Button>
      </div>
    </div>
  );
}

export default DeleteUser;
