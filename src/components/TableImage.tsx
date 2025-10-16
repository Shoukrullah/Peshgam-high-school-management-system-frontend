import noUser from "../assets/pictures/default-user.webp";
import { type studentShape } from "../types/students";

interface Props {
  stu: studentShape;
}

function TableImage({ stu }: Props) {
  return (
    <>
      <div>
        <img src={stu.photoUrl || noUser} alt={stu.firstName} />
      </div>
      <p>{`${stu.firstName} ${stu.lastName}`}</p>
    </>
  );
}

export default TableImage;
