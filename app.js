// app.js

/**
 * @author : ygkim
 * @since : 2022.05.10
 * @description : 캔버스를 만들어 그림판처럼 기능
 */

/**
 * @param canvas :
 * getElementById : ID 특성의 지정된 값을 가진 첫 번째 개체에 대한 참조를 반환
 * 컨텍스트 식별자가 지원되지 않을 경우 null을 반환.
 */
const canvas = document.getElementById("jsCanvas");

/**
 * @param ctx
 * getContext : 캔버스의 드로잉 컨텍스트를 반환
 */
const ctx = canvas.getContext("2d");
/**
 * @param colors
 * getElementsByClassName :
 * 컬렉션 객체를 반환 for문을 사용하거나 특정 index에 위치한 element를 반환받아 사용
 */
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

/**
 * @param INITIAL_COLOR : 검정색
 */
const INITIAL_COLOR = "2c2c2c";
/**
 * @param CANVAS_SIZE : 캔버스사이즈 700
 */
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

/**
 * @param stopPainting : 그림 그리기 멈춤
 */
function stopPainting() {
  painting = false;
}

/**
 * @param startPainting : 그림 그리기
 */
function startPainting() {
  painting = true;
}
/**
 * @param onMouseMove : 마우스 움직임
 */
function onMouseMove(event) {
  //   console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  //   console.log(x, y);
}

// /**
//  * @param onMouseUp : 마우스 클릭하고 뗼때
//  */
// function onMouseUp(event) {
//   stopPainting();
//   //   painting = false;
// }

/**
 * @param handleColorClick : 색상 변경
 */
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

/**
 * @param handleRangeChange : 굵기 변경
 */
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

/**
 * @param handleModeClick : 그리기모드 변경
 */
function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}
/**
 * @param handleCanvasClick : 캔버스 반응 사이즈
 */
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
/**
 * @param handleCM
 * preventDefault : 우클릭 방지
 */
function handleCM(event) {
  event.preventDefault();
}
/**
 * @param handleSaveClick : 클릭시 이미지 .png 로 저장
 * @param {const} image : URL data 추출
 * @param link : 생성할 요소의 유형을 가리킴
 * @
 */
function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs[EXPORT]";
  link.click();
  console.log(link);
}

/**
 * @param addEventListener : 특정 요소의 이벤트 등록
 */
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
