import React, {useEffect, useState} from "react";
import Info from "./components/Info";
import definitionsJSON from "./definitions.json";
import content from "./content";
import Handlebars from "handlebars";
import reactStringReplace from 'react-string-replace';
import Input from "./components/Input";
import Select from "./components/Select";

const templateRegex = /\{-(.*?)-\}/g;

type Definition = {
  type: string;
  default: string;
  examples?: string[];
  options?: string[];
}

const definitions: Record<string, Definition> = definitionsJSON;
let defaults: Record<string, string> = {};
for (const key in definitions) {
  defaults[key] = definitions[key].default;
}

function App() {
  const [examples, setExamples] = useState<string[]>([])
  const [form, setForm] = useState(defaults);

  const replaceHandler = (match: string, i: number) => {
    if (!(match in definitions)) return
    const def = definitions[match];
    switch (def.type) {
      case "input":
        return (
          <Input
            key={`input-${i}`}
            onFocus={() => {
              if (def.examples) setExamples(def.examples)
            }}
            onBlur={(val) => {
              setExamples([]);
              setForm({...form, [match]: val})
            }}
          >
            {def.default}
          </Input>
        )
      case "select":
        return (
          <Select
            onFocus={() => {
              if (def.examples) setExamples(def.examples)
            }}
            onBlur={(val) => {
              setExamples([]);
            }}
            onChange={(val) => {
              setForm({...form, [match]: val})
            }}
            placeholder={def.default}
            options={def.options || []}
          />
        )
    }
  }

  const tpl = Handlebars.compile(content);
  let replaced = reactStringReplace(tpl(form), templateRegex, replaceHandler)
  replaced = reactStringReplace(replaced, /(\n)/g, (match, i) => {
    return <br />
  })

  return (
    <div className="App">
      <div className="max-w-6xl mx-auto mt-10">
        <div className="flex">
          <div className="w-3/4 pr-10 text-lg leading-10">
            <div className="text-2xl mb-5">Projekto aprašymas</div>
            {replaced}
          </div>
          <div className="w-1/4">
            {examples.map((e, i) => (
              <Info isDescription={false} key={`example-${i}`} title={`Pavizdys ${i+1}`}>{e}</Info>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
