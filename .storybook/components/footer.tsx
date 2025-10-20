export const Footer = () => {
  return (
    <>
      <footer style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <nav>
          <ul>
            <li>
              <p>
                Pre-configured <code>zod</code> fields for the Jotai 👻{" "}
                <a
                  className="contrast"
                  href="https://github.com/form-atoms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>form-atoms</u>
                </a>
                .
                <br />
                <small>
                  Made with ❤️ by{" "}
                  <a
                    className="secondary"
                    href="https://github.com/miroslavpetrik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>Miroslav Petrik</u>
                  </a>
                </small>
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <a
                className="contrast"
                href="https://form-atoms.github.io/field/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <u>Docs</u>
              </a>
            </li>
            <li>
              <a
                className="contrast"
                href="https://github.com/form-atoms/field"
                target="_blank"
                rel="noopener noreferrer"
              >
                <u>GitHub</u>
              </a>
            </li>
            <li>
              <a
                className="contrast"
                href="https://www.npmjs.com/package/%40form-atoms/field"
                target="_blank"
                rel="noopener noreferrer"
              >
                <u>NPM</u>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
      <hr />
      <p>
        <small>
          {" "}
          <a
            className="contrast"
            href="https://github.com/form-atoms/field/blob/main/LICENSE.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT
          </a>{" "}
          License. Currently{" "}
        </small>

        <a
          aria-label="NPM version"
          href="https://www.npmjs.com/package/%40form-atoms/field"
        >
          <img
            src="https://img.shields.io/npm/v/%40form-atoms/field?label=&color=0E1118"
            alt="Version Badge"
          />
        </a>
      </p>
    </>
  );
};
