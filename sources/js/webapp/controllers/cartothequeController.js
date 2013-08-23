
(function() {
	'use strict';

	var CartothequeController = Ember.ObjectController.extend({});

	//==================================================================//

	CartothequeController.renderUI = function()
	{
	   $("#listDemos").empty()
	   $("#listDemos").css("max-height", $(window).height() - 105)
	   CartothequeController.maps = []
	   
	   CartothequeController.maps.push(CartothequeController.maps0)
	   CartothequeController.maps.push(CartothequeController.maps1)
	   CartothequeController.maps.push(CartothequeController.maps2)
	   CartothequeController.maps.push(CartothequeController.maps3)
	   CartothequeController.maps.push(CartothequeController.maps4)
	   CartothequeController.maps.push(CartothequeController.maps5)
	   
	   for(var i = 0; i < CartothequeController.maps.length; i++){
	      
	      var thumb = ""

	      thumb += "<div class='row-fluid'>"
         thumb += "   <div class='marketing'>"
         thumb += "      <img class='polaroid rounded touchable'  title='"+App.translations.messages.DemoTitle[i]+"' id='imageDemo"+i+"' onclick='App.CartothequeController.openDemo("+i+");' src='http://static.maperial.localhost/images/demos/demo"+i+".png'}}'/>"
         thumb += "   </div>"
         thumb += "</div>"
	      $("#listDemos").append(thumb)
	      
	      Utils.randomRotate("imageDemo"+i)
	      $("#imageDemo"+i).tooltipster({
	         theme: '.tooltip-theme'
	      })
	   }
	   
	   CartothequeController.openDemo(0)
	}

	CartothequeController.cleanUI = function()
	{
	   App.maperial.destroy()
	}

	//==================================================================//
	
	CartothequeController.openDemo = function(num){
	   console.log(num)

      var options = {
         width    : "80%",
         height   : "100%",
         left     : "20%"
      }

      App.maperial.build(CartothequeController.maps[num](), options)
	}

   //==================================================================//
   
   CartothequeController.maps0 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var lensConfig   = ConfigManager.newConfig();
      var minifierConfig   = ConfigManager.newConfig();
      
      mainConfig.hud.elements[HUD.COMPOSITIONS]  = {
         show : true,  
         type : HUD.PANEL,    
         label : "Composition",      
         disableDrag : true,
         position   : { 
            left    : "0", 
            top     : "40%" 
         },
      };

      mainConfig.map.defaultZoom    = 7
      mainConfig.map.latitude       = 51.505
      mainConfig.map.longitude      = -0.09
      
      //-----------------------------------------------//
      
      var cdata         = maperial.createCustomData ()
      var cbm           = new ColorbarsManager ( null );
      var cb            = new ColorBarData()

      fillDummyHeatmap(cdata)
       
      cb.BeginWithAlphaZero ( true )
      cb.Set(0.0  ,new GradiantColor(0.0,0.0,1.0,0.0))
      cb.Set(0.10 ,new GradiantColor(0.0,0.0,1.0,1.0))
      cb.Set(0.15 ,new GradiantColor(0.0,1.0,1.0,1.0))
      cb.Set(0.45 ,new GradiantColor(0.0,1.0,0.0,1.0))
      cb.Set(0.75 ,new GradiantColor(1.0,1.0,0.0,1.0))
      cb.Set(1.0  ,new GradiantColor(1.0,0.0,0.0,1.0))
      cbm.SetColorBar(cb)
      
      //-----------------------------------------------//
      
      var customTransport = { 
            type: LayersManager.Images, 
            source: {
               type     : Source.Images,
               params   : { src: Source.IMAGES_STAMEN_WATERCOLOR },
               id       : Source.IMAGES_STAMEN_WATERCOLOR
            },
            params: {
               
            },
            composition: {
               shader : Maperial.MulBlend,
               params : { uParams : [ 0.38, -0.27, 3 ] }
            }
      }
      
      
      //-----------------------------------------------//

      mainConfig.layers.push(LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      mainConfig.layers.push(customTransport)

      //-----------------------------------------------//

      var heatmapLayer = LayersManager.getHeatLayerConfig(cdata, cb.Uid())
      heatmapLayer.params.diameter = 300;
      heatmapLayer.params.scale = 0.8;
      //heatmapLayer.params.fill = "linear"
      heatmapLayer.params.diameterUnit = "meter";

      mainConfig.layers.push(heatmapLayer)

      //-----------------------------------------------//

      lensConfig.layers       = mainConfig.layers
      minifierConfig.layers   = mainConfig.layers

      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var lensOptions = {
         type       : Maperial.LENS,
         width      : "200",
         height     : "200",
         position   : { 
            left    : "45%", 
            top     : "27%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 150,
         draggable  : true
      }
      
      var minifierOptions = {
         type       : Maperial.MINIFIER,
         width      : "200",
         height     : "200",
         position   : { 
            right   : "10%", 
            bottom  : "18%" 
         },
         padding    : 2,
         deltaZoom  : -2,
         draggable  : true
      }

      //------------------------------------------//
      // test leaflet
      
      mainConfig.useLeaflet = true
      lensConfig.useLeaflet = true
      minifierConfig.useLeaflet = true

      //------------------------------------------//
   
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : lensConfig,
            options : lensOptions,
         },{
            config  : minifierConfig,
            options : minifierOptions,
         }]
      }
         
      //------------------------------------------//
         
      return [map]
   }
	
	//==================================================================//
	
	CartothequeController.maps1 = function()
	{
	   var mainConfig   = ConfigManager.newConfig();

      mainConfig.map.defaultZoom    = 9
      mainConfig.map.latitude       = 50.516584
      mainConfig.map.longitude      = 3.186998

      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
	   
      var cstyle        = maperial.createStyle      ()
      var cdata         = maperial.createCustomData ()
      
      var ps            = new PointSymbolizer("symbols/blue.pointer.png") 
      ps.Alignement("center", "bottom")
      var pSymbId       = cstyle.AddSymbolizer ( ps , 18 , 0  );
      
      cdata.addPoint ([50.529722,2.931556999999998], pSymbId, "Angelus ") 
      cdata.addPoint ([50.485569,2.8307250000000295], pSymbId, "Abbaye de Lille ") 
      cdata.addPoint ([50.367874,3.080601999999999], pSymbId, "Abbaye de St Landelin ") 
      cdata.addPoint ([44.85579000000001,-0.6157699999999977], pSymbId, "Abbatiale St Amand ") 
      cdata.addPoint ([50.529722,2.931556999999998], pSymbId, "Bière Lepers 8 ") 
      cdata.addPoint ([50.69285499999999,2.4138020000000324], pSymbId, "Bracine ") 
      cdata.addPoint ([50.866145,1.6313259999999445], pSymbId, "Belle dale ") 
      cdata.addPoint ([50.750115,2.252207999999996], pSymbId, "Bière des ruchettes ") 
      cdata.addPoint ([50.367874,3.080601999999999], pSymbId, "Bière du désert ") 
      cdata.addPoint ([50.605934,3.0786829999999554], pSymbId, "Belzébuth ") 
      cdata.addPoint ([44.85579000000001,-0.6157699999999977], pSymbId, "Braderie de Lille ") 
      cdata.addPoint ([44.397248,0.8049350000000004], pSymbId, "Bière Nouvelle ") 
      cdata.addPoint ([50.298389,3.7941940000000614], pSymbId, "Bière de luxe ") 
      cdata.addPoint ([50.529722,2.931556999999998], pSymbId, "Bière des Flandres ") 
      cdata.addPoint ([50.33858499999999,3.7523610000000645], pSymbId, "Cuvée des Jonquilles ") 
      cdata.addPoint ([50.281524,3.3199749999999995], pSymbId, "Choulette ") 
      cdata.addPoint ([50.281524,3.3199749999999995], pSymbId, "D'Artagnan ") 
      cdata.addPoint ([50.724993,3.1620699999999715], pSymbId, "Duc d'Havré ") 
      cdata.addPoint ([50.2279399,3.6767340000000104], pSymbId, "Ecume des jours ") 
      cdata.addPoint ([50.750115,2.252207999999996], pSymbId, "Epi de Facon ") 
      cdata.addPoint ([50.816405,2.5752219999999397], pSymbId, "Fromulus ") 
      cdata.addPoint ([50.367874,3.080601999999999], pSymbId, "Goudale ") 
      cdata.addPoint ([50.605934,3.0786829999999554], pSymbId, "Gold Triumph ") 
      cdata.addPoint ([50.605934,3.0786829999999554], pSymbId, "Grain d'Orge ") 
      cdata.addPoint ([50.529722,2.931556999999998], pSymbId, "Harengus ") 
      cdata.addPoint ([50.42672100000001,2.7106039999999894], pSymbId, "Hildegarde ") 
      cdata.addPoint ([50.26655299999999,3.1663929000000053], pSymbId, "Iris Beer ") 
      cdata.addPoint ([50.312073,3.6277169999999614], pSymbId, "Jenlain ") 
      cdata.addPoint ([50.642989,2.6392740000000003], pSymbId, "Kaou'ët ") 
      cdata.addPoint ([50.485569,2.8307250000000295], pSymbId, "Maltesse ") 
      cdata.addPoint ([50.891315,2.4271360000000186], pSymbId, "Maline ") 
      cdata.addPoint ([50.605934,3.0786829999999554], pSymbId, "Orpal ") 
      cdata.addPoint ([50.42672100000001,2.7106039999999894], pSymbId, "Page24 ") 
      cdata.addPoint ([50.529722,2.931556999999998], pSymbId, "Rijsel ") 
      cdata.addPoint ([50.891315,2.4271360000000186], pSymbId, "Rouge Flamande ") 
      cdata.addPoint ([50.510693,2.785233000000062], pSymbId, "Saint Glinglin Triple ") 
      cdata.addPoint ([50.367874,3.080601999999999], pSymbId, "Saaz ") 
      cdata.addPoint ([50.605934,3.0786829999999554], pSymbId, "Septante 5 ") 
      cdata.addPoint ([45.138896,4.643035000000054], pSymbId, "Mythique ") 
      cdata.addPoint ([-20.963728,55.647265999999945], pSymbId, "St Leu ") 
      cdata.addPoint ([50.281524,3.3199749999999995], pSymbId, "Tour d'Ostrevant ") 
      cdata.addPoint ([50.367874,3.080601999999999], pSymbId, "Tequieros ") 
      cdata.addPoint ([50.103942,3.544234999999958], pSymbId, "Vivat ") 
      cdata.addPoint ([50.510693,2.785233000000062], pSymbId, "Weed ")
                        
        //-----------------------------------------------//

        mainConfig.layers.push( LayersManager.getCustomLayerConfig( cdata,cstyle ) )  

        //-----------------------------------------------//

        var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         }]
      }

        //-----------------------------------------------//

      return [map]
	}
	
	//==================================================================//
	
	CartothequeController.maps2 = function()
	{
	   var mainConfig   = ConfigManager.newConfig();
	   var anchor1Config   = ConfigManager.newConfig();
	   var anchor2Config   = ConfigManager.newConfig();
	   
	   mainConfig.map.defaultZoom    = 13
	   mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_TONER_BG))
	   anchor1Config.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_WATERCOLOR))
	   anchor2Config.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
	   
	   var mainOptions = {
	      type       : Maperial.MAIN,
	      name       : "maperialDemo"
	   }
	   
	   var anchor1Options = {
	      type       : Maperial.ANCHOR,
	      name       : "Anchor1",
	      config     : anchor1Config,
	      width      : "350",
	      height     : "350",
	      position   : { 
	         left    : "50", 
	         top     : "150" 
	      }
	   }

	   var anchor2Options = {
	      type       : Maperial.ANCHOR,
	      name       : "Anchor2",
	      config     : anchor2Config,
	      width      : "370",
	      height     : "370",
	      position   : { 
	         right   : "25", 
	         bottom  : "135" 
	      }
	   }
	   
	   var map = {
	      views : [{
	         config  : mainConfig,
	         options : mainOptions,
	      },{
	         config  : anchor1Config,
	         options : anchor1Options,
	      },{
	         config  : anchor2Config,
	         options : anchor2Options,
	      }]
	   }
	      
	   return [map]
	}

   //==================================================================//
   
   CartothequeController.maps3 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var magnifierConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 11
      mainConfig.map.latitude       = 46.316584
      mainConfig.map.longitude      = 6.486998
      mainConfig.layers.push        (LayersManager.getShadeLayerConfig())
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      magnifierConfig.layers.push   (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_MAPQUEST))
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var magnifierOptions = {
         type       : Maperial.MAGNIFIER,
         config     : magnifierConfig,
         width      : "200",
         height     : "200",
         position   : { 
            right   : "20%", 
            top     : "30%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 10,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : magnifierConfig,
            options : magnifierOptions,
         }]
      }
         
      return [map]
   }

   //==================================================================//
   
   CartothequeController.maps4 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var lensConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 13
      mainConfig.map.latitude       = 48.844553
      mainConfig.map.longitude      = 2.368227
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_TONER))
      lensConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
      
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var lensOptions = {
         type       : Maperial.LENS,
         config     : lensConfig,
         width      : "200",
         height     : "200",
         position   : { 
            left    : "50%", 
            top     : "50%" 
         },
         padding    : 2,
         deltaZoom  : 1,
         borderRadius: 100,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : lensConfig,
            options : lensOptions,
         }]
      }
         
      return [map]
   }

   //==================================================================//
   
   CartothequeController.maps5 = function()
   {
      var mainConfig   = ConfigManager.newConfig();
      var minifierConfig   = ConfigManager.newConfig();
      
      mainConfig.map.defaultZoom    = 11
      mainConfig.map.latitude       = 47.600607
      mainConfig.map.longitude      = -122.315125
      mainConfig.layers.push        (LayersManager.getShadeLayerConfig())
      mainConfig.layers.push        (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_STAMEN_WATERCOLOR))
      minifierConfig.layers.push    (LayersManager.getImagesLayerConfig(Source.Images, Source.IMAGES_OCM_TRANSPORT))
               
      var mainOptions = {
         type       : Maperial.MAIN,
         name       : "maperialDemo"
      }
      
      var minifierOptions = {
         type       : Maperial.MINIFIER,
         name       : "Minifier",
         config     : minifierConfig,
         width      : "250",
         height     : "250",
         position   : { 
            left    : "14%", 
            bottom  : "20%" 
         },
         borderRadius : 130,
         padding    : 4,
         deltaZoom  : -3,
         draggable  : true
      }
      
      var map = {
         views : [{
            config  : mainConfig,
            options : mainOptions,
         },{
            config  : minifierConfig,
            options : minifierOptions,
         }]
      }
      
      return [map]
   }

	//==================================================================//

	App.CartothequeController = CartothequeController;

	//==================================================================//
	// Routing

	App.CartothequeRouting = App.Page.extend({
		route: '/demos',
		
		connectOutlets: function(router){
			App.Router.openPage(router, "cartotheque");
		},

	})

	//==================================================================//

})();

function fillDummyHeatmap(cdata){
   cdata.addPoint ([33.5363,-117.044], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.5608,-117.24], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38,-97], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.9358,-77.1621], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38,-97], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5167,-0.7], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.5167,-0.7], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([60.3911,5.3247], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8333,12.9167], null, { diameter : 90000 , scale : 0.6 }) 
   cdata.addPoint ([50.8333,12.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.0833,4.3], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([52.0833,4.3], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.8,4.4667], null, { diameter : 160000 , scale : 0.6 }) 
   cdata.addPoint ([51.8,4.4667], null, { diameter : 90000 , scale : 0.6 }) 
   cdata.addPoint ([51.8,4.4667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.1,6.95], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([18.975,72.8258], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([2.5,112.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([25.0389,102.718], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-27.6167,152.733], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.7667,150.833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.8833,151.217], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([9.4333,99.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7,73.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7,73.1667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([22.3333,114.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.4382,-84.051], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.6667,135.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.9167,139.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.3214,127.42], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.8,151.283], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-33.8667,151.225], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.65,144.933], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-37.7333,145.267], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-34.95,138.6], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-27.5,153.017], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-27.5833,152.867], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([-35.2833,138.55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([13.4443,144.786], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-37.8833,145.167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.86,144.972], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-27.5,153.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.685,139.751], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-34.4333,150.883], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([14.0167,100.733], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([-31.9333,115.833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.8167,151.167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.9667,145.117], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.8333,145.033], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.6417,176.186], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-37.6861,176.167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-41.2167,174.917], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0521,-77.015], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([24.8667,67.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([24.9869,121.306], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.2,-105.75], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([44.65,-63.6], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.9667,-1.0833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7,14.9833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.5331,-122.247], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.6597,-86.8663], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.0247,-83.2296], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.2038,-80.9955], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.0087,-82.7454], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.6741,-93.4103], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.4507,-97.1909], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.61,-73.84], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.25,-122.95], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.9,-119.483], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 410000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 110000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 100000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 140000 , scale : 0.6 }) 
   cdata.addPoint ([41.4201,-75.6485], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([31.1999,-92.3508], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9874,-91.6838], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.1955,-85.6377], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.4266,-92.358], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6559,-91.5228], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.9269,-117.861], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([41.8825,-87.6441], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([42.3998,-88.8271], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.1464,-97.0902], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.2432,-93.5119], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6472,-93.46], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.1213,-76.6414], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.649,-93.6275], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.8547,-93.7854], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.6833,-79.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6955,-89.4293], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.6211,-77.6515], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.6273,-77.5437], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([33.9457,-118.039], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8408,-118.079], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.3933,-74.7855], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9233,-73.9984], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0735,-76.5654], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.5966,-74.0775], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.2944,-73.9932], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([38.9827,-77.004], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.3633,-81.8089], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.0755,-79.0741], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.0833,-114.083], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.1364,-122.821], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.425,-84.4982], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([38.7915,-82.9217], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0131,-84.2049], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.7523,-95.367], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([29.7523,-95.367], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([41.5171,-71.2789], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.7523,-95.367], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.8148,-96.8705], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.5,-73.5833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7529,-73.9761], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([33.6534,-112.246], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7421,-74.0018], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.3928,-121.368], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7968,-76.993], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.5607,-111.724], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2863,-75.8953], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.3484,-80.2187], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.711,-117.053], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.5814,-83.6286], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([35.0508,-80.8186], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([35.0508,-80.8186], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-22.2667,166.45], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([50.1167,8.6833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9167,4.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([52.25,21], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.1,10.75], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.65,6.1833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([1.3667,103.8], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.4889,-98.3987], null, { diameter : 110000 , scale : 0.6 }) 
   cdata.addPoint ([29.3884,-98.5311], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8825,-87.6441], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.8825,-87.6441], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.9203,-84.618], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([40.1242,-82.3828], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1241,-82.3828], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.0434,-87.8945], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.7371,-74.3419], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3626,-71.0843], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([4.6,-74.0833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([19.7,-101.117], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.6667,-100.317], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.8167,10.3833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8667,6.8667], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([55.7167,12.45], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([44.4333,26.1], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([50.1167,8.6833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.5,5.75], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([48.8833,8.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([17.05,-96.7167], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([23,-102], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([20.6167,-105.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([23,-102], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([20.6667,-103.333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([21.1167,-101.667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([17.9833,-92.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([20.9667,-89.6167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([21.1667,-86.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([17.9833,-94.5167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([18.6,-98.85], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([16.75,-93.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([19.4342,-99.1386], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-10,-55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-22.9,-43.2333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([15.7833,-86.8], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([10.4667,-64.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([7.1297,-73.1258], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([4,-72], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([4,-72], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([6.8,-58.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([0,0], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.15,11.5833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([45.8,16], null, { diameter : 150000 , scale : 0.6 }) 
   cdata.addPoint ([59.9167,10.75], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5002,-0.1262], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55,73.4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.5,5.75], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.2,0.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.8833,8.3333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.9167,18.4167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9157,-81.133], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.8667,-79.4333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39,22], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 110000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([9.0833,-79.3833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([21.5,-104.9], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([19.5333,-96.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.5333,-117.017], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([19.4342,-99.1386], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([18.15,-94.4167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([20.7167,-103.4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([23.2167,-106.417], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([10.9639,-74.7964], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([24.8667,67.05], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([1.2931,103.856], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-41,174], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 460000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 90000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 160000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([13.75,100.517], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([55.75,-97.8667], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([34.0438,-118.251], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([44.2997,-70.3698], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.9402,-113.85], null, { diameter : 140000 , scale : 0.6 }) 
   cdata.addPoint ([45.6167,-61.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.3833,-66], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([54.9167,-98.6333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8393,-73.2797], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6929,-111.815], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.8833,-97.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.5576,-81.9395], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.9667,-98.3], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.0842,-82.9378], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.25,-123.133], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([35.2268,-78.9561], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.9817,-121.272], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.9647,-121.341], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 130000 , scale : 0.6 }) 
   cdata.addPoint ([33.4357,-111.917], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([36.0707,-97.9077], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7791,-96.8028], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.053,-118.264], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.726,-95.55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4508,-93.5855], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([36.8463,-76.0979], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([36.8463,-76.0979], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0533,-118.255], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.7217,-81.3603], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6888,-74.0203], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([47.5036,-94.685], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.3304,-81.6011], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0165,-77.5062], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([38.6312,-90.1922], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.445,-81.7758], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-37.9667,145.15], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.9833,151.117], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.6769,6.1239], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.8167,-1.2167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.4667,-1.9167], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([52.5,5.75], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.5717,-117.729], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([31.5551,-97.1604], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.2865,-71.7147], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.4,-89.2333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.9864,-78.7279], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8471,-87.6248], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.5139,-114.293], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9167,4.4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9167,4.4], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([51.55,5.1167], null, { diameter : 380000 , scale : 0.6 }) 
   cdata.addPoint ([51.8,4.4667], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([54.5,-3.6167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-34.9333,138.6], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.95,151.133], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([15,100], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([15,100], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([15,100], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([15,100], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.5381,-87.6842], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9588,-75.3006], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.7921,-96.8827], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9474,-87.7037], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6162,-87.0489], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.5023,-77.5693], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.4336,-77.3887], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.759,-88.2615], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.0158,-87.8423], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.5833,-81.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.3667,-63.3], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([18.0239,-66.6366], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.2667,-79.9333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.0667,-64.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.6351,-78.7665], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.4483,-81.6921], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.5583,-87.6612], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.5315,-90.4628], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.7664,-82.2202], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.6779,-117.379], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.6201,-122.141], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.0901,-87.7101], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.3119,-90.1535], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([34.7681,-84.9569], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([47.4061,-121.995], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6009,-73.9397], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6278,-73.365], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.61,-73.9108], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.3776,-83.7605], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([38.7031,-94.4737], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.3031,-82.0828], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.5746,-88.3946], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4804,-122.836], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.5577,-123.298], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1574,-76.7978], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.8983,-120.382], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.018,-89.8623], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.3637,-79.9549], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.2141,-80.0625], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.2655,-79.923], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0613,-95.7293], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2314,-80.7567], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.3377,-79.8428], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.0796,-71.0382], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.25,-79.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7948,-72.8797], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.6766,-73.7038], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([37.979,-121.788], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.1669,-76.0558], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.5353,-121.979], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.2345,-71.5227], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.6179,-70.7154], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([42.0765,-71.472], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([35.2298,-81.2428], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.961,-104.817], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.6667,-63.5667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.4473,-104.632], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([40.7148,-73.7939], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6763,-73.7752], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.3846,-73.0943], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.1871,-70.91], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.3758,-84.4657], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([15,100], null, { diameter : 120000 , scale : 0.6 }) 
   cdata.addPoint ([36.8924,-80.076], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([25,17], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([27,30], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.1,10.75], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.1,10.75], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([47.6727,-122.187], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-27.6167,152.767], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([-33.8833,151.217], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.5497,74.3436], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([13.65,100.267], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([-37.8167,144.967], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.85,12.1333], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([47,8], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([52.1667,10.55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8667,6.8667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.8333,14.25], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.5304,-122.008], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.5304,-122.008], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([34.0119,-118.468], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.9734,-119.908], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.1333,-106.667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4201,-75.6485], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([45.6393,-94.2237], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7516,-84.3915], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.0098,-80.2592], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.5714,-78.7566], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7235,-73.8612], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.1637,-94.5215], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([28.0573,-81.5687], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([26.8498,-80.14], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.6027,-122.156], null, { diameter : 110000 , scale : 0.6 }) 
   cdata.addPoint ([47.6027,-122.156], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.7541,-80.271], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7597,-97.147], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9083,-73.8346], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.6573,-111.381], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.3729,-81.8443], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.5074,-81.6053], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.4954,-86.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.3043,-81.7306], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.9667,-81.9333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.2903,-72.6404], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([40.7553,-73.9924], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.1667,-118.8], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.8113,-122.301], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.2968,-111.676], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.0643,-87.9921], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3908,-71.0925], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.2935,-94.7601], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.4619,-74.3561], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.738,-96.4463], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.7821,-78.8177], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7449,-73.9782], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7449,-73.9782], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([28.5445,-81.3706], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4201,-75.6485], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.6075,-83.7928], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.2061,-83.206], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3222,-88.4671], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3222,-88.4671], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([37.7035,-122.148], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.5147,-122.042], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6053,-111.988], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.5145,-81.7814], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1287,-88.2654], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.9127,-120.196], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.3769,-119.184], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.84,-119.828], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.0585,-122.148], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1197,-87.8445], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7002,-111.943], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([37.5488,-122.312], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.3807,-73.3915], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.5,-73.5833], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([34.0115,-117.854], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([43.0738,-83.8608], null, { diameter : 110000 , scale : 0.6 }) 
   cdata.addPoint ([33.9944,-118.464], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([42.7257,-84.636], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 220000 , scale : 0.6 }) 
   cdata.addPoint ([40.7805,-73.9512], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1794,-75.9491], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.3453,-75.1285], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.195,-83.165], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.9289,-116.488], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([29.4717,-98.514], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.6653,-81.4188], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8217,-74.1574], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2094,-73.2116], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.0917,-73.4316], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.4564,-97.6938], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.1352,-95.9364], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.3202,-111.761], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.9841,-77.3827], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.1654,-82.0967], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.691,-97.3292], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.5222,-112.084], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9701,-71.7217], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.6165,-97.4789], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([35.4715,-97.519], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2307,-96.1178], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.55,-113.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([36.0844,-79.8209], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.5865,-74.1497], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9389,-73.9901], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8596,-73.9314], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.6119,-111.891], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([38.8021,-90.627], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.8289,-91.9744], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.8526,-86.1263], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.781,-73.2522], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.1181,-74.0833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.8533,-74.6522], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.3246,-73.6976], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9796,-73.7231], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.4517,-81.4653], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.0328,-115.025], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.5814,-83.6286], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.6117,-117.549], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.4619,-74.3561], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([40.4619,-74.3561], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.1747,-94.0492], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([43.0522,-87.965], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.0688,-74.5956], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.6053,-117.717], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.95,-74.9929], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.678,-77.3197], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([34.9184,-92.1362], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([35.9298,-86.4605], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.8896,-86.3166], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.1252,-76.5116], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.976,-82.1391], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.5022,-120.129], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9571,-76.7055], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([34.7018,-86.6108], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.1297,-108.435], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.805,-116.902], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.6,-73.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.8405,-116.88], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.2007,-117.226], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1246,-75.5385], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.2605,-75.6155], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7912,-77.8746], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.168,-76.6094], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.3039,-74.0703], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39.3914,-74.5182], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1442,-74.8483], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.312,-81.589], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0416,-118.299], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.45,-104.617], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2305,-73.1257], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([40.6538,-73.6082], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9513,-73.8773], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.078,-74.1764], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7492,-97.2205], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.5407,-84.2212], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7136,-82.8012], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([36.2652,-82.834], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([40.2955,-75.3254], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([29.7755,-95.4152], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.7791,-96.8028], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([32.7791,-96.8028], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([36.4642,-87.3797], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.6005,-72.8764], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.708,-97.5749], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8399,-73.9422], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9223,-87.7555], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.9156,-85.8464], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8824,-87.6376], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.6586,-88.3535], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.6619,-82.9211], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.0481,-85.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.3938,-92.2329], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.402,-76.6329], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9968,-75.1485], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.8518,-94.7786], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.4357,-111.917], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.8278,-78.6421], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([22.3167,114.183], null, { diameter : 120000 , scale : 0.6 }) 
   cdata.addPoint ([34.0438,-118.251], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.724,-88.1127], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.4429,-122.151], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.25,-80.6], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.209,-94.7305], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7214,-74.0052], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.92,-117.208], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.926,-97.5644], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.4,-97.7528], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.937,-80.135], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.8345,-111.731], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.6694,-82.3572], null, { diameter : 130000 , scale : 0.6 }) 
   cdata.addPoint ([36.2729,-115.133], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.2819,-111.88], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([32.5694,-117.016], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.8381,-77.2121], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6856,-72.7312], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.2581,-116.982], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.6385,-90.3026], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.15,-79.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.85,-79.0167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.8833,-76.2333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4833,-75.65], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.2,-105.75], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.0833,-114.083], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.7523,-95.367], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.692,-92.2929], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.1362,-117.298], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([28.2337,-82.179], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.9521,-73.7382], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.9186,-76.7862], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([42.2647,-71.8089], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.6706,-73.7791], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.5925,-78.5901], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.1333,-106.667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.2964,-75.2053], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.1066,-117.815], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8294,-73.5052], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1298,-72.5687], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.6615,-80.412], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([37.8983,-122.049], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.0101,-122.032], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.2843,-76.8446], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.4036,-104.56], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.8397,-106.688], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1879,-75.4254], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([35.0212,-85.2729], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.214,-75.073], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9407,-75.2281], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.2098,-122.409], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.3433,-73.0654], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.7814,-72.7544], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.3094,-72.924], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.3218,-122.523], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4104,-122.702], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([45.6741,-122.471], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([32.9342,-97.2515], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.8775,-74.1105], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.82,-96.6806], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.5184,-122.655], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.0544,-74.6171], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.3874,-78.8686], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.961,-85.9837], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0918,-84.2209], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39.1492,-78.278], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.7257,-77.7982], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.0059,-93.4305], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.0748,-80.6774], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.8059,-78.7997], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.8572,-84.0177], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.7665,-89.6533], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.7098,-87.7478], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.3961,-84.7821], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7881,-96.9431], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.1946,-89.2025], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.0745,-87.9078], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0817,-84.2553], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.9689,-103.749], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.7969,-106.387], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.7435,-106.297], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.6569,-98.5107], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.4837,-82.5496], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.1137,-81.0285], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.6195,-100.809], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.4568,-97.2652], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8682,-117.929], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7977,-117.132], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.3776,-112.387], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.1031,-79.0092], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7731,-80.1137], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.7082,-74.0132], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7187,-75.6216], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.8729,-98.014], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.5324,-70.9737], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.6623,-71.0107], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.1158,-78.9098], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.2694,-76.7447], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9,-75.3075], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2137,-85.0996], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.8148,-96.8705], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39.8041,-75.4559], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([40.0684,-75.0065], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.8791,-68.733], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1879,-75.4254], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8195,-71.4107], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.9879,-76.5454], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([42.5908,-71.8055], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([40.7842,-73.8422], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([0,0], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.336,-96.7491], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([33.336,-96.7491], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([37.4192,-122.057], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7694,-83.3897], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.7609,-87.1513], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8651,-84.8948], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([28.5153,-82.2856], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.1575,-89.7646], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.318,-95.2921], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.4479,-91.9977], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.6696,-93.2615], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0946,-101.683], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.9776,-102.08], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.0335,-77.4838], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.0548,-75.4083], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([38.9604,-94.8049], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.8138,-117.799], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([33.8138,-117.799], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8138,-117.799], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([38.2085,-85.6918], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([37.7904,-85.4848], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.4488,-94.2254], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.179,-77.555], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([29.7523,-95.367], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([40.665,-73.7502], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.6983,-73.888], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.1693,-77.6189], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.7516,-70.2793], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.3501,-121.985], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.7825,-96.8207], null, { diameter : 190000 , scale : 0.6 }) 
   cdata.addPoint ([35.1145,-101.771], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.7038,-83.6753], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([34.6222,-83.7901], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.7102,-84.3743], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.0707,-72.044], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.7776,-82.3051], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([34.9965,-82.3287], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.5329,-85.5078], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.5468,-93.6209], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.2587,-80.8298], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.2062,-81.1384], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9741,-86.1272], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7976,-118.162], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8675,-87.6744], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.8526,-86.1263], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9968,-82.9882], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.1108,-89.9483], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.1359,-90.0027], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.3654,-90.1118], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1663,-71.3611], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.5076,-104.677], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39.378,-104.858], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.84,-93.0365], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([31.2002,-97.9921], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.1783,-81.7145], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.9469,-122.197], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.2366,-90.1688], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.7341,-80.3594], null, { diameter : 130000 , scale : 0.6 }) 
   cdata.addPoint ([26.9467,-80.217], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([44.9487,-93.1002], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.6485,-77.3108], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.6676,-122.606], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.1435,-75.3567], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.0139,-71.4352], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9395,-71.2943], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([37.6134,-77.2564], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.5626,-83.6099], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.55,-88.1248], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0311,-118.49], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7352,-118.315], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.0872,-117.882], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8161,-117.979], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([47.6609,-116.834], null, { diameter : 150000 , scale : 0.6 }) 
   cdata.addPoint ([40.2594,-81.9641], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([35.9925,-78.9017], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.8098,-96.7993], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([32.6988,-97.1237], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.9722,-96.7376], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([32.9513,-96.7154], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.9716,-96.7058], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.4796,-81.511], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([36.7695,-119.795], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.2082,-86.879], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.3846,-73.0943], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.795,-122.219], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4231,-73.4771], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.0322,-78.4873], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.6667,-79.4167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3222,-88.4671], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([40.7336,-96.6394], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.7401,-117.82], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.7621,-84.3982], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7796,-75.0505], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.4553,-74.9608], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7351,-75.6684], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.3833,0.5167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.9833,6.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.1833,14.4333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9167,8.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4,5.45], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.9,6.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.4333,30.5167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([24.6408,46.7728], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.9878,-1.4214], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([51.45,-2.5833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([46,2], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.5167,-0.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.94,14.3533], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.55,10], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.6,7.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.8333,-1.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.7833,-1.75], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,-1.1333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.5333,-1.1167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.0167,-0.45], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.7833,-0.65], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.9,-1.4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.9,-1.4], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([52.2,-2.2], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([50.1167,8.6833], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([49.0047,8.3858], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.1,10.75], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([37.9833,23.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.9,12.4833], null, { diameter : 190000 , scale : 0.6 }) 
   cdata.addPoint ([51.8833,10.5667], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([50.0333,12.0167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.8667,10.8333], null, { diameter : 140000 , scale : 0.6 }) 
   cdata.addPoint ([51,9], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.3667,-1.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.9333,-1.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.9667,-1.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.9667,-1.3], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9,-2.0833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.3,3.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.45,-73.75], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([53.7,-2.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.9833,-1.5333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8167,7.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([56.5,-2.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.4667,-0.35], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.3667,-5.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47,8], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([47,8], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47,8], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.7333,-1.7667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.8833,8.3333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.5333,-0.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.95,-3.2], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([55.8333,-4.25], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([54.6861,-1.2125], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.5833,-0.25], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.55,-2.5167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.7667,-1.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,-1.8333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([55.0047,-1.4728], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.9,-1.4], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,1.3], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([52.25,-1.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.9167,-1.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.5667,-2.9], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([55.8833,-3.5333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.0667,6.4667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.3333,16.35], null, { diameter : 370000 , scale : 0.6 }) 
   cdata.addPoint ([58.35,15.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.6167,3.0167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.3833,-2.6], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.3833,-2.6], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([54.5333,-1.15], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([51.55,0.05], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.55,0.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8,-0.3667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.0533,11.7822], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.2333,4.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.5833,-1.4167], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([54.5833,-5.9333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.1167,5.9333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.8333,-2.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.45,-2.5833], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([54.9881,-1.6194], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.9833,-4.6], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([53.4167,-3], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5002,-0.1262], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([51.3742,-2.1364], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.4833,-2.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.5728,-1.1628], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.5333,-1.15], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.7833,7.3], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.95,4.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([60.1756,24.9342], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([58.2,16], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([57.7167,11.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([60.0667,15.9333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.2333,1.8167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([40.4833,-3.3667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.1333,4.6667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.4167,5.4167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9667,4.6167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.8333,4.6833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.8333,4.6833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([48.2,16.3667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.6833,25.3167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.9333,4.5833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.9,5.9833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.4333,-1], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.4478,11.0683], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([61.1333,21.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([62.4667,6.15], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([59.2167,10.95], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.8667,2.3333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 320000 , scale : 0.6 }) 
   cdata.addPoint ([54.0833,12.1333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8,-0.5333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8333,-0.15], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.5167,13.4], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([58.3167,15.1333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([59.3667,16.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.8667,12.8333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.8667,6.8667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.5833,-0.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.5833,-0.65], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([44.4333,26.1], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([44.4333,26.1], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.7833,-3.0833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.85,-1.7833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.2333,-1.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.1333,-1.2], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.4069,-2.5558], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.3833,-0.1], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.4667,-0.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.1667,-1.6833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.9667,-2.75], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([53.25,-1.9167], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([55.8333,-4.25], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([50.7167,-2.4333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.2,-0.5667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.0667,-1.7833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.8167,-2.7167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.3833,-0.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.3667,1.45], null, { diameter : 60000 , scale : 0.6 }) 
   cdata.addPoint ([55.4333,-5.6333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.4167,-1.55], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([51.5333,-0.3167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([50.45,-3.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.0167,-1.6333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.7833,1.1667], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([53.8833,-1.2667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([56.6667,-3], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.4,-1.3167], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([52.1333,-0.45], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.4667,-1.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.05,-2.7167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.7,-5.8667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.4167,-1.55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.6,3.8833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.1833,-0.35], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,-1.1333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.4733,-8.1558], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.3331,-6.2489], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([53.3331,-6.2489], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.3342,-6.4575], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.2583,-7.1119], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.25,-6.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.9667,-1.1667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.3742,-2.1364], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.5667,-1.55], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([49.9481,11.5783], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.3833,9.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.8167,9.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.0833,19.9167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.2167,5.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.4333,-8.6333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.8333,12.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.7167,12.45], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.7,3.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5833,-0.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.4333,-1.35], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([62.8,30.15], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.3,12.3333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.6528,-6.6814], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.2333,-3.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.3741,-71.1072], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5002,-0.1262], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([52.4667,-1.9167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.5,-2.2167], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([54.0667,-2.8333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.5,-2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.0833,-1.6833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.6,1.4333], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([52.6,-2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([56,-3.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.8333,-4.25], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([55.8333,-4.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.8333,-4.25], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.8,-1.5833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.65,-2.7333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.5,-3.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.35,-6.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.2,-0.8], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.6861,-1.2125], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.75,-0.3333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.3667,-1.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.8,-1.5833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,-2.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([52.5167,-1.4667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([57.4833,12.0667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([59.3667,18.0167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46,2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.0211,-3.1047], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.4167,-3], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([51.25,-0.7667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49,2.3833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8333,4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.7833,2.4667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52,20], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([55.7522,37.6156], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.55,5.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52,20], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.9667,7.9], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.25,20.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([49.3,-1.2333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.4333,8.6833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.65,-0.2667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.7,-1.4833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.5002,-0.1262], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.5,-0.5833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.5833,-2.1333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.2833,1], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([43.65,5.2667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([54.9881,-1.6194], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.3458,-2.9678], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.0833,-4.05], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.8667,-2.9667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 50000 , scale : 0.6 }) 
   cdata.addPoint ([53.5333,-1.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.9878,-1.4214], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.4167,-0.2833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54.9881,-1.6194], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([52.4167,-1.55], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.5002,-0.1262], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([51.55,0.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.8333,-2.25], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([53.65,-1.7833], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.5833,-2.4333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.45,-2.5833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([59.9667,17.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([54,-2], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([52.7167,-2.7333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.0833,-0.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.8,4.4667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.9,9.1167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.3167,2.5], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.6667,-0.4], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.75,-1.25], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,-2.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([51.3458,-2.9678], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.7167,-1.85], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.4333,-1.35], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([42.2,24.3333], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([51.5333,0.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 120000 , scale : 0.6 }) 
   cdata.addPoint ([50.3964,-4.1386], null, { diameter : 200000 , scale : 0.6 }) 
   cdata.addPoint ([52.5833,-2.1333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([55.7667,-4.1667], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([53.3167,-3.1], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.9,-2.0833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([50.7167,-1.8833], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.6,0.5167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([53.5,-2.2167], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([53.1333,-1.2], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.0167,4.3333], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([50.7,3.1667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([49.6769,6.1239], null, { diameter : 130000 , scale : 0.6 }) 
   cdata.addPoint ([53.1,-2.4333], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([51.3794,-2.3656], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([24.6408,46.7728], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([24.6408,46.7728], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([50.75,-1.55], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.6333,1.75], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([48.15,9.4667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([52.35,4.9167], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([60.8,11.1], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.561,-116.214], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.5036,-94.685], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.1818,-71.1962], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.0477,-74.1227], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.0326,-75.719], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7128,-73.2962], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([27.9003,-82.3024], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.2085,-85.6918], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.8159,-100.706], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.5449,-90.8083], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.735,-89.61], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4201,-75.6485], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([39.4209,-74.4977], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7437,-104.979], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.5593,-105.006], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.2673,-93.0196], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.1215,-89.4635], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.4314,-83.9784], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.7279,-86.284], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.7168,-73.9861], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.7294,-116.757], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([47.7294,-116.757], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([35.5498,-118.917], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.1568,-118.523], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.501,-87.3919], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([33.5586,-112.095], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([38.757,-77.1487], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.223,-117.107], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([30.2316,-85.502], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.1703,-75.5456], null, { diameter : 80000 , scale : 0.6 }) 
   cdata.addPoint ([30.0041,-95.2984], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([29.7755,-95.4152], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8014,-87.6005], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.8754,-121.687], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([38.4493,-122.709], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.5494,-89.6252], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.6105,-71.2306], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.0973,-85.671], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.3987,-86.8642], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.4224,-86.8031], null, { diameter : 40000 , scale : 0.6 }) 
   cdata.addPoint ([47.2166,-122.451], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.2369,-110.956], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.3969,-87.3274], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.7364,-89.7043], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([42.3425,-71.0677], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.8042,-83.8893], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.6859,-121.629], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([41.0957,-80.5052], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.8841,-123.995], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([40.2851,-75.9523], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([42.4235,-85.3992], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.7437,-104.979], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([25.6586,-80.3568], null, { diameter : 70000 , scale : 0.6 }) 
   cdata.addPoint ([33.0975,-80.1753], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.7615,-80.2939], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([26.3739,-80.1468], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.6454,-84.8171], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.2321,-77.8835], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.6774,-82.928], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9744,-86.0779], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.6784,-97.4944], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([33.5547,-84.1872], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([27.2498,-80.3797], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4789,-81.6473], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.813,-87.7134], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.8917,-87.9359], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.0911,-89.651], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([32.6102,-117.03], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.758,-72.7444], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.8062,-86.1407], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.872,-88.1662], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.1404,-81.3369], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([46.15,-60.1667], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([36.0679,-86.7194], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([43.45,-80.5], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([44.3833,-79.7], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([45.4167,-75.7], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([43.75,-79.2], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([45.2667,-66.0667], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([42.9833,-81.25], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([44.25,-79.4667], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([45.2667,-66.0667], null, { diameter : 20000 , scale : 0.6 }) 
   cdata.addPoint ([34.3667,-118.478], null, { diameter : 30000 , scale : 0.6 }) 
   cdata.addPoint ([42.734,-87.8211], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([39.9738,-86.1765], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([33.7438,-117.866], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([37.5741,-122.321], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([42.2843,-85.2293], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.6574,-92.5295], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([41.4881,-87.4424], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([25.72,-80.2707], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([34.5873,-118.245], null, { diameter : 10000 , scale : 0.6 }) 
   cdata.addPoint ([35.8278,-78.6421], null, { diameter : 10000 , scale : 0.6 }) 
}