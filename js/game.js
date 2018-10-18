var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
context.fillStyle='black';
context.font="30pt Arial";
context.textAlign='left';
/*context.fillText("Hello!",0,100);
context.arc(200,200,40,0,Math.PI*270/180);

context.lineWidth=5;
context.moveTo(200,200);
context.lineTo(200+40,200);
context.lineTo(200,200+40);
context.stroke(); */

//圆型时钟的底形
function Circle(){
	context.beginPath();
	context.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,Math.PI*2);
	context.strokeStyle='#66ccff';
	context.stroke();
}

//时钟摆臂
var hands=[
	{'weight':5,'kind':'hour','length':75,'color':'green'},
	{'weight':4,'kind':'minute','length':100,'color':'blue'},
	{'weight':2,'kind':'second','length':130,'color':'red'}
	];

//摆臂的实现
function Hands(){
	context.save();
	var date=new Date(),
	    x,
	    y,
	    angle;//rad
	hands.forEach(function (hand) {
		switch(hand.kind){
			case 'hour':
				angle=Math.PI*((date.getHours()-3+date.getMinutes()/60)/6);
				break;
			case 'second':
				angle=Math.PI*((date.getSeconds()-15)/30);
				break;
			case 'minute':
				angle=Math.PI*((date.getMinutes()-15+date.getSeconds()/60)/30);
				break;
		}
		x=canvas.width/2+hand.length*Math.cos(angle);
		y=canvas.height/2+hand.length*Math.sin(angle);
		context.beginPath();
		context.lineWidth=hand.weight;
		context.strokeStyle=hand.color;
		context.moveTo(canvas.width/2,canvas.height/2);
		context.lineTo(x,y);
		context.stroke();
	});
}

//钟表上的数字
function Nums(){
	var numbers=[1,2,3,4,5,6,7,8,9,10,11,12];
	var numwidth,numheight,x,y,
	    angle=0;//rad
	var dis=canvas.width/2-30;
	numbers.forEach(function (number) {
		numwidth=context.measureText(number).width;
		angle=(number-3)/6*Math.PI;
		x=canvas.width/2+dis*Math.cos(angle)-numwidth/2;
		y=canvas.height/2+dis*Math.sin(angle)+15;
		context.fillText(number,x,y);
	});
}

//中心圆点
function Center(){
	context.beginPath();
	context.arc(canvas.width/2,canvas.height/2,5,0,Math.PI*2);
	context.fill();
}

function IniClock(){
	context.clearRect(0,0,canvas.width,canvas.height);
	Circle();
	Center();
	Nums();
	Hands();
	
}

IniClock();
setInterval(IniClock,1000);