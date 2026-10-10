
import "./Footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-content">
                {/* Marca */}
                <div className="site-footer-brand">
                    <span
                        className="site-footer-ball"
                        aria-hidden="true"
                    />
                    <h2>PokéStation</h2>
                    <p>Sua jornada Pokémon, do seu jeito.</p>
                </div>

                <div className="site-footer-divider" />

                {/* Tecnologias */}
                <section
                    className="site-footer-tech"
                    aria-label="Tecnologias utilizadas"
                >
                    <h3>Desenvolvido com</h3>

                    <div className="site-footer-tech-list">
                        <div className="site-footer-tech-item">
                            <img
                                src="https://cdn.simpleicons.org/react/61DAFB"
                                alt=""
                            />
                            <span>React</span>
                        </div>

                        <div className="site-footer-tech-item">
                            <img
                                src="https://cdn.simpleicons.org/typescript/3178C6"
                                alt=""
                            />
                            <span>TypeScript</span>
                        </div>

                        <div className="site-footer-tech-item">
                            <img
                                src="https://cdn.simpleicons.org/vite/646CFF"
                                alt=""
                            />
                            <span>Vite</span>
                        </div>

                        <div className="site-footer-tech-item">
                            <img
                                src="https://cdn.simpleicons.org/nodedotjs/5FA04E"
                                alt=""
                            />
                            <span>Node.js</span>
                        </div>
                    </div>

                    <p className="site-footer-api">
                        Dados dos Pokémon fornecidos pela{" "}
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            PokéAPI
                        </a>.
                    </p>
                </section>

                <div className="site-footer-divider" />

                {/* Contatos */}
                <section
                    className="site-footer-contact"
                    aria-label="Redes e contatos"
                >
                    <h3>Vamos nos conectar?</h3>

                    <p>
                        Conheça meus projetos e acompanhe minha
                        jornada no desenvolvimento.
                    </p>

                    <div className="site-footer-socials">
                        <a
                            className="site-footer-social"
                            href="https://github.com/SEU-USUARIO"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visitar meu GitHub"
                        >
                            <img
                                src="https://cdn.simpleicons.org/github/FFFFFF"
                                alt=""
                            />
                            <span>GitHub</span>
                            <span
                                className="site-footer-external"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>

                        <a
                            className="site-footer-social"
                            href="https://www.linkedin.com/in/SEU-PERFIL/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visitar meu LinkedIn"
                        >
                          

<svg
    className="site-footer-linkedin-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="img"
    aria-label="LinkedIn"
>
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path
        fill="#FFFFFF"
        d="M7.2 9.2H4.4V19h2.8V9.2ZM5.8 8a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM19.6 13.4c0-2.9-1.5-4.4-3.7-4.4a3.2 3.2 0 0 0-2.9 1.6V9.2h-2.8V19H13v-4.9c0-1.3.3-2.6 1.9-2.6s1.8 1.5 1.8 2.7V19h2.9v-5.6Z"
    />
</svg>


                            <span>LinkedIn</span>
                            <span
                                className="site-footer-external"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>

                        <a
                            className="site-footer-social"
                            href="mailto:SEU-EMAIL"
                            aria-label="Enviar um e-mail"
                        >
                            <img
                                src="https://cdn.simpleicons.org/gmail/EA4335"
                                alt=""
                            />
                            <span>E-mail</span>
                            <span
                                className="site-footer-external"
                                aria-hidden="true"
                            >
                                ↗
                            </span>
                        </a>
                    </div>
                </section>

                <div className="site-footer-divider" />

                {/* Créditos e aviso */}
                <p className="site-footer-disclaimer">
                    PokéStation é um projeto independente de fãs,
                    sem afiliação oficial com a Nintendo, Game Freak,
                    Creatures ou The Pokémon Company. Pokémon e seus
                    respectivos nomes, personagens e imagens pertencem
                    aos seus titulares.
                </p>

                <div className="site-footer-bottom">
                    <span>© 2026 PokéStation</span>
                    <span>Feito com dedicação e código.</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
