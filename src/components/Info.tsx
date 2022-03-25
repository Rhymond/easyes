import React, {FC, useEffect, useState} from "react";

type InfoProps = {
  title: string;
  isDescription?: boolean;
}

const Info: FC<InfoProps> = ({ children, isDescription = false, title }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [])

  return (
    <div className={
      `transition-opacity 
      ${!visible && "opacity-0"} 
      ${isDescription ?  "bg-blue-100" : "bg-yellow-100"} 
    rounded p-6 mb-4`}>
      <div className="text-base font-bold flex items-center">
        {title}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  )
}

export default Info;
