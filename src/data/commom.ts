export function setTitle(title: string): string {
  return `${title} - Sistema de Agendamento`;
}

export function setStorage({ key, data }: { key: string; data: any }): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getStorage({ key }: { key: string }): any {
  return JSON.parse(window.localStorage.getItem(key) as string);
}



