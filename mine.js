
let mine;
function draw() {
    const canvas_grid = document.getElementById("grid");
    const ctx_grid = canvas_grid.getContext("2d");
    if (mine === undefined) {
        mine = new Mine(9, 9, 10);
        mine.init()
    }
    //console.log(mine)
    // if (mine !== undefined) {
        let hc = mine.td;
        // console.log(`hc的值${hc}`)
        let wc = mine.tr;
        let mineCount = mine.surplusMine;
    // }
    for (let i = 0; i < hc; i++) {
        for (let j = 0; j < wc; j++) {
            ctx_grid.drawImage(gfs[0], j*25, i*25);
        }
    }
     //console.log(mineCount);
    
    const canvas_mineCount = document.getElementById("mineCount");
    const ctx_mineCount = canvas_mineCount.getContext("2d");
    for (let i = 2; i >= 0; i--) {
        let index = mineCount % 10;
        mineCount = Math.floor(mineCount / 10);
        ctx_mineCount.drawImage(gfd[index], i*13, 0);
    }
    const canvas_timeCount = document.getElementById("timeCount");
    const ctx_timeCount = canvas_timeCount.getContext("2d");
    for (let i = 0; i < 3; i++) {
        ctx_timeCount.drawImage(gfd[0], i*13, 0);
    }
}

function level(l=1) {
    let SW = document.body.clientWidth;
    // let SH = document.body.clientHeight;
    let game = document.getElementsByClassName("game");
    let cell = document.getElementsByClassName("cell");
    // let timeCount = document.getElementById("timeCount");
    let grid = document.getElementById("grid");
    // let mineCount = document.getElementById("")
    //console.log(game, timeCount);
    if (l === 1) {
        mine = new Mine(9, 9, 10);
        game[0].style.width = '229px';
        game[0].style.height = '268px';
        cell[0].style.width = '225px';
        cell[0].style.height = '225px';
        grid.width = "225";
        grid.height = "225";
    } else if (l === 2) {
        mine = new Mine(16, 16, 40);
        game[0].style.width = '404px';
        game[0].style.height = '444px';
        cell[0].style.width = '400px';
        cell[0].style.height = '400px';
        grid.width = "400";
        grid.height = "400";
    } else if (l === 3) {
        //console.log(SW, SH);
        if (SW >= 755) {
            mine = new Mine(30, 16, 99);
            game[0].style.width = '754px';
            game[0].style.height = '444px';
            cell[0].style.width = '750px';
            cell[0].style.height = '400px';
            grid.width = "750";
            grid.height = "400";
        } else {
            mine = new Mine(16, 30, 99);
            game[0].style.width = '404px';
            game[0].style.height = '794px';
            cell[0].style.width = '400px';
            cell[0].style.height = '750px';
            grid.width = "400";
            grid.height = "750";
        }
    } else if (l === 4) {
        let M;
        let X = parseInt((SW - 18) / 25);
        let Y = parseInt((1000 - 54) / 25);
        let XY = X * Y;
        if (XY >= 480) {
            M = XY * 0.20625;
        } else {
            M = XY * XY / 5760 + XY / 8;
        }
        M = parseInt(M);
        mine = new Mine(X, Y, M);
        game[0].style.width = `${X*25+4}px`;
        game[0].style.height = `${Y*25+44}px`;
        cell[0].style.width = `${X*25}px`;
        cell[0].style.height = `${Y*25}px`;
        grid.width = `${X*25}`;
        grid.height = `${Y*25}`;
    }
    mine.init();
    draw()
    restart();
}
// function reshapeGrid (hc, wc) {

// }
