(function( liftApp, $, undefined ) {

    var appLocation = location || window.location;
    if (appLocation.origin) {
        var root = appLocation.origin + '/';
    }
    else {
        var root = 'http://' + appLocation.host + '/';
    }
    var href = appLocation.href;
    var locale = '';

    var routines = { 
        all: [
            {name: 'Coan Phillipi Deadlift',
             inputs: [
                { type: "number",
                  value: "current_max_deadlift"
                },
                { type: "number",
                  value: "target_max_deadlift"
                }
            ],
             type: 'Deadlift Specific'
            },
            {name: 'Magnusson Ortmayer Deadlift',
             inputs: [
                { type: "number",
                  value: "target_max_deadlift"
                }
            ],
             type: 'Deadlift Specific'
            },
            {name: 'Russian Squat',
             inputs: [
                { type: "number",
                  value: "current_max_squat"
                }
             ],
              type: 'Squat Specific'
            },
            {name: 'Smolov Squat: Part One',
             inputs: [
                { type: "number",
                  value: "current_max_squat"
                }
             ],
              type: 'Squat Specific'
            },
            {name: 'Smolov Squat: Part Two',
             inputs: [
                { type: "number",
                  value: "current_max_squat"
                }
             ],
              type: 'Squat Specific'
            },
            {name: 'Smolov jr',
             inputs: [
                { type: "select",
                  value: "which_lift",
                  options: [
                    'Squat',
                    'Bench',
                    'Deadlift'
                  ]
                },
                {
                  type: "number",
                  value: "current_max"
                }
             ],
              type: 'Powerlifting'
            },
            {name: 'Korte 3x3',
             inputs: [
                {
                  type: "number",
                  value: "current_max_squat"
                },
                {
                  type: "number",
                  value: "current_max_bench"
                },
                {
                  type: "number",
                  value: "current_max_deadlift"
                }
             ],
              type: 'Powerlifting'
            },
            {name: 'Sheiko 29',
             inputs: [
                {
                  type: "number",
                  value: "current_max_squat"
                },
                {
                  type: "number",
                  value: "current_max_bench"
                },
                {
                  type: "number",
                  value: "current_max_deadlift"
                }
             ],
              type: 'Powerlifting'
            }/*,
            {name: 'Brandon Lillys Cube Method',
             inputs: [
                {
                  type: "number",
                  value: "current_max_squat"
                },
                {
                  type: "number",
                  value: "current_max_bench"
                },
                {
                  type: "number",
                  value: "current_max_deadlift"
                },
                {
                  type: "multiselect",
                  value: "squat_assistance",
                  options: [
                    'Front Squat',
                    'Olympic Squat',
                    'Leg Press',
                    'Lunges',
                    'Stiff Leg Deadlifts',
                    'Leg Extensions',
                    'Leg Curls',
                    'Good Mornings',
                    'Snatch Grip Deadlifts',
                    'Barbell Rows',
                    'Dumbbell Rows',
                    'Lat Pulldows',
                    'Chest Supported Rows',
                    'Shrugs',
                    'Abs',
                    'Glute Ham Raise',
                    'Pullups'
                  ]
                },{
                  type: "multiselect",
                  value: "bench_assistance",
                  options: [
                    'Close Grip Bench',
                    'Tricep Pushdown',
                    'Kaz Presses',
                    'Military Presses',
                    'Bicep Curls',
                    'Shoulder Front or Side Raise',
                    'Upright Row',
                    'Abs',
                    'Forearm Rolls',
                    'Pec Flyes',
                    'Fat Bar Bench',
                    'Push Ups',
                    'Dips',
                    'Incline Press'
                  ]
                },{
                  type: "multiselect",
                  value: "deadlift_assistance",
                  options: [
                    'Front Squat',
                    'Olympic Squat',
                    'Leg Press',
                    'Lunges',
                    'Stiff Leg Deadlifts',
                    'Leg Extensions',
                    'Leg Curls',
                    'Good Mornings',
                    'Snatch Grip Deadlifts',
                    'Barbell Rows',
                    'Dumbbell Rows',
                    'Lat Pulldows',
                    'Chest Supported Rows',
                    'Shrugs',
                    'Abs',
                    'Glute Ham Raise',
                    'Pullups'
                  ]
                }
             ],
              type: 'Powerlifting'
            }*/
        ],
        types: [
            'Deadlift Specific',
            'Powerlifting',
            'Squat Specific'
        ]
    };

    liftApp.name    = "LiftWhat?";
    liftApp.locale  = getLocale();
    liftApp.build   = buildIncludes();
    liftApp.ARGV    = getKeyValues();

    liftApp.setTitle = function () {
        var where = getLocale();
        $(document).attr('title', liftApp.name + ' - ' + where);
        $('#locale').html('<a href="/">' + liftApp.name + '</a><span class="red"> ' + where + '</span>');
    }

    liftApp.setBase = function () {
        $('body').prepend('<div id="container" class="container narrow"></div>')
        var $masthead  = $('<div></div>').addClass('masthead');
        var $title     = $('<h1 id="locale"></h1>');
        $('#container').prepend($masthead.append($title));
    };

    liftApp.setFooter = function () {
        if (liftApp.locale != 'Welcome.') {
            $footer = $('<div id="footer"></div>');
            $footer.append('<a href="/">Wanna try another?</a>');
            $('#container').append($footer);
        }
        else {
            $footer = $('<div id="footer" class="home"></div>');
            $footer.append('<p>Currently in <strong>BETA.</strong></p>');
            $footer.append('<p>Feedback or requests? <a href="mailto:admin@liftwhat.com">Email me!</a></p>');
            $footer.append('<p class="updates">Bug fixes for Coan/Phillipi and Smolov.</p>');
            $('#container').append($footer);
        }
    }

    liftApp.error = function (type) {
        if (type = 'missing_argv') { recover({status: 404}) }
    };

    liftApp.nameToFile = function (name) {
        return name.split(' ').join('_');
    };

    liftApp.fileToName = function (file) {
        return file.split('_').join(' ');
    };

    liftApp.valueToLabel = function (value) {
        var value = value.charAt(0).toUpperCase() + value.slice(1);
        return value.split('_').join(' ');
    };

    liftApp.URLArrayToArray = function (string) {
        var retArr = [];
        string = string.split(',');
        $(string).each(function(i,v){
            v = v.split('/')[0]
            retArr.push(v.split('%20').join(' '));
        });
        return retArr;
    }

    liftApp.URLArrayToCommaList = function (string) {
        var retStr = [];
        string = string.split(',');
        $(string).each(function(i,v){
            v = v.split('/')[0];
            if (v!="") { retStr.push(v.split('%20').join(' ')); }
        });
        spacer = function(word) { return word = ' ' + word; }
        return retStr.map(spacer);
    }

    liftApp.round = function (number) {
        number = number / 5;
        number = Math.round(number) * 5;
        return number;
    }

    liftApp.setCookie = function (key,value) {
        setCookie(key,value);
    }

    liftApp.getCookie = function () {
        return getCookie();
    }

    liftApp.dumpCookie = function () {
        dumpCookie();
    }

    liftApp.setTableHeader = function ($table) {
        var $thead = $('<thead></thead>');
        $thead.append('<tr><th>Lift</th><th>Sets</th><th>Reps</th><th>Weight</th><th>%</th></tr>');
        $table.append($thead);
    };

    liftApp.buildWeightSelector = function () {
        var $select = $('<select></select>');
        for(i=50; i<1005; i+=10) {
            $select.append('<option value="' + i + '">' + i + '</option>');
        }
        return $select;
    };

    liftApp.buildWeightInput = function () {
        var $input = $('<input type="number" min="1"></input>');
        $input.focus(function(e){
            if ($(e.target).parent('.input').hasClass('error')) {
                $(e.target).parent('.input').removeClass('error');
                $(e.target).val('');
            }
        });
        return $input;
    };

    liftApp.fetchSlogan = function () {
        var slogans = [
            'with which you may crush your enemies, see them driven before you, and to hear the lamentation of their women',
            'that will make you a god damned sexual Tyrannosaurus, just like me'
        ]
        return slogans[Math.floor(Math.random()*slogans.length)];
    };

    liftApp.fetchAllRoutines = function () {
        return routines.all;
    };

    liftApp.fetchRoutinesByType = function (type) {
        if (type) {
            var retArr = [];
            $(routines.all).each(function(i,v){
                if (v.type == type) { retArr.push(v); }
            });
            retArr.sort(function(a,b) {
                return a.name > b.name;
            });
            return retArr;
        }
        else { return liftApp.fetchAllRoutines(); }
    };

    liftApp.fetchRoutineTypes = function () {
        return routines.types;
    };

    liftApp.fetchRoutineInputs = function (routine) {
        var match = null;
        $(routines.all).each(function(i,v){
            if (v.name == routine) { match = v }
        });
        if (match != null) { return match.inputs }
    };

    liftApp.fetchRoot = function () {
        return root;
    }

    liftApp.googleAnalytics = function () {
        $('body').append("<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-41224259-1','liftwhat.com');ga('send', 'pageview');</script>");
    }

    /*

    Currently Deprecated. Leave for future.
    
    liftApp.fetchScript = function () {
        if(liftApp.locale == 'Home') {file = root + 'js/index.js'}
        else { file = root + 'routines/js/' + getFileName() + '.js' }
        $.getScript(file, function(data, textStatus, jqxhr) {})
            .fail(function(jqxhr, settings, exception){recover(jqxhr)});
    };
    */

    function buildIncludes() {
        var jsIncludes =  [
            'bootstrap/js/bootstrap.min.js',
            'js/main.js'
        ];

        var cssIncludes = [
            'bootstrap/css/bootstrap.min.css',
            'bootstrap/css/bootstrap-responsive.min.css',
            'css/main.css'
        ];

        $(jsIncludes).each(function(i,v){
            $.getScript(root + v, function(data, textStatus, jqxhr) {})
                .fail(function(jqxhr, settings, exception){recover(jqxhr)});
        });

        $(cssIncludes).each(function(i,v) {
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', root + v));
        });
    }

    function getLocale() {
        getName = function(path) {
            var name = path.split('/')[1];
            name = name.split('.')[0];
            return name.split('_').join(' ');
        }
        if (href.indexOf(root) < 0) {
            console.log('You need to adjust your root, dude.');
        }
        else {
            var pathFromRoot = href.split(root)[1];
            if (pathFromRoot != '404.html') {
                locale = (pathFromRoot.length > 0) ? getName(pathFromRoot) : 'Welcome.';
            }
            else { locale = 'Whoops...'; }
        }
        return locale;
    }

    function getFileName() {
        var file = href.split('/');
        return file[file.length-1].split('.')[0];
    }

    function getKeyValues() {
        var retVals = {};
        if (liftApp.locale != 'Welcome.') {
            if (href.indexOf('?') < 0) { recover({status: 404}) }
            else {
                var keyVals = href.split('?')[1];
                keyVals = keyVals.split('&');
                $(keyVals).each(function(i,v){
                    var kv = v.split('=');
                    retVals[kv[0]] = kv[1];
                });
            }
        }
        return retVals;
    }

    function setCookie(key, value) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + 111111);
        document.cookie=key+"="+value+"; expires=" + exdate.toUTCString();
    }

    function getCookie() {
        var cookie = document.cookie || "";
        var retCookie = {};
        cookie = cookie.split(';');
        $(cookie).each(function(i,kv){
            kv = kv.replace(' ', '');
            kv = kv.split('=');
            retCookie[kv[0]] = kv[1];
        });
        return retCookie;
    }

    function dumpCookie() {
        var cookie = document.cookie || "";
        cookie = cookie.split(';');
        $(cookie).each(function(i,kv){
            kv = kv.replace(' ', '');
            kv = kv.split('=');
            document.cookie = kv[0] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        });
    }

    function recover(response) {
        if (response.status == 404) {
            var $error = $('<div class="error"></div>')
            $error.append('<h4>Something went wrong...</h4>')
                .append('<h4>Why don\'t you head <a href="/">Home</a>?</h4>');
            $('body').append($error);

        }
    }
}( window.liftApp = window.liftApp || {}, jQuery ));