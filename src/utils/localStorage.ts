type ResultadoLeituraJSON =
  | { status: "missing" }
  | { status: "success"; value: unknown }
  | { status: "error" };

export function lerJSONLocalStorage(chave: string): ResultadoLeituraJSON {
  try {
    const valorSalvo = localStorage.getItem(chave);

    if (!valorSalvo) {
      return { status: "missing" };
    }

    const value: unknown = JSON.parse(valorSalvo);
    return { status: "success", value };
  } catch {
    return { status: "error" };
  }
}

export function salvarJSONLocalStorage(chave: string, valor: unknown): boolean {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}
