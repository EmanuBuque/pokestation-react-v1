import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { LIMITE_COLECAO, useCollection } from "../../hooks/useCollection";
import { useFavorites } from "../../hooks/useFavorites";
import { coresTipos } from "../../constants/pokemonTypes";

import pikachu from "../../assets/pokemon-sprites/pikachu.png";
import charmander from "../../assets/pokemon-sprites/charmander.png";
import squirtle from "../../assets/pokemon-sprites/squirtle.png";
import bulbasaur from "../../assets/pokemon-sprites/bulbasaur.png";

import styles from "./MainMenu.module.css";

const imagemBulbasaur =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

function MainMenu() {
    const { favoritos } = useFavorites();
    const { colecao } = useCollection();

    const ferramentas = [
        {
            to: "/finder",
            titulo: "Buscar Pokémon",
            texto: "Pesquise por nome ou número e veja tipo, medidas e atributos.",
            info:
                favoritos.length === 0
                    ? "Nenhum favorito ainda"
                    : `${favoritos.length} ${favoritos.length === 1 ? "favorito salvo" : "favoritos salvos"}`,
            sprite: pikachu,
            cor: coresTipos.electric,
        },
        {
            to: "/team-builder",
            titulo: "Montar time",
            texto: "Escolha até 6 Pokémon e compare a força da equipe atributo por atributo.",
            info: "Até 6 Pokémon",
            sprite: charmander,
            cor: coresTipos.fire,
        },
        {
            to: "/collector",
            titulo: "Colecionar",
            texto: "Encontre um Pokémon aleatório e descubra se ele é comum ou lendário.",
            info: "Seis níveis de raridade",
            sprite: squirtle,
            cor: coresTipos.water,
        },
        {
            to: "/collection",
            titulo: "Minha coleção",
            texto: "Veja os Pokémon que você guardou e quantas vagas ainda restam.",
            info: `${colecao.length} de ${LIMITE_COLECAO} vagas ocupadas`,
            sprite: bulbasaur,
            cor: coresTipos.grass,
        },
    ];

    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <div className={styles.heroCopy}>
                    <h1>Pesquise, monte seu time e colecione Pokémon.</h1>
                    <p>
                        Quatro ferramentas com dados reais da PokéAPI. Seus
                        favoritos e sua coleção ficam salvos neste navegador.
                    </p>
                </div>

                <div className={styles.heroArt} aria-hidden="true">
                    <span className={styles.platform} />
                    <img src={imagemBulbasaur} alt="" />
                </div>
            </section>

            <nav className={styles.tools} aria-label="Ferramentas">
                {ferramentas.map((ferramenta) => (
                    <Link
                        key={ferramenta.to}
                        to={ferramenta.to}
                        className={styles.tool}
                        style={{ "--tool-color": ferramenta.cor } as CSSProperties}
                    >
                        <span className={styles.toolSprite}>
                            <img src={ferramenta.sprite} alt="" />
                        </span>
                        <span className={styles.toolBody}>
                            <span className={styles.toolTitle}>
                                {ferramenta.titulo}
                            </span>
                            <span className={styles.toolText}>
                                {ferramenta.texto}
                            </span>
                            <span className={styles.toolInfo}>
                                {ferramenta.info}
                            </span>
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default MainMenu;
