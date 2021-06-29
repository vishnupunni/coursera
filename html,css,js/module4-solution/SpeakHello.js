(function(window) {
    var helloSpeaker = {};
    helloSpeaker.speakword = "Hellow";
    helloSpeaker.speak = function(name) {
        console.log(this.speakword + " " + name);
    }

    window.helloSpeaker = helloSpeaker;
})(window);