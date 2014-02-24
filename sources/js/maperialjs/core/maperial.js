//------------------------------------------------------------------//

var MapView                 = require('./map-view.js'),
    SourceManager           = require('./managers/source-manager.js'),
    StyleManager            = require('./managers/style-manager.js'),
    ColorbarManager         = require('./managers/colorbar-manager.js'),
    DynamicalData           = require('./models/data/dynamical-data.js'),
    HeatmapData             = require('./models/data/heatmap-data.js'),
    Source                  = require('./models/source.js'),
    utils                   = require('../../tools/utils.js');

//------------------------------------------------------------------//

function Maperial(options){
   console.log("-----------------------");
   console.log("Creating a Maperial");
   this.options   = options;
   this.views     = {};
   
   /* global content */
   window.sourceManager    = window.sourceManager     || new SourceManager();
   window.styleManager     = window.styleManager      || new StyleManager();
   window.colorbarManager  = window.colorbarManager   || new ColorbarManager();
   
   /* global entities for API*/
   window.DynamicalData = DynamicalData;
   window.HeatmapData   = HeatmapData;
   window.Source        = Source;
};

//------------------------------------------------------------------//
//Views types
//TYPE = css class

Maperial.MAIN                    = "maperial-main";
Maperial.ANCHOR                  = "maperial-anchor";
Maperial.LENS                    = "maperial-lens";      // camera centered on what is under it
Maperial.MINIFIER                = "maperial-minifier";   // camera centered on the parent's center
Maperial.MAGNIFIER               = "maperial-magnifier";  // camera centered on what is under the mouse

//------------------------------------------------------------------//
//Vectorial layers types

Maperial.OSM                     = "tiles";   
Maperial.VECTORIAL_DATA          = "data";

//------------------------------------------------------------------//

Maperial.staticURL              = (window.location.hostname.indexOf("localhost") !== -1) ? 'http://static.maperial.localhost'+ (!window.location.port || window.location.port == "9000" ? "" : ":"+window.location.port) : 'http://static.maperial.com';
Maperial.shaderURL              = (window.location.hostname.indexOf("localhost") !== -1) ? (window.location.port == "9000" ? "http://static.maperial.localhost" : 'http://' + window.location.host+'/shaders') : 'http://static.maperial.com';

Maperial.apiURL                 = 'http://api.maperial.com';
Maperial.tileURL                = 'http://api.maperial.com';

//------------------------------------------------------------------//

Maperial.DEFAULT_ZOOM           = 10;
Maperial.DEFAULT_LATITUDE       = 48.813;
Maperial.DEFAULT_LONGITUDE      = 2.313;

//Clermont City
//Maperial.DEFAULT_LATITUDE       = 45.779017;
//Maperial.DEFAULT_LONGITUDE      = 3.10617;

//------------------------------------------------------------------//

Maperial.bgdimg                 = "symbols/water.png";

Maperial.refreshRate            = 1000/30;   // ms
Maperial.tileDLTimeOut          = 60000;     // ms
Maperial.tileSize               = 256;

Maperial.autoMoveSpeedRate      = 0.2;
Maperial.autoMoveMillis         = 700;
Maperial.autoMoveDeceleration   = 0.005;
Maperial.autoMoveAnalyseSize    = 10;

Maperial.DEFAULT_STYLE_UID      = "1_style_13ed75438c8b2ed8914";
Maperial.DEFAULT_COLORBAR_UID   = "1_colorbar_13c630ec3a5068919c3";

Maperial.AlphaClip              = "AlphaClip";
Maperial.AlphaBlend             = "AlphaBlend";
Maperial.MulBlend               = "MulBlend";

Maperial.globalDataCpt          = 0;

//------------------------------------------------------------------//
// API
//------------------------------------------------------------------//

/**
 * options:
 * 
 *    # mandatory ----------
 *       
 *       view : "div.id"  (can be used as only param)
 *       
 *    # others -------------
 *    
 *       type
 *          Maperial.MAIN (default)
 *          Maperial.ANCHOR
 *          Maperial.LENS
 *          Maperial.MINIFIER
 *          Maperial.MAGNIFIER
 *       
 *       defaultZoom
 *          default Maperial.DEFAULT_ZOOM
 *       
 *       latitude 
 *          default Maperial.DEFAULT_LATITUDE
 *
 *       longitude
 *          default Maperial.DEFAULT_LONGITUDE
 *       
 */
Maperial.prototype.addView = function (options) {

   //-------------------------------------------
   // Checking options
   
   var options = utils.prepareOptions(options, "container");
   if(!options){
      console.log("Wrong call to createView. Check the options");
   }

   //-------------------------------------------
   // Checking view 

   console.log("Adding view in container " + options.container  + "...");
   
   if($(options.container)[0] == null){
      console.log("Container " + options.container  + " could not be found");
      return;
   }

   //-------------------------------------------
   // Set defaults

   if(options.type === undefined){
      options.type = Maperial.MAIN;
   }
   
   if(options.latitude === undefined){
      options.latitude = Maperial.DEFAULT_LATITUDE;
   }
   
   if(options.longitude === undefined){
      options.longitude = Maperial.DEFAULT_LONGITUDE;
   }

   //-------------------------------------------
   // Proceed
   
   var view =  new MapView(this, options);
   this.views[view.id] = view;
   
   return view;
}

//------------------------------------------------------------------//

module.exports = Maperial;
