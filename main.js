status = "";
objects = [];

function preload(){
    sound = loadSound("Alarm.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Status : Detecting Objects...";
}

function modelLoaded(){
    console.log("Model Has Been Loaded");
    status = true;
    
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){

            if(objects[i].label == "person"){
                document.getElementById("result").innerHTML = "Status : Baby Identified";
                sound.stop();
            }else{
                document.getElementById("result").innerHTML = "Status : No Baby Identified";
                sound.play();
            }

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}