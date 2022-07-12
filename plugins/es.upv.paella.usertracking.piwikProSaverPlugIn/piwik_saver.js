var _paq = _paq || [];

paella.addPlugin(function() {
	return class PiwikProAnalyticsTracking extends paella.userTracking.SaverPlugIn {

		getName() { return "es.upv.paella.usertracking.piwikProSaverPlugIn"; }
		
		checkEnabled(onSuccess) {
			if (this.config.tracker && this.config.siteId) {
				_paq.push(['trackPageView']);
				_paq.push(['enableLinkTracking']);
				(function(window, document, dataLayerName, id) {
					window[dataLayerName]=window[dataLayerName]||[],
					window[dataLayerName].push(
						{
							start:(new Date).getTime(),
							event:"stg.start"
						}
						);
					var scripts=document.getElementsByTagName('script')[0],
					tags=document.createElement('script');

					function stgCreateCookie(a,b,c){
						var d="";

						if(c){
							var e=new Date;
							e.setTime(e.getTime()+24*c*60*60*1e3),
							d="; expires="+e.toUTCString()
						}
						document.cookie=a+"="+b+d+"; path=/"
					}

					var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");
					stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);

					var qP=[];
					dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");
					var qPString=qP.length>0?("?"+qP.join("&")):"";
					tags.async=!0,tags.src=this.config.tracker+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
					!function(a,n,i){
						a[n]=a[n]||{};
						for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
					})
				(window, document, 'dataLayer', this.config.siteId);			
			}
			else {
				onSuccess(false);
			}
		}
		
		log(event, params) {
				var category = this.config.category || "PaellaPlayer";
				var action = event;
				var label =  "";
				
				try {
					label = JSON.stringify(params);
				}
				catch(e) {}
				
				_paq.push(['trackEvent', category, action, label]);
		}
	}
});
