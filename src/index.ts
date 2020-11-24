// 入口菜单
import data from '../config';

let dom = `<h1>CATEGORY</h1><ul>`;

for (let index = 1; index < data.length; index++) {
    const element = data[index];
    dom += `<li><h3><a href="./${element.name}.html">${element.templatename}</a></h3></li>`;
}

dom += '</ul>';

document.getElementById('app').innerHTML = dom;
