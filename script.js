var casellaAperta = "";
var immagineGirata = "";
var Counter = 0;
var prendiImmagine = 0;

var tabellaImmagini = "#tabella";

var immagini = [
    'img/amare.png',
    'img/amare1.png',
    'img/arrabbiato.png',
    'img/bello.png',
    'img/piangere.png',
    'img/ridere.png',
    'img/shock.png',
    'img/spavento.png'

]

function Randomico(MaxValue, MinValue) {
        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }

function ShuffleImages() {
    var totImmagini = $(tabellaImmagini).children();
    var immagineSlezionata = $(tabellaImmagini + " div:first-child");
    var nuovoArrayImmagini = new Array();

    for (var i = 0; i < totImmagini.length; i++) {
        nuovoArrayImmagini[i] = $("#" + immagineSlezionata.attr("id") + " img").attr("src");
        immagineSlezionata = immagineSlezionata.next();
    }
immagineSlezionata = $(tabellaImmagini + " div:first-child");

    for (var z = 0; z < totImmagini.length; z++) {
    var RandomNumber = Randomico(0, nuovoArrayImmagini.length - 1);

        $("#" + immagineSlezionata.attr("id") + " img").attr("src", nuovoArrayImmagini[RandomNumber]);
        nuovoArrayImmagini.splice(RandomNumber, 1);
        immagineSlezionata = immagineSlezionata.next();
    }
}

function ResetGame() {
    ShuffleImages();
    $(tabellaImmagini + " div img").hide();
    $(tabellaImmagini + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    casellaAperta = "";
    immagineGirata = "";
    prendiImmagine = 0;
    return false;
}

function cartaAperta() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        $(tabellaImmagini + " div").unbind("click", cartaAperta);

        $("#" + id + " img").slideDown('fast');

        if (immagineGirata == "") {
            casellaAperta = id;
            immagineGirata = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $(tabellaImmagini + " div").bind("click", cartaAperta)
            }, 300);
        } else {
            cartaCorrente = $("#" + id + " img").attr("src");
            if (immagineGirata != cartaCorrente) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + casellaAperta + " img").slideUp('fast');
                    casellaAperta = "";
                    immagineGirata = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + casellaAperta + " img").parent().css("visibility", "hidden");
                prendiImmagine++;
                casellaAperta = "";
                immagineGirata = "";
            }
setTimeout(function() {
                $(tabellaImmagini + " div").bind("click", cartaAperta)
            }, 400);
        }
        Counter++;
        $("#counter").html("" + Counter);

        if (prendiImmagine == immagini.length) {
            $("#counter").prepend('<span id="success">Congratulazioni hai vinto! </span>');
        }
    }
}

$(function() {

for (var y = 1; y < 3 ; y++) {
    $.each(immagini, function(i, val) {
        $(tabellaImmagini).append("<div id=card" + y + i + "><img src=" + val + " />");
    });
}
    $(tabellaImmagini + " div").click(cartaAperta);
    ShuffleImages();
});