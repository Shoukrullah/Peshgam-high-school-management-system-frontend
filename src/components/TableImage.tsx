import noUser from "../assets/pictures/default-user.webp";
import { type studentShape } from "../types/students";
import LinkTo from "./LinkTo";

interface Props {
  stu: any;
  href: string;
}

function TableImage({ stu, href }: Props) {
  return (
    <>
      <div>
        <img src={stu.photoUrl || noUser} alt={stu.firstName} />
      </div>
      <LinkTo href={`/${href}/${stu.id}`}>
        <p>{`${stu.firstName} ${stu.lastName}`}</p>
      </LinkTo>
    </>
  );
}

export default TableImage;
