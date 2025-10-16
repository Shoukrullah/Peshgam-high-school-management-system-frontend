import { HiOutlineTrash } from "react-icons/hi2";
import { RxPencil2 } from "react-icons/rx";
import styles from "./Table.module.css";
import { useAddQuery } from "../hooks/useAddQuery";

interface Props {
  route: string;
  id: number;
}

function TableEditButtons({ route, id }: Props) {
  const { setQuery } = useAddQuery();
  return (
    <div className={`flex ${styles.editButtonsContainer}`}>
      <div onClick={() => setQuery("edit", route + "-update" + id)}>
        <RxPencil2 />
      </div>
      <div onClick={() => setQuery("edit", route + "-delete" + id)}>
        <HiOutlineTrash />
      </div>
    </div>
  );
}

export default TableEditButtons;
