var lines = ["line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8"];
var end = lines.length;
var ind = 1;
var elems = [];
var next = document.getElementById("next-page");

for (var i = 0; i < lines.length; i++) {
    var line = document.getElementById(lines[i]);
    elems.push(line);
    line.addEventListener('click', lineFunc);
}

function lineFunc() {
    if (ind == end) {
        next.style.visibility = "visible";
        return;
    }
    else {
        elems[ind].innerHTML = "Printing, a ditto device";
        elems[ind - 1].removeEventListener('click', lineFunc);
        ind ++; 
    }
}