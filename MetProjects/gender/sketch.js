var table;

var yrFemTotals = [];
var barTotals =[];
var yrMaleTotals = [];
var barTotals2 =[];


var FemaleTotal = [];
var TotalFemale = [];
var TotalMale = [];
var TotalTwo = [];
var TotalUnknown = [];
var TotalToFindOut = [];

var gender = [];
var artist = [];
var ArtistColl = [];

var allYears = [];

var minYear, maxYear, mxYear, midYears, minObjects, maxObjects, maxArtist, maxArtistColl;

var overBars;

var KhandFont, fontReady = false;

var margin = 80;

///////wrapped bars
var s = function(p){

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth,870);
    p.drawLabelsTot();

    p.background(100,05);
      
    p.push();
    p.scale(0.83); 
    p.translate(230,60);

    p.push();
    p.stroke(92,242,145,160);
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape(); 
    p.vertex(20,172);   // total m/2 = 10829/2 = 5414.5
    p.vertex(900,172);   //  880
    p.vertex(900, 442);   //  270
    p.vertex(400, 442);   //500
    p.vertex(400, 512);   //70
    p.vertex(1100, 512);   //700
    p.vertex(1100, 632);   //120
    p.vertex(220, 632);   //880
    p.vertex(220, 698);    //66
    p.vertex(1200, 698);   //980
    p.vertex(1200, 790);   //92
    p.vertex(343.5, 790);   //856.5

    // p.vertex(110, 790);  //50
    // p.vertex(1400, 790);  //
    // // p.vertex(980, 852);
    // p.vertex(869.5, 782);  //380.5    ///5414.5
    p.endShape();  
    p.pop();

    p.push();
    p.stroke(179,118,244,160);
    // stroke(153,50,204,80); //total f/2 = 2027/2 = 1013.5
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 208);   //  
    p.vertex(864,  208);   //844
    p.vertex(864,  377.5);   //169.5  //1013.5
    p.endShape();
    p.pop();

    p.push();
    p.stroke(168,71,5,160); //total t couple/collab 128/2 = 64
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 244);   //  
    p.vertex(84, 244);   //64 = 64
    p.endShape();
    p.pop();

    p.push();
    p.stroke(165,160,152,160);  //total u unknown 1318/2 = 659
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20,280);   //  
    p.vertex(679,280);   // 659
    p.endShape();
    p.pop();

    p.push();
    p.stroke(224,199,50,160);  //total z to find out 48/2 = 24
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(20, 316);   //  
    p.vertex(46, 316);   // 26
    p.endShape();
    p.pop();
  p.pop();
}


  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

  p.drawLabelsTot = function(){

    p.push();
    // p.translate(-80,0); 
  //label wrapped total bars
    p.textFont('Khand');
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.textSize(18);
    p.fill(77,77,77);
    p.textSize(40);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT);
    p.text("What % of The Met's 14,350 artworks are by women?", 130,95);
    p.textSize(26);
    p.text("Looking at the Modern & Contemporary Art Collection, 1 pixel = 2 artworks", 130,140);
    // p.textSize(22);
    // p.text("1 pixel: 2 artworks", 620,140);

    p.push();
    p.translate(0,80)
    // p.textAlign(p.LEFT);
    // p.textSize(18);
    // p.text("1 pixel: 2 artworks", 700,140);
    // p.textAlign(p.LEFT);
    // p.textSize(28);
    p.textAlign(p.RIGHT);
    p.textSize(26);
    // p.text("14.13%", 190,120);
    p.text("75.44%", 190,120);
    p.text("14.13%", 190,150);
    p.text("0.89%", 190,180);
    p.text("9.18%", 190,210);
    p.text("0.36%", 190,240);

//// Add legend

    p.textFont('Khand');
    // p.fill(92,242,145,140); //m
    // p.rect(205,100,25,25);
    // p.fill(179,118,244,140);  //f
    // p.rect(205,130,25,25);
    // p.fill(168,71,5,140);  //t
    // p.rect(205,160,25,25);
    // p.fill(165,160,152,140);   //u
    // p.rect(205,190,25,25);
    // p.fill(224,199,50,140);   //z
    // p.rect(205,220,25,25);
    p.textStyle();
    p.textAlign(p.LEFT);
    p.fill (77,77,77);
    p.textStyle(p.NORMAL);
    p.textSize(20);
    //////need to add 
    // p.text("male", 257,117);
    // p.text("female", 257,147);
    // p.text("couple / collaborative with both genders",257,177);
    // p.text("unknown",257,207);
    // p.text("named, gender not yet identified",257,237);
    p.pop();
    p.pop();
}
}

var myp5 = new p5(s, 'c1');

/////works oldwrapped bars WRKING ON THIS ONE
///NUMBERS ON BAR ARE CORRECT
var s = function(p){

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth,870);
    p.drawLabelsTot();

    p.background(100,05);
      
    p.push();
    p.scale(0.83); 
    p.translate(230,60);

    p.push();
    p.stroke(92,242,145,160);
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape(); 
    p.vertex(410, 340);   // total m/2 = 10829/2 = 5414.5
    p.vertex(780, 340);   //  370
    p.vertex(780, 730);   //  390
    p.vertex(940,730);   // 160
    p.vertex(940, 22);   //708
    p.vertex(1280, 22);   //340
    p.vertex(1280, 820);   //798
    p.vertex(1220, 820);   //60
    p.vertex(1220, 60);   //760
    p.vertex(1130, 60);    //90
    p.vertex(1130, 820);   //760    //4436
    p.vertex(151.5, 820);  //978.5     ///5414.5
    p.endShape();  
    p.pop();

    p.push();
    p.stroke(179,118,244,160);
    // stroke(153,50,204,80); //total f/2 = 2027/2 = 1013.5
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(410, 360);   //  
    p.vertex(760,  360);   //350
    p.vertex(760,  750);   //390
    p.vertex(960, 750);  //200   
    p.vertex(960, 676.5);   //1013.5
    p.endShape();
    p.pop();

    p.push();
    p.stroke(168,71,5,160); //total t couple/collab 128/2 = 64
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(410, 320);   //  
    p.vertex(474,  320);   //64 = 64
    p.endShape();
    p.pop();

    p.push();
    p.stroke(165,160,152,160);  //total u unknown 1318/2 = 659
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(410, 300);   //  
    p.vertex(800,  300);   // 390
    p.vertex(800,  569);    //659
    p.endShape();
    p.pop();

    p.push();
    p.stroke(224,199,50,160);  //total z to find out 48/2 = 24
    p.strokeWeight(20);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(410, 280);   //  
    p.vertex(434, 280);   // 24
    p.endShape();
    p.pop();
  p.pop();
}


  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

  p.drawLabelsTot = function(){

    p.push();
    p.translate(-80,0); 
  //label wrapped total bars
    p.textFont('Khand');
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.textSize(18);
    p.fill(77,77,77);
    p.textSize(40);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT);
    p.text("What % of The Met's 14,350 artworks are by women?", 130,95);
    p.textSize(26);
    p.text("Looking at the Modern & Contemporary Art Collection, 1 pixel = 2 artworks", 130,140);
    // p.textAlign(p.LEFT);
    // p.textSize(18);
    // p.text("1 pixel: 2 artworks", 130,170);
    p.push();
    // p.translate(0,80)
    // p.textAlign(p.LEFT);
    // p.textSize(18);
    // p.text("1 pixel: 2 artworks, scaled to 0.83", 130,170);
    // p.textAlign(p.LEFT);
    // p.textSize(28);
    p.textAlign(p.RIGHT);
    p.textSize(18);
    // p.text("14.13%", 190,120);
    // p.text("75.44%", 600,120);
    p.text("14.13%", 600,356);
    p.text("75.44%", 600,339);
    p.text("0.89%", 600,322);
    p.text("9.18%", 600,305);
    p.text("0.36%", 600,288);

//// Add legend

    p.textFont('Khand');
    // p.fill(92,242,145,140); //m
    // p.rect(205,100,25,25);
    // p.fill(179,118,244,140);  //f
    // p.rect(205,130,25,25);
    // p.fill(168,71,5,140);  //t
    // p.rect(205,160,25,25);
    // p.fill(165,160,152,140);   //u
    // p.rect(205,190,25,25);
    // p.fill(224,199,50,140);   //z
    // p.rect(205,220,25,25);
    p.textStyle();
    p.textAlign(p.RIGHT);
    p.fill (77,77,77);
    p.textStyle(p.NORMAL);
    p.textSize(17.5);
    // p.text("female", 237,117);
    // p.text("male", 237,117);
    p.text("female", 550,356);
    p.text("male", 550,339);
    p.text("couple / collaborative with both genders",550,322);
    p.text("unknown",550,305);
    p.text("named, gender not yet identified",550,288);
    p.pop();
    p.pop();
}
}

var myp5 = new p5(s, 'c1');
// //////////\\\\\\\\\\\\\\

/////works oldwrapped bars
var s = function(p){

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth,870);
    p.drawLabelsTot();

    p.background(100,05);
      
    p.push();
    p.scale(0.83); 
    p.translate(230,60);

    p.push();
    p.stroke(92,242,145,160);
    p.strokeWeight(8);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape(); 
    p.vertex(830, 20);   // total m/2 = 10825/2 = 5412.5
    p.vertex(830, 760);   //  740
    p.vertex(940, 760);   //  110
    p.vertex(940, 22);   //740
    p.vertex(1280, 22);   //340
    p.vertex(1280, 840);   //820
    p.vertex(1250, 840);   //30
    p.vertex(1250, 40);   //800
    p.vertex(1110, 40);    //140
    p.vertex(1110, 840);   //800
    p.vertex(217.5, 840);  //892.5     ///5412.5
    p.endShape();  
    p.pop();

    p.push();
    p.stroke(179,118,244,160);
    // stroke(153,50,204,80); //total f/2 = 2027/2 = 1013.5
    p.strokeWeight(8);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(838, 20);   //  
    p.vertex(838,  754);   //734
    p.vertex(932,  754);   //94
    p.vertex(932, 568.5);  //185.5      //1013.5
    p.endShape();
    p.pop();

    p.push();
    p.stroke(168,71,5,160); //total t couple/collab 128/2 = 64
    p.strokeWeight(8);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(845, 20);   //  
    p.vertex(845,  84);   //64 = 64
    p.endShape();
    p.pop();

    p.push();
    p.stroke(165,160,152,160);  //total u unknown 1318/2 = 659
    p.strokeWeight(8);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(852, 20);   //  
    p.vertex(852,  679);   // 659
    p.endShape();
    p.pop();

    p.push();
    p.stroke(224,199,50,160);  //total a to find out 52/2 = 26
    p.strokeWeight(8);
    p.strokeCap(p.SQUARE);
    p.noFill();
    p.beginShape();
    p.vertex(858, 20);   //  
    p.vertex(858,  46);   // 26
    p.endShape();
    p.pop();
  p.pop();
}


  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
}

  p.drawLabelsTot = function(){

    p.push();
    p.translate(-80,0); 
  //label wrapped total bars
    p.textFont('Khand');
    p.textAlign(p.RIGHT);
    p.noStroke();
    p.textSize(18);
    p.fill(77,77,77);
    p.textSize(40);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT);
    p.text("What % of The Met's 14,350 artworks are by women?", 130,95);
    p.textSize(26);
    p.text("Looking at the Modern & Contemporary Art Collection", 130,140);
    p.push();
    p.translate(0,80)
    p.textAlign(p.LEFT);
    p.textSize(18);
    p.text("1 pixel: 2 artworks, scaled to 0.83", 237,285);
    p.textAlign(p.LEFT);
    p.textSize(28);
    p.textAlign(p.RIGHT);
    p.textSize(26);
    // p.text("14.13%", 190,120);
    p.text("75.44%", 190,120);
    p.text("14.13%", 190,150);
    p.text("0.89%", 190,180);
    p.text("9.18%", 190,210);
    p.text("0.36%", 190,240);

//// Add legend

    p.textFont('Khand');
    p.fill(92,242,145,140); //m
    p.rect(205,100,25,25);
    p.fill(179,118,244,140);  //f
    p.rect(205,130,25,25);
    p.fill(168,71,5,140);  //t
    p.rect(205,160,25,25);
    p.fill(165,160,152,140);   //u
    p.rect(205,190,25,25);
    p.fill(224,199,50,140);   //z
    p.rect(205,220,25,25);
    p.textStyle();
    p.textAlign(p.LEFT);
    p.fill (77,77,77);
    p.textStyle(p.NORMAL);
    p.textSize(20);
    // p.text("female", 237,117);
    p.text("male", 237,117);
    p.text("female", 237,147);
    p.text("couple / collaborative with both genders",237,177);
    p.text("unknown",237,207);
    p.text("named, gender not yet identified",237,237);
    p.pop();
    p.pop();
}
}

var myp5 = new p5(s, 'c1');
// //////////\\\\\\\\\\\\\\

// ////VERTICAL BARS TOTALS 

var t = function(p) {

  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

  p.setup = function(){
    p.createCanvas(p.windowWidth, 5665);
    p.displaySingleBars();
    p.drawLabelsBar();
    p.drawmeasureline();
  }

  p.windowResized = function() {
   p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.displaySingleBars = function(){
    p.noStroke();
    p.fill(255,0,0);

    var x,y,w,h;

    var singleData = [48, 1318, 128, 2027, 10829];
//var fillBars = [(fill("#ededed"),("#5c5c5c"),("#e5e5o5"),("#f0f0f0"),("#000"))];

    var width = 5800,
        height = p.windowHeight,
        margin = 40,
        // margin = 15,
        w = width - 2 * margin, // chart area width and height
        h = height - 2 * margin;
    
    var barWidth =  (h / singleData.length) * 0.15; // width of bar
    var barMargin = (h / singleData.length) * 0.2; // margin between two bars
    
    p.textFont('Khand');
    p.textSize(15);
  
  for(var b=0; b<singleData.length; b++) {


var genFill = singleData[b];
    if (genFill == '10829') {
       p.fill(92,242,145,120);
       
    } else if (genFill == '2027') {
       p.fill(179,118,244,120);
       
    } else if (genFill == '128') {
       p.fill(168,71,5,120);
      
    } else if (genFill == '1318') {
       p.fill(165,160,152,120);

    } else if (genFill == '48') {
       p.fill(224,199,50,120);

    } else {
       p.fill(100,100);
 
    }

    p.push();  //save 
    
      p.noStroke();
      p.textSize(20);
      p.rotate(p.radians(90));   // rotate to vertical
      p.translate(0, b* (barWidth + barMargin)); // jump to the top right corner of the bar 
      p.rect(100, -p.windowWidth/1.5, singleData[b]/2, barWidth/2);
      p.fill(0,0,0);
      p.text(singleData[b], 100, barWidth/2 + -p.windowWidth/1.53); // write data label
    p.pop();   // reset, restore
  } 
}


  p.drawLabelsBar = function(){
 //label long bars

    p.push();
    p.translate(300,0);
    p.rotate(p.radians(90)); 
    p.textFont('Khand');
    p.textAlign(p.LEFT);
    p.textStyle(p.NORMAL);
    p.noStroke();
    p.fill(77,77,77);
    p.textSize(32);
    p.textSize(26);
    p.text("The Met Modern & Contemporary Art Collection", 100,margin-140);
    p.textSize(20);
    p.text("Scale: 1 pixel = 2 artworks", 100,margin-115);

    p.pop();

    p.textFont('Khand');
    p.textAlign(p.LEFT);
    p.noStroke();
    p.fill(77,77,77);
    p.textSize(45);
    p.textStyle(p.NORMAL);
    p.text("Another View of All Artworks by Gender", 335,35);
  }

p.drawmeasureline = function(){
    p.push();
    
    var x,y,w,h;

  var singleData = [48, 1318, 128, 2027, 10829];
   
   //x axis
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.textSize(20);
  p.fill(77,77,77); 
  p.stroke(77,77,77);
  p.strokeWeight(1)
 // //just the lines
  p.line(575,48/2+100,692,48/2+100);
  p.line(575,128/2+100,692,128/2+100);
  p.line(575,1318/2+100,692,1318/2+100);
  p.line(575,2027/2+100,692,2027/2+100);
  p.line(574,10829/2+100,692,10829/2+100);  

 //  // p.line(margin,height-margin,width-margin,height-margin);
 //text
  p.noStroke();
  p.text("unidentified: 48", 576,48/2+95);
  p.text("couple: 128", 575,128/2+95);
  p.text("unknown: 1318", 574,1318/2+95);
  p.text("female: 2027", 574,2027/2+95);
  p.text("male: 10829", 573,10829/2+95);
  p.noStroke();
  p.textSize(20);
  p.textAlign(p.CENTER);
  p.translate(1265,100);
  p.rotate(p.radians(90));
  p.textStyle(p.NORMAL);
  p.text("Number of Artworks", 69, -55);
  // draw the sections and add text for each section
   //go throught the years
   for(var b=0; b<=10829; b+=200){

   // var y = 747-margin+30;
    var y = 0;

    var x = p.map(b,0,10829, 0, 10829/2);

    // x = map(i,0, allYears.length,margin, width-margin);
    // p.rotate(p.radians(90));   // rotate to vertical
    // p.translate(200, 20);
      p.noStroke();
      p.fill(77,77,77);
      p.stroke(77,77,77);
      p.strokeWeight(1);
      p.line(x,y-22,x, y-40);
      p.noStroke();
      p.fill(77,77,77);
      p.text(b, x,y);

     }
p.pop();

   }
}

var myp5 = new p5(t, 'c2');
///////////\\\\\\\\\\\

////////chart by year

var w = function(p) {


  p.fontRead = function(){
      fontReady = true; 
    }

  p.preload = function(){
  //mytable is comma separated value "csv"
  //and has a header specifying the columns labels
   p.table = p.loadTable('assets/ModContGenderfinalazsort.csv','csv','header');

   KhandFont = p.loadFont('libraries/Khand-Regular.ttf', p.fontRead);
  }

   p.setup = function(){
     p.createCanvas(p.windowWidth,850);
     p.background(100,10);
     p.analyzeData();
     p.analyzeGender();
     p.displayData();
     p.drawLabelsCh();

  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.analyzeData = function(){
  	var count = p.table.getRowCount();
    var countC = p.table.getColumnCount();
  	console.log(count + " rows");
    console.log(countC + " columns");

// ///THIS shows row with FIRST female artist gender column 10
  var female = p.table.findRow('f', 10);
  console.log(female);
//============

// =======THIS console logs all rows with a FEMALE artist
    var female = p.table.findRows('f', 10);
    console.log(female);

//=======THIS console logs all rows with a MALE artist
    var male = p.table.findRows('m', 10);
    console.log(male);

//=======THIS console logs all rows where BOTH male and female named as artists 
    var couple = p.table.findRows('t', 10);
    console.log(couple);

//=======THIS console logs all rows where the artist is UNKNOWN
    var unknown = p.table.findRows('u', 10);
    console.log(unknown);

//=======THIS console logs all rows where there is an artist but I haven't found their gender
    var todo = p.table.findRows('z', 10);
    console.log(todo);

// // //===================================

// ///=======gives the YEARS w/ the MAX & MIN NUMBER OF OBJECTS 
////object begin date column 17
  var yearNow = {};
    yearNow.year = (p.int(p.table.getString(0,17)));

    yearNow.items = p.table.findRows(String(yearNow.year),17);
    p.append(allYears, yearNow);

    minObjects = 150000;
    maxObjects = 0;
    minYear = null;
    maxYear = null;


for (var i=0; i<count; i++) {
      var year = p.int(p.table.getString(i,17));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items =[];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          maxYear = allYears.length-1;
        }

        if(yearNow.items.length<minObjects){
          minObjects = yearNow.items.length;
          // minYear = allYears.length-1;
           minYear = allYears.length;
        }
     }
  }
 // console.log("The Year " + allYears[maxYear].year + " has the most objects with " + allYears[maxYear].items.length + " items.");
 // console.log("The Year " + allYears[minYear].year + " has the least objects with " + allYears[minYear].items.length + " item.");
}

  mxYear = null;

for (var s=0; s<=p.count; s++) {
      var year = p.int(p.table.getString(s,17));
      if(year!=yearNow.year){
        var yearNow = {};
        yearNow.year = year;
        yearNow.items =[];
        yearNow.items = p.table.findRows(String(yearNow.year),17);
        p.append(allYears, yearNow);
        
        if(yearNow.items.length>maxObjects){
          maxObjects = yearNow.items.length;
          mxYear = midYears.length-1;
        }

     }
console.log("Number of artworks since 1850 is " + midYears.length + " the year with the most artworks 1850 -2017 is " + mxYear);

  }
////====================

// /======TOTAL NUMBER of FEMALE, MALE, TWO, UNKNOWN artists
//shown on bar chart  

p.analyzeGender = function(){
  var cnt = p.table.getRowCount();
  var gender = {};

  var MaleArtists = 0;
  var FemaleArtists = 0;
  var TwoArtists = 0;
  var UnknownArtists = 0;
  var ToFindOutArtists = 0;
  var Other = 0;

  gender.gen = (String(p.table.getString(0,10)));

  for(var g=0; g<cnt; g++){
    var gender = p.table.getString(g,10);

  gender.items = p.table.findRows(String(gender.gen),10);
  if (gender === 'm') {
      MaleArtists = MaleArtists + 1;

    } else if (gender === 'f') {
     FemaleArtists = FemaleArtists + 1;

     } else if (gender === 't') {
     TwoArtists = TwoArtists + 1;

    } else if (gender === 'u') {
     UnknownArtists = UnknownArtists + 1;

   } else if (gender === 'z') {
    // console.log('z');
     ToFindOutArtists = ToFindOutArtists + 1;

   } else {
     Other = Other + 1;
     }

  }

    TotalFemale.push({femaleTotal: FemaleArtists});
    console.log(TotalFemale);

    TotalMale.push({maleTotal: MaleArtists});
    console.log(TotalMale);

    TotalTwo.push({twoTotal: TwoArtists});
    console.log(TotalTwo);

    TotalUnknown.push({unknownTotal: UnknownArtists});
    console.log(TotalUnknown);

    TotalToFindOut.push({tofindoutTotal: ToFindOutArtists});
    console.log(TotalToFindOut);
       
}
///========

///DISPLAY PER YEAR by GENDER
  p.displayData = function(){
  /////move chart over

  p.push();
  p.translate(50,0);

	p.noStroke();
	p.fill(255,0,0);

  for(var i=0; i<allYears.length; i++){
//// years use map incoming value and range
    // console.log('thisisallYrs' + allYears[allYears.length-1].year);
////map function 
    // var x = map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, width-margin);
    var x = p.map(allYears[i].year,1850,allYears[allYears.length-1].year, margin, 1341-margin);

    var totalFemaleArtistsPerBar = 0;
    var totalMaleArtistsPerBar = 0;

////THIS logs where it is mapping that is relatively corresponding to:
   // console.log("mapping: " + allYears[i].year + "to: " + x);

    // var x = map(i,0,allYears.length, margin, width-margin);

  ///then do same for y height
  for(var j=0; j<allYears[i].items.length; j++){
      // var y= map(j,0,maxObjects,height-margin, margin);
      var y= p.map(j,0,maxObjects,747-margin, margin);

//table.findRows(String(yearNow.year),17)

///====FILL BY GENDER
   var gender = allYears[i].items[j].obj.Gender;
    if (gender === 'm') {
       // gender = 'm';
       p.fill(92,242,145,90);
       p.rect(x-1,y-1,3,2);
       // console.log('m');
       totalMaleArtistsPerBar = totalMaleArtistsPerBar + 1;

    } else if (gender === 'f') {
      // gender = 'f';
       p.fill(179,118,244,90);
       p.rect(x-1,y-1,3,2);
       // console.log('f');
      totalFemaleArtistsPerBar = totalFemaleArtistsPerBar + 1;
     // console.log(totalFemaleArtistsPerBar);
    } else if (gender === 't') {
      // gender = 't';
       p.fill(168,71,5,80);
       p.rect(x-1,y-1,3,2);

      // console.log('t');
      
    } else if (gender === 'u') {
      // gender = 'u';
       p.fill(165,160,152,80);
       p.rect(x-1,y-1,3,2);
       // console.log('u');

    } else if (gender === 'z') {
      // gender = 'z';
       p.fill(224,199,50,90);
       p.rect(x-1,y-1,3,2);
       //console.log('z');

    } else {
       p.fill(100,100);
       p.rect(x-1,y-1,3,2);
      // console.log('u');
    }

  }

//THIS gets number of FEMALE artworks per BAR with total bar height
  barTotals.push({barTotal: allYears[i].items, femaleTotal: totalFemaleArtistsPerBar});
//THIS gets number of FEMALE artworks 
  yrFemTotals.push({year: allYears[i].year, total: totalFemaleArtistsPerBar});

//THIS gets number of MALE artworks per BAR with total bar height
  barTotals2.push({barTotal: allYears[i].items, maleTotal: totalMaleArtistsPerBar});
//THIS gets number of MALE artworks 
  yrMaleTotals.push({year: allYears[i].year, total: totalMaleArtistsPerBar});
  }
  console.log(yrFemTotals);
  console.log(yrMaleTotals);
  p.pop();
}


  p.drawLabelsCh = function(){
    p.push();
    p.translate(50,0);

   //x axis
    p.textFont('Khand');
    p.textSize(17);
    p.stroke(77,77,77);

   //just the lines
   // line(margin,height-margin,width-margin,height-margin);
    p.line(margin,747-margin,1341-margin,747-margin);
    p.noStroke();
    p.textAlign(p.CENTER);

  // draw the sections and add text for each section
   //go throught the years
for(var i=1850; i<=2017; i+=10){
   // var y = height-margin+30;
   var y = 747-margin+30;
   // x = map(i,1850,2017, margin, width-margin);
   var x = p.map(i,1850,2017, margin, 1341-margin);

   // x = map(i,0, allYears.length,margin, width-margin);
    p.noStroke();
    p.fill(77,77,77);
    p.text(i, x, y);
    p.stroke(77,77,77);
    p.strokeWeight(1);
    p.line(x,y-22,x, y-30);
  }

// label the whole axis
  p.textFont('Khand');
  p.textAlign(p.RIGHT);
  p.noStroke();
  p.textSize(20);
  p.text("Year: Object Begin Date", 990,730);
// p.text("Year: Object Begin Date", width-margin,height-margin+70);

//source
  p.textAlign(p.LEFT);
  p.noStroke();
  p.textSize(18);
  p.text("Source: MetObjects.csv, January 2018, spreadsheet shared with The New School.", margin-15,747-margin+105);
  p.text("Modern & Contemporary Art Collection Department, 14,350 artworks. Object Begin Date, Gender identified by Artist Display Name, 1850-2017 (14,284 artworks.)", margin-15,747-margin+135);

////draw the y Axis
  p.stroke(77,77,77);
  // line(margin,height-margin ,margin,margin);
  p.line(margin,747-margin,margin,margin);
  p.noStroke();
  p.textAlign(p.RIGHT);
  p.textStyle(p.NORMAL);

  for(var i=0; i<maxObjects; i+=50){
    var x = margin-20;
    // y = map(i,0, maxObjects,height-margin, margin);
    var y = p.map(i,0, maxObjects,747-margin, margin);
      p.noStroke();
      p.fill(77,77,77);
      p.text(i, x, y+5);
      p.stroke(77,77,77);
      p.strokeWeight(1);
      p.line(x+10,y,x+20,y);
  }

  p.push();
  p.translate(65,0);
  p.textFont('Khand');
  p.noStroke();
  p.textSize(20);
  p.translate(1000,700);
  p.rotate(p.radians(270)); 
  p.text("Number of Artworks", margin+300,margin-1135);
  p.pop();

////the overall title
  p.push();
  p.translate(65,0);
  p.textFont('Khand');
  p.textStyle(p.NORMAL);
  p.noStroke();
  p.textAlign(p.LEFT);
  p.fill(77,77,77);
  p.textSize(42);
  p.text("What year were these artworks made?",500,75);
  p.fill(77,77,77);
  p.textSize(26);
  p.text("The Met Modern & Contemporary Art Collection", 500,120);
  p.textSize(38);
  p.pop();

////legend
    p.textFont('Khand');
    p.noStroke();
    p.fill(179,118,244,140);  //f
    p.rect(100,100,25,25);
    p.fill(92,242,145,140); //m
    p.rect(100,130,25,25);
    p.fill(168,71,5,140);  //t
    p.rect(100,160,25,25);
    p.fill(165,160,152,140);   //u
    p.rect(100,190,25,25);
    p.fill(224,199,50,140);   //a //z
    p.rect(100,220,25,25);
    p.textStyle();
    p.textAlign(p.LEFT);
    p.textSize(20);
    p.fill (77,77,77);
    p.text("Artwork", 132,90);
    p.textStyle(p.NORMAL);
    p.textSize(18);
    p.text("female", 132,117);
    p.text("male", 132,147);
    p.text("couple / collaborative with both genders",132,177);
    p.text("unknown",132,207);
    p.text("named, gender not yet identified",132,237);

    p.pop();
  }
  
}

var myp5 = new p5(w, 'c3');

////////////////\\\\\\\\\\\\\\\\


////////\\\\\\\\\\\==========================

/////========================================
// // ////Horizontal BAR CHART for totals 
// function displaySingleBar(){
//   noStroke();
//   fill(255,0,0);

// var x,y,w,h;

// var singleData = [2021, 10817, 128, 1314, 41];

// // x = 0;
// // y = (height*(j/gender[i]));
// // w = width/max(gender)*gender[i];
// // h = (height/gender.length)-5;

// // push();                    // <- push a drawing context
// //     translate(x,y);            // <- move to position
// //     rect(0,0,w,h);             // <- draw a rectangle
// //     fill(255);                 // <- change colors
// //     // text(gender[i],10,h/2);      // <- draw the label 
// //     pop();                     // <- reset the drawing context

//   var width = 1000, // canvas width and height
//       height = 350,
//       margin = 20,
//       w = width - 2 * margin, // chart area width and height
//       h = height - 2 * margin;
  
//   var barWidth =  (h / singleData.length) * 0.8; // width of bar
//   var barMargin = (h / singleData.length) * 0.2; // margin between two bars
  
//   createCanvas(width, height);
  
//   textSize(14);
  
//   push();
//   translate(margin, margin); // ignore margin area
  
//   for(var b=0; b<singleData.length; b++) {
//     push();
//     fill('green');
//     noStroke();
//     translate(0, b* (barWidth + barMargin)); // jump to the top right corner of the bar
//     rect(0, 0, singleData[b], barWidth); // draw rect

//     fill('#FFF');
//     text(singleData[b], 5, barWidth/2 + 5); // write data

//     pop();
//   }
  
//   pop();
// }

/////==============================

// ///=========max number of items by one artist 
/// using display name column 10 
  
//   var rows = table.getRowCount();

//   var displayName = {};
//   displayName.artist = table.getString(0,9);
//   displayName.items = table.findRows(String(displayName.artist),9);
//  append(ArtistColl, displayName);
 
//   maxArtistColl = 0;
//   maxArtist = null;
    
// for (var n=0; n<rows; n++) {
//       //var artist = int(table.getString(i,11));

//       var artist = (String(table.getString(n,9)));
//       if(artist!=displayName.artist){
//         var displayName = {};
//         displayName.artist = artist;
//         displayName.items =[];
//         displayName.items = table.findRows(String(displayName.artist),10);
//         append(ArtistColl, displayName);
//         // console.log(ArtistColl);
//         // console.log(ArtistColl)
//         if(displayName.items.length>maxArtistColl){
//           maxArtistColl = displayName.items.length;
//           maxArtist = ArtistColl.length-1;
//           console.log(maxArtist);
//           console.log(ArtistColl[maxArtist].items.length)
//           //maxArtistName = ArtistColl.length.ArtistColl;
//         }
//      }
// //      // console.log("thisis maxArtist" + maxArtist);
// //      // console.log("thisis ArtistColl length" + ArtistColl.length);
// //       // console.log("The artist" + ArtistColl[maxArtistColl].artist + " that has the most objects has " + ArtistColl[maxArtistColl].items.length + " items by " + (String(maxArtistColl.displayName)));
//   }
// console.log("The maximum number of artworks by one artist " + ArtistColl[maxArtist].artist + "by" + ArtistColl[maxArtist].items.length);

// // //   console.log("The artist" + ArtistColl[maxArtistColl].artist + " that has the most objects has " + ArtistColl[maxArtistColl].items.length + " items by " + (String(maxArtistColl.displayName)));
// // // };
// }

//============================



//=========
//to get all the rows
//warning: rows is an array of objects
//  for (var i=0; i<row.length; i++) {
//      rows[i].set('name', 'MetFullObjects');
      
// //show the results
//    var rows = table.getRows();
//    var span = createSpan(rows(i) + " | ");
//    // var span = createSpan(rows.getString(i) + " | ");

// //     if(objectName=="American Paintings and Sculpture") {
// //       span.addClass("highlight:yellow");
// //     }
  
  
//     console.log(rows);
//     console.log(column);
// }
// //===========


//=================
// //this works to get one column: table.get.String
//  for(var i=0; i<row; i++){
    
//  var objectName = table.getString(i,"Artist Display Name");
// //createSpan to show data on server
//    // var span = createSpan(objectName + " | ");
//    // if(objectName=="Clara Chipman Newton") {
//    //  span.addClass("highlighted");
//    // }

//    console.log(table.get(i, 14));
// }
//================

//=================
// //to get all the columns in a specific row: table.get.Row(1)
// 	for(var i=0; i<row; i++){
// 		 var row = table.getRow(10);
//   		//print it column by column
//   		//note: a row is an object, not an array
//   		for (var c = 0; c < table.getColumnCount(); c++) {
//     	console.log(row.getString(c));
//     	var span = createSpan(row.getString(c) + " | ");
//     }
// }
//================

//shows first row, 2nd column cell
		// console.log(table.get(i, 1));
//shows total number of rows
		// console.log(table.get(i,1));
    	
// }