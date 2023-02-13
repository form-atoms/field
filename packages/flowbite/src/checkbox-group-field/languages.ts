export const options = [
  { code: "kotlin", name: "Kotlin" },
  { code: "java", name: "Java" },
  { code: "ts", name: "Typescript" },
  { code: "html", name: "HTML" },
  { code: "en", name: "English" },
  { code: "css", name: "CSS" },
  { code: "tf", name: "Tensorflow" },
  { code: "react", name: "React" },
] as const;

type Language = { code: string; name: string };

export const getValue = (opt: Language) => opt.code;
export const getLabel = (opt: Language) => opt.name;
