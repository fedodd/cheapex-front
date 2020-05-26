// this code get from red mad robots

$(function() {
    var a = $(".years-container .years");
    if (a.length) {
        var b = a.outerWidth()
          , c = $(".years-container")
          , d = c.children()
          , e = $("body").width()
          , f = $("body");
        c.height(a.height()),
        $("html").is(".mobile, .tablet") ? (d.addClass("touch-scroll"),
        b > e && d.scrollLeft(b - e)) : (b > e && a.css("margin-left", e - b),
        $(document).mousemove(function(c) {
            var d = f.width();
            if (d >= b)
                return void a.attr("style", "");
            var e = (b - d) / (d - 200)
              , g = Math.max(c.clientX - 100, 0);
            g > d && (g = d);
            var h = d - b
              , i = Math.max(e * -g, h);
            a.css("margin-left", i)
        }),
        $(window).on("resize", function() {
            var c = f.width();
            return c >= b ? void a.attr("style", "") : void a.css("margin-left", c - b)
        }))
    }
    var g = $(".clients-scroll .list");
    if (g.length) {
        var b = g.outerWidth()
          , f = $("body")
          , h = $(".clients-scroll");
        h.height(g.height());
        var i = h.children()
          , e = $("body").width();
        $("html").is(".mobile, .tablet") ? (i.addClass("touch-scroll"),
        b > e && i.scrollLeft(b - e)) : (b > e && g.css("margin-left", e - b),
        $(document).mousemove(function(a) {
            var b = g.outerWidth()
              , c = f.width();
            if (c >= b)
                return void g.css("margin-left", "auto");
            var d = (b - c) / (c - 200)
              , e = Math.max(a.clientX - 100, 0);
            e > c && (e = c);
            var h = c - b
              , i = Math.max(d * -e, h);
            g.css("margin-left", i)
        }),
        $(window).on("resize", function() {
            var a = g.outerWidth()
              , b = f.width();
            return b >= a ? void g.css("margin-left", "auto") : void g.css("margin-left", b - a)
        }))
    }
})
