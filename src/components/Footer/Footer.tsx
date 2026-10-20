
import styles from "./Footer.module.css";
import pokeBall from "../../assets/Nova pasta/Poké_Ball_icon.svg.webp";

function Footer() {
    return (
        <footer className={styles["site-footer"]}>
            <div className={styles["site-footer-content"]}>
                <div className={styles["site-footer-brand"]}>
                    <img
                        className={styles["site-footer-ball"]}
                        src={pokeBall}
                        alt=""
                        aria-hidden="true"
                    />
                    <h2>PokéStation</h2>
                </div>

                <div className={styles["site-footer-divider"]} />

                <section
                    className={styles["site-footer-tech"]}
                    aria-label="Tecnologias utilizadas"
                >
                    <h3>Desenvolvido com</h3>

                    <div className={styles["site-footer-tech-list"]}>
                        <div className={styles["site-footer-tech-item"]}>
                            <img
                                src="https://cdn.simpleicons.org/react/61DAFB"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>React</span>
                        </div>

                        <div className={styles["site-footer-tech-item"]}>
                            <img
                                src="https://cdn.simpleicons.org/typescript/3178C6"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>TypeScript</span>
                        </div>

                        <div className={styles["site-footer-tech-item"]}>
                            <img
                                src="https://cdn.simpleicons.org/vite/646CFF"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>Vite</span>
                        </div>

                        <div className={styles["site-footer-tech-item"]}>
                            <img
                                src="https://cdn.simpleicons.org/vitest/FCC72B"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>Vitest</span>
                        </div>

                        <div className={styles["site-footer-tech-item"]}>
                            <img
                                src="https://cdn.simpleicons.org/zod/3E67B1"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>Zod</span>
                        </div>
                    </div>

                    <p className={styles["site-footer-api"]}>
                        Dados dos Pokémon fornecidos pela{" "}
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            PokéAPI
                        </a>.
                    </p>
                </section>

                <div className={styles["site-footer-divider"]} />

                <section
                    className={styles["site-footer-contact"]}
                    aria-label="Redes e contatos"
                >
                    <h3>Vamos nos conectar?</h3>

                    <p>
                        Conheça meus projetos e acompanhe minha
                        jornada no desenvolvimento.
                    </p>

                    <div className={styles["site-footer-socials"]}>
                        <a
                            className={styles["site-footer-social"]}
                            href="https://github.com/EmanuBuque"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visitar meu GitHub"
                        >
                            <img
                                className={styles["site-footer-github-icon"]}
                                src="https://cdn.simpleicons.org/github/181717"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>GitHub</span>
                            <span
                                className={styles["site-footer-external"]}
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>

                        <a
                            className={styles["site-footer-social"]}
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=manuboter7%40gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Enviar um e-mail"
                        >
                            <img
                                src="https://cdn.simpleicons.org/gmail/EA4335"
                                alt=""
                                aria-hidden="true"
                            />
                            <span>E-mail</span>
                            <span
                                className={styles["site-footer-external"]}
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    </div>
                </section>

                <div className={styles["site-footer-divider"]} />

                <p className={styles["site-footer-disclaimer"]}>
                    PokéStation é um projeto independente de fãs,
                    sem afiliação oficial com a Nintendo, Game Freak,
                    Creatures ou The Pokémon Company. Pokémon e seus
                    respectivos nomes, personagens e imagens pertencem
                    aos seus titulares.
                </p>

                <a
                    className={styles["site-footer-back-to-top"]}
                    href="#top"
                >
                    ↑ Voltar ao topo
                </a>

                <div className={styles["site-footer-bottom"]}>
                    <span>© {new Date().getFullYear()} PokéStation</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
