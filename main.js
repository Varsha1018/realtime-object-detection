status="";
object=[];


function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML="Status - Detecting Object";
}

function draw(){
    image(video, 0, 0, 640, 420);

    if(status != ""){
    objectDetector.detect(video, gotResults);
        r = random(255);  
        g = random(255);
        b = random(255);

        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status - Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects - "+object.length;

            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" " +percent+ "%", object[i].x+15, object[i].y+15);
        }
    }
}



function modelloaded(){
    console.log("Model Loaded!!");
    status=true;

}

function gotResults(error, results){
    if(error){
    console.error(error);
    }
    console.log(results);
    object=results;
}