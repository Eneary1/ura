const a = document.getElementById("h");
const p = document.getElementById("p");
const pa = document.getElementById("pa");
const cat = document.getElementById("cat");
const b = document.getElementsByTagName("body")[0];
const mainwr = document.getElementsByClassName("main--wrapper")[0];
let bh = (b.offsetHeight / 100) * 10;
let he = a.offsetHeight;
let cor = window.pageYOffset;
let k = (a.getBoundingClientRect().bottom - pa.getBoundingClientRect().bottom)
function rend()
{
	cor = window.pageYOffset;
	if (bh < a.offsetHeight) 
	{
		a.style.gridTemplateRows = "repeat(3, max-content)";
		p.style.display = "flex";
		pa.style.display = "flex";
		if (he - cor < 0) a.style.height = `0px`; 
		else
		a.style.height = `${he - cor}px`; 
		if (bh > a.offsetHeight) 
		{
			a.style.height = `${bh}px`;
			} 
		if (cor == 0) 
		{
			a.style.height = null;
			}
		}
		else 
		if ((he - cor) >= bh) 
		{
			a.style.gridTemplateRows = "repeat(3, max-content)";
			p.style.display = "flex";
			pa.style.display = "flex";
			a.style.height = `${he - cor}px`;
			}
		if (pa.getBoundingClientRect().bottom >= a.getBoundingClientRect().bottom - (document.documentElement.offsetHeight / 100)) 
		{
			a.style.gridTemplateRows = "max-content";
			p.style.display = "none";
			pa.style.display = "none";
		} 
		const hp = (((a.getBoundingClientRect().bottom - pa.getBoundingClientRect().bottom) - (document.documentElement.offsetHeight / 100)) / (k - (document.documentElement.offsetHeight / 100)) * 100);
		p.style.opacity = `${hp}%`;
		document.getElementsByClassName("pre")[0].style.opacity = `${hp}%`;
		if (p.style.display == "none") 
		document.getElementsByClassName("pre")[0].style.opacity = `${0}%`;
		if (document.getElementsByClassName("shop--card")[0] != undefined) document.getElementsByClassName("shop--card")[0].style.height = `calc(${document.getElementsByTagName("main")[0].getBoundingClientRect().height}px - 10vmin)`;
}
rend();

window.onscroll = () => 
{
	rend();
}

window.onresize = () => 
{
	window.scrollTo(0, 0);
	a.style.gridTemplateRows = "repeat(3, max-content)";
	p.style.display = "flex";
	pa.style.display = "flex";
	cor = window.pageYOffset;
	a.style.height = null;
	bh = (b.offsetHeight / 100) * 10;
	he = a.offsetHeight;
	k = (a.getBoundingClientRect().bottom - pa.getBoundingClientRect().bottom);
	p.style.opacity = "1";
	pa.style.opacity = "1";
	rend();
}