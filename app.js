new Vue({
    el: '#app',
    data: {
        mojaSnaga: 100,
        shefovaSnaga: 100,
        igraTece: false,
        arrpor: [],
        mojBackColor: 'green',
        shefBackColor: 'green'
    },
    methods: {
        pokreniNovuIgru: function () {
            this.igraTece = true;
            this.mojaSnaga = 100;
            this.shefovaSnaga = 100;
            this.arrpor = [];
        },
        napad: function () {
            var snaga = this.calculatesnaga(3, 10);
            this.shefovaSnaga -= snaga;
            this.arrpor.unshift({
                isJa: true,
                text: 'Udario sam Shefa snagom ' + snaga
            });
            if (this.provjeriPobjedu()) {
                return;
            }

            this.shefofNapad();
        },
        jaciNapad: function () {
            var snaga = this.calculatesnaga(10, 20);
            this.shefovaSnaga -= snaga;
            this.arrpor.unshift({
                isJa: true,
                text: 'Udario sam Shefa snagom  ' + snaga
            });
            if (this.provjeriPobjedu()) {
                return;
            }
            this.shefofNapad();
        },
        povratiSnagu: function () {
            if (this.mojaSnaga <= 90) {
                this.mojaSnaga += 10;
            } else {
                this.mojaSnaga = 100;
            }
            this.arrpor.unshift({
                isJa: true,
                text: 'Povratio sam snagu za 10'
            });
            this.shefofNapad();
        },
        odustani: function () {
            this.igraTece = false;
            location.reload();
        },
        shefofNapad: function() {
            var snaga = this.calculatesnaga(5, 12);
            this.mojaSnaga -= snaga;
            this.provjeriPobjedu();
            this.arrpor.unshift({
                isJa: false,
                text: 'Shef me udario snagom  ' + snaga
            });
        },
        calculatesnaga: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        provjeriPobjedu: function() {
            if (this.shefovaSnaga <= 0) {
                if (confirm('Pobijedio si Shefa! Nova igra?')) {
                    location.reload();
                } else {
                    this.igraTece = false;
                    location.reload();
                }
                return true;
            } else if (this.mojaSnaga <= 0) {
                if (confirm('Shef te nokautirao! Ustaj i pokreni novu igru!')) {
                    location.reload();
                } else {
                    this.igraTece = false;
                    location.reload();
                }
                return true;
            }
            return false;
        }
    },
    watch: {

        mojaSnaga: function(val) {

            if(val <= 49) {

                this.mojBackColor = "red";
            }
        },
        shefovaSnaga: function(val) {

            if(val <= 49) {

                this.shefBackColor = "red";
            }
        }
    }
});
