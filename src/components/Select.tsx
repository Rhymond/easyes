import React, {ChangeEventHandler, FC, FocusEventHandler, useState} from "react";

type SelectProps = {
  onFocus: () => void,
  onBlur: (val: string) => void,
  onChange: (val: string) => void,
  placeholder: string;
  options: string[];
}

const Select: FC<SelectProps> = ({ onChange, onFocus, onBlur, placeholder, options, ...props }) => {
  const [selected, setSelected] = useState(false);
  const handleFocus = () => {
    if (!selected) {
      setSelected(true);
    }

    onFocus();
  }

  const handleBlur: FocusEventHandler<HTMLSelectElement> = (e) => {
    onBlur(e.target.value);
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value);
    e.target.blur();
  }

  return (
    <select
      defaultValue={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      className={
        `focus-visible:outline-0 inline-block min-w-[30px] px-3 py-1.5 leading-8 rounded           ${selected ?
          "bg-gray-50 border-b-2 border-gray-400" :
          "cursor-pointer bg-red-100 border-b-2 border-red-700"}`
      }
      {...props}
    >
      <option disabled>{placeholder}</option>
      {options.map((o, i) => (
        <option key={`option-${i}`}>{o}</option>
      ))}
    </select>
  )
}

export default Select;
