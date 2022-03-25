import React, {FC, useEffect, useRef, useState} from "react";
import ContentEditable from "react-contenteditable";

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
