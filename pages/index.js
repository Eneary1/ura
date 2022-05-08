import Header from "./api/header.jsx";
import Footer from "./api/footer.jsx";
import Script from "next/script";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kotroom</title>
      </Head>
      <div className="loader"/>
      <Header/>
      <main>
      <div className="main--wrapper">
        <p style={{margin: "5vmin 10vmin"}}>
        Kotroom известна как компания, производящая мебель высокго качества. 
        Наши изделия каждый день продаются в уже двух магазинах.
        Выбрав нас, вы делаете ставку в первую очередь на качество, наша мебель делается из
        высококлассных материалов: древесины, кожи, кожзамов и других.
        </p>
        <p style={{margin: "5vmin 10vmin"}}>
        Наши изделия привнесут новое понимание слова уют и вас точно найдёт идея вашей жизни,
        ведь уют - двигатель прогресса  
        </p>
      </div>
      </main>
      <Footer/>
			<Script src="/shrink.js" strategy = "afterInteractive"/>
      <Script src="/a.js" strategy = "afterInteractive"/>
    </>
  )
}