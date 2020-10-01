var app = new Vue({ 
    el: '#app',
    data: {
        message: 'NCC勉強スクリプトへようこそ',
        range: {
            "start": 196,
            "start_number": 1,
            "end": 199,
            "end_number": 3,
        },
        ready: false,
        datas: [],
        target_datas: [],
        current_number: 1,
        japanese_avalable: false,
        dev_avalable: true,
        answer: "",
        recognition: new webkitSpeechRecognition(),
        recognition_text: '待機中',
    },
    mounted: function(){
        axios
            .get('https://script.google.com/macros/s/AKfycbxRxrPQ0iTi8svExfQKFumxk7rESuEn1b5i9NZYaaYlS2CboRqE/exec?')
            .then(response => (this.datas = response.data));
        this.range.start = localStorage.range_start;
        this.range.start_number = localStorage.range_start_number;
        this.range.end = localStorage.range_end;
        this.range.end_number = localStorage.range_end_number;
    },
    methods: {
        start() {
            this.current_number = 1;
            this.target_datas = [];
            localStorage.range_start = this.range.start;
            localStorage.range_start_number = this.range.start_number;
            localStorage.range_end = this.range.end;
            localStorage.range_end_number = this.range.end_number;
            this.datas.forEach(data => {
                if(data.ss == this.range.start){
                    if(data.line >= this.range.start_number){
                        this.target_datas.push(data);
                    }
                }
                if(data.ss == this.range.end){
                    if(data.line <= this.range.end_number){
                        this.target_datas.push(data);
                    }
                }
            });
            this.ready = true;
        },
        shuffle() {
            this.current_number = 1;
            this.target_datas = shuffle_array(this.target_datas);
        },
        next() {
            if(this.current_number < this.target_datas.length){
                this.current_number += 1;
            }
            else{
                this.current_number = 1;
            }
        },
        toggle_japanese(){
            this.japanese_avalable = !this.japanese_avalable;
        },
        toggle_dev(){
            this.dev_avalable = !this.dev_avalable;
        },
        recog(){

        }
    },
});

const shuffle_array = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }