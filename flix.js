// Creators, Getters & Setters functions
const createElem = type => document.createElement(type);
const setStyle = (elem, style) => {
  for (key in style) elem.style[key] = style[key];
};
const append = (elems, anchors) =>
  elems.forEach((elem, i) => anchors[i].append(elem));

const getElem = id => document.getElementById(id);
const getElems = (...ids) => ids.map(id => getElem(id));

const getAttr = (elem, attr) => elem.getAttribute(attr);
const getAttrs = (elem, ...attrs) => attrs.map(attr => getAttr(elem, attr));

const setAttr = (elem, style) => {
  for (key in style) elem.setAttribute(key, style[key]);
};
const setAttrId = (id, style) => setAttr(getElem(id), style);

const borderOn = e => {
  e.target.border = "2px solid red";
};
const borderOff = e => {
  e.target.border = "0px solid white";
};

let idC = 0;
const newElem = (type, style, anchor) => {
  let elem = createElem(type, anchor);
  elem.src = "mv1.jpg";
  elem.onmouseover = borderOn;
  elem.onmouseout = borderOff;
  setStyle(elem, style);
  append([elem], [anchor]);
  return elem;
};

let styleOne = {
  position: "relative",
  top: "0px",
  height: "100px",
  width: "200px",
  //   wrap no wrap
  margin: "5px"
};

let $movieList = getElem("movieList");
let $movieList2 = getElem("movieList2");

const movieInsert = (num, anchor) => {
  for (let i = 0; i < num; i++) newElem("img", styleOne, anchor);
};

movieInsert(6, $movieList);
movieInsert(6, $movieList2);
