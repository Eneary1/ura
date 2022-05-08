import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Script from "next/script";
import Head from "next/head";

export default function Layout({ children })
{
	return (
		<>
			<Head> {/*Добавление тегов в head и body*/}
        		<title>Kotroom</title>
      		</Head>
			<div className="loader"></div>
			<Header/>
			<main>
			<div className="main--wrapper">
				{children}
			</div>
			</main>
			<Footer/>
			<Script src="/shrink.js"/>
			<Script src="/a.js"/>
		</>
	)
}