import Cat from "./svg.jsx"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"

export default function Header({classNameProp})
{
	const [counter, setCounter] = useState();
	useEffect(()=>
	{
		let prev = Cookies.get().count  - 1;
		const y = setInterval(()=>{
			if (prev != Cookies.get().count) 
			{
				prev = Cookies.get().count
				setCounter(prev)
			}
		})
	})
	return (
		<>
		<header id="h" className={classNameProp}>
			<div id="p"><p>Kotroom</p></div>
			<Cat/>
			<a href="../about"><p>о нас</p></a>
			<a href="../catalog"><p>каталог</p></a>
			<a href="../shop" ><p>корзина <span className="product--count">{counter}</span></p></a>
			<div id="pa"><p>о</p></div> {/*создан для поддержания равновесия в grid-сетке*/}
		</header>
		<div className="pre"/>
		</>
	)
}