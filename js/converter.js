function urlencode(str) {
    return encodeURIComponent(str);
};

function urldecode(str) {
    return decodeURIComponent(str);
};

(function (global) {
    var log = function () {},
    padding = '=',
        chrTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
            '0123456789+/',
        binTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];

    if (global.console && global.console.log) {
        log = function (message) {
            global.console.log(message);
        };
    }

    function utf8Encode(str) {
        var bytes = [],
            offset = 0,
            length, char;

        str = encodeURI(str);
        length = str.length;

        while (offset < length) {
            char = str[offset];
            offset += 1;

            if ('%' !== char) {
                bytes.push(char.charCodeAt(0));
            } else {
                char = str[offset] + str[offset + 1];
                bytes.push(parseInt(char, 16));
                offset += 2;
            }
        }

        return bytes;
    }

    function utf8Decode(bytes) {
        var chars = [],
            offset = 0,
            length = bytes.length,
            c, c2, c3;

        while (offset < length) {
            c = bytes[offset];
            c2 = bytes[offset + 1];
            c3 = bytes[offset + 2];

            if (128 > c) {
                chars.push(String.fromCharCode(c));
                offset += 1;
            } else if (191 < c && c < 224) {
                chars.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                offset += 2;
            } else {
                chars.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
                offset += 3;
            }
        }

        return chars.join('');
    }

    function encode(str) {
        var result = '',
            bytes = utf8Encode(str),
            length = bytes.length,
            i;

        for (i = 0; i < (length - 2); i += 3) {
            result += chrTable[bytes[i] >> 2];
            result += chrTable[((bytes[i] & 0x03) << 4) + (bytes[i + 1] >> 4)];
            result += chrTable[((bytes[i + 1] & 0x0f) << 2) + (bytes[i + 2] >> 6)];
            result += chrTable[bytes[i + 2] & 0x3f];
        }

        if (length % 3) {
            i = length - (length % 3);
            result += chrTable[bytes[i] >> 2];
            if ((length % 3) === 2) {
                result += chrTable[((bytes[i] & 0x03) << 4) + (bytes[i + 1] >> 4)];
                result += chrTable[(bytes[i + 1] & 0x0f) << 2];
                result += padding;
            } else {
                result += chrTable[(bytes[i] & 0x03) << 4];
                result += padding + padding;
            }
        }

        return result;
    }

    function decode(data) {
        var value, code, idx = 0,
            bytes = [],
            leftbits = 0,
            leftdata = 0;

        for (idx = 0; idx < data.length; idx++) {
            code = data.charCodeAt(idx);
            value = binTable[code & 0x7F];

            if (-1 === value) {
                log("WARN: Illegal characters (code=" + code + ") in position " + idx);
            } else {
                leftdata = (leftdata << 6) | value;
                leftbits += 6;

                if (leftbits >= 8) {
                    leftbits -= 8;

                    if (padding !== data.charAt(idx)) {
                        bytes.push((leftdata >> leftbits) & 0xFF);
                    }
                    leftdata &= (1 << leftbits) - 1;
                }
            }
        }

        if (leftbits) {
            throw "Corrupted base64 string!";
            return null;
        }

        return utf8Decode(bytes);
    }

    global.base64encode = encode;
    global.base64decode = decode;
}(window));

function htmlencode(str, type) {
    var output = '';
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (type == "decimal") {
            output += ('&#' + charCode + ';');
        } else if (type == "hexadecimal") {
            output += ('&#x' + charCode.toString(16) + ';');
        } else {
            throw "Unsupported output format!";
            return;
        }
    }

    return output;
};

function htmldecode(str) {
    var list = str.split(';');
    var output = '';
    for (var i = 0; i < list.length; i++) {
        var char = list[i];

        if (char == '') continue;
        if (char.indexOf('&#') == 0) {
            if (char.indexOf('x') == 2) {
                // Hexadecimal
                output += String.fromCharCode(parseInt(char.substr(3), 16));
            } else {
                // Decimal
                output += String.fromCharCode(parseInt(char.substr(2)));
            }
        } else {
            throw "Malformed HTML entity string!";
            return;
        }
    }

    return output;
};

$(document).ready(function(){
    $('#plain').on('input change keydown keyup keypress',function(){
        var data = $(this).val();
        $('#url').val(urlencode(data));
        $('#html').val(htmlencode(data, 'hexadecimal'));
        $('#decimal').val(htmlencode(data, 'decimal'));
        $('#base64').val(base64encode(data));
    });
    $('#url').on('input change keydown keyup keypress',function(){
        var data = urldecode($(this).val());
        $('#plain').val(data);
        $('#html').val(htmlencode(data, 'hexadecimal'));
        $('#decimal').val(htmlencode(data, 'decimal'));
        $('#base64').val(base64encode(data));
    });
    $('#html').on('input change keydown keyup keypress',function(){
        var data = htmldecode($(this).val());
        $('#url').val(data);
        $('#plain').val(data);
        $('#decimal').val(htmlencode(data, 'decimal'));
        $('#base64').val(base64encode(data));
    });
    $('#decimal').on('input change keydown keyup keypress',function(){
        var data = htmldecode($(this).val());
        $('#url').val(data);
        $('#html').val(htmlencode(data, 'hexadecimal'));
        $('#plain').val(data);
        $('#base64').val(base64encode(data));
    });
    $('#base64').on('input change keydown keyup keypress',function(){
        var data = base64decode($(this).val());
        $('#url').val(urlencode(data));
        $('#html').val(htmlencode(data, 'hexadecimal'));
        $('#decimal').val(htmlencode(data, 'decimal'));
        $('#plain').val(data);
    });
});