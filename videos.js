function setNewAttribute(element, newAtribute, newValue) {
  let att = document.createAttribute(newAtribute);
  att.value = newValue;
  element.setAttributeNode(att);
}

function thisVideo(imgVideo, embedVideo, OnOff) {
  if (OnOff === "on") {
    imgVideo.style.display = "none";
    embedVideo.style.display = "block";
  } else {
    imgVideo.style.display = "block";
    embedVideo.style.display = "none";
  }
}

function videoAnalyzer(url) {
  let urlDivided = url.split("=");
  let imageVideo =
    "https://img.youtube.com/vi/" + urlDivided[1] + "/mqdefault.jpg";
  let embedVideo =
    "https://www.youtube.com/embed/" + urlDivided[1] + "?autoplay=0&&start=0";
  return [imageVideo, embedVideo];
}

function loadVideo(URL, anchor, show) {
  let newDiv = document.createElement("div");
  let newImg = document.createElement("img");
  let newFrame = document.createElement("iframe");

  newDiv.style.boxShadow =
    " 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)";

  setNewAttribute(newDiv, "id", 1);
  setNewAttribute(newDiv, "class", "iframe");
  setNewAttribute(newImg, "class", "imgVideo");
  setNewAttribute(newFrame, "class", "embedVideo");

  newFrame.allow = "autoplay";

  newImg.id = newDiv.id + "imgV";
  newFrame.id = newDiv.id + "embedV";

  let videoComponents = videoAnalyzer(URL);
  newImg.src = videoComponents[0];
  newFrame.src = videoComponents[1];

  let initialWidth = 210;
  let initialHeight = 157;

  newDiv.style.width = initialWidth + "px";
  newDiv.style.height = initialHeight + "px";

  newDiv.style.position = "absolute";
  newDiv.style.background = "black";

  newDiv.style.borderRadius = "5px";
  newDiv.style.overflow = "hidden";

  newImg.style.width = initialWidth + "px";
  newImg.style.height = initialHeight * 0.74 + "px";
  newImg.style.top = "13%";
  //   newImg.style.position = "absolute";
  newImg.style.position = "relative";

  newFrame.width = initialWidth;
  newFrame.height = initialHeight;
  newFrame.frameBorder = "0";

  if (show) thisVideo(newImg, newFrame, "on");
  else thisVideo(newImg, newFrame, "off");

  newDiv.appendChild(newImg);
  newDiv.appendChild(newFrame);
  anchor.appendChild(newDiv);
  return newDiv;
}

// let anch = document.getElementById("anch");
// let url = "https://www.youtube.com/watch?v=i7nZBJVI26A";
// loadVideo(url, anch, false);

// let status = false;
// let toogle = document.getElementById("toogle");

// toggle.onclick = () => {
//   status = !status;
//   loadVideo(url, anch, status);
// };
