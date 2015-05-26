/**
 * validation : 입력값 유효성
 * ipv4, ipv6, port, email, 패스워드, telephone, 숫자와.체크, mask, mask에 대한 ip 유효성,
 * 숫자만입력, 1~500까지숫자,
 *
 * casting : 형변환이 필요할때
 * encoding, decoding,
 *
 * DataExpression : 데이터 변환
 *
 * calculation : 값을 구할때
 * 문자바이트계산, mask의ip범위구하기,
 *
 * tip : table이나 input에 사용자에게 필요한 메세지를  (툴팁, alert 등등을 이용해)띄우고자할때
 * table tooltip 나타내기,
 *
 */
define(function(require) {

	"use strict";

	var $ = require('jquery');
	// require i18n
	var errorLocale = require('i18n!nls/error');

	return {
		validation: {
			// ipv4 검증 
			validateIp: function(data) {
				if (!data.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
					return errorLocale.validation.invaildIp;
				}
				return true;
			},
			// ipv6 검증 
			validateIpv6: function(data) {
				if (!data.match(/^([0-9a-fA-F]{4}|0)(\:([0-9a-fA-F]{4}|0)){7}$/)) {
					return errorLocale.validation.invaildIpv6;
				}
				return true;
			},
			// port 검증, port범위  0 ~ 65535
			validatePort: function(data) {
				if (!data.match(/^(6553[0-5]|655[0-2]\d|65[0-4]\d\d|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}|0)$/)) {
					return errorLocale.validation.invaildPort;
				}
				return true;
			},
			// email 검증
			validateEmail: function(data) {
				if (!data.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
					return errorLocale.validation.invaildEmail;
				}
			},
			// 입력 바이트 수를 계산하는 함수 - 키 입력시 체크
			inputByteCheck : function(control_name, max_size) {
				var control_value = control_name; // 이벤트가 일어난 컨트롤의 value
				//console.log('입력한 값'+control_value);		
				var str_len = control_value.length; // 전체 길이
				//console.log(str_len);
				var li_max = max_size; // 제한할 글자수 크기
				var li_byte = 0; // 한글일 경우는 2, 그 밖에는 1을 더함
				var li_len = 0; // substring 하기 위해서 사용
				var ls_one_char = ""; // 한 글자씩 검사한다.
				
				for (var i = 0; i < str_len; i++) {
					ls_one_char = control_value.charAt(i); // 한글자 추출
					//console.log(ls_one_char);
					// 한글이면 2를 더한다.
					if (escape(ls_one_char).length > 4) {
						li_byte += 2;
					}
					// 그 밖의 경우는 1을 더한다.
					else {
						li_byte++;
					}
					
					// 전체 크기가 li_max를 넘지 않는 경우
					if (li_byte <= li_max) {
						li_len = i + 1;
					}
				}
				// 전체길이를 초과하면
				if (li_byte > li_max) {
				return errorLocale.validation.password.notInputByteSizes; // 10 글자를 초과 입력할 수 없습니다. 다시 입력 바랍니다.
				}
				return true;
			}, 
			// 패스워드 검증 9자리 이상 영대소문자, 숫자, 특수문자 3가지 이상의 규칙조합 
			validatePassword: function(username, password, newPassword1, newPassword2) {

				// 재입력 일치 여부
				if (newPassword1 != newPassword2) {
					return errorLocale.validation.password.notEqualRetype;
				}

				// 길이
				if (!/^[a-zA-Z0-9!@#$%^&*()?_~]{9,20}$/.test(newPassword1)) {
					return errorLocale.validation.password.invalidRule;
				}

				// 영문, 숫자, 특수문자 혼용
				var chk = 0;
				if (newPassword1.search(/[0-9]/g) != -1) chk++;
				if (newPassword1.search(/[a-z]/g) != -1) chk++;
				if (newPassword1.search(/[A-Z]/g) != -1) chk++;
				if (newPassword1.search(/[!@#$%^&*()?_~]/g) != -1) chk++;
				if (chk < 3) {
					return errorLocale.validation.password.invalidMix;
				}

				// 동일한 문자/숫자 4이상, 연속된 문자
				if (/(\w)\1\1\1/.test(newPassword1) || this.isContinuedValue(newPassword1)) {
					return errorLocale.validation.password.invalidContinue;
				}

				// 아이디 포함 여부
				if (newPassword1.search(username) > -1) {
					return errorLocale.validation.password.equalUsername;
				}

				// 기존 비밀번호와 새 비밀번호 일치 여부
				if (password == newPassword2) {
					return errorLocale.validation.password.invalidRenewal;
				}
				return true;
			},
			isContinuedValue: function(value) {
				var intCnt1 = 0;
				var intCnt2 = 0;
				var temp0 = "";
				var temp1 = "";
				var temp2 = "";
				var temp3 = "";

				for (var i = 0; i < value.length - 3; i++) {
					temp0 = value.charAt(i);
					temp1 = value.charAt(i + 1);
					temp2 = value.charAt(i + 2);
					temp3 = value.charAt(i + 3);

					if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == 1 && temp1.charCodeAt(0) - temp2.charCodeAt(0) == 1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) == 1) {
						intCnt1 = intCnt1 + 1;
					}

					if (temp0.charCodeAt(0) - temp1.charCodeAt(0) == -1 && temp1.charCodeAt(0) - temp2.charCodeAt(0) == -1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) == -1) {
						intCnt2 = intCnt2 + 1;
					}
				}

				return (intCnt1 > 0 || intCnt2 > 0);
			},
			// 전화번호 
			validateTelephone: function(data) {
				if (!data.match(/\d{2,3}\-\d{3,4}\-\d{4}/)) {
					return errorLocale.validation.invaildTelephone;
				}
			},
			//TODO return 값 변경
			// 숫자와 '.'만 체크  
			validateNumberAndDot: function(data) {
				if (!data.match(/[0-9.]/)) {
					return alert('숫자와 . 만 입력가능합니다.');
				}
				return true;
			},
			// mask 8~32 까지 
			validateMask: function(data) {
				if (!data.match(/(3[0-2]|[12][0-9]|[8,9])$/)) {
					return errorLocale.validation.invaildMask;
				}
				return true;
			},

			// mask 값에 맞는 ip 형식이 맞는지 판단
			validateIpAndMask: function(ip, mask) {

				var ipArray = ip.split('.');
				if (mask == 32) {
					if (ipArray[0] == 0 || ipArray[1] == 0 || ipArray[2] == 0 || ipArray[3] == 0) {
						return errorLocale.validation.invaildMaskAndIp;
					}
				} else if (24 <= mask && mask < 32) {
					if (ipArray[3] != 0) {
						return errorLocale.validation.invaildMaskAndIp;
					}
					return true;
				} else if (16 <= mask && mask < 24) {
					if (ipArray[2] != 0 || ipArray[3] != 0) {
						return errorLocale.validation.invaildMaskAndIp;
					}
					return true;
				} else if (8 <= mask && mask < 16) {
					if (ipArray[1] != 0 || ipArray[2] != 0 || ipArray[3] != 0) {
						return errorLocale.validation.invaildMaskAndIp;
					}
					return true;
				} else if (8 <= mask && mask <= 32 && ipArray[0] == 0) {
					return errorLocale.validation.invaildMaskAndIp;
				}
				return true;
			},

			// 1부터 500까지의 숫자를 체크한다.  099=false, 99=true
			validateNumber500Range: function(data) {
				if (!data.toString().match(/^([1-9]|[1-9][0-9]|[1-4][0-9][0-9]|[5][0][0])$/)) {
					return errorLocale.validation.invaildNumber500Range;
				} else {
					return true;
				}
			},

			validateNull: function(data) {
				if (!data.match(/\0/)) {
					return errorLocale.validation.invaildNull;
				}
				
			},
			// 0 부터 무한대 숫자까지 0999(x), 
			validateNumber: function(data) {

				if (!data.match(/^([0-9]|[1-9][0-9]+)$/)) {
					return errorLocale.validation.invaildNumber;
				}
				return true;
			},
			
			validateIsNull: function(data) {
				if (data == "") {
					return errorLocale.validation.invaildNull;
				}else{
					return true;
				}
				
			},
			// 영문 여부 확인 (영문일 경우 True)
			isEng : function(value) {
				if(!value.match(/^[a-zA-Z]+$/)) {
					return errorLocale.validation.invaildNumber;
				}	
				return true;
			},

		},
		Casting: {
			// encode
			encodeUri: function(data) {
				return encodeURI(data);
			},
			// decode
			decodeUri: function(data) {
				return decodeURI(data);
			},
			// ip를 long 형식으로 
			convertIpToLong: function(ip){
				var data = ip.split('.');
				var num = ((((((+data[0])*256)+(+data[1]))*256)+(+data[2]))*256)+(+data[3]);
				return num;
			},
			// long형식의 ip를 ip형식으로 (1.1.1.1)
			convertLongToIp : function(num){
				var longData = num%256;
				for (var i = 3; i > 0; i--) { 
				num = Math.floor(num/256);
				longData = num%256 + '.' + longData;}
				//console.log('longData='+longData);
				return longData;
			}
		},
		Calculation: {
			// 문자열 byte 계산
			stringByteLength: function(data) {
				var i = 0;
				var c;
				for (var b = i = 0; c = data.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
				return b;
			},
			//cidr 을 이용한 ip 범위 구하기 
			parseCidrRangeIp: function(ip, mask) {
				var CIDR = ip + '/' + mask;

				//Beginning IP address
				var begin = CIDR.substr(CIDR, CIDR.indexOf('/'));
				var end = begin;
				var off = (1 << (32 - parseInt(CIDR.substr(CIDR.indexOf('/') + 1)))) - 1;
				var sub = begin.split('.').map(function(a) {
					return parseInt(a)
				});

				//An IPv4 address is just an UInt32...
				var buf = new ArrayBuffer(4); //4 octets 
				var i32 = new Uint32Array(buf);

				//Get the UInt32, and add the bit difference
				i32[0] = (sub[0] << 24) + (sub[1] << 16) + (sub[2] << 8) + (sub[3]) + off;

				//Recombine into an IPv4 string:
				var end = Array.apply([], new Uint8Array(buf)).reverse().join('.');

				return [begin, end];
			}
		},
		Tip: {
			// 테이블의 가이드메세지를 띄워줄때 사용, 
			// 단, data-toggle 속성과 title 값이 테이블안에 있어야함
			defualtTooltip: function() {
				$('[data-toggle="tooltip"]').tooltip();
			},
			/**
			 * Utils.validation Message를 보여줄수 있는 tooltips
			 * selector  : tooltips을 나타낼 selector $("#aaa")
			 * msg : tootips에 나타날 메세지 i18n 값
			 */
			validationTooltip: function(selector, msg) {
				if (msg != true) {
					selector.attr('data-toggle', 'tooltip');
					selector.addClass('validation-error');
					selector.tooltip({
						title: msg,
						placement: 'bottom'
					}).tooltip('show');
					return false;
				} else {
					if (selector.attr('data-toggle') == 'tooltip') {
						selector.removeAttr('data-toggle');
						selector.removeClass('validation-error');
						selector.tooltip('destroy');
					}
					return true;
				}
			}
		}
	};

});
