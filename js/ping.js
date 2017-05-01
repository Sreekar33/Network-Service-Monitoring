window.onload = function() {
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    (function (root, factory) {root.ping = factory(); 
    }(this, function () {
        function request_image(url) {
            return new Promise(function(resolve, reject) {
                var img = new Image();
                img.onload = function() { resolve(img); };
                img.onerror = function() { reject(url); };
                img.src = url;
            });
        }

        function ping(url, multiplier) {
            return new Promise(function(resolve, reject) {
                var start = (new Date()).getTime();
                var response = function() {
                    var delta = ((new Date()).getTime() - start);
                    delta *= (multiplier || 1);
                    resolve(delta); 
                };
                request_image(url).then(response).catch(response);
                
                // Set a timeout for max-pings, 1.5s,
                setTimeout(function() { reject(Error('Timeout')); }, 1500);
            });
        }
        return ping;
        
    }));
};

























