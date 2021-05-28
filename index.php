<?php

header('Content-Type: text/html; charset=utf-8');
include 'env_conn.php';

//get variables passed in by url and load record data in Torah tab
$url_b = isset($_GET['b']) ? $_GET['b'] : NULL;
$url_s = isset($_GET['s']) ? $_GET['s'] : NULL;
$url_r = isset($_GET['r']) ? $_GET['r'] : NULL;
$url_rn = isset($_GET['redirect']) ? $_GET['redirect'] : NULL;

if(!isset($_SESSION['theme'])){ 
    $_SESSION['theme'] = 1;
}
if(!isset($_SESSION['fontsize'])){ 
    $_SESSION['fontsize'] = 18;
}
if(!isset($_SESSION['show_xlit'])){ 
    $_SESSION['show_xlit'] = "xlit";
}
if(!isset($_SESSION['word_toggle'])){ 
    $_SESSION['word_toggle'] = 1;
}
if(!isset($_SESSION['aleph_tav'])){ 
    $_SESSION['aleph_tav'] = 0;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Hebrew Records</title>
<base href="/" />

<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Hebrew Records, Torah, Neḇi'im, Kethaḇi'im, Sahĕd ha Mashiyaḵ, by David Whitestone, 2020, books, ebooks, The Torah, The Writings, The Prophets, The witness of the Messiah, Book of Hanok, Book of Yashar, The Books of Aḏam - Restored Names, paperback, hardcover, free ebook, e-book, sacred-texts, sacred texts, the scriptures, youversion" />
<meta name="keywords" content="Torah Book Adam Eve Enoch Solomon Fourth Maccabees Ahikar Twelve Patriarchs Reuben Simeon Levi Judah Issachar Zebulun Dan Naphtali Gad Asher Joseph Benjamin lost books Hanok Hawwah Jasher Yashar Israel Yishra,el David Dawid Abraham Isaac Jacob Yitsh,aq Ya,aqob Messiah Torah Neḇi'im Kethaḇi'im Sahĕd ha Mashiyaḵ TaNaK Bible Apocrypha Pseudoepigrapha nephelim giants tribulation ressurection Elohim Yahuah Yahushua sacred-texts sacred texts the scriptures youversion" />
<meta property="og:title" content="Hebrew Records, Restored Names" />
<meta property="og:description" content="Hebrew Records, by David Whitestone, 2020, the Torah, the Writings, the Prophets, the Messiah, the books of Aḏam - Restored Names, book of Hanok, book of Yashar, books, ebooks, paperback, hardcover, sacred-texts, sacred texts, the scriptures, youversion" />
<meta property="og:image" content="" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://hebrewrecords.com/" />

<noscript>Your browser does not support JavaScript.<br>Enable JavaScript to continue.</noscript>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/dwhitestone/dist/jquery-3.5.1.min.js" async></script>

<link rel="preload" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/style-1.1.2.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/style-1.1.2.min.css">

<link rel="prefetch" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/jquery-ui-1.0.0.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/jquery-ui-1.0.0.min.css">

<link rel="preload" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/day-1.0.1.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/day-1.0.1.min.css" data-role="day">

<link rel="prefetch" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/night-1.0.1.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/night-1.0.1.min.css" data-role="night" disabled>

<!--
<script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="js/jquery-ui-1.12.1/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="css/day.min.css" data-role="day">
<link rel="stylesheet" type="text/css" href="css/night.min.css" data-role="night" disabled>
<link rel="stylesheet" type="text/css" href="css/style.min.css">
-->
<!--<link href="/images/favicon.ico" rel="icon" type="image/x-icon" />-->
<link rel="apple-touch-icon" sizes="180x180" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://cdn.jsdelivr.net/gh/dwhitestone/dist/favicon-16x16.png">
<!--<link rel="manifest" href="/images/site.webmanifest">-->

</head>
<body style="min-height:460px;min-width:230px;">

<div style="padding:10px;">
	Hebrew Records are no longer available to the general public. 
	<br><br>
	If you would like access, send a request to david @ hebewrecords . com.
	<br><br>
	Seek <span id="thenames">JWJY TA</span> through <span id="thenames">`WSWJY</span> ha Mashiyaḵ.
	<br><br>
	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100% Non-profit
	<br>
	• Download Free & Prints at Cost
	<br>
	• Read Free
	<br>
	• Search Hebrew Records
	<br>
	• Custom Settings</b>
	<br><br>
	<?php include 'book_torah.php';?>
	<br><br>
	<?php include 'book_nebim.php';?>
	<br><br>
	<?php include 'book_kethabim.php';?>
	<br><br>
	<?php include 'book_mashiyak.php';?>
</div>

<script rel="preload" type="text/javascript" src="https://cdn.jsdelivr.net/gh/dwhitestone/dist/jquery.mobile-1.5.0-alpha.1.min.js" async></script>
<script type="text/javascript" async>$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
<script rel="prefetch" type="text/javascript" src="https://cdn.jsdelivr.net/gh/dwhitestone/dist/mediabuffer.min.js" async></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/dwhitestone/dist/jquery-ui.min.js" async></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/dwhitestone/dist/scripts-1.2.1.min.js" async></script>

<script type="text/javascript">

	document.addEventListener("DOMContentLoaded", function() {
	  
	  var lazyloadImages;    

		if ("IntersectionObserver" in window){
			lazyloadImages = document.querySelectorAll(".lazy");
			var imageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry){
			if (entry.isIntersecting) {
				var image = entry.target;
					//console.log(image)
					//image.src = image.dataset.src; //original didnt work with CDN
					image.src = $(image).attr('src');
					//console.log(image.src)
					image.classList.remove("lazy");
					imageObserver.unobserve(image);
					}
				});
			});

			lazyloadImages.forEach(function(image) {
				imageObserver.observe(image);
			});
		
		}else{  
			var lazyloadThrottleTimeout;
			lazyloadImages = document.querySelectorAll(".lazy");
		
			function lazyload () {
				if(lazyloadThrottleTimeout) {
					clearTimeout(lazyloadThrottleTimeout);
				}    
				lazyloadThrottleTimeout = setTimeout(function() {
					var scrollTop = window.pageYOffset;
					lazyloadImages.forEach(function(img) {
						if(img.offsetTop < (window.innerHeight + scrollTop)) {
							img.src = img.dataset.src;
							img.classList.remove('lazy');
						}
					});
					if(lazyloadImages.length == 0) { 
						document.removeEventListener("scroll", lazyload);
						window.removeEventListener("resize", lazyload);
						window.removeEventListener("orientationChange", lazyload);
					}
				}, 20);
			}

			document.addEventListener("scroll", lazyload);
			window.addEventListener("resize", lazyload);
			window.addEventListener("orientationChange", lazyload);
		}

		if(document.readyState == 'complete'){
			$.when($("#splash").removeClass("splash")).then(function(){
				$.when($(".body_c").show()).then(function(){
					$(".foot_c").show()
				});
			});
		}else{
			document.onreadystatechange = function(){
				if(document.readyState==="complete"){
					$.when($("#splash").removeClass("splash")).then(function(){
						$.when($(".body_c").show()).then(function(){
							$(".foot_c").show()
						});
					});
				}
			}
		}
	});
	
</script>
    <script> 
        $(document).ready(function() { 
          
            $(function() { 
                $( "#my_date_picker" ).datepicker(); 
            }); 
        }) 
    </script> 
</body>
</html>
