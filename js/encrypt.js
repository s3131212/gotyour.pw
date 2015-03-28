$(document).ready(function(){
    $('#content , #pass').on('input change',function(){
        var data = $('#content').val();
        var pass = $('#pass').val();
        $('#aes').val(CryptoJS.AES.encrypt(data, pass));
        $('#des').val(CryptoJS.DES.encrypt(data, pass));
        $('#tdes').val(CryptoJS.TripleDES.encrypt(data, pass));
        $('#rabbit').val(CryptoJS.Rabbit.encrypt(data, pass));
        $('#rc4').val(CryptoJS.RC4.encrypt(data, pass));
        $('#rc4d').val(CryptoJS.RC4Drop.encrypt(data, pass));
    });
    $('#encrypteddata , #passs , #algorithm').on('input change',function(){
        var data = $('#encrypteddata').val();
        var pass = $('#passs').val();
        var ciphertext;
        if($('#algorithm').val() == "aes"){
            ciphertext = CryptoJS.AES.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "des"){
            ciphertext = CryptoJS.DES.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "tdes"){
            ciphertext = CryptoJS.TripleDES.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rabbit"){
            ciphertext = CryptoJS.Rabbit.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rc4"){
            ciphertext = CryptoJS.RC4.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }else if($('#algorithm').val() == "rc4d"){
            ciphertext = CryptoJS.RC4Drop.decrypt(data, pass).toString( CryptoJS.enc.Utf8 );
        }
        $('#ciphertext').val(ciphertext);
    });
});