
var canvas;
document.getElementById("CanvasForTeacher").style.marginLeft = "auto";
document.getElementById("CanvasForTeacher").style.marginRight = "auto";
document.getElementById("CanvasForTeacher").style.marginTop = 155;
canvas = document.getElementById("CanvasForTeacher");

canvas.style.display= 'block';


canvas.width = 712;
canvas.height = 445;

var c = canvas.getContext('2d');




// Ball object 
// 1st stage 
function Ball(x, y, radius, dx, dy){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "#FF225A";
		c.fill();
		c.stroke();
		c.closePath();
	   // console.log("hahaha");
	}

	this.moveTeacherRight = function(){

		   if(this.x + radius < canvas.width){
				this.x += this.dx + colvalueForMovement;
		   }

		  this.draw();
	}
	
	this.moveTeacherDown = function(){
		
			if(this.y + radius < canvas.height){
				this.y += this.dy + rowvalueForMovement;
			}
			
		   this.draw();
		
	}
	
	
	this.moveTeacherUp = function(){
		
			 if(this.y - radius > 0){
				this.y -= this.dy + rowvalueForMovement ;
			 }
			
		   this.draw();
		
	}
	
	
	
	this.moveTeacherLeft = function(){
		
			if(this.x - radius > 0){
				this.x -= this.dx +colvalueForMovement;
			}
			
		   this.draw();
		
	}
}
function loopupt(){
	for (var i = 0; i < 2; i++) 
		{

	    ball.moveTeacherUp();
		}
}
//////////////
function loopupt2(){
	for (var i = 0; i < 3; i++) 
		{

	    ball.moveTeacherUp();
		}
}/////////////////////
function loopupt2(){
	for (var i = 0; i < 4; i++) 
		{

	    ball.moveTeacherUp();
		}
}////////////////////
function loopdnt(){
	for (var i = 0; i < 2; i++) 
		{

	    ball.moveTeacherDown();
		}
}////////////////////
function loopdnt2(){
	for (var i = 0; i < 3; i++) 
		{

	    ball.moveTeacherDown();
		}
}//////////////////////////
function loopdnt3(){
	for (var i = 0; i < 4; i++) 
		{

	    ball.moveTeacherDown();
		}
}//////////////////////
function looplft(){
	for (var i = 0; i < 2; i++) 
		{

	    ball.moveTeacherLeft();
		}
}function looplft2(){
	for (var i = 0; i < 3; i++) 
		{

	    ball.moveTeacherLeft();
		}
}function looplft3(){
	for (var i = 0; i < 4; i++) 
		{

	    ball.moveTeacherLeft();
		}
}function looprtt(){
	for (var i = 0; i < 2; i++) 
		{

	    ball.moveTeacherRight();
		}
}function looprtt2(){
	for (var i = 0; i < 3; i++) 
		{

	    ball.moveTeacherRight();
		}
}function looprtt3(){
	for (var i = 0; i < 4; i++) 
		{

	    ball.moveTeacherRight();
		}
}
//console.log("maze")
var columns;
var rows;
var hurdlerowlist=[];
var hurdlecollist=[];
var imageslist=[];
var imageRlist=[];
var imageClist=[];
var colvalueForMovement;
var backGroundImage;
var XstopListForCheck=[];
var YstopListForCheck=[];
var XrewardListForCheck=[];
var YrewardListForCheck=[];
var hrNo,hcNo,hrvalue,hcvalue;
var rNo,cNo,cvalue,rvalue;
function getcol(col,row,backgroundImage,hurdlerowpos,hurdlecolpos,imagelist,imagerowlist,imagecollist){	

	columns=col;
	rows=row;
	backGroundImage=backgroundImage;
	hurdlerowlist=hurdlerowpos;// all rows having hurdles
	hurdlecollist=hurdlecolpos;// columns having hurdles
	imageslist=imagelist;
	imageRlist=imagerowlist;// rows having images except background
	imageClist=imagecollist;
    console.log(imageslist,imageRlist,hurdlerowlist,rows,"........................................................");

//                                      rewards
	cvalue=697/columns;
	cvalue=cvalue-0.3;
	rvalue=433/rows;
	rvalue=rvalue.toFixed(0); // get only one value after point and return in string form
	rvalue=Number(rvalue);// convert string to int
	cvalue=cvalue.toFixed(0); // get only one value after point and return in string form
	cvalue=Number(cvalue);// convert string to int
    for (var x =0 ;x<imageslist.length;x+=1){
	    rNo=imageRlist[x];
        cNo=imageClist[x];	
        rNo=rNo+1;		
		XrewardListForCheck[x]=(cvalue-75) +((cNo-1)*cvalue) ;
		//console.log("............",XstopListForCheck);
		YrewardListForCheck[x]=(rvalue-35)+((rNo-1)*rvalue);
	   
    } 
	//                                   hurdles
    hrvalue=rvalue;
	hcvalue=cvalue;
    for (var x =0 ;x<hurdlerowlist.length;x+=1){
	    hrNo=hurdlerowlist[x];
        hcNo=hurdlecollist[x];
         hrNo=hrNo+1;
		XstopListForCheck[x]=(hcvalue-75) +((hcNo-1)*hcvalue) ;
		//console.log("............",XstopListForCheck);
		YstopListForCheck[x]=(hrvalue-35)+((hrNo-1)*hrvalue);
	   
    } 
	
}

// Check function if ball touchs walls
function RectCircleColliding(circle,rect){
    let distX = Math.abs(circle.x - rect.x-rect.width/2);
    let distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    let dx=distX-rect.width/2;
    let dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}
// for 1st stage 
function CheckonHurdles(){

    for (var x =0 ;x< XstopListForCheck.length;x+=1){
	   const stop= {
		   x: XstopListForCheck[x],
	       y: YstopListForCheck[x],
	       width: 80, 
		   height: 50,
	        }
	   if(RectCircleColliding(ball, stop)){
		    var audio = new Audio('/static/images/oh-no-sound-effect.mp3'); 
		    function stop(){
            audio.pause();
			audio.currentTime = 0;
			history.go(0);
        }
     
		    function playsound(){
		  
            audio.play(); 
			setTimeout(stop,500);
			
			// window.location.reload();
			
			//audio.currentTime=0;
			 }
         setTimeout(playsound, 10)
		 
		// window.location.reload();		
		
	}
	   
    } 
	
	
}



// for rewards of stage 
function CheckonRewards(){
          var y = XrewardListForCheck.length;
    // for (var x =0 ;x< XrewardListForCheck.length;x+=1){
	   // const reward= {
		   // x: XrewardListForCheck[x],
	       // y: YrewardListForCheck[x],
	       // width: 60, 
		   // height: 30,
	        // }
			const reward= {
		   x: XrewardListForCheck[y-1],
	       y: YrewardListForCheck[y-1],
	       width: 60, 
		   height: 30,
	        }
	   if(RectCircleColliding(ball, reward)){
		    var audio = new Audio('/static/images/Mario.mp3'); 
		    function stop(){
             audio.pause();
			// audio.currentTime = 0;
			// document.location.reload();
        }
     
		    function playsound(){
		  
            audio.play(); 
			setTimeout(stop,450);
			 }
         setTimeout(playsound, 10)		
		
	}
	   
    
	
	
}
   
let ball = new Ball(75,35, 17, 5, 5);


function start(){
	//document.location.reload();
	requestAnimationFrame(start);
	console.log(hurdlecollist,rows,backGroundImage,imageslist,"........................................................");

		
	c.clearRect(0, 0, innerWidth, innerHeight);
	var context = canvas.getContext("2d");
    var bw = 697;
    var bh = 433;
	//console.log(columns,"eeee");
    var p = columns;
	colvalue=697/p;
	colvalue=colvalue-0.3;
	rowvalue=433/rows;
	rowvalueForMovement=(rowvalue-5);// only for row movement
	colvalueForMovement=(colvalue-4);// only for col movement
	rowvalue=rowvalue.toFixed(0); // get only one value after point and return in string form
	rowvalue=Number(rowvalue);// convert string to int
	colvalue=colvalue.toFixed(0); // get only one value after point and return in string form
	colvalue=Number(colvalue);// convert string to int
	console.log(rowvalue);
     console.log(colvalue);
	// console.log(colvalueForMovement);
    var cw = bw + (p*2) + 2;
    var ch = bh + (p*2) + 2;
	
	// for 1st stage ....
	// Draw backgroung image
	
	  base_image = new Image();
	  base_image.src = backGroundImage;
	  context.globalAlpha = 0.5;
	  context.drawImage(base_image, 0, 0,712,445);
	  context.globalAlpha = 1.0;
	  context.globalAlpha = 0.5;
	// other images
	var imageRowNo,imageColNo;
	for (var x =0 ;x<imageslist.length;x+=1){
		
	    imageRowNo=imageRlist[x];
        imageColNo=imageClist[x];
		imageRowNo=imageRowNo+1;
		//console.log(imageColNo);
		//imageColNo=imageColNo + 1;
		//putimage=imageslist[x];
	//	console.log(putimage);
		base_image = new Image();
	  //  base_image.src = '/static/images/'+ putimage+'.jpg';
		base_image.src = '/static/images/c3.jpg';
	    context.globalAlpha = 0.5;
	    context.drawImage(base_image,(colvalue-75)+((imageColNo-1)*colvalue),(rowvalue-35)+((imageRowNo-1)*rowvalue),60,30);
	    context.globalAlpha = 1.0;
	    context.globalAlpha = 0.5;
		
		
		
	}
	// hurdle images
    var rowNo;
	var colNo;
    for (var x =0 ;x<hurdlecollist.length;x+=1){
	    rowNo=hurdlerowlist[x];
        colNo=hurdlecollist[x];	
		rowNo=rowNo+1;
       // colNo=colNo+1;		
		//console.log(rowNo,colNo,"valeeeeeeeeeee"); 
		base_image = new Image();
	    base_image.src = '/static/images/B.png';
	    context.globalAlpha = 0.5;
	    context.drawImage(base_image,(colvalue-75)+((colNo-1)*colvalue),(rowvalue-35)+((rowNo-1)*rowvalue),60,30);
		// XstopListForCheck[x]=(colvalue-75)+((colNo-1)*colvalue) ;
		// console.log(XstopListForCheck);
		// YstopListForCheck[x]=(rowvalue-35)+((rowNo-1)*rowvalue);
	    context.globalAlpha = 1.0;
	    context.globalAlpha = 0.5;
	   
    } 
   
	function drawBoard(){
	
 
        for (var x = 0; x < bw; x += colvalue) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x < bh; x += rowvalue) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }

        context.strokeStyle = "blue";
        context.stroke();
    }
	  
//	console.log("in start");
	  
	stage_count=1;
	
	// c.clearRect(0, 0, innerWidth, innerHeight);

	//wallsCheck();
   // goalCheck(stage_count);
   
     ball.draw();
    drawBoard();
	CheckonHurdles();
	CheckonRewards();
 
 

}
start();
 