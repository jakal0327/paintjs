// app.js

/**
 * @author : ygkim
 * @since : 2022.05.10
 * @description : 캔버스를 만들어 그림판처럼 기능
 *
 */
/**
 * @param getElementById : ID 특성의 지정된 값을 가진 첫 번째 개체에 대한 참조를 반환
 */
const canvas = document.getElementById("jsCanvas");

let painting = false;

/**
 * @param stopPainting : 마우스 멈춤
 */
function stopPainting() {
  painting = false;
}

/**
 * @param onMouseMove : 마우스 움직임
 */
function onMouseMove(event) {
  //   console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
}
/**
 * @param onMouseDown : 마우스 클릭시
 */
function onMouseDown(event) {
  painting = true;
}

/**
 * @param onMouseUp : 마우스 클릭하고 뗼때
 */
function onMouseUp(event) {
  stopPainting();
  //   painting = false;
}

// /**
//  * @param onMouseLeave : 마우스 클릭하고 뗼때
//  */
// function onMouseLeave(event) {
//   painting = false;
// }

/**
 * @param addEventListener : 특정 요소의 이벤트 등록
 */
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  /* onMouseLeave => stopPainting */
  canvas.addEventListener("mouseleave", stopPainting);
}
