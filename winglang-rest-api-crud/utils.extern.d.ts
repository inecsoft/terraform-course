export default interface extern {
  readFile: (filePath: string) => string,
  render: (template: string, value: number) => Promise<string>,
  rendercrud: (template: string, value: (readonly (Readonly<any>)[])) => Promise<string>,
}
