import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <div class="wrapper">
      <header>
        <figure>
          <img
            src="/octopus-logo.svg"
            alt="Octopus Energy Logo"
          />
        </figure>
        <button>
          <img
            src="/basket.svg"
            alt="Basket"
            />
        </button>
      </header>
    <Component {...pageProps} />
    <footer>
    Octopus Energy Ltd is a company registered in England and Wales.
Registered number: 09263424. Registered office: 33 Holborn, London, ECIN 2HT. Trading office: 20-24 Broadwick Street, London,
WIF 8HT
    </footer>
  </div>
}

export default MyApp;
