var cssPlayer = (function( $ ) {

    var configMap = {
        template_html: '<div class="css-player play-controls">' +
        '<div class="previous-container">' +
        '<i class="fa fa-step-backward fa-sm"></i>' +
        '<div class="prev-diff"></div>' +
        '</div>' +
        '<div class="current-container">' +
        '<i class="fa fa-pause fa-sm"></i>' +
        '<div class="current-diff"></div>' +
        '</div>' +
        '<div class="next-container">' +
        '<i class="fa fa-step-forward fa-sm"></i>' +
        '<div class="next-diff"></div>' +
        '</div>' +
        '</div>',
        transitions : [],
        current_t: 0
    };

    var transition_definition = function(trans){
        var definition = JSON.stringify(configMap.transitions.slice(0, trans)).slice(1,-1).replace(/,/g, "").replace(/\]\[/g, "] [");
        return definition;
    };

    var onForwardClick = function(event) {
        if (configMap.current_t == configMap.transitions.length) {
            console.log("now at: " + configMap.current_t);
            return false;
        }

        configMap.current_t++;
        transitions_to_t(configMap.transitions, configMap.current_t);
        return true;
    };

    var onBackwardClick = function(event) {
        if (configMap.current_t == 0) {
            console.log("now at" + configMap.current_t);
            return false;
        }
        configMap.current_t--;
        transitions_to_t(configMap.transitions, configMap.current_t);
        return true;
    };


    var transitions_to_t = function (){
        for (var j=0; j < configMap.current_t; j++){
            $(configMap.transitions[j][0]).removeAttr("style");
        }

        for (var j=0; j < configMap.current_t; j++){
            $(configMap.transitions[j][0]).css(configMap.transitions[j][1]);
        }

        //populate prev-diff. the diff between current_t and current_t - 1
        if (configMap.current_t == 0){
            configMap.$container.find(".css-player.play-controls .prev-diff").html("NO BACKWARD");
        } else {
            var current = transition_definition(configMap.current_t);
            var prev = transition_definition(configMap.current_t - 1);
            configMap.$container.find(".css-player.play-controls .prev-diff").html(diffString(current, prev));
        }

        if (configMap.current_t == configMap.transitions.length){
            configMap.$container.find(".css-player.play-controls .next-diff").html("NO FORWARD");
        } else {
            var current = transition_definition(configMap.current_t);
            var next = transition_definition(configMap.current_t + 1);
            configMap.$container.find(".css-player.play-controls .next-diff").html(diffString(current, next))
        }

        var current = transition_definition(configMap.current_t);
        configMap.$container.find(".css-player.play-controls .current-diff").html(current)

        console.log("now at: " + configMap.current_t);
    }

    function initModule($container, transitions){
        $container.html(configMap.template_html);
        var transitionsCopy = jQuery.extend(true, [], transitions);
        configMap.transitions = transitionsCopy;
        configMap.$container = $container;
        $container.find("i.fa-step-forward").on("click", onForwardClick);
        $container.find("i.fa-step-backward").on("click", onBackwardClick);
        transitions_to_t();
        //onForwardClick();
    }

    return { initModule: initModule };
}( jQuery ));