export type Dictionary<T> = {
  [key: string]: T;
};

export const dateMonth: Dictionary<string> = {
  Jan: "Janeiro",
  Feb: "Fevereiro",
  Mar: "Março",
  Apr: "Abril",
  May: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Aug: "Agosto",
  Sep: "Setembro",
  Oct: "Outubro",
  Nov: "Novembro",
  Dec: "Dezembro",
};

export const dateDay:  Dictionary<{name:string, index: number}>  = {
  Mon: {name:"Segunda", index: 1},
  Tue: {name:"Terça", index: 2},
  Wed:{ name:"Quarta", index: 3},
  Thu: {name:"Quinta", index: 4},
  Fri: {name:"Sexta", index: 5},
  Sat: {name:"Sábado", index: 6},
  Sun: {name:"Domingo", index: 7},
};


