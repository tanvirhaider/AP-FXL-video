

function createClass(name,rules)
{
    var style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule)  {(style.styleSheet || style.sheet).addRule(name, rules);}
    else {style.sheet.insertRule(name+"{"+rules+"}",0);}
}


function Stage(data) // (Number, Number, css.style.background)
{
	//"use strict";
	var stage = document.createElement('div');
	if (data.id) { stage.setAttribute('id', data.id);}
	else {stage.setAttribute('id', "stage");}

    if (data.width) {
    	stage.width = data.width;
    	stage.style.width = data.width + 'px';
    }
    // else {
    //   stage.width = "100%";
    // 	stage.style.width = "100%";
    // }

    if (data.height) {
    	stage.height = data.height;
    	stage.style.height = data.height + 'px';
    }
    // else {
    //   stage.height = "100%";
    // 	stage.style.height = "100%";
    // }

    if (data.position) {stage.style.position = data.position;}
   // else {stage.style.position = 'static';}

    if (data.class) {
        stage.className += data.class;
    }

    stage.style.margin = '0px';
    stage.style.padding = '0px';
    stage.style.clip = 'rect(0px,'+ (data.width+2)+'px,'+ (data.height+2)+'px, 0px )';
    stage.style.overflow = 'hidden';
    stage.style.scrolling = 'no';

    if (data.backgroundColor)
    {
    	stage.style.background = data.backgroundColor;
      	stage.style.backgroundSize = data.width + 'px ' + data.height + 'px';
      	stage.style.backgroundRepeat = 'no-repeat';
    }

    if (data.border)
    {
    	if (!data.id) { data.id = "stage" ;}

    	var borderObj = document.createElement('div');
        borderObj.setAttribute('id', data.id + "-Border");
        borderObj.style.width = "100%";
        borderObj.style.height = data.height + 'px';
        borderObj.style.position = 'absolute';
        borderObj.style.margin = '0px';
        borderObj.style.zIndex = 999999;
        borderObj.style.border = data.border.thickness+ "px solid "+data.border.color+"";
        borderObj.style.boxSizing="border-box";
        borderObj.style.pointerEvents = "none";
        stage.appendChild(borderObj);
    }

    // Public
    stage.addChild = function(child)
    {
        stage.appendChild(child);
        childIndex++;
        child.style.zIndex = childIndex;
    };

    if (data.container) { data.container.appendChild(stage);}
    else {document.body.appendChild(stage);}

    return stage;
}


function Sprite(data)
{
    var obj = document.createElement('div');
    this.obj = obj;
    if (data.id) { obj.setAttribute('id', data.id); }
    else { obj.setAttribute('id',''); }
    
    if (data.class) {
        obj.className += data.class;
    }

    if (data.position) {obj.style.position = data.position;}
   // else {obj.style.position = "static";}

    if (data.display) {
        obj.style.display = data.display;
    }

    if (data.width) {
        obj.width = data.width;
        obj.style.width = data.width + 'px';
    }
    else {this.width = 0;}

    if (data.height) {
        obj.height = data.height;
        obj.style.height = data.height + 'px';
    }
    else {this.height = 0;}

    if (data.image)
    {
        var imgW = data.width +'px';
        var imgH = data.height +'px';

        var style = obj.style;
        style.width = imgW;
        style.height = imgH;
        style.backgroundImage = 'url(' +data.image+ ')';
        style.backgroundRepeat = 'no-repeat';
        if (!data.cover){style.backgroundSize = imgW +' '+ imgH;}
        
    }
    
    if (data.button) {
        var btn = document.createElement("button");
        if (data.button.text) {
            btn.innerHTML = data.button.text;
        }
        obj.appendChild(btn);
    }

  // text: {content:"Read More",color:"white",size:"14px",width:"200px",lineHeight:"100px",fontFamily:"Arial"}

  if (data.text)
    {
       // var CPY = document.createTextNode(data.text.content);
        var CPY = document.createElement('div');

        if (data.text.id) { CPY.setAttribute('id', data.id + "_" + data.text.id); }
        else { CPY.setAttribute('id',''); }


        CPY.innerHTML = data.text.content;

      // CPY.value = data.text.content;

       if (data.text.class) {CPY.className += data.text.class;}

        obj.style.color = data.text.color;
        obj.style.fontSize = data.text.size;
        obj.style.fontFamily = data.text.fontFamily;
        if (data.text.maxWidth) {obj.style.maxWidth = data.text.width;}
        if (data.text.lineHeight) { obj.style.lineHeight = data.text.lineHeight;}
        if (data.text.fontWeight) { obj.style.fontWeight = data.text.fontWeight;}
        obj.appendChild(CPY);
    }
    if (data.color)
    {
        var imgW = data.width +'px';
        var imgH = data.height +'px';

        var style = obj.style;
        style.width = imgW;
        style.height = imgH;
        style.backgroundColor = data.color;
    }

    // gradient: {width:1024, height: 650, direction: "right", color1: "rgba(255,255,0,0)", color2: "rgba(255,10,0,1)" }

    if (data.gradient)
    {
        var style =     this.obj.style;
        style.width =   data.gradient.width + "px";
        style.height =  data.gradient.height + "px";
        style.background = '-webkit-linear-gradient('   + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 +')'; 
        style.background = '-o-linear-gradient('        + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 +')'; 
        style.background = '-moz-linear-gradient('      + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 +')'; 
        style.background = 'linear-gradient('           + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 +')'; 
    }

    if (data.container){data.container.appendChild(obj);}

    if (data.border)
    {
        var borderObj = document.createElement('div');
        borderObj.setAttribute('id', data.id + "-Border");
        borderObj.style.width = data.width + 'px';
        borderObj.style.height = data.height + 'px';
        borderObj.style.position = 'absolute';
        borderObj.style.margin = '0px';
        borderObj.style.zIndex = 999999;
        borderObj.style.border = data.border.thickness+ "px solid "+data.border.color+"";
        borderObj.style.boxSizing="border-box";
        borderObj.style.pointerEvents = "none";
        if (data.border.radius){borderObj.style.borderRadius = data.border.radius;}
        obj.appendChild(borderObj);
    }


    if (data.click)
    {
        var obj = this.obj;
        obj.addEventListener('click', data.click.function,false);
        obj.style.cursor="pointer";
    }

    if (data.over)
    {
        var obj = this.obj;
        obj.addEventListener('mouseover', data.over.function,false);
        obj.style.cursor="pointer";
    }

    if (data.out)
    {
        var obj = this.obj;
        obj.addEventListener('mouseout', data.out.function,false);
        obj.style.cursor="pointer";
    }

    if (data.mousemove)
    {
        var obj = this.obj;
        obj.addEventListener('mousemove', data.mousemove.function,false);
       // obj.style.cursor="pointer";
    }



    var xval = 0;
    var yval = 0;
    var rotationval = 0;

    if (data.x) { xval = data.x;}
    if (data.y) { yval = data.y;}
    if (data.z) {
        var style = obj.style;
        style.zIndex = data.z;
    }

    obj.style.transform = "translate("+ xval + "px," + yval + "px)";

    if (data.mask)
    {
        obj.style.clip = 'rect('+data.mask.y+'px,' +
        (data.mask.x + data.mask.width)+'px,' + 
        (data.mask.y + data.mask.height)+'px,' + 
        data.mask.x+'px)';
    }
}



