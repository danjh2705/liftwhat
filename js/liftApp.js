(function( liftApp, $, undefined ) {

    var appLocation = location || window.location;
    var root = appLocation.origin + '/';
    var href = appLocation.href;
    var locale = '';

    var routines = { 
        all: [
            {name: 'Coan Phillipi Deadlift',
             inputs: [
                { type: "number",
                  value: "current_max"
                },
                { type: "number",
                  value: "target_max"
                }
            ],
             type: 'Powerlifting'
            },
            {name: 'Magnusson Ortmayer Deadlift',
             inputs: [
                { type: "number",
                  value: "target_max"
                }
            ],
             type: 'Powerlifting'
            },
            {name: 'Russian Squat',
             inputs: [
                { type: "number",
                  value: "current_max"
                }
             ],
              type: 'Olympic Weightlifting'
            }
        ],
        types: [
            'Olympic Weightlifting',
            'Powerlifting'
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
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return value.split('_').join(' ');
    };

    liftApp.setTableHeader = function ($table) {
        var $thead = $('<thead></thead>');
        $thead.append('<tr><th>Lift</th><th>Sets</th><th>Reps</th><th>Weight</th></tr>');
        $table.append($thead);
    };

    liftApp.buildWeightSelector = function () {
        var $select = $('<select></select>');
        for(i=50; i<1005; i+=10) {
            $select.append('<option value="' + i + '">' + i + '</option>');
        }
        return $select;
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

    function recover(response) {
        if (response.status == 404) {
            var $error = $('<div class="error"></div>')
            $error.append('<h4>Something went wrong...</h4>')
                .append('<h4>Why don\'t you head <a href="/">Home</a>?</h4>');
            $('body').append($error);

        }
    }
}( window.liftApp = window.liftApp || {}, jQuery ));