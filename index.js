function calcroute(i, c)
{
    var step = Math.PI / 4;
    var a = Math.sin((step * i) + (step * c)).toFixed(2);
    if (a > 0) {
        return 1;
    }
    else if (a < 0)
    {
        return -1;
    }
    else
    {
        return 0;
    }
}
var tmp = {};
function calc_data(arr)
{
    tmp = {a: [], b: [], n: [], r: []};
    for (var i = 0; i < arr.length; i++)
    {
        for (var j = 0; j < arr[i].length; j++)
        {
            for (var g = 1; g <= 8; g++)
            {
                var i_n = i + calcroute(g, 4) + 1;
                var j_n = j + calcroute(g, 6) + 1;

                if (!(i_n in tmp.a))
                {
                    tmp.a[i_n] = [];
                }

                if (!(i_n in tmp.b))
                {
                    tmp.b[i_n] = [];
                }

                if (!(j_n in tmp.a[i_n]))
                {
                    tmp.a[i_n][j_n] = 0;
                }
                if (!(j_n in tmp.b[i_n]))
                {
                    tmp.b[i_n][j_n] = 0;
                }

                if (arr[i][j] == 1)
                {
                    tmp.a[i_n][j_n] += 1;
                }
            }

            if (typeof tmp.b[i + 1][j + 1] == 'undefined')
                tmp.b[i + 1][j + 1] = 0

            if (arr[i][j] == 1)
            {
                tmp.b[i + 1][j + 1] += 1
            }
        }
    }
    for (var i = 0; i < tmp.a.length; i++)
    {
        if (!(i in tmp.n))
            tmp.n[i] = [];

        for (var j = 0; j < tmp.a[i].length; j++)
        {
            if (tmp.b[i][j] == 1)
            {
                if (tmp.a[i][j] == 3 || tmp.a[i][j] == 2)
                {
                    tmp.n[i][j] = 1;
                }
                else
                {
                    tmp.n[i][j] = 0;
                }
            }
            else
            {
                if (tmp.a[i][j] == 3)
                {
                    tmp.n[i][j] = 1;
                }
                else
                {
                    tmp.n[i][j] = 0;
                }
            }

            if (tmp.n[i][j] == 1)
            {
                if (!(('x' in tmp) && ('y' in tmp)))
                {
                    tmp.x = {min: i, max: i};
                    tmp.y = {min: j, max: j};
                }
                tmp.x.min = Math.min(tmp.x.min, i);
                tmp.x.max = Math.max(tmp.x.min, i);
                tmp.y.min = Math.min(tmp.y.min, j);
                tmp.y.max = Math.max(tmp.y.max, j);
            }
        }
    }
    for (var i = tmp.x.min; i <= tmp.x.max; i++)
    {
        tmp.x.z = i - tmp.x.min;

        if (!(tmp.x.z in tmp.r))
            tmp.r[tmp.x.z] = [];

        for (var j = tmp.y.min; j <= tmp.y.max; j++)
        {
            tmp.y.z = j - tmp.y.min;
            tmp.r[tmp.x.z][tmp.y.z] = tmp.n[i][j];
        }
    }
    return tmp.r;
}

//var arr = [[0, 0, 1], [1, 0, 1], [0, 1, 1]];
var arr = [[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1]];
var l = 100;
for (var depth = 1; depth < l; depth++)
{
    document.write('<div class="section">');
    document.write('<h1>step ' + depth + '</h1>');
    for (var i = 0; i < arr.length; i++)
    {
        document.write('<div class="row">');
        for (var j = 0; j < arr[i].length; j++)
        {
            document.write('<div class="ceil ceil_' + arr[i][j] + '"></div>');
        }
        document.write('</div>');
    }
    document.write('</div>');
    if (depth < l - 1)
        arr = calc_data(arr);
}
