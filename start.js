 
let time = 0, t, isStart = false;//计时器参数
let tFlag;//flag计时器
const grid = document.getElementById("grid")
grid.addEventListener("click", timeBegin);
function timeBegin () {
    //首次点击开始计时
        if (!isStart) {
        const canvas_timeCount = document.getElementById("timeCount");
        const ctx_timeCount = canvas_timeCount.getContext("2d");
        time++;
        let timeWrite = time;
            for (let i = 2; i >= 0; i--) {
                let index = timeWrite % 10;
                timeWrite = Math.floor(timeWrite / 10);
                ctx_timeCount.drawImage(gfd[index], i*13, 0);
            }
        //console.log(time)
            t = setTimeout(() => {
                isStart = false;
                timeBegin();
            }, 1000);
            isStart = true;
        }
}
grid.addEventListener("mousedown", mineDown);
function mineDown (e) {
    //方块响应
    let x = Math.floor(e.offsetX/25);
    let y = Math.floor(e.offsetY/25);
    // console.log(`${x}和${y}`)
    const canvas_grid = document.getElementById("grid");
    const ctx_grid = canvas_grid.getContext("2d");
    const face = document.getElementById("face");
    const canvas_mineCount = document.getElementById("mineCount");
    const ctx_mineCount = canvas_mineCount.getContext("2d");
    // ctx_grid.clearRect(x*25, y*25, 25, 25);
    // console.log(mine.squares);
    if (mine.squares[y][x].isFlag === true) {
        mine.squares[y][x].isFlag = false;
        ctx_grid.drawImage(gfs[0], x*25, y*25);
        let mineC = ++mine.surplusMine;
        // console.log(mineC);
            for (let i = 2; i >= 0; i--) {
                let index = mineC % 10;
                mineC = Math.floor(mineC / 10);
                // console.log(mineC);
                ctx_mineCount.drawImage(gfd[index], i*13, 0);
            }
            if (mine.squares[y][x].type === "mine") {
                mine.fix.splice(mine.fix.indexOf(mine.squares[y][x]), 1);
            } else {
                mine.fixWrong.splice(mine.fixWrong.indexOf(mine.squares[y][x]), 1);
            }
    } else if (!mine.squares[y][x].check && (e.button === 0 || e.button === 1)) {
        mine.squares[y][x].check = true;
        if (mine.squares[y][x].type === "number") {
            if (!mine.squares[y][x].value) {
                let items = mine.isZero(mine.squares[y][x]);
                for (let item of items) {
                // console.log(item);
                    ctx_grid.drawImage(gfb[item.value], item.x*25, item.y*25);
                }
            } 
            // else {
                mine.n++;
                //console.log(mine.n, "点击+1")
            // }
            ctx_grid.drawImage(gfb[mine.squares[y][x].value], x*25, y*25);
        } else {
            console.log("mine.minePosition", mine.minePosition);
            for (p of mine.minePosition) {
                if (mine.squares[p[1]][p[0]].isFlag === false ) {
                    if (p[0] === x && p[1] === y) {
                        ctx_grid.drawImage(gfs[2], x*25, y*25);
                    } else {
                        ctx_grid.drawImage(gfs[3], p[0]*25, p[1]*25);
                    }
                }
            }
            face.src = gif[2];
            //让时钟停止
            clearTimeout(t);
            //应对一开始就踩到雷的问题，没有它会一直计时
            isStart = true;
            //假如存在标旗错误的情况
            if (!tFlag) {
                tFlag = setInterval(flagChange, 1200);
            }
            
            grid.removeEventListener("mousedown", mineDown);
        }
    // console.log(`x:${Math.floor(x/25)}`)
    } else if (e.button === 2 && !mine.squares[y][x].check) {
        if (mine.surplusMine > 0) {
            mine.squares[y][x].isFlag = true;
            ctx_grid.drawImage(gfs[1], x*25, y*25);
            
            let mineCC = --mine.surplusMine;
            for (let i = 2; i >= 0; i--) {
                let index = mineCC % 10;
                mineCC = Math.floor(mineCC / 10);
                ctx_mineCount.drawImage(gfd[index], i*13, 0);
            }
            mine.fixList(mine.squares[y][x]);
        }
    }
    //游戏是否结束判断
    console.log(mine.fix.length, "fix");
    console.log(mine.n, "剩余");
    // console.log(mine.squares[y][x]);
        // if (mine.fix.length === mine.mineCount || (mine.tr*mine.td-mine.n) === mine.mineCount) {
        if ((mine.tr*mine.td-mine.n) === mine.mineCount) {
            face.src = gif[1];
            clearTimeout(t);
            //没标小红旗的标小红旗
            for (pp of mine.minePosition) { 
                if (!mine.squares[pp[1]][pp[0]].isFlag) {
                    ctx_grid.drawImage(gfs[1], pp[0]*25, pp[1]*25);
                }
            }
            //所有雷都扫完 显示总雷数
            let mc = mine.mineCount;
            for (let i = 2; i >= 0; i--) {
                let index = mc % 10;
                mc = Math.floor(mc / 10);
                ctx_mineCount.drawImage(gfd[index], i*13, 0);
            }
            grid.removeEventListener("mousedown", mineDown);
        }
}

const face = document.getElementById("face");
face.addEventListener("mouseup", restart);
function restart () {
    clearTimeout(t);
    clearInterval(tFlag);
    tFlag = null;
    isStart = false;
    time = 0;
    mine.n = 0;
    mine.fix = [];//测试用的数据
    mine.fixWrong = [];
    mine.surplusMine = mine.mineCount;
    draw();
    face.src = gif[0];
    mine.init();
    grid.addEventListener("mousedown", mineDown);
}

let imageSwitch = gfs[1];
function flagChange () {
    const canvas_grid = document.getElementById("grid");
    const ctx_grid = canvas_grid.getContext("2d");
    if (imageSwitch === gfs[1]) {
        imageSwitch = 0; 
        for (s of mine.fixWrong) {
            ctx_grid.drawImage(gfb[s.value], s.x*25, s.y*25);
        }  
    } else {
        imageSwitch = gfs[1];
        for (s of mine.fixWrong) {
            ctx_grid.drawImage(imageSwitch, s.x*25, s.y*25);
        }
    }
    //console.log("run!");
}
