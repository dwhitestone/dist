
	$(document).ready(function(){

		//####### START video buffering START ####### 
		function videoLoad(video_id) {
			console.log('Video loading');
			
			document.getElementById('vid_'+video_id).style.display = 'none'; // replace video element with
			document.getElementById('poster_'+video_id).style.display = 'block'; // poster while buffering
			
			document.getElementById('video-progress-container_'+video_id).innerHTML = 'Buffering: <progress id="video-progress_'+video_id+'" value="0" max="100">0%</progress>';
			//document.getElementById('video-button').style.display = 'none'; // no longer needed
			
			var videoBuffer = new Mediabuffer(document.getElementById('vid_'+video_id), videoProgress, videoReady);
			
			videoBuffer.load();
			document.getElementById('video-progress-container_'+video_id).style.display = 'none'; // no longer needed
		}
		function videoProgress(percentBuffered) {
			var video_id = $("#video_load_number").val();
			console.log('Video progress: ' + percentBuffered + '%');
			document.getElementById('video-progress_'+video_id).setAttribute('value', percentBuffered);
			document.getElementById('video-progress_'+video_id).innerHTML = percentBuffered + '%';
		}
		function videoReady() {
			console.log('Video ready!');
			
			var video_id = $("#video_load_number").val();

			setTimeout(function() {	
				$("#video_load_number").val(''); 	
			}, 1);
			
			document.getElementById('video-progress_'+video_id).setAttribute('value', 100);
			document.getElementById('video-progress_'+video_id).innerHTML = '100%';
			
			document.getElementById('vid_'+video_id).style.display = 'block'; // restore video element
			document.getElementById('poster_'+video_id).style.display = 'none';
			
			document.getElementById('vid_'+video_id).setAttribute('controls', 'controls');
			
			document.getElementById('vid_'+video_id).play();
			
		}
		// ================================================================================
		/*
		function audioLoad() {
			console.log('Audio loading');
			
			document.getElementById('audio-progress-container').innerHTML = 'Buffering: <progress id="audio-progress" value="0" max="100">0%</progress>';
			document.getElementById('audio-button').style.display = 'none'; // no longer needed
			
			audioBuffer.load();
		}
		function audioProgress(percentBuffered) {
			console.log('Audio progress: ' + percentBuffered + '%');
			document.getElementById('audio-progress').setAttribute('value', percentBuffered);
			document.getElementById('audio-progress').innerHTML = percentBuffered + '%';
		}
		
		function audioReady() {
			console.log('Audio ready!');
			
			document.getElementById('audio-progress').setAttribute('value', 100);
			document.getElementById('audio-progress').innerHTML = '100%';
			
			document.getElementById('audio').play();
		}*/		
		// ================================================================================
		//var videoBuffer = new Mediabuffer(document.getElementById('video'), videoProgress, videoReady);
		//document.getElementById('video-button').addEventListener('click', videoLoad, true);
		//document.getElementById('video-button').style.display = 'inline-block';

		$("body").on('click', ".video,.poster", function(){
			//pauseAllVideo();
			var video_id = $(this).attr('data-video-id');
			$("#video_load_number").val(video_id);
			videoLoad(video_id);
		});
		/*
		var audioBuffer = new Mediabuffer(document.getElementById('audio'), audioProgress, audioReady);			
		document.getElementById('audio-button').addEventListener('click', audioLoad, true);			
		document.getElementById('audio-button').style.display = 'inline-block';
		*/
		//####### START video buffering START ####### 
		

		//site wide click event
		$(document).click(function(e) {
			// e.target is the element which has been clicked.
			pauseAllVideo();	
		});	
		
		$("body").on('click', "#prev_image", function(){
		  prev();
		});
		$("body").on('click', "#next_image", function(){
		  next();
		});

		var images=["image1","image2","image3","image4","image5","image6"];
		function prev(){
			//$('#slideshow_image').fadeOut(300,function(){
				//var prev_val=document.getElementById("img_no").value;
				var prev_val=Number(prev_val)-1;
				if(prev_val<=-1){
					prev_val=images.length-1;
				}
				$('#slideshow_image').attr('src','images/'+images[prev_val]+'.png');
				document.getElementById("img_no").value=prev_val;
			//});
			//$('#slideshow_image').fadeIn(1000);
		}
		function next(){
			//$('#slideshow_image').fadeOut(300,function(){
				//var next_val=document.getElementById("img_no").value;
				var next_val=Number(next_val)+1;
				if(next_val>=images.length){
					next_val=0;
				}
				$('#slideshow_image').attr('src','images/'+images[next_val]+'.png');
				document.getElementById("img_no").value=next_val;
			//});
			//$('#slideshow_image').fadeIn(1000);
		}

        function saveLastBookLocation(book_id,section_id,record_id){
			//save users last location
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'save_last_book_location',
                    book_id: book_id,
                    section_id: section_id,
                    record_id: record_id
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					loadBooks();
				}
			});  
    	};

		$("body").on('click', ".load_last,.load_last_sub", function(){
			//save users last location
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'get_last_book_location'
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					var data = JSON.parse(response);
					setTimeout(function() {  
						loadBookData(data[0].book_id,data[0].section_id,data[0].record_id)
						loadBooks();
					}, 1);		
				}
			});
		});

		$("body").on('click', ".load_last_book", function(){
			var book_id = $(this).attr('data-book-id');
			var section_id = $(this).attr('data-sec-id');
			var record_id = $(this).attr('data-rec-id');
			var action = 'search';

			setTimeout(function() {  
				loadBookData(book_id,section_id,record_id,action)
			}, 1);			
		});
		
        function saveLastLocation(last_tab,last_subtab,last_loc){

			//save users last location
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'save_user_location',
                    last_tab: last_tab,
                    last_subtab: last_subtab,
                    last_loc: last_loc
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					
				}
			});  
    	};

        function loadLastLocation() {
			//direct user to last location if session variables are set
			
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'load_user_location'
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
			
					var data = JSON.parse(response);

					if(data[0].last_tab=="Menu"){							
						if(data[0].last_subtab!=""){
							//load link
							setTimeout(function() { 
							$('[data-menu="menu_'+data[0].last_subtab+'"]').removeClass('menu_list').addClass('menu_list-active');
							showMenuPage(data[0].last_subtab);	
							}, 1);	
						}					
						if(data[0].last_tab!=""){
							showPage(data[0].last_tab);
						}
					}else if(data[0].last_tab=="Search"){						
						if(data[0].last_tab!=""&&data[0].last_subtab!=""&&data[0].last_loc!=""){
							//load link
							setTimeout(function() {	
								loadSearchDetails(data[0].last_loc,""); 	
							}, 1);
						}else if(data[0].last_tab!=""&&data[0].last_subtab!=""&&data[0].last_loc==""){
							loadSearchTab(data[0].last_subtab);
						}
						if(data[0].last_subtab==2){
							$("#search_tab_hist").trigger('click');
						}					
						if(data[0].last_tab!=""){
							showPage(data[0].last_tab);
						}
					}else if(data[0].last_tab=="Read"){
						if(data[0].last_subtab=="tab_3"&&data[0].last_loc!=""){		
							//load last book
							var arr = data[0].last_loc;
							var book_id = arr.split(/[, ]+/).reverse().pop();
							
							var section_id = arr.split(',')[1];
							
							var record_id = arr.split(/[, ]+/).pop();
							
							setTimeout(function() {  
								loadBookData(book_id,section_id,record_id,'url');
							}, 100);
						}					
						if(data[0].last_tab!=""){
							showPage(data[0].last_tab);
						}
					}else if(data[0].last_tab=="Books"){											
						if(data[0].last_subtab!=""){
							//load link
							setTimeout(function() {  
								$('[tab-id="'+data[0].last_subtab+'"]').trigger('click');
							}, 1);	
						}						
						if(data[0].last_loc!=""){
							//load writing
							setTimeout(function() {  
								$("#"+data[0].last_loc).trigger('click');
							}, 1);	
						}					
						if(data[0].last_tab!=""){
							showPage(data[0].last_tab);
						}
					}else if(data[0].last_tab=="Tent"){								
						if(data[0].last_subtab!=""){
							//load link
							setTimeout(function() {  
								$('[tab-id="'+data[0].last_subtab+'"]').trigger('click');
							}, 1);	
						}						
						if(data[0].last_loc!=""){
							//load writing
							setTimeout(function() {  
								$("#"+data[0].last_loc).trigger('click');
							}, 1);	
						}					
						if(data[0].last_tab!=""){					
							showPage(data[0].last_tab);
							$('[tab-id="'+data[0].last_subtab+'"]').trigger('click');

							if(data[0].last_subtab=="tab_tent_2"){
								$("#writeup_container").html("");
								setTimeout(function() {
									$(".writeup_menu_list-active").each(function() {
										$(this).trigger('click');
									});
								}, 1);
								setTimeout(function() {
									$('.load_writeup_content').each(function() {
										if($(this).attr('id')===data[0].last_loc){		
											$(this).trigger('click');
										}
									});
								}, 1);
							}else if(data[0].last_subtab=="tab_tent_3"){
								$("#media_container").html("");
								setTimeout(function() {
									$(".media_menu_list-active").each(function() {
										$(this).trigger('click');
									});
								}, 1);
								setTimeout(function() {
									$('.load_media_content').each(function() {
										if($(this).attr('id')==data[0].last_loc){
											$(this).trigger('click');
										}
									});
								}, 1);
							}	
						}
					};
					saveLastLocation(data[0].last_tab,data[0].last_subtab,data[0].last_loc);
					return false;
				}
			});  			
    	};

        //load tab 2 data - BOOK SECTION NUMBERS
		$("body").on('click', ".load_sections", function(){
				
			var book_id = $(this).attr('data-book_id');
			var book_title_ib = $(this).attr('data-name_ibri');
			var book_title_en = $(this).attr('data-name_english');
			var parent_title_ib = $(this).attr('data-parent');
			var parent_title_en = $(this).attr('data-en');
			var action = $("#action").val();
			
			setTimeout(function() {  
				loadSections(book_id,book_title_ib,book_title_en,parent_title_ib,parent_title_en,action);
			}, 1);		
    	});				
        //load tab 2 data - BOOK SECTION NUMBERS
		function loadSections(book_id,book_title_ib,book_title_en,parent_title_ib,parent_title_en,action){

			if(action==undefined){
				action = '';
			}
			$(".loading_message").html("<br>Loading Hebrew sections...<br><br><div class=\"loader_red\"></div>");
			$("#books_list_tab").hide();
            $("#book_section").html("");
			
            hidePaginate();
            $("#r_display").hide();
            $("#r_display_all").hide();
			
			$(".scroll_read").css("padding","");
			$(".scroll_read").css("padding","100px 10px 0px 10px");
			
            $("#anchor_check").val('1');
			$("#place_sec").hide();
			
            //do all needed before getting data
            $(".sections_c").height('0');
            if(action==''){
				$("#record_selected").val("");
            }
            
            hideAnchors();
			$(".menu_cell_box_rec").val("");
			$("#place_sec").hide();
			$("#place_rec").show();
			$("#book_records").html("");

            //update parent book for title
            //$(".booktab_parent_title_ib").show();
            //$(".booktab_parent_title_en").show();
			
			$("#parent_book_title_ib").html(parent_title_ib);
			$("#parent_book_title_en").html(parent_title_en);
            
            //update book tab to current select
            $(".booktab_title_sec_ib").show();
            $(".booktab_title_sec_en").show();
            $(".select_message_book").hide();
			$("#book_title_ib").html(book_title_ib);
            $("#book_title_en").html(book_title_en);

			$.ajax({                
				type : 'GET',
				url  : 'get_sections.php',
				data: {
                    book_id: book_id
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					
					response = $.trim(response);
					
					$("#book_sections").html(response);
					
					$('.scroll_read').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
			
                    //adjusts height of container for records displayed so bottom results not hidden behind footer
                    //var scroll_torah_h = $(".scroll_read").height()-50;
                    //var sections_c_h = $(".sections_c").height();
                    //var foot_c_h = $(".foot_c").height();
                    //var cell_h = parseInt(foot_c_h)+parseInt(sections_c_h)+parseInt(1);
                    //if(cell_h>=scroll_torah_h){
                    //    $(".sections_c").height(scroll_torah_h);
                    //}
					
                    if(action==''){
                        $('#torah_head').css('top', '0px');	
						setTimeout(function() {  
							showMainMenu();
						}, 1);		
						$(".loading_message").html("");
						$("#books_list_tab").show();
						$("#r_display").show();
						$("#anchor_check").val('');
					}
					
					$(".tab_link").removeClass("tab_link-active");
					$(".menu_cell_c").hide();
					$(".tab_link[tab-id='tab_2']").addClass("tab_link-active");
					$("#tab_2").show();
					
					setTimeout(function() {  
						updateBookGrid(book_id);
					}, 1);	
				}
			});
			return false;
    	};	
		
        //load tab 3 data - RECORD NUMBERS
		$("body").on('click', ".load_records", function(){
				
			var book_id = $(this).attr('data-book_id');
			var section_id = $(this).attr('data-section_id');

			setTimeout(function() {  
				loadRecords(book_id,section_id,'');
			}, 1);					
    	});		
        //load tab 3 data - RECORD NUMBERS
		function loadRecords(book_id,section_id,action){
			
			$(".loading_message").html("<br>Loading Hebrew Records...<br><br><div class=\"loader_red\"></div>");
			$("#book_sections").hide();
			$("#books_list_tab").show();
			
			$(".scroll_read").css("padding","");
			$(".scroll_read").css("padding","130px 10px 0px 10px");

        	$("#anchor_check").val('1');
			$("#place_rec").hide();
			$("#book_sections").hide();
			
            $("#r_display").height('0');
            if(action==''){
				$('#record_selected').val("");
            }
			
            hidePaginate();
            $("#r_display").hide();
            $("#r_display_all").hide();
					
			$.ajax({                
				type : 'GET',
				url  : 'get_records.php',
				data: {
                    book_id: book_id,
                    section_id: section_id
				},
				beforeSend: function(){	
					//do something				
				},
				success : function(response){
					
					response = $.trim(response);
					
					$("#book_records").html(response);

                    //adjusts height of container for records displayed so bottom results not hidden behind footer
                    var scroll_torah_h = $(".scroll_read").height();
                    var r_display_h = $("#r_display").height();
                    var foot_c_h = $(".foot_c").height();
                    var cell_h = parseInt(foot_c_h)+parseInt(r_display_h)+parseInt(1);
                    if(cell_h>=scroll_torah_h){
                        $("#r_display").height(scroll_torah_h);
                    }
					
					$('.scroll_read').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
					
                    if(action==''){
						$('#torah_head').css('top', '0px');	
						setTimeout(function() {  			
							showMainMenu();
						}, 1);					
						$(".loading_message").html("");
						$("#book_sections").show();
						$("#r_display").show();
						$("#anchor_check").val('');
					}
					
					$(".tab_link").removeClass("tab_link-active");
					$(".menu_cell_c").hide();
					$(".tab_link[tab-id='tab_3']").addClass("tab_link-active");
					$("#tab_3").show();		
					$("#book_sections").show();	
					
					setTimeout(function() {
						updateSectionGrid(book_id,section_id);
					}, 1);
				}
			});
    	};		

        //load tab 3 data - RECORD DETAILS
		$("body").on('click', ".load_record_details", function(){
			var book_id = $(this).attr('data-book_id');
			var section_id = $(this).attr('data-section_id');
			var record_id = $(this).attr('data-record_id');
			
			setTimeout(function() {  
				loadRecordDetails("r",book_id,section_id,record_id);
			}, 1);			
    	});
		
        //load tab 3 data - RECORD DETAILS
		function loadRecordDetails(tab,book_id,section_id,record_id){
		
			$("#books_list_tab").show();
		
            //do not fire unless values exist
            if((section_id!=undefined&&section_id!='')&&(record_id!=undefined&&record_id!='')){
				
				$(".loading_message").html("<br>Loading Hebrew Records...<br><br><div class=\"loader_red\"></div>");
				$("#book_records").hide();		
               											
				if($("#message_dialog").html()!=""){
					if($('#foot_copy').is(":visible")==true){
						setTimeout(function() {
							cancelShare();
						}, 1);	
					}	
				}
                $("#anchor_check").val('1');
				
				$('#record_selected').val(record_id);
				
				var word_toggle = 2;
				if($('#word_toggle').is(":checked")==true){
					word_toggle = 1;
				}
				$("#r_display_all").hide();

				//display_records_all.php?type=get_records_all&book_id=33&section_id=2&xlit=xlit&word_toggle=1&aleph_tav=0

				$.ajax({                
					type : 'GET',
					url  : 'display_records_all.php',
					data: {
                        type: 'get_records_all',
                        book_id: book_id,
                        section_id: section_id,
						xlit: $("#show_xlit").val(),
						word_toggle: word_toggle,
						aleph_tav: $("#aleph_tav").val()
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);
						
						//$("#r_display_all").html(response).show();

						$.when($("#r_display_all").html(response).show()).then(function(){
							$.when(showPaginate()).then(function(){
								$(".loading_message").html("");
								$("#book_records").show();		
								$("#r_display").hide();
                        
								var wHeight = $(window).height();
								$("#r_display_all").height(wHeight+60);
								
								$("#anchor_check").val('');
								setTimeout(function() {
									var idValSelected = book_id+section_id+record_id+tab + "s";
									$.when(gotoDiv(idValSelected,'')).then(function(){
										$.when(hideMenus('Read')).then(function(){
											
											var book_list = book_id+","+section_id+","+record_id;	
											$.when(saveLastLocation("Read","tab_3",book_list)).then(function(){
												$.when(saveLastBookLocation(book_id,section_id,record_id)).then(function(){
													//done...
												})	
											})	
										})	
									})
								}, 1);
							})	
						})						
						//setTimeout(function() {    
						//	showPaginate();
						//}, 1);		
						//setTimeout(function() {    
							//findReplace('1','menu_cell_records_display');
						//}, 1);		
						
						//$(".loading_message").html("");
						//$("#book_records").show();		
						//$("#r_display").hide();
                        //var wHeight = $(window).height();
                        //$("#r_display_all").height(wHeight+60);
						
						//$("#anchor_check").val('');

						//setTimeout(function() {
						//	var idValSelected = book_id+section_id+record_id+tab + "s";
						//	gotoDiv(idValSelected,'');
						//}, 1);					
								
						//setTimeout(function() {    
						//	hideMenus('Read');
						//}, 1);	
						
						//var book_list = book_id+","+section_id+","+record_id;	
						//saveLastLocation("Read","tab_3",book_list);		
						//saveLastBookLocation(book_id,section_id,record_id);		
				
					}
				});
            };
    	};

		function hideMenusHard(tab,book_id,section_id,record_id){
			var scroll_pos = 75;
			$('.scroll_read').stop(true, true).animate({ scrollTop: scroll_pos}, 1, function () {});

			var e = document.getElementById('scroll_read');
			var scroll_present = checkIfScrollBarPresent(e, 'vertical');
			var foot_top = $('#foot_c_top_position').val();
			var foot_down = parseInt(foot_top)+51;
			$('#foot_c').css('top', foot_down+'px');
			$('#torah_head').css('top', '-78px');	
    	};
			
		//PAGINATION
		$("body").on('click', ".paginate_read", function(){ 
	
			var movement = $(this).attr("data-move");
            var book_id = $("#book_selected").val();  
			var section_id = $("#section_selected").val();
			var section_count = $("#sections_count").val();
			hideMenusHard();
			
			$("#r_display_all").hide();
			$(".loading_message").html("<br>Loading Hebrew Records...<br><br><div class=\"loader_red\"></div>");
			
            if(movement == 'prev'){
                
				$("#anchor_check").val('1');
				$('[data-move="prev"]').removeClass('paginate_read');
				
                if(section_id == 1){
                    
                    //get next book and set to Section 1 and Record 1
					$.ajax({                
						type : 'GET',
						url  : 'phptojson.php',
						data: {
							type: 'get_prev_book_paginate',
							book_id: book_id
						},
						beforeSend: function(){	
							//do something
						},
						success : function(response){
							response = $.trim(response);
							var response = JSON.parse(response);

							$("#parent_book_title_ib").html(response[0].parent);
							$("#parent_book_title_en").html(response[0].en);

							$("#book_title_ib").html(response[0].name_ibri);
							$("#book_title_en").html(response[0].name_english);
							
							setTimeout(function() {  	
								updateBookGrid(response[0].book_id);
							}, 1);									
							
							var book_title_ib = $("#book_title_ib").html();
							var book_title_en = $("#book_title_en").html();

							$("#section_selected").val(response[0].section);

							//RELOAD RECORDS HERE
							if($('#word_toggle').is(":checked")==true){
								word_toggle = 1;
							}
							var book_id = response[0].book_id;
							var section_id = response[0].section;
							
							var book_list = book_id+","+section_id+",1";	
							saveLastLocation("Read","tab_3",book_list);
							saveLastBookLocation(book_id,section_id,1);

							$.ajax({                
								type : 'GET',
								url  : 'display_records_all.php',
								data: {
									type: 'get_records_all',
									book_id: response[0].book_id,
									section_id: response[0].section,
									xlit: $("#show_xlit").val(),
									word_toggle: word_toggle,
									aleph_tav: $("#aleph_tav").val()
								},
								beforeSend: function(){	
									//do something
								},
								success : function(response){
									response = $.trim(response);
									$("#r_display_all").html(response);
									//findReplace('1','menu_cell_records_display');
								
									//RELOAD SECTIONS HERE
									$.ajax({                
										type : 'GET',
										url  : 'get_sections.php',
										data: {
											book_id: book_id
										},
										beforeSend: function(){	
											//do something
										},
										success : function(response){
											response = $.trim(response);
											$("#book_sections").html(response);
											setTimeout(function() {  			
												updateSectionGrid(book_id,section_id);
											}, 1);											
											
											setTimeout(function() {	
												$(".loading_message").html("");
												$("#r_display_all").show();
												hideMenusHard();			
											}, 1);			
											setTimeout(function() { 		
												$('[data-move="prev"]').addClass('paginate_read');					
												$("#anchor_check").val('');		
											}, 200);									
										}
									});
								}
							});
						}
					});
							
                }else{		
					
					var book_id = $("#book_selected").val();
					var section_id = $("#section_selected").val();
					var word_toggle = 2;
					if($('#word_toggle').is(":checked")==true){
						word_toggle = 1;
					}
					$.ajax({                
						type : 'GET',
						url  : 'display_records_all.php',
						data: {
							type: 'get_records_all',
							book_id: book_id,
							section_id: parseInt(section_id)-parseInt(1),
							xlit: $("#show_xlit").val(),
							word_toggle: word_toggle,
							aleph_tav: $("#aleph_tav").val()
						},
						beforeSend: function(){	
							//do something
						},
						success : function(response){
							response = $.trim(response);
				
							$("#r_display_all").html(response);

							setTimeout(function() {				
								updateSectionGrid(book_id,parseInt(section_id)-parseInt(1));
							}, 1);	
							
							var subtract_section = parseInt(section_id)-parseInt(1);
							
							var book_list = book_id+","+subtract_section+",1";	
							saveLastLocation("Read","tab_3",book_list);	
							saveLastBookLocation(book_id,subtract_section,1);						

							//setTimeout(function() {  						
								//findReplace('1','menu_cell_records_display');
							//}, 1);												
											
							setTimeout(function() {
								$(".loading_message").html("");
								$("#r_display_all").show();
								hideMenusHard();			
							}, 1);				
							setTimeout(function() { 		
								$('[data-move="prev"]').addClass('paginate_read');						
								$("#anchor_check").val('');		
							}, 200);							
						}
					});

                }
                
            }else if(movement == 'next'){
            
				$("#anchor_check").val('1');
				$('[data-move="next"]').removeClass('paginate_read');    
				
                if(parseInt(section_id) >= parseInt(section_count)){
                    
 					$.ajax({                
						type : 'GET',
						url  : 'phptojson.php',
						data: {
							type: 'get_next_book_paginate',
							book_id: book_id
						},
						beforeSend: function(){	
							//do something
						},
						success : function(response){
							response = $.trim(response);
							var response = JSON.parse(response);
							
							$("#parent_book_title_ib").html(response[0].parent);
							$("#parent_book_title_en").html(response[0].en);
				
							$("#book_title_ib").html(response[0].name_ibri);
							$("#book_title_en").html(response[0].name_english);
					
							setTimeout(function() {  						
								updateBookGrid(response[0].book_id);
							}, 1);									
							
							var book_title_ib = $("#book_title_ib").html();
							var book_title_en = $("#book_title_en").html();
							
							$("#section_selected").val(response[0].section);
							
							//RELOAD RECORDS HERE
							if($('#word_toggle').is(":checked")==true){
								word_toggle = 1;
							}
							var book_id = response[0].book_id;
							var section_id = response[0].section;
														
							$.ajax({                
								type : 'GET',
								url  : 'display_records_all.php',
								data: {
									type: 'get_records_all',
									book_id: response[0].book_id,
									section_id: response[0].section,
									xlit: $("#show_xlit").val(),
									word_toggle: word_toggle,
									aleph_tav: $("#aleph_tav").val()
								},
								beforeSend: function(){	
									//do something
								},
								success : function(response){
									response = $.trim(response);
									$("#r_display_all").html(response);
									//setTimeout(function() {  					
										//findReplace('1','menu_cell_records_display');
									//}, 1);			

									//RELOAD SECTIONS HERE
									$.ajax({                
										type : 'GET',
										url  : 'get_sections.php',
										data: {
											book_id: book_id
										},
										beforeSend: function(){	
											//do something
										},
										success : function(response){
											response = $.trim(response);
											$("#book_sections").html(response);

											setTimeout(function() { 							
												updateSectionGrid(book_id,section_id);
											}, 1);		
											
											var book_list = book_id+","+section_id+",1";		
											saveLastLocation("Read","tab_3",book_list);	
											saveLastBookLocation(book_id,section_id,1);					
							
											setTimeout(function() {
												$(".loading_message").html("");	
												$("#r_display_all").show();	
												hideMenusHard();			
											}, 1);		
											setTimeout(function() { 	
												$('[data-move="next"]').addClass('paginate_read');					
												$("#anchor_check").val('');		
											}, 200);										
										}
									});
								}
							});
						}
					});			
                }else{
					
					var book_id = $("#book_selected").val();
					var section_id = $("#section_selected").val();
					var word_toggle = 2;
					if($('#word_toggle').is(":checked")==true){
						word_toggle = 1;
					}
					$.ajax({                
						type : 'GET',
						url  : 'display_records_all.php',
						data: {
							type: 'get_records_all',
							book_id: book_id,
							section_id: parseInt(section_id)+parseInt(1),
							xlit: $("#show_xlit").val(),
							word_toggle: word_toggle,
							aleph_tav: $("#aleph_tav").val()
						},
						beforeSend: function(){	
							//do something	
						},
						success : function(response){
							response = $.trim(response);
				
							$("#r_display_all").html(response);
							
							var add_section = parseInt(section_id)+parseInt(1);
							
							var book_list = book_id+","+add_section+",1";
							saveLastLocation("Read","tab_3",book_list);	
							saveLastBookLocation(book_id,add_section,1);						

							setTimeout(function() {				
								updateSectionGrid(book_id,parseInt(section_id)+parseInt(1));
							}, 1);	
							//setTimeout(function() {  							
								//findReplace('1','menu_cell_records_display');
							//}, 1);		
							
							setTimeout(function() {
								$(".loading_message").html("");		
								$("#r_display_all").show();	
								hideMenusHard();			
							}, 1);	
							setTimeout(function() { 	
								$('[data-move="next"]').addClass('paginate_read');				
								$("#anchor_check").val('');		
							}, 200);						
						}
					});
				}
			}
        });

		$("body").on('click', ".annot", function(){ 
		
			var book_id = $(this).attr('data-annot-id');
			var annotation_id = $(this).html().slice(0, -1).substring(1);

			$("#annot_dialog").dialog({
				autoOpen : false, 
				modal : true,
				width: '99%',
				height: 'auto',
				autoResize:true,
				resizable: true,
				minHeight: '75%',
				maxHeight: 300,
				minWidth: '99%',
				maxWidth: 260,
				title: "Confirming Witnesses ["+annotation_id+"]",
				closeOnEscape: true,
				close: function() {
					$("#annot_dialog").attr('css','display:none');
					$("#annot_dialog").dialog("close");
					$("#display_annotations").html("");
				  },
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
						$("#annot_dialog").dialog('close'); 
						$("#display_annotations").html("");
					});
			   }
			});
			
			$.ajax({                
				type : 'GET',
				url  : 'get_annotations.php',
				data: {
					book_id: book_id,
					annotation_id: annotation_id
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					
					$("#display_annotations").html(response).show();
					
					findReplace('1','dialog_records_display');
					$("#annot_dialog").show();
					$("#annot_dialog").dialog("open");
					$("#annot_dialog").stop(true, true).animate({ scrollTop: 0}, 0, function () {});
				}
			});       
		});  
		
        function elementFontReSize(cur_font_size) {

            if(cur_font_size!=""&&cur_font_size!=undefined){
                var cur_font_size = parseInt(cur_font_size);
            }else{
                var cur_font_size = parseInt($("#current_font_size").val());
            }

			$(".scroll_tent").css({"font-size":cur_font_size});
			$(".scroll_raqia").css({"font-size":cur_font_size});
			$(".scroll_read").css({"font-size":cur_font_size});
			$(".scroll_search").css({"font-size":cur_font_size});
			$(".scroll_terms").css({"font-size":cur_font_size});
			$(".scroll_contact").css({"font-size":cur_font_size});
			$(".scroll_books").css({"font-size":cur_font_size});
			$(".strongs_container").css({"font-size":cur_font_size});
			$(".strongs_container_dialog").css({"font-size":cur_font_size});
			$(".search_strongs_display").css({"font-size":cur_font_size});
			$(".dialog_container").css({"font-size":cur_font_size});
			$(".scroll_tent").css({"font-size":cur_font_size});
            $(".toggle_current_font_size").css({"font-size":cur_font_size});
            $(".toggle_font_size").html(cur_font_size);
            $("#current_font_size").val(cur_font_size);
            
            var min_size = 9;
            var max_size = 34;	
            if(cur_font_size==min_size){
                $(".toggle_minus").css({"cursor":"not-allowed"});
            }else if(cur_font_size==max_size){
                $(".toggle_plus").css({"cursor":"not-allowed"});
            }else if(cur_font_size>min_size&&cur_font_size<max_size){
                $(".toggle_minus").css({"cursor":"pointer"});
                $(".toggle_plus").css({"cursor":"pointer"});
            }	
        };
		
		$("body").on('click', ".xlit", function(){ 
			
			var Yahuah = 'Yahuah';
			var Yahushua = 'Yahushua';
			var replacement = 'Aleph and the Tav';
			
			var term_id = $(this).attr('data-id');
			var term_name = $(this).text().replace(/JWJY/g,Yahuah).replace(/jwjy/g,Yahuah).replace(/`WSWJY/g,Yahushua).replace(/`wswjy/g,Yahushua).replace(/TA/g,replacement);


			$("#xlit_dialog").dialog({
				autoOpen : false, 
				modal : true,
				width: '99%',
				height: 'auto',
				autoResize:true,
				resizable: true,
				minHeight: '75%',
				maxHeight: 300,
				minWidth: '99%',
				maxWidth: 260,
				title: "Revised Concordance: "+term_name,
				closeOnEscape: true,
				  close: function() {
					$("#xlit_dialog").attr('css','display:none');
					$("#xlit_dialog").dialog("close");
					$("#xlit_dialog_container").html("");
				  },
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
						$("#xlit_dialog").dialog('close'); 
						$("#xlit_dialog_container").html("");
					}); 
			   }
			});
			
			$.ajax({                
				type : 'GET',
				url  : 'dialog_xlit.php',
				data: {
					type: 'get_xlit_word',
					term_id: term_id
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					
					$("#xlit_dialog_container").html(response);
					
					$("#xlit_dialog").show();
					$("#xlit_dialog").dialog("open");
					$("#xlit_dialog").stop(true, true).animate({ scrollTop: 0}, 0, function () {});
					
					elementFontReSize();
				}
			});
		});  
		
        function updateBookGrid(book_id) {		
            //show/hide the selected book
            $(".load_sections").show();
			
            //set new book value, update hidden placeholder
            $("#book_selected").val(book_id);
			
            //hide selected book from grid
			setTimeout(function() { 
				$('#'+book_id+'b').hide();
			}, 1);
        };
		
        function updateSectionGrid(book_id,section_id) {
			//show all and then hide the currently selected
            $(".load_records").show();
			
            //set new section value, update hidden placeholder
            $("#section_selected").val(section_id);
            $("#book_section").html(section_id);
			
            //hide selected element
			setTimeout(function() { 
				$("#"+book_id+section_id+"s").hide();
			}, 1);
        };

        function shortenWord(word_to_check,find,replace) {
            // need to shorten longer title to fit
            if(word_to_check.indexOf(find)){
                var replacement = replace;
                var re = new RegExp(find,"g");
                return word_to_check.replace(re,replacement);
            }
        };
		
        function showAnchors(){ 
            $(".tab_link_c_t").css('height','113px');
            $("#book_anchors").show();
    	};
        
        function hideAnchors(){
            $(".tab_link_c_t").css('height','90px');
            $("#book_anchors").hide();
    	};
 
        //load book titles
        function loadBookTitles(){
			$(".title_c").last().addClass('title_c_last');
			$(".title_c_last").last().removeClass('title_c');
			$(".anchor_headers_pipe").last().html("");
    	};
		
        function clearURLNameTags(){
            setTimeout(function() {             
                window.history.replaceState(null, null, window.location.pathname);
        	}, 1);
    	};
		
		/*
		$("video").focusout(function() {
			var id = $(this).attr('id');
			$(this).get(0).pause();
		});
        function pauseVideo(id){
			$("#"+id).get(0).pause();
    	};*/
        function pauseAllVideo(){
			$('.video').each(function() {
				var id = $(this).attr('id');
				$("#"+id).get(0).pause();
			});			
    	};
		$("body").on('focusout', "#vid_1,#vid_2,#vid_3,#vid_4,#vid_5", function(){
			pauseAllVideo(); 
		}); 

		$("body").on('click', "#go_to_media", function(){
			var tab_id = $(this).attr('data-tab');
			var media_id = $(this).attr('data-media');
			goToMedia(tab_id,media_id);
		});
		
        function goToMedia(tab_id,media_id){
            showPage('Tent');
			$('[tab-id="'+tab_id+'"]').trigger('click');

			if(tab_id=="tab_tent_2"){
				setTimeout(function() {
					$(".writeup_menu_list-active").each(function() {
						$(this).trigger('click');
					});		
				}, 1);	 

				setTimeout(function() {
					$('.load_writeup_content').each(function() {
						if($(this).attr('id')==media_id){
							$(this).trigger('click');
						}
					}); 
				}, 1);
			}else if(tab_id=="tab_tent_3"){
				setTimeout(function() {
					$(".media_menu_list-active").each(function() {
						$(this).trigger('click');
					});		
				}, 1);	 

				setTimeout(function() {
					$('.load_media_content').each(function() {
						if($(this).attr('id')==media_id){
							$(this).trigger('click');
						}
					}); 
				}, 1);
			}
    	};
/*
        function gotoDivMedia(x,offset) {
			$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});

            if(offset==''||offset==undefined){
                var offset = 55;
            }
            var n = $("#"+x).position();
            var div_position_offset = n.top-offset;
	
			$('.scroll_tent').stop(true, true).animate({ scrollTop: div_position_offset}, 500, function () {});
        }; 
*/		
		$("body").on('click', ".anchor_headers,.anchor_headers_search", function(){
			$("#anchor_check").val('1');
			
			var foot_top = $('#foot_c_top_position').val();
			var foot_down = parseInt(foot_top)+51;
			$('#foot_c').css('top', foot_down+'px');
			
			var active_page = "";
			$('.menu_cell-active').each(function() {
				active_page = $(this).attr('id');
			});        
			
			if(active_page=="menu_Read"){
				$('#torah_head').css('top', '-78px');	
				$('.anchor').css('top', '-78px');
				
				//scroll to header
				active_tab = $.trim($(this).attr('data-parent-id'));
				$('.scroll_read').stop(true, true).animate({ scrollTop: 0}, 1, function () {});
				setTimeout(function() { 
					var n = $("#"+active_tab).position();
					var div_position_offset = n.top-parseInt(8);
					$('.scroll_read').stop(true, true).animate({ scrollTop: div_position_offset}, 1, function () {});
				}, 100);
			}else if(active_page=="menu_Search"){
				$('.scroll_search').stop(true, true).animate({ scrollTop: 0}, 1, function () {});
				if($('#search_toggle').is(":visible")){
					$("div.scroll_search").css("padding","203px 10px 0px 10px");
					var scroll_search_h = parseInt(-114);
				}else{
					$("div.scroll_search").css("padding","173px 10px 0px 10px");
					var scroll_search_h = parseInt(-81);
				};
				setTimeout(function() { 
					$('#search_head').css('top', scroll_search_h+'px');	
					$('.anchor').css('top', '-42px');
				}, 1);
				
				//scroll to header
				active_tab = $.trim($(this).attr('data-par-id'));
				$('.scroll_search').stop(true, true).animate({ scrollTop: 0}, 100, function () {});
				setTimeout(function() { 
					var i = $("#"+active_tab).position();
					var div_pos_offset = i.top-parseInt(107);
					$('.scroll_search').stop(true, true).animate({ scrollTop: div_pos_offset}, 100, function () {});
				}, 100);
			} 
         
			setTimeout(function() { 
				$("#anchor_check").val('');
			}, 200);
		});
		
		$(".tab_link").click(function(){
			
			if($('#foot_copy').is(":visible")==true){
				setTimeout(function() {
					cancelShare();
				}, 1);	
			}
			
			$(".tab_link").removeClass("tab_link-active");
			$(".menu_cell_c").hide();
			
			$(this).addClass("tab_link-active");
			var tab_id = $(this).attr('tab-id');
			$("#"+tab_id).show();
			
			if(tab_id=="tab_1"){
				//loadBooks();
				$('.scroll_read').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
				$(".scroll_read").css("padding","135px 10px 0px 10px");
				showAnchors();
				hidePaginate('b');
			}else if(tab_id=="tab_2"){
				var sec_loaded = $.trim($("#book_sections").html());

				if(sec_loaded==""){
					$(".scroll_read").css("padding","135px 10px 0px 10px");
				}else{
					$(".scroll_read").css("padding","100px 10px 0px 10px");
				}
				hideAnchors();
				hidePaginate('s');
			}else if(tab_id=="tab_3"){
				var rec_loaded = $.trim($("#book_records").html());
				if(rec_loaded==""){
					setTimeout(function() { 
					$(".scroll_read").css("padding","");
					}, 1);
					setTimeout(function() { 
						$(".scroll_read").css("padding","135px 10px 0px 10px");
					}, 1);
				}else{
					setTimeout(function() { 
						$(".scroll_read").css("padding","");
						$(".scroll_read").css("padding","130px 10px 0px 10px");
					}, 1);
				}
				hideAnchors();
				showPaginate('r');
			};

var tab_name = $(this).html();
_paq.push(['setCustomUrl', tab_name]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);
		
		});
		
        function gotoDiv(x,offset) {
			$('.scroll_read').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
				
			//$('.scroll_read').scrollTop(0);
			if(offset==''||offset==undefined){
				var offset = 50;
			}	
			//console.log(x+" x") 
			//console.log(offset+" offset") 
			var n = $("#"+x.trim()).position();
			var div_position_offset = n.top-offset;
			//n = JSON.stringify(n);
			//console.log(n);
			//console.log(div_position_offset+" div_position_offset") 
			
			$('.scroll_read').stop(true, true).animate({ scrollTop: div_position_offset}, 1, function () {});
        };

        function gotoDivBooks(x,offset) {
			$('.scroll_books').stop(true, true).animate({ scrollTop: 0}, 0, function () {});

            if(offset==''||offset==undefined){
                var offset = 235;
            }
            var n = $("#"+x+"_content_container").position();
            var div_position_offset = n.top-offset;
	
			$('.scroll_books').stop(true, true).animate({ scrollTop: div_position_offset}, 500, function () {});
        };  

        function gotoDivMedia(x,offset) {
			$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});

            if(offset==''||offset==undefined){
                var offset = 235;
            }
            var n = $("#"+x).position();
            var div_position_offset = n.top-offset;
	
			$('.scroll_tent').stop(true, true).animate({ scrollTop: div_position_offset}, 500, function () {});
        };  

		$("body").on('click', "#back_button", function (){
			
            var active_page = "";
            $('.menu_cell-active').each(function() {
                active_page = $(this).attr('id');
            });
			
			if(active_page=="menu_Menu"){
				$('.menu_list-active').each(function() {
					$(this).removeClass('menu_list-active').addClass('menu_list');
				});		
				showPage('Menu');
			}else if(active_page=="menu_Books"){
				$('.tab_link_books-active').each(function() {
					active_tab = $(this).html().toLowerCase();
				});
				$("."+active_tab+"_content_container").html("").hide();
				$(".load_"+active_tab+"_content").show();
			}else if(active_page=="menu_Tent"){
				$('.tab_link_tent-active').each(function() {
					active_tab = $(this).html().toLowerCase();
				});	

				if(active_tab=="recordings"){
					$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
					$(".media_menu_list-active").each(function() {
						$(this).removeClass('media_menu_list-active').addClass('media_menu_list');
					});
					$(".media_menu_list").each(function() {
						$(".media_poster").show();
						$(".media_menu_list").show();
					});
					$("#media_container").html("");
				}else if(active_tab=="write-ups"){
					$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
					$(".writeup_menu_list-active").each(function() {
						$(this).removeClass('writeup_menu_list-active').addClass('writeup_menu_list');
					});
					$(".writeup_menu_list").each(function() {
						$(".writeup_menu_list").show();
					});
					$("#writeup_container").html("");
				}
			}
			$("#back_button").hide();
		});  
			
		$("body").on('click', ".load_media_content", function(){

			if($("#media_container").html()==""){
				
				var media_id = $(this).attr("id");
				
				$(".loading_message_media").html("<br>Loading...<br><br><div class=\"loader_red\"></div>");
        	
				$(this).removeClass('media_menu_list').addClass('media_menu_list-active');			
        	
				$(".media_menu_list").each(function() {
					$(".media_poster").hide();
					$(".media_menu_list").hide();
				});
				
				$.ajax({                
					type : 'GET',
					url  : 'phptojson.php',
					data: {  
						type: 'get_media',
						media_id: media_id
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);

						$("#media_container").html(response).show();
						
						saveLastLocation("Tent","tab_tent_3",media_id);

	_paq.push(['setCustomUrl', media_id]);
	_paq.push(['setGenerationTimeMs', 0]);
	_paq.push(['trackPageView']);

						gotoDivMedia(media_id,185);	
						$(".loading_message_media").html("");	
						$("#back_button").show();				
					}
				});
			}else{
				$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
				$(this).removeClass('media_menu_list-active').addClass('media_menu_list');			

				$(".media_menu_list").each(function() {
					$(".media_poster").show();
					$(".media_menu_list").show();
				});
				$("#media_container").html("");
				$("#back_button").hide();
			}
		});  
			
		$("body").on('click', ".load_timeline_records", function(){
			
			$("#timeline_records_container").html("")
			
			$("#timeline_dialog").dialog({
				autoOpen : false, 
				modal : true,
				width: '99%',
				height: 'auto',
				autoResize:true,
				resizable: true,
				minHeight: '75%',
				maxHeight: 300,
				minWidth: '99%',
				maxWidth: 260,
				title: "Confirming Hebrew Records",
				closeOnEscape: true,
				  close: function() {
					$("#timeline_dialog").attr('css','display:none');
					$("#timeline_dialog").dialog("close");
					$("#timeline_records_container").html("");
				  },
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
						$("#timeline_dialog").dialog('close'); 
						$("#timeline_records_container").html("");
					}); 
			   }
			});
					
			var data_id = $(this).attr("data-id");

			$.ajax({                
				type : 'GET',
				url  : 'get_timeline_records.php',
				data: {  
					data_id: data_id
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);

					$("#timeline_records_container").html(response).show();

					setTimeout(function() { 
						$("#timeline_dialog").show();
						$("#timeline_dialog").dialog("open");
						$("#timeline_dialog").stop(true, true).animate({ scrollTop: 0}, 0, function () {});
					}, 1);					
				}
			});
		});  
			
		$("body").on('click', ".load_writeup_content", function(){

			if($("#writeup_container").html()==""){
				
				var writeup_id = $(this).attr("id");
				
				$(".loading_message_writeup").html("<br>Loading...<br><br><div class=\"loader_red\"></div>");
        	
				$(this).removeClass('writeup_menu_list').addClass('writeup_menu_list-active');			
 
				$(".writeup_menu_list").each(function() {
					$(".writeup_menu_list").hide();
				});
				
				$.ajax({                
					type : 'GET',
					url  : 'writeups_display.php',
					data: {  
						writeup: writeup_id
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);

						$("#writeup_container").html(response).show();
						
						saveLastLocation("Tent","tab_tent_2",writeup_id);

	_paq.push(['setCustomUrl', writeup_id]);
	_paq.push(['setGenerationTimeMs', 0]);
	_paq.push(['trackPageView']);

						gotoDivMedia(writeup_id,185);	
						$(".loading_message_writeup").html("");	
						$("#back_button").show();				
					}
				});
			}else{
				$('.scroll_tent').stop(true, true).animate({ scrollTop: 0}, 0, function () {});
				$(this).removeClass('writeup_menu_list-active').addClass('writeup_menu_list');			

				$(".writeup_menu_list").each(function() {
					$(".writeup_menu_list").show();
				});
				$("#writeup_container").html("");
				$("#back_button").hide();
			}
		});  
			
		$("body").on('click', ".load_preface_content,.load_postface_content", function(){

			//show/hide
			var content_id = $(this).attr("id");
			
			$('.tab_link_books-active').each(function() {
				active_tab = $(this).html().toLowerCase();
				tab_id = $(this).attr('tab-id');
			});	
			$(".load_"+active_tab+"_content").hide();

			var visible = true;
			if($("#"+active_tab+"_content_container").is(":visible")==false){
				visible = false;
				$("."+active_tab+"_content_container").html("").hide();
				$(".loading_message_preface").html("<br>Loading...<br><br><div class=\"loader_blue\"></div>");

				$("#back_button").show();
				saveLastLocation("Books",tab_id,content_id);
			}else{
				$("#"+active_tab+"_content_container").html("").hide();
				$(".load_"+active_tab+"_content").show();
				
				$("#back_button").hide();
				saveLastLocation("Books",tab_id,"");
			}

			$.ajax({                
				type : 'GET',
				url  : 'content_'+content_id+'.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					if(visible==false){
						$("#"+active_tab+"_content_container").html(response).show();
						$("#"+content_id).show();

_paq.push(['setCustomUrl', content_id]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);

					}

					gotoDivBooks(active_tab,'');	
					$(".loading_message_preface").html("");					
				}
			});
		});  
  
		$(".tab_link_books").click(function(){
			$(".tab_link_books").removeClass("tab_link_books-active");
			$(".menu_cell_books_c").hide();
			
			$(this).addClass("tab_link_books-active");
			var tab_id = $(this).attr('tab-id');
			$("#"+tab_id).show();

			$('.tab_link_books-active').each(function() {
				active_tab = $(this).html().toLowerCase();
			});				
			
			if($("#"+active_tab+"_content_container").is(":visible")==false){
				$("#back_button").hide();
			}else{
				$("#back_button").show();
			}
			
var tab_name = $(this).html();
_paq.push(['setCustomUrl', tab_name]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);
	
			saveLastLocation("Books",tab_id,"");
		});
		
        function showPaginate(active_tab){  	 
            var active_page = "";
            $('.menu_cell-active').each(function() {
                active_page = $(this).attr('id');
            });
            
            if(active_tab==''||active_tab==undefined){
                $('.tab_link').each(function() {
                    var tab_class = $(this).attr('class');
                    var tab_name = $(this).html().trim();
                    if (tab_class.toLowerCase().indexOf("tab_link-active") != -1&&tab_name=='Records'){
                        active_tab = 'r';
                    }
                });            
            }
            var curSelectedRecord = $('#record_selected').val();
            if(curSelectedRecord!='' 
                && (active_tab=="r" && active_tab!='' && active_tab!=undefined) 
                && active_page=="menu_Read"){
 
                $("#foot_url").hide();
                $("#foot_share_copy").show();
                $("#foot_share").show();

                $(".paginate_s").show();
                $("#change_aleph_tav").show();
                $("#change_font_size").show();
            }
    	};
        
        function hidePaginate(active_tab){
			$("#foot_share_copy").hide();
			$("#foot_url").show();

            $(".paginate_s").hide();
            $("#change_aleph_tav").hide();
            $("#change_font_size").hide();
            
            //if book tab, show menu if scroll IS at top
            setTimeout(function() { 
                var ft = $('.foot_c').is(":visible");
                if(ft==false){
                    showMainMenu();
                }
            }, 1);
    	};
 
        function showMainMenu() {
            //sometimes menu is hidden from the scroll functions
            //need to show each time between pages or tabs
        	setTimeout(function() { 
                var foot_top = $('#foot_c_top_position').val();
                var foot_up = parseInt(foot_top);
                $('#foot_c').css('top', foot_up+'px');
                $("#anchor_check").val('')            
            }, 1);
        };
		
		$(".menu_cell").click(function(){
			var page = $(this).attr('page-name');
			showPage(page);
		});
		
		$(".goToPage").click(function(){
			var page = $(this).attr('page-name');
			showPage(page);
			
			if(page=="Menu"){
				$('#menu_settings').get(0).click();
			}
		});

	
        function resetSessions(){	
			$.ajax({                
				type : 'GET',
				url  : 'reset_sessions.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);

					if(response!=''){
						var data = JSON.parse(response);
						if(data.length>0){
							$.when(themeToggle(data[0]['theme'])).then(function(){
								$.when(wordToggle(data[0]['word_toggle'],"")).then(function(){
									$.when(loadBooks()).then(function(){
										$.when(loadSearchHistory()).then(function(){
											$.when(loadSearchTerms()).then(function(){
												//done...
											})
										})
									})
								})
							})
						}
					}
				}
			});
    	};				

        function checkSessionStatus(fontsize,xlit,theme,word_toggle,aleph_tav){			
			//check if still logged in and reset session variables
			//phptojson.php?type=check_session_status&fontsize=18&xlit=xlit&theme=1&word_toggle=1&aleph_tav=0
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'check_session_status',
					fontsize: fontsize,
					xlit: xlit,
					theme: theme,
					word_toggle: word_toggle,
					aleph_tav: aleph_tav
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);

					if(response==1){
						resetSessions();
						//console.log("user logged in");
					}else if(response==2){
						//console.log("user not logged in");
					}else{
						//console.log("something went wrong");
					}
				}
			});
        };
		
		//show main menu tabs in footer
		function showPage(page){
						
        	//$('.menu_cell-active').each(function() {
        	    $('.menu_cell-active').removeClass('menu_cell-active').addClass('menu_cell');
        	//});
            
        	$('.menu_cell').each(function() {
				var page_name = $(this).attr('page-name');
				var page_id = $(this).attr('page-id');
                if(page==page_name){
                   // $('img[id="menu_image'+page_id+'"]').attr('src', '');
                    $("#menu_"+page).removeClass('menu_cell').addClass('menu_cell-active');
                    $("#menu_title"+page_id).removeClass('menu_title_g').addClass('menu_title');
                    $('img[id="menu_image'+page_id+'"]').attr('src', '/images/icons/menu'+page_id+'.png');
                }else{
                   // $('img[id="menu_image'+page_id+'"]').attr('src', '');
                    $("#menu_"+page).removeClass('menu_cell').addClass('menu_cell-active');
                    $("#menu_title"+page_id).removeClass('menu_title').addClass('menu_title_g');
                    $('img[id="menu_image'+page_id+'"]').attr('src', '/images/icons/menu'+page_id+'_g.png');
                }            
            });
			
         	$("#back_button").hide();

			if($('#foot_copy').is(":visible")==true){
				cancelShare();
			}
       
            if(page=="Search"){
				if($('#search_toggle').is(":checked")==false){
					var search_exist = $("#r_display_search_results").html();
					if(search_exist==""){
						$('#message_records').html("Search Hebrew Records of <span id=\"thenames\">JWJY</span> <span id=\"thenames\">TA</span>");
					}
				}else{
					var search_exist_con = $("#search_strongs_display").html();
					if(search_exist_con==""){
						$('#message_con').html("Search Revised Concordance");
					}		
				}
				setTimeout(function() { 
					checkSearch();
				}, 100);				
            }            
            if(page=="Read"){
                elementFontReSize();
                showPaginate();
				loadBooks();
            }else{
                hidePaginate();
            }   		
            if(page=="Books"){
				$('.tab_link_books-active').each(function() {
					active_tab = $(this).html().toLowerCase();
				});	
				if((active_tab=="preface"&&$("."+active_tab+"_content_container").html()!="")
					||(active_tab=="postface"&&$("."+active_tab+"_content_container").html()!="")){
					$("#back_button").show();
				};
            }           
            if(page=="Menu"){
				$(".menu_list-active").each(function() {
					if($(this).hasClass('menu_list-active')==true){
						page = $(this).attr('data-menu').replace("menu_", "");
						showMenuPage(page);
						$("#back_button").show();
					}
				});
            }			
            if(page=="Tent"){
			
				$('.tab_link_tent-active').each(function() {
					active_tab = $(this).html().toLowerCase();
				});	
				if(active_tab=="write-ups"){
					$(".writeup_menu_list-active").each(function() {
						if($(this).hasClass('writeup_menu_list-active')==true){
							$("#back_button").show();
						}
					});
				}else if(active_tab=="recordings"){
					$(".media_menu_list-active").each(function() {
						if($(this).hasClass('media_menu_list-active')==true){
							$("#back_button").show();
						}
					});
				}else if(active_tab=="shalom"){
					//check if still logged in and reset session variables
					var fontsize = parseInt($("#current_font_size").val());
					var xlit = $("#show_xlit").val();
					var theme = 1;
					if($('#theme_toggle').is(":checked")){
						theme = 2;
					}
					var word_toggle = 2;
					if($('#word_toggle').is(":checked")==false){
						word_toggle = 1;
					}
					var aleph_tav = $("#aleph_tav").val();

					checkSessionStatus();
				};
				
            }
        	$('.site_page').each(function() {
        	    $(this).hide();
        	});
				
			saveLastLocation(page,"","");
			
            var page = page.toLowerCase();
        	$("#page_"+page).show();

_paq.push(['setCustomUrl', page]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);

			
            showMainMenu();
		};
		
		$("body").on('click', ".toggle_welcome_list", function(){ 
			var list_id = $(this).attr('list-id');

            if($('#list_'+list_id).is(":visible")==true){
                $('#list_'+list_id).hide();
                $('#pm_'+list_id).html('+');
                $('.menu_cell_tent_c').height($('.scroll_tent').height()-parseInt(40));
            }else{
                $('#list_'+list_id).show();
                $('#pm_'+list_id).html('-');
                $('.menu_cell_tent_c').height($('.scroll_tent').height()+parseInt(40));
            }
		});
 
		$(".tab_link_tent").click(function(){
			
			$(".tab_link_tent").removeClass("tab_link_tent-active");
			$(".menu_cell_tent_c").hide();
			
			$(this).addClass("tab_link_tent-active");
			var tab_id = $(this).attr('tab-id');
			$("#"+tab_id).show();
			
			$("#back_button").hide();
			if(tab_id=="tab_tent_2"){
				$(".writeup_menu_list-active").each(function() {
					if($(this).hasClass('writeup_menu_list-active')==true){
						$("#back_button").show();
					}
				});
			}
			
			if(tab_id=="tab_tent_3"){
				$(".media_menu_list-active").each(function() {
					if($(this).hasClass('media_menu_list-active')==true){
						$("#back_button").show();
					}
				});
			};
				
var tab_name = $(this).html();
_paq.push(['setCustomUrl', tab_name]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);

			saveLastLocation("Tent",tab_id,"");

		});
 
        var lastScrollTop = 0;
        $('.scroll_raqia').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_raqia').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#raqia_head').css('top', '-38px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#raqia_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });
        
        var lastScrollTop = 0;
        $('.scroll_settings').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_settings').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#settings_head').css('top', '-38px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#settings_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });
        
        var lastScrollTop = 0;
        $('.scroll_menu').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_menu').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#menu_head').css('top', '-38px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#menu_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });

        var lastScrollTop = 0;
        $('.scroll_terms').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_terms').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#terms_head').css('top', '-38px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#terms_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });
        
        var lastScrollTop = 0;
        $('.scroll_tent').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_tent').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#tent_head').css('top', '-78px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#tent_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });

        var lastScrollTop = 0;
        $('.scroll_contact').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_contact').scrollTop();
           	if(st >= lastScrollTop){
                $('#foot_c').css('top', foot_down+'px');
                $('#contact_head').css('top', '-38px');
           	}else{
                $('#foot_c').css('top', foot_up+'px');
                $('#contact_head').css('top', '0px');
           	}
           	lastScrollTop = st;
        });

        var lastScrollTop = 0;
        $('.scroll_read').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_read').scrollTop();
            if($("#anchor_check").val()==''){
                if(st >= lastScrollTop){
                    $('#foot_c').css('top', foot_down+'px');
                    $('#torah_head').css('top', '-78px');
                }else{
                    $('#foot_c').css('top', foot_up+'px');
                    $('#torah_head').css('top', '0px');
                }
            }
           	lastScrollTop = st;
        });

        var lastScrollTop = 0;
        $('.scroll_search').scroll(function(event){
            
			if($('#search_toggle').is(":visible")){
				$("div.scroll_search").css("padding","203px 10px 0px 10px");
				var scroll_search_h = parseInt(-114);
			}else{			
				$("div.scroll_search").css("padding","173px 10px 0px 10px");
				var scroll_search_h = parseInt(-81);
			};
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_search').scrollTop();
            if($("#anchor_check").val()==''){
                if(st >= lastScrollTop){
                    $('#foot_c').css('top', foot_down+'px');
                    $('#search_head').css('top', scroll_search_h+'px');
                }else{
                    $('#foot_c').css('top', foot_up+'px');
                    $('#search_head').css('top', '0px');
                }
            }
           	lastScrollTop = st;
        });
        
        var lastScrollTop = 0;
        $('.scroll_books').scroll(function(event){
            var foot_top = $('#foot_c_top_position').val();
            var foot_down = parseInt(foot_top)+51;
            var foot_up = parseInt(foot_top);
           	var st = $('.scroll_books').scrollTop();
            if($("#anchor_check").val()==''){
                if(st >= lastScrollTop){
                    $('#foot_c').css('top', foot_down+'px');
                    $('#books_head').css('top', '-78px');
                }else{
                    $('#foot_c').css('top', foot_up+'px');
                    $('#books_head').css('top', '0px');
                }
            }
           	lastScrollTop = st;
        });
		
		function selectableToCopy() {
			//multi select for share COPY and PASTE 
			var _selectRange = false, _deselectQueue = [];
			$("#selectable").selectable({
				selecting: function (event, ui) {
					if (event.detail == 0) {
					_selectRange = true;
					return true;
					}
					if ($(ui.selecting).hasClass('ui-selected')) {
					_deselectQueue.push(ui.selecting);
					}
					selectToCopy();
					copyShareMessage('Select records, then copy. <img src="/images/copy.png" width="15px" height="15px" border="none">','close');
				},
				unselecting: function (event, ui) {
					$(ui.unselecting).addClass('ui-selected');
				},
				stop: function () {
					if (!_selectRange) {
					$.each(_deselectQueue, function (ix, de) {
						$(de)
							.removeClass('ui-selecting')
							.removeClass('ui-selected');
					});
					}
					_selectRange = false;
					_deselectQueue = [];
				}
			});
		};

		var ts;
		$(document).bind('touchstart', function (e){
		   ts = e.originalEvent.touches[0].clientY;
		});

		$(document).bind('touchend', function (e){
			if($("#selectable").length>0){
				var te = e.originalEvent.changedTouches[0].clientY;
				if(ts > te+1){
					move_this_much = ts-te+175;
					var top_now = $('.scroll_read').scrollTop();
					$('.scroll_read').scrollTop(top_now+move_this_much);
					
					var i;
					for (i = 0; i < move_this_much; i++) {
					$('.scroll_read').scrollTop(top_now+i);
					console.log('up '+i)
					} 
				}else if(ts < te-1){
					move_this_much = te-ts+175;
					var top_now = $('.scroll_read').scrollTop();
					$('.scroll_read').scrollTop(top_now-move_this_much);
					
					var i;
					for (i = 0; i < move_this_much; i++) {
					$('.scroll_read').scrollTop(top_now-i);
					console.log('down '+i)
					}
			   }  
			}
		});
			
		function closeCopyMessage() {
			$("#message_dialog").html("");
			$("#copy_message_container").hide();
		}
		document.getElementById("close_copy_message").addEventListener("click", closeCopyMessage, false);
			
		function copyShareMessage(message,action) {
			$("#message_dialog").html("");
			$("#copy_message_container").hide();

			if(action=="open"){
				$("#copy_message_container").addClass('copy_message');
				$(".copy_message").css("background-color","#2196F3");
				$("#message_dialog").html(message);
				$("#copy_message_container").show();
			}else if(action=="alert"){
				$("#copy_message_container").addClass('copy_message');		
				$(".copy_message").css("background-color","#FF0000");
				$("#message_dialog").html(message);
				$("#copy_message_container").show();
			}else if(action=="close"){
				$("#copy_message_container").removeClass('copy_message');
				$("#message_dialog").html("");
				$("#copy_message_container").hide();
				$(".paginate_left").css("color","#000000").show();
				$(".paginate_right").css("color","#000000").show();
			}else if(action=="copied"){		
				$("#foot_share_copy").hide();
				hidePaginate();
				$("#copy_message_container").addClass('copy_message');
				$(".copy_message").css("background-color","#2196F3");
				$("#copy_message_container").show();
				$("#message_dialog").html(message);
				setTimeout(function() {
					setTimeout(function() {
						cancelShare();
					}, 1);
					//showPaginate();
					//$("#foot_share_copy").show();
					//$("#copy_message_container").removeClass('copy_message');
					//$("#message_dialog").html("");
					//$("#copy_message_container").hide();
					//$(".paginate_left").css("color","#000000").show();
					//$(".paginate_right").css("color","#000000").show();	
				}, 2000);
			}
			return false;
		};
	
		$("body").on('click', ".share_button", function(){
			hidePaginate();
			
			$(".paginate_left").css("color","#777777").hide();
			$(".paginate_right").css("color","#777777").hide();

			$("div.ui-selected").each(function () {
				$(this).removeClass("ui-selected");

				$("span.ui-selected").each(function () {
					$(this).removeClass("ui-selected");
				});
			});

			$(".selectable").attr("id", "selectable");

			$("#foot_share_copy").show();
			$("#foot_url").hide();
			$("#foot_share").hide();
			$(".share_button").hide();
			$("#foot_copy").show();
			$(".cancel_share").show();
			$(".cancel_share_button").show();

			selectableToCopy();
			$(".selectable").selectable("enable");
			$(".scroll_read").css("scrollbar-width", "auto");

			copyShareMessage('Select records, then copy. <img src="/images/copy.png" width="15px" height="15px" border="none">','open');
		});
        
		function selectToCopy() {
			setTimeout(function() { 
				var firstElem = 1;
				var i = 0;
				$("div.ui-selected").each(function () {
					i++;
					if (i == 1) {
						firstElem = $(this).children("span").html();
					};

				});
				var book_id = $("#book_selected").val();
				var section_id = $("#section_selected").val();
				var book_title_ib = $("#book_title_ib").html();
				var book_title_en = $("#book_title_en").html();
				var parent_book_title_ib = $("#parent_book_title_ib").html();
				var parent_book_title_en = $("#parent_book_title_en").html();
				var link = "<?=$http_var.$domain ?>/?b=" + book_id + "&s=" + section_id + "&r=" + firstElem;

				$("#foot_copy_active").val("1");
				$("#clipboard").html("");
				var book_details = book_title_ib + " (" + book_title_en + ") " + section_id + " - " + parent_book_title_ib + " (" + parent_book_title_en + ")";

				$("div.ui-selected").each(function () {
					var selected = $(this).text().replace(/\n/g, "").replace(/^[ \t]+/g, "").replace(/\s\s+/g, " ").replace(/JWJY/g, "Yahuah").replace(/`WSWJY/g, "Yahushua").replace(/TA/g, "Aleph and the Tav").replace(/\([^()]*\)/g,'').replace(/RFID Body Chip: United States Patent - US7777631B2/g,'').replace(/Your browser does not support HTML5 video./g,'').trim();
					$("#clipboard").append(selected).append("\n");
				});
				$("#clipboard").append(book_details).append("\n").append(link);
			}, 200);
		};
           
		function copyToClipboard() {
			var i = 0;
			$("div.ui-selected").each(function () {
				i++;
			});

			if (i == 0) {
				copyShareMessage('Select records, then copy. <img src="/images/copy.png" width="15px" height="15px" border="none">','alert');
			} else {
				$("#cancelshare").hide();

				var $temp = $("<textarea>");
				$("body").append($temp);
				$temp.val($("#clipboard").text()).select();
				document.execCommand("copy");
				$temp.remove();
				
				$("#foot_copy_active").val("");
				copyShareMessage('Coping to clipboard... for sharing <img src="/images/share_white.png" height="15px" width="15px" border="none">','copied');
				
				if($('#foot_copy').is(":visible")==true){
					setTimeout(function() {
						cancelShare();
					}, 1);	
				}
			};
		};
		document.getElementById("copytoclipboard").addEventListener("click", copyToClipboard, false);
                    
		function cancelShare() {
			showPaginate();
			$(".paginate_left").css("color","#000000").show();
			$(".paginate_right").css("color","#000000").show();
			copyShareMessage("","close");
			$("#message_dialog").html("");
			$(".selectable").selectable("destroy");
			$("#selectable").removeClass("ui-selectable");
			$("#selectable").removeAttr("id");
			$("#clipboard").html("");
			$("#foot_copy").hide();
			$(".cancel_share").hide();
			$(".cancel_share_button").hide();
			$(".share_button").show();
			$("#foot_share").show();
			$(".scroll_read").css("scrollbar-width", "none");
			$("#foot_copy_active").val("");

			$("div.ui-selectee").each(function () {
				$(this).removeClass("ui-selectee");

				$("span.ui-selectee").each(function () {
					$(this).removeClass("ui-selectee");
				});
			});
		};
		document.getElementById("cancelshare").addEventListener("click", cancelShare, false);
        
		function findReplace(type,class_name) {

			if(type==1){
				var xlitClass = $("#show_xlit").val();
				if(class_name == "dialog_records_display"
					|| class_name == "text_left"
					|| class_name == "text_center"
					|| class_name == "text_justify"
					|| class_name == "single_record"
					|| class_name == "search_pointer"
					|| class_name == "search_input"
				){
					xlitClass = "";
					var AlephTavValue = 0;
				}else{
					var AlephTavValue = $("#aleph_tav").val();
				}
				var Yahuah = '<span data-id=\"H3068\" class=\"'+xlitClass+'\" id=\"thenames\">JWJY</span>';
				var Yahushua = '<span data-id=\"H3091\" class=\"'+xlitClass+'\" id=\"thenames\">`WSWJY</span>';
				//var TA = "<span id=\"thenames\">TA</span>";

				$("."+class_name).each(function() {
					$(this).html($(this).html().replace(/JWJY/g,Yahuah));
					$(this).html($(this).html().replace(/jwjy/g,Yahuah));
					$(this).html($(this).html().replace(/`WSWJY/g,Yahushua));
					$(this).html($(this).html().replace(/`wswjy/g,Yahushua));

					//default = 0 "TA" in Paleo Hebrew
					//result depends on selection in "Settings"
					var replacement = '<span data-id=\"H853\" id=\"thenames\" class=\"'+xlitClass+'\">TA</span>';
											
					if(AlephTavValue==1){
						replacement = '<span data-id=\"H853\" class=\"'+xlitClass+'\">Aleph and the Tav</span>';
					}else if(AlephTavValue==2){
						replacement = '<span data-id=\"H853\" class=\"'+xlitClass+'\">Beginning and the End</span>';
					}else if(AlephTavValue==3){
						replacement = '<span data-id=\"H853\" class=\"'+xlitClass+'\">First and the Last</span>';
					}				
					$(this).html($(this).html().replace(/TA/g,replacement));

				});
			}else if(type==2){
				$("."+class_name).each(function() {
					$(this).html($(this).html().replace(/<span class="annot"(.|\n)*?<\/span>/g,''));
				});
			}else if(type==3){
				//display xlit words with underlines and popup dialog with details on the term/word

				$.ajax({                
					type : 'GET',
					url  : 'phptojson.php',
					data: {  
						type: 'get_xlit_words'
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);
						var obj = JSON.parse(response);
						var obj = $scope.xlit_words;
						var xlitClass = $("#show_xlit").val();
					
						$("."+class_name).each(function(index, element) {
							var checkHTML = element.innerHTML;
							var elemId = element.id;
							
							$.each(obj, function(key, value) {
								word_returned = obj[key].returned;

								if(checkHTML.indexOf(word_returned) != -1){
									var updateHTML = element.innerHTML;
									var number = obj[key].number;
									
									if((word_returned=="neḇ’im")
										||(word_returned=="neḇ’i")
										||(word_returned=="Neḇ’im")
										||(word_returned=="Neḇ’i")
										||(word_returned=="Iḇ’ri")
										||(word_returned=="Iḇ’rim")
										||(word_returned=="kohen")
										||(word_returned=="kohenim")
										||(word_returned=="Kohen")
										||(word_returned=="Kohenim")
										||(word_returned=="Dan")
										||(word_returned=="Dani’ĕl")
									){
										var replacement = '<span data-id=\"'+number+'\" class=\"'+xlitClass+'\">'+word_returned+'</span>';
										var re = new RegExp("\\b"+word_returned+"\\b","g");
									}else{
										var replacement = '<span data-id=\"'+number+'\" class=\"'+xlitClass+'\">'+word_returned+'</span>';
										var re = new RegExp(word_returned,"g");
									}
									$('#'+elemId).html(updateHTML.replace(re,replacement));
								};
							});
						});
					}
				});
			}else if(type==4){
				//display xlit words in my lang "EN"
				$.ajax({                
					type : 'GET',
					url  : 'phptojson.php',
					data: {  
						type: 'get_toggle_words'
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);
						var obj = JSON.parse(response);
						
						$("."+class_name).each(function(index, element) {
							var checkHTML = element.innerHTML;
							var elemId = element.id;
							
							$.each(obj, function(key, value) {
							word_returned = obj[key].returned;
							word_my_lang = obj[key].en;
							
							if(checkHTML==word_returned != -1&&word_my_lang!=''){
								var updateHTML = element.innerHTML;
								var number = obj[key].number;
								var replacement = word_my_lang;
								var re = new RegExp(word_returned,"g");
								//var re = new RegExp("\\b" + word_returned + "\\b","g");
								$('#'+elemId).html(updateHTML.replace(re,replacement));
							};
							});
						});
					}
				});
			}
		};
                
		$("#signup_form").submit(function(){
			//hide any prior error messages upon click
			$("#sign_up_message").html('').hide();
					
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			var data = $("#signup_form").serialize();
			$.ajax({                
				type : 'POST',
				url  : 'signup_process.php',
				data : data,
				beforeSend: function(){	
					//do something
				},
				success : function(response){	
				
					response = response.trim();
					if((response === "Password must be between 5 and 20 characters long.")
						||(response === "Email already signed up, please sign in or use another email.")
						||(response === "Email is not valid.")){            
							$("#sign_up_message").html(response).show();
					}else{ph = $(this).attr('placeholder');
						$('#signup_form, input[id="email"]').val('');
						$('#signup_form, input[id="password"]').val('');
						$("#sign_up_message").html(response).show().fadeOut(5000);
						//setTimeout(function() { 
							//signIn();
						//}, 5000);                        
					}
					
				}
			});
			return false;
		});

		$("#resend_activation_form").submit(function(){
			//hide any prior error messages upon click
			$("#sign_in_message").html('').hide();
			
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			var data = $("#signin_form").serialize();
			
			$.ajax({                
				type : 'POST',
				url  : 'resend_activation_code_process.php',
				data : data,
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					if((response === "Incorrect password.")
						||(response === "Email doesn't exist.")){
						$("#sign_in_message").html(response).show().fadeOut(5000);
					}else{
						$("#sign_in_message").html(response).show().fadeOut(5000);
						$("#resend_activation_form").hide();
					}
				}
			});
			return false;
		});

		$("#contact_form").submit(function(){
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			var data = $("#contact_form").serialize();

			$.ajax({                
				type : 'POST',
				url  : 'contact_process.php',
				data : data,
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					if(response=="success"){	
						$("#email_success_message").show();
						$("#contact_form").hide();
						$("#contact_name").val('');
						$("#contact_email").val('');
						$("#contact_message").val('');
						$("#contact_form").delay(4000).fadeIn();
						$("#email_success_message").delay(3000).fadeOut();
					}else{
						$("#email_error_message").show();
						$("#email_error_message").delay(3000).fadeOut();
					}
					$("#human_check").prop("checked", false );
				}
			});
			return false;
		});

		function capitalizeFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		function getEmailName(email) {
			var str = email.split('@')[0].trim();
			return capitalizeFirstLetter(str);
		}

		function maskEmailAddress(emailAddress){
			function mask(str) {
				var strLen = str.length;
				if (strLen > 4) {
					return str.substr(0,2) + str.substr(1,strLen - 1).replace(/\w/g, '*') + str.substr(-1,1);
				} 
				return str.replace(/\w/g, '*');
			}
			return emailAddress.replace(/([\w.]+)@([\w.]+)(\.[\w.]+)/g, function (m, p1, p2, p3) {      
				return mask(p1) + '@' + mask(p2) + p3;
			});
			 
			return emailAddress;
		}
 
		$("#signin_form").submit(function(){
			
			//hide any prior error messages upon click
			$("#sign_in_message").html('').hide();
			
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			var data = $("#signin_form").serialize();
			
			//get remember me checked data
			var checked = "";
			if($("#remember_me").prop("checked") == true){
				var checked = "true";
			}
			var data = data + "&remember_me=" + checked;

			$.ajax({                
				type : 'POST',
				url  : 'authenticate.php',
				data : data,
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					if((response === "Incorrect password.")
						||(response === "Email doesn't exist.")){
						$("#sign_in_message").html(response).show().fadeOut(5000);
					}else if(response === "Email exists, but is not activated. Please check your email. It could be in your spam folder."){
						$("#sign_in_message").html(response).show().fadeOut(5000);
						$("#resend_activation_form").show();
					}else{
						var data = JSON.parse(response);
						
						if(data.length>0){
							 
							$.when(elementFontReSize(data[0]['fontsize'])).then(function(){
								$.when(themeToggle(data[0]['theme'])).then(function(){
									$.when(xlitToggle(data[0]['show_xlit'],"")).then(function(){
										$("#show_xlit").val(data[0]['show_xlit']);
										
										$.when(wordToggle(data[0]['word_toggle'],"")).then(function(){
											$("#aleph_tav").val(data[0]['aleph_tav']);	
											$("#aleph_tav_icon").val(data[0]['aleph_tav']);	
								
											//show search history tab only if logged in
											$("#search_tab_hist").show();
											
											//then load search history
											$.when(loadSearchHistory()).then(function(){
												//reload books
												$.when(loadBooks()).then(function(){
													
												$('#signin_form, input[id="email"]').val('');
												$('#signin_form, input[id="password"]').val('');
												$("#sign_in_message").html('').hide();
												$('input[id="password"]').attr('type', 'password');
												$(".view_password").html('Show Password');
												$("#sign_in_container").hide();
												$("#sign_in").hide();        
												$("#sign_out").show();       
												$("#signedin_email").html(getEmailName(data[0]['email'])).show();

												//show only for admin
												if(data[0]['id']==1||data[0]['id']==2||data[0]['id']==3||data[0]['id']==4){
													$("#menu_raqia").show();
													//$("#search_header").hide();
													$("#slider_center").show();
													$("#login_info").show();			

													if($('#search_toggle').is(":visible")){
														$("div.scroll_search").css("padding","203px 10px 0px 10px");
													}else{
														$("div.scroll_search").css("padding","173px 10px 0px 10px");
													};									
												}else{
													$("#menu_raqia").hide();
													$("#slider_center").hide();
													//$("#search_header").show();
													$("#login_info").hide();
												}
								
												})
											})
										})
									})
								})
							});
							
						}else{
							$("#search_tab_hist").hide();
							$("#sign_in").show();        
							$("#sign_out").hide();
						}
					}
				}
			});
			return false;
		});
                
		$("#reset_password_form").submit(function(){
			//hide any prior error messages upon click
			$("#reset_password_message").html('').hide();
		
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			var data = $("#reset_password_form").serialize();
					
			$.ajax({                
				type : 'GET',
				url  : 'reset_password_process.php',
				data : data,
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);

					if((response === "Email doesn't exist.")){
						$("#reset_password_message").html(response).show().fadeOut(5000);
					}else{
						$("#reset_password_message").html(response).show().fadeOut(5000);
						$('#reset_password_form, input[id="email"]').val('');
						//setTimeout(function() { 
							//$("#sign_in").show();        
							//$("#reset_password").hide();
						//}, 5000);
					}
				}
			});
			return false;
		});

		$("body").on('click', ".view_password", function(){ 
			var x = $('input[name="password"]').attr('type');
			var y = $('input[name="password_signup"]').attr('type');

			if(x==='password'){
				$('input[name="password"]').attr('type', 'text');
				$('.view_password').html('Hide Password');
			}else if(x==='text'){
				$('input[name="password"]').attr('type', 'password');
				$('.view_password').html('Show Password');
			}
			if(y==='password'){
				$('input[name="password_signup"]').attr('type', 'text');
				$('.view_password').html('Hide Password');
			}else if(y==='text'){
				$('input[name="password_signup"]').attr('type', 'password');
				$('.view_password').html('Show Password');
			}
			return false;
		}); 

		$("body").on('click', ".view_terms", function(){ 

			$("#confirm_terms").dialog({
				autoOpen : false, 
				modal : true,
				width: '99%',
				height: 'auto',
				autoResize:true,
				resizable: true,
				minHeight: '75%',
				maxHeight: 300,
				minWidth: '99%',
				maxWidth: 260,
				title: "Terms & Conditions",
				closeOnEscape: true,
				close: function() {
					$("#confirm_terms").show();
					$("#confirm_terms").dialog("close");
				},
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
						$("#confirm_terms").dialog('close'); 
					}); 
			   }
			});
			$("#confirm_terms").dialog('open');
			setTimeout(function() {
				$("#confirm_terms").stop(true, true).animate({ scrollTop: 0}, 0, function () {});
			}, 1);
			return false;
		}); 
            
		$("body").on('click', ".change_font_size", function(){ 

			var cur_font_size = parseInt($("#current_font_size").val());
			$(".toggle_current_font_size").css({"font-size":cur_font_size});
			$(".toggle_font_size").html(cur_font_size);
		
			$("#font_size_dialog").dialog({
				autoOpen : false, 
				modal : true,
				width: '75%',
				height: 'auto',
				autoResize:true,
				resizable: true,
				minHeight: '75%',
				maxHeight: 300,
				minWidth: 'auto',
				maxWidth: 260,
				title: "Change Text Size ["+cur_font_size+"px]",
				closeOnEscape: true,
				close: function() {
					$("#font_size_dialog").show();
					$("#font_size_dialog").dialog("close");
				},
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
					$("#font_size_dialog").dialog('close'); 
					}); 
			   }
			});
			$('#font_size_dialog').dialog('open');
			return false;
		}); 
            
		$("body").on('click', "#change_aleph_tav", function(){ 
		
			$("#aleph_tav_dialog").dialog({
                    autoOpen : false, 
                    modal : true,
                    width: '75%',
                    height: 'auto',
                    autoResize:true,
                    resizable: true,
                    minHeight: '75%',
                    maxHeight: 300,
                    minWidth: 'auto',
                    maxWidth: 260,
				title: "Change Aleph and Tav",
				closeOnEscape: true,
				close: function() {
					$("#aleph_tav_dialog").show();
					$("#aleph_tav_dialog").dialog("close");
				},
				open: function(event, ui) {
					//closes dialog when clicking outside of popup dialog
					$('.ui-widget-overlay').bind('click', function(){ 
					$("#aleph_tav_dialog").dialog('close'); 
					}); 
			   }
			});
			$('#aleph_tav_dialog').dialog('open');
			return false;
		}); 

		$("#aleph_tav_icon, #aleph_tav").on('change', function(){
			//this used for manual click
			var action = $(this).attr('data-action');
			var setting = $(this).attr('data-setting');
			
            if(setting=='aleph_tav'){
                //get select dropdown value
                if(action=='icon'){
                    var setting_value = $('#aleph_tav_icon').val();
                }else{
                    var setting_value = $('#aleph_tav').val();
                }
				$("#aleph_tav").val(setting_value).attr("selected", "selected");
				$("#aleph_tav_icon").val(setting_value).attr("selected", "selected");
                
                //check if records loaded
				var book_id = $('#book_selected').val();
				var section_id = $('#section_selected').val();
                var record_id = $('#record_selected').val();
                if(book_id!=''&&section_id!=''&&record_id!=''){
					loadRecordDetails('r',book_id,section_id,record_id);
                }
				
				$("#load_search_details").trigger('click');
            }
			saveUserSetting(setting,setting_value,action);
    	});

        function saveUserSetting(setting,setting_value,action) {
			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
					type: 'save_user_setting',
                    setting: setting,
                    setting_value: setting_value
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
				}
			});  
    	};

        function wordToggle(word_value,action){                

            if(word_value!=''&&word_value!=undefined){
                if(word_value==1){
                    $('#word_toggle').prop('checked', false);
                }else if(word_value==2){
                    $('#word_toggle').prop('checked', true);
                }
            }

            if($('#word_toggle').is(":checked")){
                $('#wt_on_off').html('On');
                $('#slider_word').removeClass('slider_night').addClass('slider_day');
                saveUserSetting('word_toggle','2','');
                setTimeout(function() {
                    //check if records loaded
					var book_id = $('#book_selected').val();
					var section_id = $('#section_selected').val();
					var record_id = $('#record_selected').val();
					if(book_id!=''&&section_id!=''&&record_id!=''){
						if(action != "noload"){
							loadRecordDetails('r',book_id,section_id,record_id);
							findReplace('4','menu_cell_records_display');
							findReplace('4','menu_cell_records_display_search');
						}
                    }
					//check if search has results loaded
					var search_exist = $('#r_display_search_results').html();
					if(search_exist!=''){
						var search_input = $('#search').val();
						//if input field is not blank, then results  
						if(search_input!=''){
							if(action != "noload"){
								loadSearchDetails('','reload');
							}
						}
					}
                }, 1);
            }else{
                $('#wt_on_off').html('Off');
                $('#slider_word').removeClass('slider_day').addClass('slider_night');
                saveUserSetting('word_toggle','1','');
                setTimeout(function() { 
                    //check if records loaded
					var book_id = $('#book_selected').val();
					var section_id = $('#section_selected').val();
					var record_id = $('#record_selected').val();
					if(book_id!=''&&section_id!=''&&record_id!=''){
						if(action != "noload"){
							loadRecordDetails('r',book_id,section_id,record_id);
						}
                    }
					//check if search has results loaded
					var search_exist = $('#r_display_search_results').html();
					if(search_exist!=''){
						var search_input = $('#search').val();
						//if input field is not blank, then results  
						if(search_input!=''){
							if(action != "noload"){
								loadSearchDetails('','reload');
							}
						}
					}
                }, 1);
            }
    	};
		document.getElementById("word_toggle").addEventListener("click", function(){ wordToggle(); }); 

        function xlitToggle(xlit_value,action){

            if(xlit_value=='xlit'&&xlit_value!=undefined){
                $('#xlit_toggle').prop('checked', true);
                $("#show_xlit").val('xlit');
            }else if(xlit_value==''&&xlit_value!=undefined){
                $('#xlit_toggle').prop('checked', false);
                $("#show_xlit").val('');
            }
            
            if($('#xlit_toggle').is(':checked')){
                $('#xlit_on_off').html('On');
                $('#slider_xlit').removeClass('slider_night').addClass('slider_day');
                saveUserSetting('show_xlit','xlit','');
                $("#show_xlit").val('xlit');
            }else{
                $('#xlit_on_off').html('Off');
                $('#slider_xlit').removeClass('slider_day').addClass('slider_night');
                saveUserSetting('show_xlit','','');
                $("#show_xlit").val('');
            }
			setTimeout(function() { 
				//check if records loaded
				var book_id = $('#book_selected').val();
				var section_id = $('#section_selected').val();
				var record_id = $('#record_selected').val();
				if(book_id!=''&&section_id!=''&&record_id!=''){
					if(action != "noload"){
						loadRecordDetails('r',book_id,section_id,record_id);
					}
				}
			}, 1);
			setTimeout(function() { 
				//check if search has results loaded
				var search_exist = $('#r_display_search_results').html();
				if(search_exist!=''){
					var search_input = $('#search').val();
					//if input field is not blank, then results  
					if(search_input!=''){
						if(action != "noload"){
							loadSearchDetails('','reload');
						}
					}
				}
			}, 1);

    	};
		document.getElementById("xlit_toggle").addEventListener("click", function(){ xlitToggle(); }); 

		$(".theme_toggle").on('click', function(){
			//this used for manual click
			theme_value = $(this).attr('data-theme');
			theme_value = theme_value.replace("theme_", "");

			themeToggle(theme_value);
    	});
		
        function themeToggle(theme_value){
			//this used for in page function [i.e. themeToggle('1');]

			if(theme_value==1){
				$('#theme_toggle').prop('checked', false);
			}else if(theme_value==2){
				$('#theme_toggle').prop('checked', true);
			}

			//save user choice
			saveUserSetting('theme',theme_value);
			
			//$('link[data-role="daynight"]').attr('href', '');
			if($('#theme_toggle').is(":checked")){
				//NIGHT THEME
				$('#day_night_on_off').html('Night');
				
				for(var i=5; i < 10; i++){
					if($("#menu_image"+i).attr('id')!=undefined){
						if($("#menu_image"+i).attr('id')=="menu_image"+i){
							$("#menu_image"+i).attr('src', '/images/icons/menu'+i+'_g.png');
						}
					}
				}
				
				$(".icon_writeup").attr('src', '/images/icons/writeup_d.png');
				$(".icon_timeline").attr('src', '/images/icons/timeline_d.png');
				$(".icon_video").attr('src', '/images/icons/video_d.png');
				$(".icon_audio").attr('src', '/images/icons/audio_d.png');

				$('link[data-role="day"]').prop( "disabled", true );
				$('link[data-role="night"]').prop( "disabled", false );
				//$('link[data-role="day"]').attr('href', 'css/night.css');
				$('.toggle_on_day').css({'cursor':'pointer'});
				$('.toggle_on_night').css({'cursor':''});
				saveUserSetting('theme','2','');
			
			}else{
				//DAY THEME
				$('#day_night_on_off').html('Day');
				
				for(var i=5; i < 10; i++){
					if($("#menu_image"+i).attr('id')!=undefined){
						if($("#menu_image"+i).attr('id')=="menu_image"+i){
							$("#menu_image"+i).attr('src', '/images/icons/menu'+i+'.png');
						}
					}
				}
				
				$(".icon_writeup").attr('src', '/images/icons/writeup.png');
				$(".icon_timeline").attr('src', '/images/icons/timeline.png');
				$(".icon_video").attr('src', '/images/icons/video.png');
				$(".icon_audio").attr('src', '/images/icons/audio.png');
				
				$('link[data-role="night"]').prop( "disabled", true );
				$('link[data-role="day"]').prop( "disabled", false );
				//$('link[data-role="daynight"]').attr('href', 'css/day.css');
				$('.toggle_on_day').css({'cursor':''});
				$('.toggle_on_night').css({'cursor':'pointer'});
				saveUserSetting('theme','1','');
			};
    	};
		document.getElementById("theme_toggle").addEventListener("click", function(){ themeToggle(); }); 

        function checkToggle(elemClass){
			//alert(elemClass);
            if(elemClass=='toggle_off'){
                if($('#search_toggle').is(":checked")){
                    $('#search_toggle').prop('checked', false);
                }else if($('#search_toggle').is(":not(:checked)")){
                    $('#search_toggle').prop('checked', true);
                }
                searchToggle();
            }else{
                return false;
            }
    	};
		document.getElementById("search_label_ib").addEventListener("click", function(){ checkToggle($(this).attr("class")); }); 
		document.getElementById("search_label_con").addEventListener("click", function(){ checkToggle($(this).attr("class")); }); 
        
        function searchToggle(){
			if($('#search_toggle').is(":checked")==false){
				var search_exist = $("#r_display_search_results").html();
				if(search_exist==""){
					showHideSearch('');
					$("#quick_search").show();
					$('#message_records').html("Search Hebrew Records of <span id=\"thenames\">JWJY</span> <span id=\"thenames\">TA</span>");
				}else{
					showHideSearch('show');
					$("#quick_search").hide();
					$("#r_display_search_results").show();
				}
				$(".search_strongs_display").hide();

				$('#message_con').hide();
				$('#message_records').show();
				//$(".anchor_c").show();
				$("#search_anchor").show();
				$("#search_label_ib").removeClass("toggle_off").addClass("toggle_on_ib");
				$("#search_label_con").removeClass("toggle_on_con").addClass("toggle_off");
			}else{
				$("#quick_search").hide();
				var search_exist_con = $("#search_strongs_display").html();
				if(search_exist_con==""){
					showHideSearch('');
					$('#message_con').html("Search Revised Concordance");
				}else{
					showHideSearch('show');
				}
				$("#r_display_search_results").hide();
				$(".search_strongs_display").show();
				$('#message_records').hide();
				$('#message_con').show();
				//$(".anchor_c").hide();
				$("#search_anchor").hide();
				$("#search_label_con").removeClass("toggle_off").addClass("toggle_on_con");
				$("#search_label_ib").removeClass("toggle_on_ib").addClass("toggle_off");
			}
			checkSearch();	
    	};
		document.getElementById("search_toggle").addEventListener("click", function(){ searchToggle(); }); 

        function signInToggle(){
			if($("#sign_in_container").is(":visible")){
				$("#sign_in_container").hide();
				$(".sign_in_plus_minus").html('');
				$("#sign_in").show();
			}else{
				$("#sign_in_container").show();
				$(".sign_in_plus_minus").html('<img src="/images/close_red.png" width="15px" height="15px" border="none">');
				$("#sign_in").hide();
			};
    	};
		
		$("body").on('click', ".sign_in, .sign_in_plus_minus", function(){
			signInToggle();
    	});

		$("body").on('click', ".sign_up_link", function(){
			signUp();
    	});
        function signUp(){
            $("#sign_up").show();
			$("#sign_in_container").hide();
            $("#sign_in").hide();
            $("#sign_up_message").html('').hide();
            $("#reset_password").hide();
    	};
		
		$("body").on('click', ".sign_in_link", function(){
			signIn();
    	});
        function signIn(){
            $("#sign_in_container").show();
            $("#sign_up").hide();
            $("#reset_password").hide();
    	};

		$("body").on('click', ".reset_password_link", function(){
			resetPassword();
    	});
        function resetPassword(){
            $("#reset_password").show();
            $("#sign_in_container").hide();
            $("#sign_in").hide();
            $("#sign_up").hide();
    	};

        function signOut(){
			$.ajax({                
				type : 'POST',
				url  : 'logout.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					loadBooks();
					
					//upon logout, reset to default settings and reload anything that may be displayed
                    wordToggle('1');
                    xlitToggle('xlit');
                    themeToggle('1');
                    elementFontReSize('18');
                    $('#aleph_tav_selected').val('2');
					$("#aleph_tav").val('0');	
					$("#aleph_tav_icon").val('0');	
                    $("#search_tab_hist").hide();
                    loadSearchTab('1');
					$(".anchor_c").show();

                    //hide for everyone. shows only for admin upon login
                    $("#menu_raqia").hide();
                    $("#slider_center").hide();
                    //$("#search_header").show();
                    $('#search_toggle').prop('checked', false);
                    $("#login_info").hide();

					$("#sign_out").hide();
					$("#sign_in_container").hide();	
					$(".sign_in_plus_minus").html('');
					$("#sign_in").show();			
					$("#signedin_email").html("").hide();		
				}
			});
    	};
		//document.getElementById("sign_out").addEventListener("click", function(){ signOut(); }); 
        
        function clearSearch(){
            if($('#search_toggle').is(":checked")==false){
				//setTimeout(function() { 
					//$(".anchor_c").css("height","0px");
				//}, 1);
				if($('#search_toggle').is(":visible")){
					$("div.scroll_search").css("padding","203px 10px 0px 10px");
				}else{
					$("div.scroll_search").css("padding","173px 10px 0px 10px");
				};
				
				$("#r_display_search_results").html("");
                $('#search').val('');
                $('#message_records').html("Search the Hebrew Records of <span id=\"thenames\">JWJY</span> <span id=\"thenames\">TA</span>");
                showHideSearch('');
                $('.scroll_search').scrollTop(0);
                $("#quick_search").show();
                loadSearchHistory();
                $("#r_display_search_results").html("");
                $(".anchor_headers_search").html("");
                $(".anchor_headers_search_pipe").html("");
				$('#search').focus();
				loadSearchTerms();
            }else{
				$("#search_strongs_display").html("");
                $('#search').val('');
                $('#message_con').html("Search the Revised Concordance.");
                showHideSearch('show');
                $('.scroll_search').scrollTop(0);
            }
        };
		document.getElementById("clear_search").addEventListener("click", function(){ clearSearch(); }); 

        function showHideSearch(action){
			if(action=='show'){
				$("#clear_search").css("background-color","#f00");
				$("#clear_search").css("cursor","pointer");
			}else if(action==''){
				$("#clear_search").css("background-color","#999");
				$("#clear_search").css("cursor","not-allowed");
			}
        };

        function checkSearch(){
			var len = $("#search").val().length;
			if(len==0){
				showHideSearch('');
			}else{
				showHideSearch('show');
			}
			
			$('#search').on('keyup', function(e) {
				if (e.which == 13) { 
				//submit the search form
					$("#load_search_details").trigger('click');
					return false;
				}
			});
			$('#search').on('keyup', function(e) {
				if (e.which == 38||e.which == 40) { 
					var len = $("#search").val().length;
				}else{
					var len = $("#search").val().length;
				}
				if(len==0){
					showHideSearch('');
				}else{
					showHideSearch('show');
				}
			});
			$('#search').on('mouseup', function(e) {
				var len = $("#search").val().length;
				if(len==0){
					showHideSearch('');
				}else{
					showHideSearch('show');
				}
			});
			$('#search').on('mousedown', function(e) {
				var len = $("#search").val().length;
				if(len==0){
					showHideSearch('');
				}else{
					showHideSearch('show');
				}
			});
			$('#search').on('select', function(e) {
				var len = $("#search").val().length;
				if(len==0){
					showHideSearch('');
				}else{
					showHideSearch('show');
				}
			});
			$('#search').on('change', function(e) {
				var len = $("#search").val().length;
				if(len==0){
					showHideSearch('');
				}else{
					showHideSearch('show');
				}
			});	

        };
		document.getElementById("search").addEventListener("focus", function(){ checkSearch(); });

		$("body").on('click', "#search_tab_rel,#search_tab_hist", function(){ 
			var tab = $(this).attr('data-tab');
			$.when(loadSearchTab(tab)).then(function(){
				saveLastLocation("Search",tab,'')
			});
        });
        
        function loadSearchTab(tab){
            if($('#search_toggle').is(":checked")==false){
                $("#quick_search").show();
                
                if(tab==1){
				    $("#search_hist").hide();
                    $("#search_tab_hist").removeClass('search_active').addClass('search_inactive');
                    $("#search_tab_rel").removeClass('search_inactive').addClass('search_active');
                    $("#search_rel").show();
                }else{
                    loadSearchHistory();
                    $("#search_rel").hide();
                    $("#search_tab_rel").removeClass('search_active').addClass('search_inactive');
                    $("#search_tab_hist").removeClass('search_inactive').addClass('search_active');
                    $("#search_hist").show();
                }
            }else{
                $("#quick_search").hide();
            }
        };
	
		$("body").on('click', "#load_search_details", function(){
			var terms = $("#search").val();
			//var terms = terms.replace(/JWJY/g, "Yahuah").replace(/`WSWJY/g, "Yahushua").replace(/TA/g, "Aleph and the Tav").replace(/jwjy/g, "Yahuah").replace(/`wswjy/g, "Yahushua");
			loadSearchDetails(terms,'');
        });		
		$("body").on('click', ".load_search_terms", function(){
			var terms = $(this).attr('data-terms');
			//var terms = terms.replace(/JWJY/g, "Yahuah").replace(/`WSWJY/g, "Yahushua").replace(/TA/g, "Aleph and the Tav").replace(/jwjy/g, "Yahuah").replace(/`wswjy/g, "Yahushua");
			loadSearchDetails(terms,'');
        });

        //load and display all SEARCH record details to view
        function loadSearchDetails(terms,action){
		
			var search_tab = 1;
			if($('#search_tab_hist').attr('class')=="search_active"){
				search_tab = 2;
			}
			saveLastLocation('Search',search_tab,terms);

			if(terms!=''&&terms!=undefined&&$('#search_toggle').is(":checked")==false){
                $("#search").val(terms);
				checkSearch();
            }
            
            var len = $("#search").val().length;
            
			//search bewtween Yah's writings or strongs concordance\
			if($('#search_toggle').is(":checked")==false
				&& (len>=2&&len<=40)){
			
				$("#r_display_search_results").html("");
				$(".anchor_headers_search").html("");
				$(".anchor_headers_search_pipe").html("");
					
				/////////////////////////////
				//SEARCH FOR YAH'S WRITINGS//
				/////////////////////////////
				
				$("#quick_search").hide();
				var keywords = $("#search").val();

				if(keywords!=''&&keywords!=undefined){

					var word_toggle = 2;
					if($('#word_toggle').is(":checked")==true){
						word_toggle = 1;
					}

					//do all needed before getting data
					$(".search_strongs_display").hide();
					$("#r_display_search_results").hide();
					$("#message_records").html("");
					$(".loading_message").html("<br>Searching Hebrew Records...<br><br><div class=\"loader_red\"></div>");
					//get AJAX data
					$.ajax({                
						type : 'GET',
						url  : 'search_records.php',
						data: {  
							type: 'get_search_keywords',
							keywords: keywords,
							xlit: $("#show_xlit").val(),
							word_toggle: word_toggle,
							aleph_tav: $("#aleph_tav").val()
						},
						beforeSend: function(){	
							//do something
						},
						success : function(response){
							response = $.trim(response);
							
							$("#r_display_search_results").html(response);
							//findReplace('1','menu_cell_records_display_search');
							//findReplace('2','annot_replace');

							$("#search_anchor").html($("#search_record_parents").html());

							if($('#search_toggle').is(":visible")){
								$("div.scroll_search").css("padding","203px 10px 0px 10px");
							}else{
								$("div.scroll_search").css("padding","173px 10px 0px 10px");
							};	

							var len = $("#search_record_count").val();
							if(action!='reload'){
								saveUserSearch(keywords,len);
							}
							var result_message = "<div>Select record to load full section.</div><div class=\"results_search\">("+len+" Hebrew Records)</div>";
							if(len==0){
								var result_message = "<br><div class=\"no_result_message\">No Hebrew Records found.</div>";
								$("#quick_search").show();
							}
							if(len==1){
								var result_message = "Select record to load entire section.<div class=\"results_search\">("+len+" Hebrew Record)</div>";
							}
							if(len>=1){
								$("#quick_search").hide();
							}
							$("#message_records").html(result_message);
							$(".loading_message").html("");	
							
							//get parent books ie Torah
							var data = $("#search_record_parents").html();
							
							$("#r_display_search_results").show();
							$(".search_books_container").last().addClass('search_books_container_last');
							$(".search_books_container_last").last().removeClass('search_books_container');
							
							//var e = document.getElementById('scroll_search');
							//var scroll_present = $scope.checkIfScrollBarPresent(e, 'vertical');
							//adjusts height of container for records displayed so bottom results not hidden behind footer
							var scroll_torah_h = $(".scroll_search").height();
							//var search_results = $("#r_display_search_results").height();
							//var foot_c_h = $(".foot_c").height();
							//var cell_h = parseInt(foot_c_h)+parseInt(search_results)+parseInt(1);
							//if(cell_h>=scroll_torah_h||scroll_present===false){
								$("#r_display_search_results").height(scroll_torah_h+1);
							//}							
						}
					});
				}
						
			}else{
				//////////////////////////
				//SEARCH FOR CONCORDANCE//
				//////////////////////////
				
				var keywords = $("#search").val();
				if(keywords!=''&&keywords!=undefined
					&& (len>=2&&len<=40)){
					
					//do all needed before getting data
					//$("#quick_search").hide();
					//$(".anchor_headers_search").html('');
					//$(".anchor_headers_search_pipe").html('');
					//$("#r_display_search_results").hide();
					$(".search_strongs_display").hide();
					$("#message_con").html("");
					$(".loading_message").html("<br><div class=\"loading_message_con\">Searching Concordance...<br><br><div class=\"loader_blue\"></div>");
		
					//get AJAX data
					$.ajax({                
						type : 'GET',
						url  : 'search_concordance.php',
						data: {  
							type: 'get_search_strongs',
							keywords: keywords
						},
						beforeSend: function(){	
							//do something
						},
						success : function(response){
							response = $.trim(response);
							
							$("#search_strongs_display").html(response);

							$.when(findReplace('1','strongs_container')).then(function(){
								var len = $("#search_con_count").val();
								$(".loading_message").html("");
								var result_message = "<div>Revised Concordance</div><div class=\"results_search\">("+len+" concordance results)</div>";
								if(len==1){
									var result_message = "<div>Revised Concordance</div><div class=\"results_search\">("+len+" concordance result.)</div>";
								}
								if(len==0){
									var result_message = "<br><div class=\"no_result_message_blue\">No concordance results found.</div>";
								}
								$("#message_con").html(result_message);
								
								$.when(elementFontReSize()).then(function(){
									$(".search_strongs_display").show();
									$(".strongs_container").last().addClass('strongs_container_last');
									$(".strongs_container_last").last().removeClass('strongs_container');
								});	
							});
						}
					});
				};
			};
    	};

        function loadTab(this_tab) {
        	setTimeout(function() { tab=this_tab;}, 1);
        };
        
        function checkIfScrollBarPresent(element, dir) {
            dir = (dir === 'vertical') ? 
                        'scrollTop' : 'scrollLeft'; 
              
            var res = !! element[dir]; 
              
            if (!res) { 
                element[dir] = 1; 
                res = !!element[dir]; 
                element[dir] = 0; 
            } 
            return res; 
        };

		//$(".menu_list").on('click', function(){
		$("body").on('click', "#menu_raqia,#menu_contact,#menu_terms,#menu_settings", function (){

        	$('.menu_list-active').each(function() {
        	    $(this).removeClass('menu_list-active').addClass('menu_list');
        	});
	
			page = $(this).attr('data-menu').replace("menu_", "");
			$.when($(this).removeClass('menu_list').addClass('menu_list-active')).then(function(){
				showMenuPage(page);	
			});	

_paq.push(['setCustomUrl', page]);
_paq.push(['setGenerationTimeMs', 0]);
_paq.push(['trackPageView']);
		
        });
		
		function showMenuPage(page){
            var page = page.toLowerCase();
			$.when($('.site_page').hide()).then(function(){
				$.when($("#scroll_"+page.toLowerCase()).load(page.toLowerCase()+".php")).then(function(){
					$.when(saveLastLocation('Menu',page,'')).then(function(){
						$.when($("#back_button").show()).then(function(){
							$("#page_"+page).show();
						});	
					});	
				});		
			});		
        };
		
		$("body").on('click', ".toggle_plus,.toggle_minus", function (){
			var action = $(this).attr('class');

            var min_size = 9;
            var max_size = 34;

            var cur_font_size = parseInt($("#current_font_size").val());
            $(".toggle_current_font_size").css({"font-size":cur_font_size});
            $(".toggle_font_size").html(cur_font_size);

            if(action!=''&&action!=undefined){
                if(action=='toggle_minus'){
                    var new_font_size = cur_font_size-1;
                    if(new_font_size>=min_size){
						$.when(saveUserSetting('fontsize',new_font_size,'')).then(function(){
							$(".toggle_current_font_size").css({"font-size":new_font_size});
							$(".toggle_font_size").html(new_font_size);
							 elementFontReSize(new_font_size);
						});							
                    }else{
                        return false;
                    }
                }else if(action='toggle_plus'){
                    var new_font_size = cur_font_size+1;
                    if(new_font_size<=max_size){
						$.when(saveUserSetting('fontsize',new_font_size,'')).then(function(){
							$(".toggle_current_font_size").css({"font-size":new_font_size});
							$(".toggle_font_size").html(new_font_size);
						
							elementFontReSize(new_font_size);
						});	
                    }else{
                        return false;
                    }
                }	
            }        
        });
		
        function saveUserSearch(keywords,resultcount) {
 			$.ajax({                
				type : 'GET',
				url  : 'phptojson.php',
				data: {  
                    type: 'save_user_search',
                    keywords: keywords,
                    resultcount: resultcount
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					loadSearchHistory();
				}
			});
        }
        
        function loadSearchTerms() {
			$.ajax({                
				type : 'GET',
				url  : 'get_search_terms.php',
				data: {  
					type: 'get_search_terms'
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					
					$("#search_terms_container").html(response);
					findReplace('1','search_pointer');
				}
			});
        }
        
        function loadSearchHistory(){
			$.ajax({                
				type : 'GET',
				url  : 'get_search_history.php',
				data: {  
					type: 'get_search_history'
				},
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					
					$("#search_history_container").html(response);
					findReplace('1','search_pointer');
				}
			});
        };

        function hideMenus(page) {
            if(page=='Read'){
                $("#anchor_check").val('1');
                
                var e = document.getElementById('scroll_read');
                var scroll_present = checkIfScrollBarPresent(e, 'vertical');
                var foot_top = $('#foot_c_top_position').val();
                
                if(scroll_present===true){
                    var foot_down = parseInt(foot_top)+51;
                    $('#foot_c').css('top', foot_down+'px');
                    $('#torah_head').css('top', '-78px');
                    $("#anchor_check").val('');
                }else{
                    showMainMenu();
                    var foot_up = parseInt(foot_top);
                    $('#foot_c').css('top', foot_up+'px');
                    $('#torah_head').css('top', '0px');
                    $("#anchor_check").val('');
                }
            }
        };
		
        // Size of browser viewport.
        //var win_h = $(window).height();
        //var win_w = $(window).width();
        
        // Size of HTML document (same as pageHeight/pageWidth in screenshot).
        //var doc_h = $(document).height();
        //var doc_w = $(document).width();
        
        //For screen size you can use the screen object:
        //var screen_h = window.screen.height;
        //var screen_w = window.screen.width;
        
        //take down in page to record selected
        function resizeScroll() {
            
            var win_h = $(window).height();
            var header_h = $(".head_c").height();
            var footer_h = $(".foot_c").height();
            var height = win_h-((header_h+footer_h-38));
            $(".body_c").css({"height": height+"px"});
            var new_body_h = $(".body_c").height();
            
            //set footer top position dynamically with new "height" value
            $(".foot_c").css({"top": height+"px"});
            //sets last know top position of footer
            $("#foot_c_top_position").val(height);
            
           	$(window).resize(function() {

                //resize dialog upon window resize
                var wWidth = $(window).width();
                var dWidth = wWidth * 0.85;
                var wHeight = $(window).height();
                var dHeight = wHeight * 0.5;
                if($("#annot_dialog").hasClass('ui-dialog-content')){
                    $("#annot_dialog").dialog("option", "width", dWidth);
                    $("#annot_dialog").dialog("option", "height", dHeight);
                }                
                if($("#font_size_dialog").hasClass('ui-dialog-content')){
                    $("#font_size_dialog").dialog("option", "width", dWidth);
                    $("#font_size_dialog").dialog("option", "height", dHeight);
                }                    
                if($("#aleph_tav_dialog").hasClass('ui-dialog-content')){
                    $("#aleph_tav_dialog").dialog("option", "width", dWidth);
                    $("#aleph_tav_dialog").dialog("option", "height", dHeight);
                }                
                if($("#confirm_terms").hasClass('ui-dialog-content')){
                    $("#confirm_terms").dialog("option", "width", dWidth);
                    $("#confirm_terms").dialog("option", "height", dHeight);
                }                    
                if($("#xlit_dialog").hasClass('ui-dialog-content')){
                    $("#xlit_dialog").dialog("option", "width", dWidth);
                    $("#xlit_dialog").dialog("option", "height", dHeight);
                }                    
                if($("#timeline_dialog").hasClass('ui-dialog-content')){
                    $("#timeline_dialog").dialog("option", "width", dWidth);
                    $("#timeline_dialog").dialog("option", "height", dHeight);
                }
	
                var win_h = $(window).height();
                var header_h = $(".head_c").height();
                var footer_h = $(".foot_c").height();
                var height = win_h-((header_h+footer_h-38));
                $(".body_c").css({"height": height+"px"});
                
                var new_body_h = $(".body_c").height();
                
                //set footer top position dynamically with new "height" value
                $(".foot_c").css({"top": height+"px"});
                //sets last know top position of footer
                $("#foot_c_top_position").val(height);
           	});
        };        
        resizeScroll();
            
		$("body").on('click', ".loadbookdata", function(){
			
			//must get values before timeout
			var book_id = $(this).attr('data-book_id');
			var section_id = $(this).attr('data-section_id');
			var record_id = $(this).attr('data-record_id');
			var action = 'search';
			
			//check to see if dialog was opened, if so, do not load book data, else load book data
			//setTimeout(function(){ 
				var dialog_open_annot = $('#display_annotations').html();
				var dialog_open_xlit = $('#xlit_dialog_container').html();

				if((dialog_open_annot == "")&&(dialog_open_xlit == "")){
					loadBookData(book_id,section_id,record_id,action);			
				}
			//}, 1);
		});  
 
        //add or subtract from current selection
        function loadBookData(book_id,section_id,record_id,action) {

            if((book_id!=''&&book_id!=undefined) 
                && (section_id!=''&&section_id!=undefined) 
                && (record_id!=''&&record_id!=undefined)){
 
				$.ajax({                
					type : 'GET',
					url  : 'phptojson.php',
					data: {  
                        type: 'get_url_book_data',
                        book_id: book_id,
                        section_id: section_id,
                        record_id: record_id
					},
					beforeSend: function(){	
						//do something
					},
					success : function(response){
						response = $.trim(response);
						var response = JSON.parse(response);
						
						$("#parent_book_title_ib").html(response[0].parent);
						$("#parent_book_title_en").html(response[0].en);

						$("#book_title_ib").html(response[0].name_ibri);
						$("#book_title_en").html(response[0].name_english);
						
						//console.log('loading sections...');
						$.when(loadSections(response[0].book_id,response[0].name_ibri,response[0].name_english,response[0].parent,response[0].en,action)).then(function(){
							//console.log('loading records...');
							$.when(loadRecords(response[0].book_id,response[0].section,action)).then(function(){
								//console.log('loading record details...');
								$.when(loadRecordDetails('r',response[0].book_id,response[0].section,response[0].record)).then(function(){
								
									//console.log('loading tab details...');
									$(".tab_link").removeClass("tab_link-active");
									$(".menu_cell_c").hide();
									$(".tab_link[tab-id='tab_3']").addClass("tab_link-active");
									$("#tab_3").show();
									
									//console.log('loading page...');
									$.when(showPage('Read')).then(function(){
										//console.log('clearing url...');
										//clear url params if successful
										clearURLNameTags();
									})
								})
							})
						});		
					}
				});
            }
        }
		/*
		function loadWriteups() {
			$.ajax({                
				type : 'GET',
				url  : 'writeups.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					
					$("#writeups_container").html(response);		
				}
			});
        }*/
		
		//function elohimMessages() {    
		//	$("#message_Elohim_1").html('Today is the preparation day as tomorrow is Shabbath of <span id=\"thenames\">JWJY</span> <span id=\"thenames\">TA</span> the Ělohim of Yisra’ĕl!');
		//	$("#message_Elohim_4").html('Tomorrow is the day of <span id="thenames">JWJY</span>, the Festival of the Pĕsaḥ <span id="thenames">`WSWJY</span> Mashiyaḵ<br>'); 
        //}

		function swipeleft ( start, stop ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
	 
				start.origin.trigger( "swipe" ).trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
			}
		}
		function swiperight ( start, stop ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
	 
				start.origin.trigger( "swipe" ).trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
			}
		}
		
		$('#r_display_all').on('swipeleft', function (e) {
			//console.log('swipeleft');
			if($('#foot_share').is(":visible")==true){
				$(".paginate_right").trigger("click");
			}
		}); 
		$('#r_display_all').on('swiperight', function (e) {
			//console.log('swiperight');
			if($('#foot_share').is(":visible")==true){
				$(".paginate_left").trigger("click");
			}
		});

            
		//REMEMBER ME - check if logged in
        function rememberMeCheck() {
		
			//(DO NOT USE ANGULAR FUNCTIONS FOR ANY AJAX POST)
			$.ajax({                
				type : 'GET',
				url  : 'remember_me_check.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					if(response!=''){
						
						var data = JSON.parse(response);
						
						if(data.length>0){
							$.when(elementFontReSize(data[0]['fontsize'])).then(function(){
								$.when(themeToggle(data[0]['theme'])).then(function(){
									$.when(xlitToggle(data[0]['show_xlit'],"")).then(function(){
										$("#show_xlit").val(data[0]['show_xlit']);
										
										$.when(wordToggle(data[0]['word_toggle'],"")).then(function(){
											$.when(loadBooks()).then(function(){
												$.when(loadSearchHistory()).then(function(){
													$("#search_tab_hist").show();
													
													$('#signin_form, input[id="email"]').val('');
													$('#signin_form, input[id="password"]').val('');
													$("#sign_in_message").html('').hide();
													$('input[id="password"]').attr('type', 'password');
													$(".view_password").html('Show Password');
													$("#sign_in_container").hide();
													$("#sign_in").hide();        
													$("#sign_out").show();     
													$("#signedin_email").html(getEmailName(data[0]['email'])).show();
													$("#aleph_tav").val(data[0]['aleph_tav']);	
													$("#aleph_tav_icon").val(data[0]['aleph_tav']);	
													
													//show only for admin
													if(data[0]['id']==1||data[0]['id']==2||data[0]['id']==3||data[0]['id']==4){
														$("#menu_raqia").show();
														//$("#search_header").hide();
														$("#slider_center").show();
														$("#login_info").show();			

														if($('#search_toggle').is(":visible")){
															$("div.scroll_search").css("padding","203px 10px 0px 10px");
														}else{
															$("div.scroll_search").css("padding","173px 10px 0px 10px");
														};									
													}else{
														$("#menu_raqia").hide();
														$("#slider_center").hide();
														//$("#search_header").show();
														$("#login_info").hide();
													}
												})
											})
										})
									})
								})
							});
						}else{		
							$("#search_tab_hist").hide();
							$("#sign_in").show();        
							$("#sign_out").hide();
							loadDefaultSettings();
						}
					}else{
						signOut();
						loadDefaultSettings();
					}
				}
			});
		};

        function loadBooks(){

			//save users last location
			$.ajax({                
				type : 'GET',
				url  : 'get_books.php',
				beforeSend: function(){	
					//do something
				},
				success : function(response){
					response = $.trim(response);
					$("#books_list_tab").html(response);
					setTimeout(function() {  
						var book_id = $("#book_selected").val();
						updateBookGrid(book_id);
					}, 1);						
				}
			});  
    	};

        function loadDefaultSettings(){	
		
			$.when(loadBooks()).then(function(){
				var word_toggle = 2;
				if($('#word_toggle').is(":checked")==true){
					word_toggle = 1;
				}				
				$.when(wordToggle(word_toggle,"noload")).then(function(){
					var xlit = $("#show_xlit").val();
					$.when(xlitToggle(xlit,"noload")).then(function(){
						var fontsize = parseInt($("#current_font_size").val());
						$.when(elementFontReSize(fontsize,"noload")).then(function(){
							var theme = 1;
							if($('#theme_toggle').is(":checked")){
								theme = 2;
							}
							$.when(themeToggle(theme,"noload")).then(function(){
								var alephTav = $("#aleph_tav").val()
								$("#aleph_tav").val(alephTav).attr("selected", "selected");
								$("#aleph_tav_icon").val(alephTav).attr("selected", "selected");
								
								loadSearchTerms();
							});
						});
					});
				});
			});
    	};				
		
       	//upon PAGE LOAD (load menu, etc)
        function startupProcess() {

			$.when(rememberMeCheck()).then(function(){
				$.when(loadDefaultSettings()).then(function(){
					$.when(loadBookTitles()).then(function(){
						$(".book_list_bot").last().removeClass('book_list_bot');
			
						//if seesion logged in
						if($("#li").val()==1){
							$("#search_tab_hist").hide();
							$("#sign_in_container").hide();
							$("#sign_in").hide();
							$("#sign_out").show();
							
							
							//show for admin only. hide for everyone else
							$("#menu_raqia").hide();
						
							var lid = $("#li").attr("data-id");
							if(lid==1 || lid==2 || lid==3 || lid==4){
								$("#menu_raqia").show();
								$("#slider_center").show();
								//$("#search_header").hide();
								$("#login_info").show();
							}
						}else{
							$("#search_tab_hist").show();
							setTimeout(function(){ 
								loadSearchHistory();
							}, 1);			
							$("#sign_in").show();
							$("#sign_out").hide();
						};				
				
						//if user passes in variables, load data
						var url_b = $("#url").attr("data-b");
						var url_s = $("#url").attr("data-s");
						var url_r = $("#url").attr("data-r");
						var url_rn = $("#url").attr("data-rn");
						if(url_b!="" && url_s!="" && url_r!=""){ 
							$.when(loadBookData(url_b,url_s,url_r,'url')).then(function(){
								$('#url').attr("data-b","");
								$('#url').attr("data-s","");
								$('#url').attr("data-r","");
							})
							
						}else if(url_s!=""){
							
							$.when(loadSearchDetails(url_s,'')).then(function(){
								$.when(showPage("Search")).then(function(){
									$('#url').attr("data-s","");
								});
							});
							
						}else if(url_rn!=""){
							
							$.when($("#menu_Tent").removeClass('menu_cell').addClass('menu_cell-active')).then(function(){
								$.when($('#page_tent').show()).then(function(){
									$.when(showPage("Tent")).then(function(){
										setTimeout(function(){ 
											$("#restored_names").remove();	
											$('#url').attr("data-rn","");
										}, 12000);	
									});
								});
							});
				
						}else{	
							$.when(loadLastLocation()).then(function(){
								$.when($('#menu_container').show()).then(function(){
									$.when(clearURLNameTags()).then(function(){
										//done...
									});
								});
							});
						};	

					});
				});
			});
        }
		
		setTimeout(function(){
			startupProcess();
		}, 1);
		
        resizeScroll();
	});
