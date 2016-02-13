$(document).ready(function(){
    $('#content , #pass, #en_method, #en_padding').on('input change keydown keyup keypress',function(){
        var data = $('#content').val();
        var pass = $('#pass').val();
        $('#aes').val(CryptoJS.AES.encrypt(data, pass, { mode: CryptoJS.mode[$('#en_method').val()], padding: CryptoJS.pad[$('#en_padding').val()] }));
        $('#des').val(CryptoJS.DES.encrypt(data, pass, { mode: CryptoJS.mode[$('#en_method').val()], padding: CryptoJS.pad[$('#en_padding').val()] }));
        $('#tdes').val(CryptoJS.TripleDES.encrypt(data, pass ,{ mode: CryptoJS.mode[$('#en_method').val()], padding: CryptoJS.pad[$('#en_padding').val()] }));
        $('#rabbit').val(CryptoJS.Rabbit.encrypt(data, pass));
        $('#rc4').val(CryptoJS.RC4.encrypt(data, pass));
        $('#rc4d').val(CryptoJS.RC4Drop.encrypt(data, pass));
    });
    $('#ciphertext , #passs , #algorithm, #de_method, #de_padding').on('input change keydown keyup keypress',function(){
        var data = $('#ciphertext').val();
        var pass = $('#passs').val();
        var plaintext;
        if($('#algorithm').val() == "aes"){
            plaintext = CryptoJS.AES.decrypt(data, pass, { mode: CryptoJS.mode[$('#de_method').val()], padding: CryptoJS.pad[$('#de_padding').val()] }).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "des"){
            plaintext = CryptoJS.DES.decrypt(data, pass, { mode: CryptoJS.mode[$('#de_method').val()], padding: CryptoJS.pad[$('#de_padding').val()] }).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "tdes"){
            plaintext = CryptoJS.TripleDES.decrypt(data, pass, { mode: CryptoJS.mode[$('#de_method').val()], padding: CryptoJS.pad[$('#de_padding').val()] }).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rabbit"){
            plaintext = CryptoJS.Rabbit.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rc4"){
            plaintext = CryptoJS.RC4.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rc4d"){
            plaintext = CryptoJS.RC4Drop.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }
        $('#plaintext').val(plaintext);
    });
});