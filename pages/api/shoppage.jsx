import Layout from "./layout";
import Card from "./card";
import data from "../../public/list.json"
import { useEffect, useMemo, useState, useRef, useCallback } from "react";

export default function ShopPage({type})
{
	const [choise, setChoise] = useState(0);
	const [up, upSet] = useState(0);
	const [down, downSet] = useState(0);
	const refName = useRef();
	const refPrice = useRef();
	const [dataFilter, s] = useState(data.filter(inf => inf.type == type));
	const setId = useMemo(()=>{for (let i = 0; i < dataFilter.length; ++i) {dataFilter[i].id = i}},[]);
	const [, setTick] = useState(0);
	const update = useCallback(() => {setTick(tick => tick + 1);}, [])
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
			for (let i = 0; i < dataFilter.length; ++i) {dataFilter[i].id = i}
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
			for (let i = 0; i < dataFilter.length; ++i) {dataFilter[i].id = i}
			update();
		}
	}, [down])
	return (
		<Layout>
		<Card type={dataFilter[choise].type} name={dataFilter[choise].name} url={dataFilter[choise].url} price={dataFilter[choise].price} id={dataFilter[choise].id}/>
		<div className="filterHolder">
			<p style={{margin: "0 0 2vmin 0", paddingLeft: "2vmin", textAlign: "left"}}>Сортировать по:</p>
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
			</div>
			{dataFilter.map((dat)=>
			{
				return (
				<a onClick={() => {setChoise(dat.id)}} className="shop--prev" key={dat.id} href="#card">
					<img src={dat.url}/>
					<div className="frst"><h2>{dat.name}</h2></div>
					<div className="scnd"><p>₽ {dat.price}</p></div>
				</a>)
			})}
		</Layout>
	)
}