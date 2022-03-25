import React, {useState} from "react";
import Info from "./components/Info";
import content from "./content.json";
import reactStringReplace from 'react-string-replace';
import Input from "./components/Input";

type example = {
  name: string;
  example?: boolean;
  description: string;
}

const templateRegex = /<%(.*?)%>/g;

function App() {
  const [examples, setExamples] = useState<example[]>([])
  const [selection, setSelection] = useState("");
  const [form, setForm] = useState({} as Record<string, string>);

  const replaceHandler = (match: string, i: number) => {
    const v = match.trim().split("::");
    switch (v[0]) {
      case "input":
        return (
          <Input key={`input-${i}`} onBlur={(val) => {
            setForm({...form, [v[1]]: val})
          }}>
            {v[2]}
          </Input>
        )
      case "value":
        return (
          <span>{form[v[1]] || v[2]}</span>
        )
    }
  }

  console.table(form);

  return (
    <div className="App">
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex">
          <div className="w-2/3 pr-10 text-lg leading-10">
            <div className="text-2xl mb-5">Projekto aprašymas</div>
            {reactStringReplace(content, templateRegex, replaceHandler)}
          </div>
          <div className="w-1/3">
            {examples.map((e, i) => (
              <Info isDescription={false} key={`example-${i}`} title={e.name}>{e.description}</Info>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
