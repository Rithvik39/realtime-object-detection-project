img = "";
Status = "";
objects = [];
song = "";
function preload(){
    song = loadSound("astronaut.mp3")
}

function setup(){
    canvas = createCanvas(500 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw(){
    image(video , 0 , 0 , 500 , 500);

    if(Status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video , gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            
            fill(r , g , b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r , g , b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "baby found";
                song.stop();
            }else{
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "baby not found";
            song.play();
        }
    }

}

function modelLoaded(){
    console.log("model is loaded !!!");
    Status = true;
}

function gotResults(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}