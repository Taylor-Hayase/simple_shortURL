var endpoint = "https://www.jsonstore.io/83a1e0559106759d8251913129551b1a83a37ca644c32375579ee94e2886454c";

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function encode() {
    var result = 0;
    var str ="";
    var possible = "ABCD1EF3G2HI5J4KLM7N6OP8QR9STUVWXYZabcdefghijklmnopqrstuvwxyz";
    var url = document.getElementById("urlinput").value;

    for (var i = 0; i < url.length; i++) {
        result += url.charCodeAt(i);
    }

    while (result > 1) {
        var remainder = Math.floor(result % 62);
        console.log(remainder);
        str += possible.charAt(remainder);
        Math.floor(result /= 62);
    }

    /*while (result != 0) {
        str += possible.charAt(Math.random() * result);
        result = result / possible.length;
    }*/
    return str;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = encode();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})

}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        document.write(data);

        if (data != null) {
            window.location.href = data;
        }

    });
}




