
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { classeDaRaridade } from "../../utils/rarity";
import styles from "./Collection.module.css";

function Collection() {
    const {
        colecao,
        erroColecao,
        removerPokemon,
    } = useCollection();

    return (
        <main className={styles.collection}>
          
<header className={styles["collection__header"]}>
    <Link to="/" className={styles["collection__back"]}>
        Voltar ao menu
    </Link>

    <div className={styles["collection__heading"]}>
        <span className={styles["collection__eyebrow"]}>
            POKÉSTATION / ÁREA DE COLEÇÃO
        </span>

        <h1>Minha Coleção</h1>
    </div>

   

    <div className={styles["collection__summary"]}>
        <p className={styles["collection__counter"]}>Pokémon reunidos</p>
        <p className={styles["collection__count"]}>
            {colecao.length}<span> / 25</span>
        </p>
    </div>
</header>


            <section className={styles["collection__content"]}>
                <div className={styles["collection__section-heading"]}>
                    <div>
                      

                        <h2>Pokémon descobertos</h2>
                    </div>

                 
                </div>

                {erroColecao && (
                    <p className={styles["collection__error"]} role="alert">
                        {erroColecao}
                    </p>
                )}

                {colecao.length === 0 ? (
                    <div className={styles["collection__empty"]}>
                        <h2>Sua coleção está esperando!</h2>

                      
                        <Link
                            to="/collector"
                            className={styles["collection__link"]}
                        >
                            Explorar Pokémon
                        </Link>
                    </div>
                ) : (
                    <div
                        className={styles["collection__grid"]}
                        aria-label="Pokémons da coleção"
                    >
                        {colecao.map((pokemon) => (
                            <article
                                className={styles["collection__card"]}
                                key={pokemon.id}
                            >
                                {pokemon.sprite ? (
                                    <img
                                        className={styles["collection__sprite"]}
                                        src={pokemon.sprite}
                                        alt={`Sprite de ${pokemon.name}`}
                                    />
                                ) : (
                                    <div className={styles["collection__no-sprite"]}>
                                        Imagem indisponível
                                    </div>
                                )}

                                <h3 className={styles["collection__name"]}>
                                    {pokemon.name}
                                </h3>

                                <p
                                    className={`${styles["collection__rarity"]} ${
                                        styles[classeDaRaridade(pokemon.raridade)]
                                    }`}
                                >
                                    <span className={styles["collection__rarity-text"]}>
                                        {pokemon.raridade}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    className={styles["collection__delete"]}
                                    onClick={() =>
                                        removerPokemon(pokemon.id)
                                    }
                                >
                                    Excluir da coleção
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Collection;
