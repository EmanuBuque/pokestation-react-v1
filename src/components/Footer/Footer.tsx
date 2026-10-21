import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.about}>
                    <p className={styles.brand}>PokéStation</p>
                    <p>
                        Para mais informações sobre o site, consulte o{" "}
                        <a
                            href="https://github.com/EmanuBuque/pokestation-react-v1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            projeto no GitHub
                        </a>
                        .
                    </p>
                    <p>
                        Os dados dos Pokémon são fornecidos pela{" "}
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            PokéAPI
                        </a>
                        .
                    </p>
                </div>

                <ul className={styles.links} aria-label="Contato">
                    <li>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=manuboter7%40gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            E-mail
                        </a>
                    </li>
                </ul>

                <p className={styles.disclaimer}>
                    © {new Date().getFullYear()} PokéStation. Projeto
                    independente, sem afiliação com a Nintendo, Game Freak,
                    Creatures ou The Pokémon Company. Pokémon e seus nomes,
                    personagens e imagens pertencem aos seus titulares.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
