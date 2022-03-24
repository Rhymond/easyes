import React, {FC, useEffect, useRef, useState} from "react";
import ContentEditable from "react-contenteditable";

const TextEdit = ({ onFocus = () => {}, onBlur = () => {}, children }) => {
  const [selected, setSelected] = useState(false);
  const [val, setVal] = useState(children);
  const [width, setWidth] = useState("auto")
  const ref = React.useRef<HTMLSpanElement>("")


  const handleChange = (evt) => {
    setVal(evt.target.value)
  };

  const handleBlur = () => {
    const val = ref.current.innerHTML;
    if (val === "" || val === children) {
      setSelected(false)
      setVal(children);
      onBlur();
      return
    }

    setWidth(ref.current.clientWidth + "px");
    onBlur();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      ref.current.blur();
    }
  }

  const handleFocus = () => {
    if (!selected) {
      setWidth(ref.current.clientWidth + "px");
      setVal("");
      setSelected(true);
    }

    onFocus();
  }

  return (
    <div style={{minWidth: width}} className="relative inline-block">
      <ContentEditable
        innerRef={ref}
        html={val}
        spellCheck={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tagName='span'
        className={
          `focus-visible:outline-0 inline-block ${selected && "w-full"} px-3 leading-8 rounded 
          ${selected ?
            "bg-gray-50 border-b-2 border-gray-400" :
            "cursor-pointer bg-red-100 border-b-2 border-red-700"}
        `} />
    </div>
  )
}

type SelectEditProps = {
  onFocus: () => void,
  onBlur: () => void,
  onChange: (val: string) => void,
  placeholder: string;
  options: string[];
}

const SelectEdit: FC<SelectEditProps> = ({ onChange, onFocus, onBlur, placeholder, options, ...props }) => {
  const [selected, setSelected] = useState(false);
  const handleFocus = () => {
    if (!selected) {
      setSelected(true);
    }

    onFocus();
  }

  const handleBlur = () => {
    onBlur();
  };

  const handleChange = (e) => {
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
    >
      <option disabled>{placeholder}</option>
      {options.map((o, i) => (
        <option key={`option-${i}`}>{o}</option>
      ))}
    </select>
  )
}

type infoProps = {
  title: string;
  example?: boolean;
}

const Info: FC<infoProps> = ({ children, example = false, title }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, [])

  return (
    <div className={
      `transition-opacity 
      ${!visible && "opacity-0"} 
      ${example ? "bg-yellow-100" : "bg-blue-100"} 
    rounded p-6 mb-4`}>
      <div className="text-base font-bold flex items-center">
        {title}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  )
}

type example = {
  name: string;
  example?: boolean;
  description: string;
}

function App() {
  const [examples, setExamples] = useState<example[]>([])
  const [selection, setSelection] = useState("");
  const examples1: example[] = [
    {
      name: "Aprašymas",
      description: "Assumenda numquam consequatur maxime numquam. Ducimus sint magnam fugit ut consectetur inventore repudiandae fugit. Accusamus voluptatibus"
    },
    {
      name: "Pvz 1",
      example: true,
      description: "reklaminių klipų sklaidos palaugų teikimas per lauko ekranus.",
    },
    {
      name: "Pvz 2",
      example: true,
      description: " medienos apdirbimas, obliavimas, pjaustymas.",
    },
    {
      name: "Pvz 3",
      example: true,
      description: "kokybiškos restoranų įrangos tiekimas bei priežiūra",
    }
  ]

  const examples2: example[] = [
    {
      name: "Pvz 1",
      example: true,
      description: "Papildomus serverius",
    },
    {
      name: "Pvz 2",
      example: true,
      description: "Medienos apdirbimo stakles",
    },
    {
      name: "Pvz 3",
      example: true,
      description: "Restoranų įrangą",
    }
  ]

  const selectExamples: example[] = [
    {
      name: "Aprašymas",
      description: "Assumenda numquam consequatur maxime numquam. Ducimus sint magnam fugit ut consectetur inventore repudiandae fugit. Accusamus voluptatibus"
    },
  ]

  return (
    <div className="App">
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex">
          <div className="w-2/3 pr-10 text-lg leading-10">
            <div className="text-2xl mb-5">Projekto aprašymas</div>
            Pagrindinė UAB "
            <TextEdit>Įmonės pavadinimas</TextEdit>
            " veikla -
            {" "}
            <TextEdit
              onFocus={() => setExamples(examples1)}
              onBlur={() => setExamples([])}
            >
              Įmonės veikla
            </TextEdit>
            {" "}
            ir 2021 metais įmonėje vidutiniškai dirbo
            {" "}
            <TextEdit>00</TextEdit>
            {" "}
            darbuotojų(-as). Įmonė turi sukūrusi savo teikiamų
            paslaugų ir parduodamų produktų internetinį tinklalapį (www.ivestaspavadinimas.lt)
            su tikslu sėkmingai ir efektyviai vykdyti veiklą. Projektu pareiškėjas siekia
            {" "}
            <SelectEdit
              onFocus={() => setExamples(selectExamples)}
              onBlur={() => setExamples([])}
              onChange={(val) => setSelection(val)}
              placeholder="Pasirinkite veiklą"
              options={["Atnaujinti", "Pakeisti", "Įrengti", "Sukurti"]}
            />
            {" "}
            {selection === "Atnaujinti" && (
              <>
                {" "}
                turimą įrangą įsigyjant
                {" "}
                <TextEdit
                  onFocus={() => setExamples(examples2)}
                  onBlur={() => setExamples([])}
                >Aprašykite ką ketinate įsigyti</TextEdit>
              </>
            )}
          </div>
          <div className="w-1/3">
            {examples.map((e, i) => (
              <Info example={e.example} key={`example-${i}`} title={e.name}>{e.description}</Info>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
