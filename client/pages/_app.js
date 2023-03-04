import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <div class="wrapper">
    <Component {...pageProps} />
</div>
}

export default MyApp;
