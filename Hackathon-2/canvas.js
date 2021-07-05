const canvas=document.getElementById('canvas');
canvas.width=window.innerWidth-600;
canvas.height=400;

let ctx=canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);



start_bgcolor="white"
let restore_array = [];
let start_index = -1;
let draw_color="black";
let draw_eraser="white";
let draw_width="2";
let is_drawing = false;

function pen(){
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);
}

// function eraser(){
//     canvas.addEventListener("touchstart", start, false);
// canvas.addEventListener("touchmove", edraw, false);
// canvas.addEventListener("touchend", stop, false);
// canvas.addEventListener("mousedown", start, false);
// canvas.addEventListener("mousemove", edraw, false);
// canvas.addEventListener("mouseup", stop, false);
// canvas.addEventListener("mouseout", stop, false);
// }




function start(event) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft,
        event.clientY-canvas.offsetTop);
    event.preventDefault();
  }
 

  function draw(event) {
    if (is_drawing) {
      ctx.lineTo(event.clientX - canvas.offsetLeft,
        event.clientY-canvas.offsetTop);
      ctx.strokeStyle = draw_color;
      ctx.lineWidth = draw_width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  }
//   function edraw(event) {
//     if (is_drawing) {
//       ctx.lineTo(event.clientX - canvas.offsetLeft,
//         event.clientY-canvas.offsetTop);
//       ctx.strokeStyle = draw_eraser;
//       ctx.lineWidth = draw_width;
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
      
//     }
//   }

  function stop(event){
      if(is_drawing){
          ctx.stroke();
          ctx.closePath();
          is_drawing=false;
      }
      event.preventDefault();
      if ( event.type != 'mouseout' ) {
      restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      start_index += 1;
      }
  }

  function change_color(element){
   draw_color = element.style.background;
  }

  function clear_canvas() {
    ctx.fillStyle =  start_bgcolor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
  }


  function undo() {
    if (start_index <= 0) {
      clear_canvas()
    } else {
      start_index -= 1;
      restore_array.pop();
        ctx.putImageData(restore_array[start_index], 0, 0);
      
    }
  }
