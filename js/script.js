var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        test: 'test',
    }
});

let request = new XMLHttpRequest();

let url = "https://script.google.com/macros/s/AKfycbxRxrPQ0iTi8svExfQKFumxk7rESuEn1b5i9NZYaaYlS2CboRqE/exec?";
let query_dict = {
    "start": 196,
    "start_number": 1,
    "end": 199,
    "end_number": 3,
}
// for(let key in query_dict){
//     url = url + key + "=" + query_dict[key] + "&"
// }

var data_list;
var ready = false;
var uttr = new SpeechSynthesisUtterance();

console.log(encodeURI(url));
request.open('GET', encodeURI(url), true);
request.responseType = 'json';

request.onload = function(){
    data_list = this.response;
    console.log(data_list);
    ready = true;
};

request.send();

function start(){
    
}

function speak(){
    console.log(data_list);
    data_list.forEach(data => {
        speak_japanese(data.Japanese);
    });
}

function speak_japanese(word){
    console.log(word);
    uttr.lang = "ja-JP";
    uttr.text = word;
    speechSynthesis.speak(uttr);
}