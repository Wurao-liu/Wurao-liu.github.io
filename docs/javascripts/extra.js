!function() {
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }
    function j(i) {
        return document.getElementsByTagName(i)
    }
    function l() {
        var i = j("script"),
        w = i.length,
        v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", -1),
            o: o(v, "opacity", 0.4),     // 降低透明度
            c: o(v, "color", "0,0,0"),
            n: o(v, "count", 55)         // 在移动端减少粒子数量
        }
    }

    function k() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        // 根据屏幕大小调整粒子数量
        if (r < 768) {  // 移动设备
            s.n = Math.floor(s.n * 0.5);
        }
    }
    function b() {
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function(i) {
            i.x += i.xa * 0.5,              // 降低水平运动速度
            i.y += i.ya * 0.5,              // 降低垂直运动速度
            i.xa *= i.x > r || i.x < 0 ? -1 : 1,
            i.ya *= i.y > n || i.y < 0 ? -1 : 1,
            e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x,
                    z = i.y - x.y,
                    y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.02 * B, i.y -= 0.02 * z), // 降低鼠标互动影响
                    A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 3, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.1) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                }
            }
            w.splice(w.indexOf(i), 1)
        }),
        m(b)
    }
    var u = document.createElement("canvas"),
    s = l(),
    c = "c_n" + s.l,
    e = u.getContext("2d"),
    r,
    n,
    m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(i) {
        window.setTimeout(i, 1000 / 45)
    },
    a = Math.random,
    f = {
        x: null,
        y: null,
        max: 15000                       // 减小鼠标互动距离从 20000 到 15000
    };
    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
    j("body")[0].appendChild(u);
    k(),
    window.onresize = k;
    window.onmousemove = function(i) {
        i = i || window.event,
        f.x = i.clientX,
        f.y = i.clientY
    },
    window.onmouseout = function() {
        f.x = null,
        f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = a() * r,
        g = a() * n,
        q = 2 * a() - 1,
        d = 2 * a() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: 4000                    // 减小连线最大距离从 6000 到 4000
        })
    }
    setTimeout(function() {
        b()
    },
    100)

    // 添加移动端检测和适配
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        s.n = Math.floor(s.n * 0.5);    // 移动端粒子数量减半
        s.o = s.o * 0.8;                // 移动端降低透明度
    }
}();