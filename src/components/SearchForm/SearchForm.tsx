import type { FormEvent, ReactNode } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  valor: string;
  carregando: boolean;
  mudarTexto: (valor: string) => void;
  buscar: () => void;
  // Botões extras ao lado do "Buscar" (ex: "Limpar" no Finder)
  children?: ReactNode;
}

function SearchForm({ valor, carregando, mudarTexto, buscar, children }: SearchFormProps) {
  // Usar um <form> faz o Enter também disparar a busca
  function enviarFormulario(event: FormEvent) {
    event.preventDefault(); // impede a página de recarregar

    if (!carregando) {
      buscar();
    }
  }

  return (
    <form className={styles.form} onSubmit={enviarFormulario}>
      <label className={styles.field}>
        <span className={styles.label}>Nome ou número da Pokédex</span>
        <input
          type="text"
          value={valor}
          onChange={(event) => mudarTexto(event.target.value)}
          placeholder="pikachu ou 25"
          autoComplete="off"
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
        {children}
      </div>
    </form>
  );
}

export default SearchForm;
