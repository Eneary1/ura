import Cookies from 'js-cookie'

export default function Card(props)
{
	return (
			<div className="shop--card" id="card">
				<h2>{props.name}</h2>
				<img src={props.url}/>
				<span onClick={()=>{
					let val; 
					Cookies.get().count == undefined ? val = 1 : val = Number(Cookies.get().count) + 1;
					Cookies.set("count", val)
					Cookies.get().name == undefined ? Cookies.set(`name`, props.name) : Cookies.set(`name`, Cookies.get().name + "," + props.name);
					Cookies.get().url == undefined ? Cookies.set(`url`, props.url) : Cookies.set(`url`, Cookies.get().url + "," + props.url);
					Cookies.get().type == undefined ? Cookies.set(`type`, props.type) : Cookies.set(`type`, Cookies.get().type + "," + props.type);
					Cookies.get().price == undefined ? Cookies.set(`price`, props.price) : Cookies.set(`price`, Cookies.get().price + "," + props.price);
					}}><p>В корзину</p></span>
				<p>₽ {props.price}</p>
			</div>
	)
}
		