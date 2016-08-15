
$(document).bind('mobileinit', function(event){
	// apply overrides here
	 $.mobile.ajaxEnabled = false;
	 $.mobile.allowCrossDomainPages = true;
	//$.mobile.loadingMessage = "Loading ...";
        //$.mobile.loadingMessageTheme = "a"
        //$.mobile.loadingMessageTextVisible = false; 
        //$.mobile.pageLoadErrorMessage = "Error Loading Page"
        //$.mobile.pageLoadErrorMessageTheme = "e"
	
	// Navigation
	$.mobile.page.prototype.options.backBtnText = "Back";
	$.mobile.page.prototype.options.addBackBtn      = true;
	$.mobile.page.prototype.options.backBtnTheme    = "b";
	
	// Page
	//$.mobile.page.prototype.options.headerTheme = "a";  // Page header only
	//$.mobile.page.prototype.options.contentTheme    = "c";
	//$.mobile.page.prototype.options.footerTheme = "a";
	
	// Listviews
	//$.mobile.listview.prototype.options.headerTheme = "a";  // Header for nested lists
	//$.mobile.listview.prototype.options.theme           = "c";  // List items / content
	//$.mobile.listview.prototype.options.dividerTheme    = "d";  // List divider
	//$.mobile.listview.prototype.options.splitTheme   = "c";
	//$.mobile.listview.prototype.options.countTheme   = "c";
	//$.mobile.listview.prototype.options.filterTheme = "c";
	//$.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
	
	//$.mobile.dialog.prototype.options.theme
	//$.mobile.selectmenu.prototype.options.menuPageTheme
	//$.mobile.selectmenu.prototype.options.overlayTheme
});