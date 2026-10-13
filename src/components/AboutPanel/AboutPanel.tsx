
import styles from "./AboutPanel.module.css";

function AboutPanel() {
    return (
        <section
            className={styles["about-panel"]}
            aria-label="Sobre a PokéStation"
        >
            <div className={styles["about-panel-content"]}>
                <h2 className={styles["about-panel-title"]}>Sobre a PokéStation</h2>

                <p className={styles["about-panel-text"]}>
                    A PokéStation reúne ferramentas para explorar o universo
                    Pokémon, conhecer diferentes espécies e organizar seus
                    Pokémon em um só lugar.
                </p>

                <h3 className={styles["about-panel-heading"]}>
                    O que você encontra por aqui
                </h3>

                <ul className={styles["about-panel-list"]}>
                    <li>
                        Finder: pesquise por nome ou número da Pokédex,
                        consulte informações e salve seus favoritos.
                    </li>
                    <li>
                        Team Builder: monte sua equipe e compare os atributos
                        dos Pokémon escolhidos.
                    </li>
                    <li>
                        Colecionador: descubra Pokémon e suas raridades para
                        adicionar novas espécies à coleção.
                    </li>
                    <li>
                        Coleção: visualize e organize até 25 Pokémon
                        registrados.
                    </li>
                </ul>

                <p className={styles["about-panel-text"]}>
                    As informações exibidas são fornecidas pela PokéAPI, uma
                    API pública dedicada a dados do universo Pokémon.
                </p>

                <h3 className={styles["about-panel-heading"]}>Desenvolvimento</h3>

                <p className={styles["about-panel-text"]}>
                    O projeto foi desenvolvido com React e TypeScript, usando
                    Vite e React Router para criar uma experiência interativa
                    de navegação.
                </p>

                <p className={styles["about-panel-closing"]}>
                    Escolha uma ferramenta no menu e comece sua jornada.
                </p>
            </div>
        </section>
    );
}

export default AboutPanel;
