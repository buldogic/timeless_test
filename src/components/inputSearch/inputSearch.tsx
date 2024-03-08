import style from "./inputSearch.module.css";
import { useState } from "react";

interface filterProps {
  setFilterValue: Function;
}


export const InputSearch: React.FC<filterProps> = (props) => {
  const [value, setValue] = useState<string>("");



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.setFilterValue(value) 
    }
  };


  return (
    <div className={style.containerInput}>
      <input
        className={style.inputSearch}
        value={value}
        placeholder="Search"
        onClick={() => setValue("")}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
    </div>
  );
};
