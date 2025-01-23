//Desktop Compatible Table - 786
function desktopCompatibleInit(fit_type_for_comp_tbl)
{
(function($){
   $m('.ymm_paginate').pagination({
   	 	current: 1, 
   	 	size: 2,
    	length: 20,
   		prev: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-left" viewBox="0 0 20 8"><path d="M4.814 7.555C3.95 6.61 3.2 5.893 2.568 5.4 1.937 4.91 1.341 4.544.781 4.303v-.44a9.933 9.933 0 0 0 1.875-1.196c.606-.485 1.328-1.196 2.168-2.134h.752c-.612 1.309-1.253 2.315-1.924 3.018H19.23v.986H3.652c.495.632.84 1.1 1.036 1.406.195.306.485.843.869 1.612h-.743z" fill="#000" fill-rule="evenodd"></path></svg>',
    	next: '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-right" viewBox="0 0 20 8"><path d="M15.186.445c.865.944 1.614 1.662 2.246 2.154.631.491 1.227.857 1.787 1.098v.44a9.933 9.933 0 0 0-1.875 1.196c-.606.485-1.328 1.196-2.168 2.134h-.752c.612-1.309 1.253-2.315 1.924-3.018H.77v-.986h15.577c-.495-.632-.84-1.1-1.035-1.406-.196-.306-.486-.843-.87-1.612h.743z" fill="#000" fill-rule="evenodd"></path></svg>',
    	ajax: function(options,refresh,$target){	
            //Define fetch AJAX URL - 786.	
			var comp_ajax_url = "domain="+shop_domain+"&load=all&version=updated&action=get_compatible&current_productid="+ymm_product_id+"&current_ymmpage="+options.current+"&ymm_limit="+options.length;
	
    		$m.ajax({
    	  		url: "https://www.ymmshopify.capacitywebservices.com/customized/ymm_denalielectronics/get_dropdowns_version5.php",
          		type: "GET",
        		data: comp_ajax_url,
			  	dataType: 'jsonp',
                beforeSend: function() {
                  	$m('.ymm-mobile-loader').html('<img src="'+loader_img_src+'" width="32" height="auto" alt="Loading..." loading="lazy">').show();	
    			}
    		}).done(function(res){
                    $m('.ymm-mobile-loader').hide();
              
                	if(res.html != null) {
                       	$m("#ymm_data_desktop").html(res.html);

                        //Set lang. translations for comp tbl - 786/ALLAH
                        $m("#ymm_data_desktop").find("th.field_4").html(comp_field_1);
                        $m("#ymm_data_desktop").find("th.field_1").html(comp_field_2);
                        $m("#ymm_data_desktop").find("th.field_2").html(comp_field_3);
                        $m("#ymm_data_desktop").find("th.field_3").html(comp_field_4);

                        if($m('.hdr_msg').length == 0) {
                          $m("<div class='hdr_msg'><p class='ymm_p'></p></div>").insertBefore("#ymm_data_desktop"); 
                        }

                        //So, what if it doesn't fit then?? - 786
                        if(fit_type_for_comp_tbl == "exact_fit" || fit_type_for_comp_tbl == "not_fit") {
                          $m('.ymm_p').html(ymm_comp_hdr_exact_fit); 
                        }

                        if(fit_type_for_comp_tbl == "universal_fit") {
                          $m('.ymm_p').html(ymm_comp_hdr_uni_fit); 
                        }
                        //ends - 786

          				if(res.total_ymmrows > res.no_of_ymm_records) {
                          	$m(".paging_data").attr("data-ymm-curr-page",res.current_pageno);
                    		$m(".paging_data").attr("data-ymm-limit",res.total_ymmrows);
                    		$m(".paging_data").attr("data-ymm-total",res.no_of_ymm_records);
            				$m(".ymm_paging").show();
                        } else {
                          	$m(".ymm_paging").hide();
                        }
                      
        				if(res.html != null && res.total_ymmrows >= res.no_of_ymm_records) {
    						refresh({
    							total: res.total_ymmrows,
    							length: res.no_of_ymm_records
    						});
            			} 
                    } else {
                        /***
                        If product is universally fit then now as per client's need table will hold exact fit ymm rows only, so here 
                        if none of ymm rows found then just show note for universal products - 786/92/313/ALLAH.
                        ***/
                        if(fit_type_for_comp_tbl == "universal_fit") {
                          $m("#ymm_compatibility_cont").remove();
                          $m(".ymm_comp_tab .c-accordion__inner").html('<p>'+uni_but_no_ymm_txt+'</p>'); 
                        } else {
                          //When 0 records found for current prdID then remove the whole 'this product fits' tab so, it's sure thing that 'note' also gets removed - 786.
                          $m(".ymm-compatible-table-chart-shortcode-page").remove();
                        }
                    }
              
    	}).fail(function(error){
        });
    	}
    });
})($m);  
}