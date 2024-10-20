import { BlogTypeInfo } from "@/types";

function typeOptionCreator({
  Select,
  typeList,
}: {
  Select: any;
  typeList: BlogTypeInfo[];
}) {
  let optionContainer = [];
  for (let i = 0; i < typeList.length; i++) {
    optionContainer.push(
      <Select.Option value={typeList[i].id} key={typeList[i].id}>
        {typeList[i].name}
      </Select.Option>,
    );
  }
  return optionContainer;
}

export default typeOptionCreator;
