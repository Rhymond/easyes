import React, {ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, useState} from "react";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";

type InputProps = {
  onFocus?: () => void;
  onBlur?: (val: string) => void;
}

const Input: FC<InputProps> = ({ onFocus = () => {}, onBlur = () => {}, children, ...props }) => {
  const [selected, setSelected] = useState(false);
  const [val, setVal] = useState(children as string);
  const [width, setWidth] = useState("auto")
  const ref = React.useRef<HTMLSpanElement>(null)

  const handleChange = (evt: ContentEditableEvent) => {
    setVal(evt.target.value)
  };

  const handleBlur = () => {
    const val = ref.current?.innerHTML;
    if (val === "" || val === children) {
      setSelected(false)
      setVal(children as string);
      setWidth("auto");
      onBlur(val as string);
      return
    }

    setWidth(ref.current?.clientWidth + "px");
    onBlur(val as string);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      ref.current?.blur();
    }
  }

  const handleFocus = () => {
    if (!selected) {
      setWidth(ref.current?.clientWidth + "px");
      setVal("");
      setSelected(true);
    }

    onFocus();
  }

  return (
    <div style={{ minWidth: width }} className="relative inline-block">
      <ContentEditable
        {...props}
        innerRef={ref}
        html={val}
        spellCheck="false"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tagName='span'
        className={
          `focus-visible:outline-0 inline-block px-3 leading-8 rounded 
          ${selected ?
            "bg-gray-50 border-b-2 border-gray-400" :
            "cursor-pointer bg-red-100 border-b-2 border-red-700"}
        `}
      />
    </div>
  )
}

export default Input;
