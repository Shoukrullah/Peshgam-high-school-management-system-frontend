import { type CSSProperties } from "react";
import { FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useAddQuery } from "../hooks/useAddQuery";
import axiosInstance from "../services/axios-instance";
import extractNumbers from "../utils/extractNumber";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  urlRoute: string;
  singleRoute: string;
}

function DeleteUser({ singleRoute, urlRoute }: Props) {
  const { getQuery } = useAddQuery();
  const navigate = useNavigate();
  const getId = () => {
    const isToDelete = getQuery("edit")?.includes(`${urlRoute}-delete`);
    if (!isToDelete) return;
    const id = extractNumbers(getQuery("edit") as string);
    return parseInt(id);
  };

  const handelDelete = async () => {
    const id = getId();
    if (!id) return;
    try {
      await axiosInstance.delete(`/api/${urlRoute}/${id}`);
      toast.success(singleRoute + " deleted successfully!");
      navigate(-1);
    } catch (error) {
      toast.error(`Failed to delete ${singleRoute}!`);
      console.error(error);
    }
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
      <p style={{ paddingBottom: "2rem", fontSize: "1.5rem" }}>
        Are sure of deleting the {singleRoute}?
      </p>
      <div className="flex justifyEnd">
        <Button
          padding=".6rem 1.5rem"
          bgcolor="var(--red-brand-1)"
          onHandelFunction={handelDelete}
        >
          <FaTrash size={"1.2rem"} />
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
