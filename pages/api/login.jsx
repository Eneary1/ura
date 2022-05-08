import Cookies from "js-cookie";
import Script from "next/script";
import { useRef, useState } from "react";

export default function LogIn({funcUpd})
{
	const userName = useRef();
	const pass = useRef();
	const regName = useRef();
	const regPass = useRef();
	return (
		<div style={{display: "flex", justifyContent: "center", "align-items": "center", flexDirection: "column", margin: 0}}>
			<h1>Вход</h1>
			<span>имя<input id="typeName" type="text" style={{margin: "10px"}} ref={userName}></input></span>
			<span>пароль<input id="typePass" type="text" style={{margin: "10px"}} ref={pass}></input></span>
			<input id="sub" type="submit" stysle={{margin: "10px"}} onClick={()=>{
				if (userName.current.value === "" || pass.current.value === "") return;
				let user = {
					"name": userName.current.value,
					"password": pass.current.value
				};
				fetch("http://localhost:5000/users")
				.then((res)=>{
					return res.json()})
				.then((data) => {
					let isHere = data.find((n)=>{if (n.name === userName.current.value) return 1})
					if (isHere !== undefined)
					{	
						Cookies.set("isLogged", "true")
						funcUpd();
					} 
				})
				.catch((e)=>{console.log(e)});
			}}></input>
			<h1>Регистрация</h1>
			<span>имя<input id="regName" type="text" style={{margin: "10px"}} ref={regName}></input></span>
			<span>пароль<input id="regPass" type="text" style={{margin: "10px"}} ref={regPass}></input></span>
			<input id="regSub" type="submit" stysle={{margin: "10px"}} onClick={()=>{
				if (regName.current.value === "" || regPass.current.value === "") return;
				let user = {
					"name": regName.current.value,
					"password": regPass.current.value
				};
				fetch("http://localhost:5000/users")
				.then((res)=>{
					return res.json()})
				.then((data) => {
					let isHere = data.find((n)=>{if (n.name === regName.current.value) return 1})
					if (isHere === undefined)
					{	
						fetch("http://localhost:5000/users", {
							method: 'POST',
							body: JSON.stringify(user),
							headers: {
							'Content-Type': "application/json; charset=utf-8"
						}
						})
						.then(()=>{
						Cookies.set("isLogged", "true")
						funcUpd();
						})
						.catch((e)=>{console.log(e)});
					} 
				})
				
			}}></input>
		</div>
    )
}