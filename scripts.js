/*
    Adjust the formulas if anything's changed
 */

var formulas = [
    function(u, x, y, z) {
        return (1 + u * 3) 
            * (1 + x + y) 
            * (1 + z);
    },
    function(u, x, y, z) {
        return (1 + u * 2) 
            * (1 + x + y) 
            * (1 + z) 
            * 1.8;
    },
    function(u, x, y, z) {
        return (1 + u * 2) 
            * (1 + x * 1.8 + y) 
            * (1 + z);
    },
    function(u, x, y, z) {
        return (1 + u)
            * (1 + x + y)
            * (1 + z)
            * 2.2;
    },
    function(u, x, y, z) {
        return (1 + u)
            * (1 + x * 1.8 + y)
            * (1 + z)
            * 1.4;
    }
];

/*
    Page interaction logic
 */

function u() {
    return parseFloat(document.getElementById('u').value);
}

function x() {
    return parseFloat(document.getElementById('x').value);
}

function y() {
    return parseFloat(document.getElementById('y').value);
}

function z() {
    return parseFloat(document.getElementById('z').value);
}

function recalculate() {
    var i;
    try {
        for (i = 0; i < formulas.length; i++) {
            // Basic formula results

            document.getElementById('f' + (i + 1)).innerHTML = formulas[i](u(), x(), y(), z()).toFixed(2);

            // Which parameter should you increase by 0.01 for better formula results

            var u1 = formulas[i](u() + 0.01, x(), y(), z());
            var x1 = formulas[i](u(), x() + 0.01, y(), z());
            var y1 = formulas[i](u(), x(), y() + 0.01, z());
            var z1 = formulas[i](u(), x(), y(), z() + 0.01);

            var m = Math.max(u1, x1, y1, z1);

            var us = '<div>u: ' + u1.toFixed(2) + '</div>';
            us = (m == u1) ? '<strong class="rec-optimum">' + us + '</strong>' : us;
            var xs = '<div>x: ' + x1.toFixed(2) + '</div>';
            xs = (m == x1) ? '<strong class="rec-optimum">' + xs + '</strong>' : xs;
            var ys = '<div>y: ' + y1.toFixed(2) + '</div>';
            ys = (m == y1) ? '<strong class="rec-optimum">' + ys + '</strong>' : ys;
            var zs = '<div>z: ' + z1.toFixed(2) + '</div>';
            zs = (m == z1) ? '<strong class="rec-optimum">' + zs + '</strong>' : zs;

            document.getElementById('r' + (i + 1)).innerHTML = us + xs + ys + zs;
        }
    } catch (e) {
        for (i = 0; i < formulas.length; i++) {
            document.getElementById('f' + (i + 1)).innerHTML = '...';
            document.getElementById('r' + (i + 1)).innerHTML = '<div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>';
        }
    }
}

function mod(id, inc) {
    var el = document.getElementById(id);
    var val = parseFloat(el.value);
    if (isNaN(val)) {
        el.value = inc.toFixed(2);
    } else {
        el.value = (val + inc).toFixed(2);
    }
    el.oninput();
    if (!el.parentNode.classList.contains('is-dirty')) {
        el.parentNode.classList.add('is-dirty');
    }
}

function plus(id) {
    mod(id, 0.01);
}

function minus(id) {
    mod(id, -0.01);
}

document.getElementById('u').oninput = recalculate;
document.getElementById('x').oninput = recalculate;
document.getElementById('y').oninput = recalculate;
document.getElementById('z').oninput = recalculate;

document.getElementById('up').onclick = function() {plus('u')};
document.getElementById('um').onclick = function() {minus('u')};
document.getElementById('xp').onclick = function() {plus('x')};
document.getElementById('xm').onclick = function() {minus('x')};
document.getElementById('yp').onclick = function() {plus('y')};
document.getElementById('ym').onclick = function() {minus('y')};
document.getElementById('zp').onclick = function() {plus('z')};
document.getElementById('zm').onclick = function() {minus('z')};
