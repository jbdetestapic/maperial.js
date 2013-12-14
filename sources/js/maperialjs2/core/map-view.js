
function MapView(maperial, options){

   //--------------------------------------------------------------//
   
   console.log("  prepare MapView : " + options.container)
   
   //--------------------------------------------------------------//

   this.maperial           = maperial;
   this.options            = options;
   this.id                 = Utils.generateUID() + "_" + this.options.container
   this.type               = options.type
   
   //--------------------------------------------------------------//

   this.prepareContainer()
   
   //--------------------------------------------------------------//

   this.layers             = [] // array to use push and splice : index is useful here
   this.tiles              = {} // hashmap : tiles[key] = tile
   
   this.context            = new MapContext(this);
   
   this.mapRenderer        = new MapRenderer(this);
   this.layerManager       = new LayerManager(this);

   //--------------------------------------------------------------//
   
   this.shaders            = [Maperial.AlphaClip, Maperial.AlphaBlend, Maperial.MulBlend];

};

//------------------------------------------------------------------//
// Container
//------------------------------------------------------------------//

MapView.prototype.prepareContainer = function ()   {
   
   var canvasId = "Map_"+this.id; 
   var html = "<canvas id=\"Map_"+this.id+"\" class=\"maperial-map canvas-"+this.type+"\"></canvas>";

   $("#"+this.options.container).append(html)
   this.canvas    = $("#"+canvasId);
   this.width     = $("#"+this.options.container).width()
   this.height     = $("#"+this.options.container).height()
   
   this.setCanvasSize();
}

MapView.prototype.setCanvasSize = function() {

   var w = this.width;
   var h = this.height;
   
   this.canvas.css("width", w);
   this.canvas.css("height", h);
   this.canvas[0].width = w;
   this.canvas[0].height = h;
   
}

//------------------------------------------------------------------//
// API
//------------------------------------------------------------------//

MapView.prototype.addImageLayer = function (sourceId)   {
   this.layerManager.addLayer(Layer.Images, sourceId)
}

//------------------------------------------------------------------//

MapView.prototype.addOSMLayer = function (styleId)   {
   
   if(!styleId)
      styleId = Maperial.DEFAULT_STYLE_UID
      
}

//------------------------------------------------------------------//

MapView.prototype.addDynamicalLayer = function (dynamicalData, options)   {
   
   //-------------------------------------------
   // Checking options
   
   var options = Utils.prepareOptions(options, "style")
   if(!options){
      console.log("Wrong call to addDynamicalLayer. Check the options")
   }
   
   //-------------------------------------------
   // Proceed

   this.layerManager.addLayer(Layer.Dynamical, {
      dynamicalData     : dynamicalData, 
      style             : options.style
   })

}

//------------------------------------------------------------------//

MapView.prototype.addHeatmapLayer     = function (options)   {}
MapView.prototype.addRasterLayer      = function (options)   {}
MapView.prototype.addShadeLayer       = function (options)   {}
MapView.prototype.addWMSLayer         = function (options)   {}
