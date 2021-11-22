var next_page_ids = ["next-page-line1", "next-page-line2", "next-page-line3", "next-page-line4", "next-page-line5", "next-page-line6", "next-page-line7", "next-page-line8"];
var next_page_end = next_page_ids.length;
var next_page_ind = 1;
var next_page_elems = [];

for (var i = 0; i < next_page_ids.length; i++) {
    var elem = document.getElementById(next_page_ids[i]);
    next_page_elems.push(elem);
    elem.addEventListener('click', lineFunc2);
    console.log("here");
}

function lineFunc2() {
    if (next_page_ind == next_page_end) {
        return;
    }
    else {
        next_page_elems[next_page_ind].innerHTML = "A ditto, ditto device.";
        next_page_elems[next_page_ind - 1].removeEventListener('click', lineFunc2);
        next_page_ind ++; 
    }
}