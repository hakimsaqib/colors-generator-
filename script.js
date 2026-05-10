const generateBtn = document.getElementById('generate-btn');

const paletteContainer = document.querySelector('.palette-container');

const mainContainer = document.querySelector('.container')

const toogleContainer = document.querySelector('.toggle-container');

const copyButtons = document.querySelectorAll('.copy-btn');



// we are selected the color-box to change it shadow color same with randomely generated color
let colorBox = document.querySelector('.color-box');
// alert(colorBox.className);

generateBtn.addEventListener('click', generatePalette);


let toggleMode = document.getElementById('toggle');


toggleMode.addEventListener('click', () => {

    if (toggleMode.textContent === "Light") {
        mainContainer.style.backgroundColor = "white"
        toogleContainer.style.backgroundColor = "white"
        toggleMode.textContent = "Dark"
    } else {
        mainContainer.style.backgroundColor = "black";
        toogleContainer.style.backgroundColor = "black"
        toggleMode.textContent = "Light";
    }
})
// to generate colors
function generatePalette() {

    const colors = [];

    // we want to generate five random color and store them in colors array
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }
    updatePaletteDisplay(colors);
}

// this method will return random color then will send this into the generatepalette
function generateRandomColor() {
    // in hex value we have from 0 to 5 values
    const letters = "0123456789ABCDEF"
    let color = "#";
    for (let i = 0; i < 6; i++) {
        // here is 16 is not included because index start from 0 to 15
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box")
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector('.color');
        const hexValue = box.querySelector('.hex-value');
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    })
}

// copying hex value into clipboard:
copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        // get the hex value from the same color box
        const colorBox = btn.closest('.color-box');
        const hexValue = colorBox.querySelector('.hex-value').textContent;

        // copy to clipboard
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                btn.textContent = "Copied!";
                setTimeout(() => {
                    btn.textContent = "Copy";
                }, 1000);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    });
});

generatePalette();
