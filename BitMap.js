/**
 * BitMap.js
 * @authors liming.liu (liuliming316@126.com)
 * @date    2018-11-14 11:03:41
 * @version $Id$
 * @description  convert a string to an iamges 
 * @links www.dice2.win
 */
var BitMap = function(e, t) {
    if ("string" !== typeof e || e.length < 15)
        throw "A hash of at least 15 characters is required.";
    this.defaults = {
        background: [240, 240, 240, 255],
        margin: .08,
        size: 64,
        saturation: .7,
        brightness: .5,
        format: "png"
    },
    this.options = "object" === typeof t ? t : this.defaults,
    "number" === typeof arguments[1] && (this.options.size = arguments[1]),
    arguments[2] && (this.options.margin = arguments[2]),
    this.hash = e,
    this.background = this.options.background || this.defaults.background,
    this.size = this.options.size || this.defaults.size,
    this.format = this.options.format || this.defaults.format,
    this.margin = void 0 !== this.options.margin ? this.options.margin : this.defaults.margin;
    var n = parseInt(this.hash.substr(-7), 16) / 268435455
      , r = this.options.saturation || this.defaults.saturation
      , o = this.options.brightness || this.defaults.brightness;
    this.foreground = this.options.foreground || this.hsl2rgb(n, r, o)
};
BitMap.prototype = {
    background: null,
    foreground: null,
    hash: null,
    margin: null,
    size: null,
    format: null,
    image: function() {
        return this.isSvg() ? new i(this.size,this.foreground,this.background) : new r(this.size,this.size,256)
    },
    render: function() {
        var e, t, n = this.image(), r = this.size, o = Math.floor(r * this.margin), i = Math.floor((r - 2 * o) / 5), a = Math.floor((r - 5 * i) / 2), s = n.color.apply(n, this.background), c = n.color.apply(n, this.foreground);
        for (e = 0; e < 15; e++)
            t = parseInt(this.hash.charAt(e), 16) % 2 ? s : c,
            e < 5 ? this.rectangle(2 * i + a, e * i + a, i, i, t, n) : e < 10 ? (this.rectangle(1 * i + a, (e - 5) * i + a, i, i, t, n),
            this.rectangle(3 * i + a, (e - 5) * i + a, i, i, t, n)) : e < 15 && (this.rectangle(0 * i + a, (e - 10) * i + a, i, i, t, n),
            this.rectangle(4 * i + a, (e - 10) * i + a, i, i, t, n));
        return n
    },
    rectangle: function(e, t, n, r, o, i) {
        if (this.isSvg())
            i.rectangles.push({
                x: e,
                y: t,
                w: n,
                h: r,
                color: o
            });
        else {
            var a, s;
            for (a = e; a < e + n; a++)
                for (s = t; s < t + r; s++)
                    i.buffer[i.index(a, s)] = o
        }
    },
    hsl2rgb: function(e, t, n) {
        return e *= 6,
        t = [n += t *= n < .5 ? n : 1 - n, n - e % 1 * t * 2, n -= t *= 2, n, n + e % 1 * t, n + t],
        [255 * t[~~e % 6], 255 * t[(16 | e) % 6], 255 * t[(8 | e) % 6]]
    },
    toString: function(e) {
        return e ? this.render().getDump() : this.render().getBase64()
    },
    isSvg: function() {
        return this.format.match(/svg/i)
    }
}
var i = function(e, t, n) {
    this.size = e,
    this.foreground = this.color.apply(this, t),
    this.background = this.color.apply(this, n),
    this.rectangles = []
};
i.prototype = {
    size: null,
    foreground: null,
    background: null,
    rectangles: null,
    color: function(e, t, n, r) {
        var o = [e, t, n].map(Math.round);
        return o.push(r >= 0 && r <= 255 ? r / 255 : 1),
        "rgba(" + o.join(",") + ")"
    },
    getDump: function() {
        var e, t, n, r = this.foreground, o = this.background, i = .005 * this.size;
        for (t = "<svg xmlns='http://www.w3.org/2000/svg' width='" + this.size + "' height='" + this.size + "' style='background-color:" + o + ";'><g style='fill:" + r + "; stroke:" + r + "; stroke-width:" + i + ";'>",
        e = 0; e < this.rectangles.length; e++)
            n = this.rectangles[e],
            n.color != o && (t += "<rect  x='" + n.x + "' y='" + n.y + "' width='" + n.w + "' height='" + n.h + "'/>");
        return t += "</g></svg>"
    },
    getBase64: function() {
        if (btoa)
            return btoa(this.getDump());
        if (t)
            return new t(this.getDump(),"binary").toString("base64");
        throw "Cannot generate base64 output"
    }
}
export default = BitMap

// ****** DEMO *****
// let option = {
//   foreground: true ? [255, 223, 102, 255] : [255, 255, 255, 127],
//   background: [0, 0, 0, 0],
//   margin: .1,
//   size: 25,
//   format: "svg"
// }
// console.log('data:image/svg+xml;base64' + new BitMap('0xa6b9e5726a3c75aff46ee5de88f074e7e92698c5', option).toString())