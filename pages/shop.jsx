import Layout from "./api/layout";
import LogIn from "./api/login";
import Cookies from 'js-cookie'
import { useEffect, useState, useRef, useCallback} from "react";

export default function Shop()
{
	const refName = useRef();
	const refPrice = useRef();
	const refCard = useRef();
	const [upd, updSet] = useState(0);
	const [up, upSet] = useState(0);
	const [down, downSet] = useState(0);
	const [dataFilter, masChanger] = useState([]);
	const [, setTick] = useState(0);
	const [logged, setLogged] = useState(false);
	const update = useCallback(() => {setTick(tick => tick + 1);}, [])
	useEffect(()=>{
		let newMas = [];
		for (let i = 0; i < Number(Cookies.get("count")); ++i) 
		{
			let masName = Cookies.get("name").split(',');
			let masUrl = Cookies.get("url").split(',');
			let masType  = Cookies.get("type").split(',');
			let masPrice = Cookies.get("price").split(',');
			newMas[i] = {"name": masName[i], "url": masUrl[i], "type": masType[i], "price": masPrice[i]} 
			if (i == Number(Cookies.get("count")) - 1) for (let i = 0; i < newMas.length; ++i) {newMas[i].id = i}
			update();
		}
		masChanger(newMas)
	}, [upd])
	
	useEffect(()=>
	{
		if (up != 0)
		{
			dataFilter.sort(function (a, b) {
				if (a.name > b.name) {
				  return 1;
				}
				if (a.name < b.name) {
				  return -1;
				}
				return 0;
			  });
			update();
		}
	}, [up])

	useEffect(()=>
	{
		if (down != 0)
		{
			dataFilter.sort(function (a, b) {
				if (Number(a.price) > Number(b.price)) {
				  return 1;
				}
				if (Number(a.price) < Number(b.price)) {
				  return -1;
				}
				return 0;
			  });
			update();
		}
	}, [down])
	
	const cookieDel = function()
	{
		Cookies.remove("name")
		Cookies.remove("url")
		Cookies.remove("type")
		Cookies.remove("price")
		Cookies.remove("count")
		updSet(upd + 1);
		update();
	}
	
	useEffect(() => {
		if (Cookies.get("isLogged") === "true") setLogged(true);
		else setLogged(false);
	})

	return (
		<Layout>
			{logged !== true ? <LogIn funcUpd={update}/> : 
			<>  
			<div id="card" className="pay--card" ref={refCard}>
			<span><span>Имя:</span><input type="text"/></span>
			<span><span>Фамилия:</span><input type="text"/></span>
			<span><span className="tel">Номер телефона: +7(<input type="text"/>) <input type="text"/>-<input type="text"/>-<input type="text"/></span></span>
			<span><span>Электронная почта:</span><input type="text"/></span>
			<span><span>Номер карты:</span><input type="text"/></span>
			<input type="submit" onClick={()=>{
				refCard.current.style.display = "none"
				cookieDel();
				}}/>
			</div>
			{dataFilter.length == 0 ? 
			<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
				<h2 style={{backgroundColor: "hsla(0, 0%, 0%, 20%)", alignSelf:"stretch"}}>Здесь пока ничего нет</h2>
				<p style={{margin: 0}}><a href="./catalog">перейти в каталог</a></p>
			</div> : 
				<div className="filterHolder">
					<p style={{width: "100%", backgroundColor: "hsla(0, 0%, 0%, 20%)"}} onClick={()=>{
						cookieDel();
						}}>{"ОЧИСТИТЬ КОРЗИНУ"}</p>
					<p style={{margin: "0 0 2vmin 0", paddingLeft: "2vmin"}}>Сортировать по:</p>
					<div className="filter">
						<p style={{margin: 0}}>По имени</p><div ref={refName} onClick={()=>
							{
								if (refName.current.classList == "arrow--up") 
								{
									refName.current.classList = "arrow--down"; 
									if (refPrice.current.classList == "arrow--down") refPrice.current.classList = "arrow--up"
									upSet(up + 1);
								}
								else 
								{
									refName.current.classList = "arrow--up"
								}
							}} className="arrow--up"/>
						<p style={{margin: 0}}>По цене</p><div ref={refPrice} onClick={()=>
							{
								if (refPrice.current.classList == "arrow--up") 
								{
									refPrice.current.classList = "arrow--down"; 
									if (refName.current.classList == "arrow--down") refName.current.classList = "arrow--up"
									downSet(down + 1);
								}
								else 
								{
									refPrice.current.classList = "arrow--up"
								}
							}} className="arrow--up"/>
					</div>
					<a href="#card"><h2 className="pay">ОПЛАТИТЬ</h2></a>
				</div>
				}
			{dataFilter.map((dat)=>
			{
				if (dataFilter.length != 0) return (
				<a onClick={() => {setChoise(dat.id)}} className="shop--prev in--shop" key={dat.id}>
					<img src={dat.url}/>
					<div className="frst"><h2>{dat.name}</h2></div>
					<div className="scnd"><p>₽ {dat.price}</p></div>
				</a>)
			})}
			</>}
		</Layout>
	)
}