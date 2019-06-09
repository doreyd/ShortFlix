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

let $movieList2 = getElem("movieList2");

const showDisplay = id => {
  let displayList = document.querySelectorAll(".display");
  displayList.forEach(elem => {
    if (elem.id === id) getElem(elem.id).style.display = "block";
    else getElem(elem.id).style.display = "none";
  });
};

const hello = e => console.log(e.target.id);
const hello2 = () => console.log("Of");

const whiteUp = (elem, show) => {
  elem.style.height = show ? "150px" : "146px";
  elem.style.top = show ? "5px" : "-10px";
  elem.style.border = show ? "4px solid white" : "";
  getElem(elem.id + "-p").style.display = show ? "block" : "none";
};

const select = (elem, show) => {
  whiteUp(elem, show);
  let lineId = elem.id.split("-")[0];

  if (show) {
    showDisplay(lineId + "-d");
    let url = "https://www.youtube.com/watch?v=i7nZBJVI26A";
    getElem(lineId + "-dImg").src = videoAnalyzer(url)[0];
    getElem(`${lineId}-dupperTitle`).innerHTML = "<b>SHORTFLIX</b> ORIGINAL";
    getElem(`${lineId}-dTitle`).innerText = "Space X";
    getElem(`${lineId}-ddate`).innerText = "September 15th, 2017";
    getElem(
      `${lineId}-ddescription`
    ).innerText = `Space X is a video about the company of the same name. 
    Many great things can be mentionned about 
    Elon Musk's achievements.`;
    let play = getElem(`${lineId}-dplay`);
    play.innerText = "PLAY";
    let iframe = getElem(`${lineId}-diframe`);
    play.onclick = () => {
      getElem(`${lineId}-dImg`).style.display = "none";
      getElem(`${lineId}-dText`).style.display = "none";

      iframe.style.display = "inline-block";
      iframe.src = videoAnalyzer(url)[1];
    };
    let close = getElem(`${lineId}-dclose`);
    close.onclick = () => {
      getElem(`${lineId}-dImg`).style.display = "block";
      getElem(`${lineId}-dText`).style.display = "block";
      getElem(`${lineId}-d`).style.display = "none";
      iframe.style.display = "none";

      whiteUp(elem, false);
    };
  }
};

const expand = e => (e.target.style.height = "230px");
const retract = e => (e.target.style.height = "150px");

const newElem = (type, className, id, ...anchor) => {
  let elem = createElem(type);
  if (id !== "") elem.id = id;
  elem.className = className;
  append([elem], anchor);
  return elem;
};

const hover = (elem, over, out) => {
  elem.onmouseover = over;
  elem.onmouseout = out;
};

const resetElems = (l, side, incr) => {
  let elem = getElem(l + "-" + side);
  let oldLeft = parseInt(getComputedStyle(elem).left);
  elem.style.left = oldLeft + incr + "px";
};

const move = e => {
  let detail = e.target.id.split("-");

  if (detail[1] === "right") {
    let elem = getElem(detail[0] + "-line");
    let oldLeft = parseInt(getComputedStyle(elem).left);

    elem.style.left = oldLeft - 100 + "px";
    resetElems(detail[0], "right", 100);
    resetElems(detail[0], "left", 100);
    resetElems(detail[0], "txt", 100);
  } else if (detail[1] === "left") {
    let elem = getElem(detail[0] + "-line");
    let oldLeft = parseInt(getComputedStyle(elem).left);
    if (oldLeft <= 0) {
      elem.style.left = oldLeft + 100 + "px";
      resetElems(detail[0], "right", -100);
      resetElems(detail[0], "left", -100);
      resetElems(detail[0], "txt", -100);
    }
  }
};

let $content = getElem("content");

const addMovie = (l, i, img, $container) => {
  let url = "https://www.youtube.com/watch?v=i7nZBJVI26A";

  videoAnalyzer(url);
  let $mvBox = newElem("div", "mvBox", "", $container);
  let $img = newElem("img", "imgC", `${l}-mv${i}`, $mvBox);

  // $img.src = `${img}.jpg`;
  $img.src = videoAnalyzer(url)[0];
  hover($img, expand, retract);
  newElem("div", "pointer", `${l}-mv${i}-p`, $mvBox);
};

const displayer = l => {
  // newElem("div", "display", `${l}-d`, $content);
  let dis = newElem("div", "display", `${l}-d`, $content);
  newElem("img", "display2", `${l}-dImg`, dis);
  let leftSide = newElem("div", "display3", `${l}-dText`, dis);
  newElem("div", "upperTitle", `${l}-dupperTitle`, leftSide);
  newElem("div", "title", `${l}-dTitle`, leftSide);
  newElem("div", "date", `${l}-ddate`, leftSide);
  newElem("div", "description", `${l}-ddescription`, leftSide);
  newElem("div", "play", `${l}-dplay`, leftSide);
  newElem("iframe", "iframe", `${l}-diframe`, dis);
  newElem("div", "bottomSpace", ``, $content);
  let close = newElem("div", "close", `${l}-dclose`, dis);
  close.innerText = "X";
};

const addLine = (l, text, movies) => {
  let $line = newElem("div", "line", l + "-line", $content);
  // let $line2 = newElem("div", "line", l + "-line", $line);
  newElem("div", "topSpace", "", $line);
  let $txt = newElem("div", "txt", "", $line);
  $txt.id = `${l}-txt`;
  $txt.innerText = text;
  newElem("div", "topSpace", "", $line);
  let $movieList = newElem("div", "movieList", "", $line);
  let $container = newElem("div", "container", "", $movieList);
  let $left = newElem("div", "left", l + "-left", $container);
  $left.onclick = move;
  let $right = newElem("div", "right", l + "-right", $container);
  $right.onclick = move;
  movies.forEach((movie, i) => addMovie(l, i, movie, $container));
  displayer(l);
};

let movieSections = [
  ["Action Movies", ["mv1", "mv1", "mv1", "mv1", "mv1", "mv1", "mv1"]],
  ["Comedy Movies", ["mv1", "mv1", "mv1", "mv1", "mv1"]],
  ["Thriller Movies", ["mv1", "mv1", "mv1", "mv1", "mv1"]],
  ["Scify Movies", ["mv1", "mv1", "mv1", "mv1", "mv1"]]
];

movieSections.forEach((section, i) => addLine(i, section[0], section[1]));

const elems = document.querySelectorAll(".imgC");
const selectMovie = e => elems.forEach(el => select(el, el.id === e.target.id));

elems.forEach(elem => (elem.onclick = selectMovie));

window.onresize = () => {
  let windowWidth = parseInt(window.innerWidth);

  movieSections.forEach((x, i) => {
    let line = getElem(i + "-line");
    let oldLeft = parseInt(getComputedStyle(line).left);

    let elem = getElem(i + "-" + "right");
    elem.style.left = windowWidth - oldLeft - 60 + "px";
  });
};
