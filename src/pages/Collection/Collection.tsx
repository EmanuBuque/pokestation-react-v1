
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { classeDaRaridade } from "../../utils/rarity";
import "./Collection.css";

function Collection() {
    const {
        colecao,
        erroColecao,
        removerPokemon,
    } = useCollection();

    return (
        <main className="collection">
          
<header className="collection__header">
    <Link to="/" className="collection__back">
        Voltar ao menu
    </Link>

    <div className="collection__heading">
        <span className="collection__eyebrow">
            POKÉSTATION / ÁREA DE COLEÇÃO
        </span>

        <h1>Minha Coleção</h1>
    </div>

   

    <div className="collection__summary">
        <p className="collection__counter">Pokémon reunidos</p>
        <p className="collection__count">
            {colecao.length}<span> / 25</span>
        </p>
    </div>
</header>


            <section className="collection__content">
                <div className="collection__section-heading">
                    <div>
                      

                        <h2>Pokémon descobertos</h2>
                    </div>

                 
                </div>

                {erroColecao && (
                    <p className="collection__error" role="alert">
                        {erroColecao}
                    </p>
                )}

                {colecao.length === 0 ? (
                    <div className="collection__empty">
                        <h2>Sua coleção está esperando!</h2>

                      
                        <Link
                            to="/collector"
                            className="collection__link"
                        >
                            Explorar Pokémon
                        </Link>
                    </div>
                ) : (
                    <div
                        className="collection__grid"
                        aria-label="Pokémons da coleção"
                    >
                        {colecao.map((pokemon) => (
                            <article
                                className="collection__card"
                                key={pokemon.id}
                            >
                                {pokemon.sprite ? (
                                    <img
                                        className="collection__sprite"
                                        src={pokemon.sprite}
                                        alt={`Sprite de ${pokemon.name}`}
                                    />
                                ) : (
                                    <div className="collection__no-sprite">
                                        Imagem indisponível
                                    </div>
                                )}

                                <h3 className="collection__name">
                                    {pokemon.name}
                                </h3>

                                <p
                                    className={`collection__rarity ${classeDaRaridade(
                                        pokemon.raridade
                                    )}`}
                                >
                                    <span className="collection__rarity-text">
                                        {pokemon.raridade}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    className="collection__delete"
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
