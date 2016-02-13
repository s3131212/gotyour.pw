$(document).ready(function(){
    $('#string').on('input change keydown keyup keypress',function(){
        var data = $(this).val();
        $('#md5').val(CryptoJS.MD5(data));
        $('#sha1').val(CryptoJS.SHA1(data));
        $('#sha256').val(CryptoJS.SHA256(data));
        $('#sha512').val(CryptoJS.SHA512(data));
        $('#sha3').val(CryptoJS.SHA3(data));
       	$('#ripemd160').val(CryptoJS.RIPEMD160(data));
    });

    $('#string2 , #salt , #location').on('input change keydown keyup keypress',function(){
        var data2 = $('#string2').val();
        var salt = $('#salt').val();
        if($('#location').val() == "before" && salt != ''){
        	var datawithsalt = salt+data2;
        }else if($('#location').val() == "after" && salt != ''){
        	var datawithsalt = data2+salt;
        }else{
        	var datawithsalt = data2;
        }

        $('#pbkdf2_128').val(CryptoJS.PBKDF2(data2, salt, { keySize: 128/32 }));
        $('#pbkdf2_256').val(CryptoJS.PBKDF2(data2, salt, { keySize: 256/32 }));
        $('#pbkdf2_512').val(CryptoJS.PBKDF2(data2, salt, { keySize: 512/32 }));
        $('#md5s').val(CryptoJS.MD5(datawithsalt));
        $('#sha1s').val(CryptoJS.SHA1(datawithsalt));
        $('#sha256s').val(CryptoJS.SHA256(datawithsalt));
        $('#sha512s').val(CryptoJS.SHA512(datawithsalt));
        $('#sha3s').val(CryptoJS.SHA3(datawithsalt));
        $('#ripemd160s').val(CryptoJS.RIPEMD160(datawithsalt));
    });

    $('#string3 , #passphrase').on('input change keydown keyup keypress',function(){
        var data = $('#string3').val();
        var pass = $('#passphrase').val();
        $('#md5h').val(CryptoJS.HmacMD5(data, pass));
        $('#sha1h').val(CryptoJS.HmacSHA1(data, pass));
        $('#sha256h').val(CryptoJS.HmacSHA256(data, pass));
        $('#sha512h').val(CryptoJS.HmacSHA512(data, pass));
    });
});