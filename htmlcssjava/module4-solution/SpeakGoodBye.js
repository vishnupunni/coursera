(function(window) {
    var byeSpeaker = {};
    byeSpeaker.speakWord = "Good Bye";
    byeSpeaker.speak = function(name) {
        console.log(this.speakWord + " " + name);
    }
    window.byeSpeaker = byeSpeaker;
})(window);