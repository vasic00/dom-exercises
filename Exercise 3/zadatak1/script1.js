colors = ["blue", "red", "green"];
index = 0;

function changeBgColor(element) {
    index++;
    if (index > 2)
        index = 0;
    element.style.backgroundColor = colors[index];
}