import { BsHouseCheck } from "react-icons/bs";
import { Heading } from ".";
import type { branches } from "../types/branches";
import SpecialText from "./SpecialText";
import { PiCityLight, PiPencilLine } from "react-icons/pi";

interface Props {
  data: branches | null;
}

function EachBranchHeader({ data }: Props) {
  if (!data) return;
  const { name, address, city, classes, createdAt } = data;
  return (
    <div>
      <Heading fontSize="2.5rem">
        Branch {name} <BsHouseCheck color="var(--dark-brand-3)" />
      </Heading>
      <SpecialText>
        {address} <PiCityLight color="var(--primary-color)" />
      </SpecialText>
      <SpecialText>{city}</SpecialText>
      <SpecialText>
        {data?.createdAt && new Date(createdAt).toLocaleDateString()}
        <PiPencilLine />
      </SpecialText>
    </div>
  );
}

export default EachBranchHeader;
