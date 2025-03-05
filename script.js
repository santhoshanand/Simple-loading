window.onload = function () {
    let spinner = document.getElementById("spinner");
    let ctx = spinner.getContext("2d");
    let width = spinner.width;
    let height = spinner.height;
    let degrees = 0;
    let new_degrees = 0;
    let difference = 0;
    let color = "turquoise";
    let bgcolor = "#222";
    let text;
    let animation_loop;

    // Function to convert numbers to Tamil numerals
    function convertToTamilNumerals(num) {
        return num.toString().split('').map(digit => String.fromCharCode(3046 + parseInt(digit))).join('');
    }

    function init() {
        ctx.clearRect(0, 0, width, height);

        // Draw background circle
        ctx.beginPath();
        ctx.strokeStyle = bgcolor;
        ctx.lineWidth = 30;
        ctx.arc(width / 2, width / 2, 100, 0, Math.PI * 2, false);
        ctx.stroke();

        let radians = degrees * Math.PI / 180;

        // Draw progress arc
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 30;
        ctx.arc(width / 2, height / 2, 100, -Math.PI / 2, radians - Math.PI / 2, false);
        ctx.stroke();

        // Convert percentage to Tamil numerals
        let percentage = Math.floor((degrees / 360) * 100);
        let tamilPercentage = convertToTamilNumerals(percentage) + "%";

        // Draw text
        ctx.fillStyle = color;
        ctx.font = "50px arial";
        let text_width = ctx.measureText(tamilPercentage).width;
        ctx.fillText(tamilPercentage, width / 2 - text_width / 2, height / 2 + 15);
    }

    function draw() {
        if (animation_loop !== undefined) clearInterval(animation_loop);
        new_degrees = 360;
        difference = new_degrees - degrees;
        animation_loop = setInterval(animate_to, 10000 / difference);
    }

    function animate_to() {
        if (degrees == new_degrees)
            clearInterval(animation_loop);
        else
            degrees++;

        init();
    }

    draw();
};
