(function() {
    // Initialise an empty canvas and place it on the page
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var startX = canvas.width / 2;
    var startY = canvas.height / 2;

    var particles = {},
    particleIndex = 0;


    function Particle() {
        this.x = startX;
        this.y = startY;
        this.size = Math.random() * 2;
        this.vx = Math.random() * 20 - 10;
        this.vy = Math.random() * 20 - 10;
        this.r = getRandomInt(50, 100);
        this.g = getRandomInt(50, 200);
        this.b = getRandomInt(100, 200);

        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
    }

    Particle.prototype.draw = function() {
        this.x += this.vx / 5;
        this.y += Math.sin(this.x / -10);

        this.life++;

        if (this.life >= 300) {
            delete particles[this.id];
        }

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 20;
        context.globalCompositeOperation = 'lighter';
        context.shadowColor = 'rgb(' + this.r + ',' + this.g + ',' + this.b +')';
        context.fillStyle = 'rgba(' + (this.r+30) + ',' + (this.g+30) + ',' + (this.b+30) + ', 0.8)';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI*2);
        context.closePath();
        context.fill();

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    setInterval(()=>{
        new Particle();
    }, 25);

    setInterval(function() {
        var blur = 0.1;
        context.fillStyle = "rgba(0,0,0,"+ blur +")";
        context.shadowBlur    = 0;
        context.globalCompositeOperation = 'source-over';

        context.fillRect(0, 0, canvas.width, canvas.height);


        for (var i in particles) {
            particles[i].draw();
        }

    }, 20);
}());
