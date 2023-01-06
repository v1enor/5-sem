(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Растровоеизображение11 = function() {
	this.initialize(img.Растровоеизображение11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,449,349);


(lib.Растровоеизображение13 = function() {
	this.initialize(img.Растровоеизображение13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.Растровоеизображение6 = function() {
	this.initialize(img.Растровоеизображение6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,399,405);


(lib.PXL_20221004_092747824 = function() {
	this.initialize(img.PXL_20221004_092747824);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,4000);


(lib.PXL_20221004_092924728 = function() {
	this.initialize(img.PXL_20221004_092924728);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,4000);


(lib.PXL_20221004_093028404 = function() {
	this.initialize(img.PXL_20221004_093028404);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,4000);


(lib.PXL_20221004_093034308 = function() {
	this.initialize(img.PXL_20221004_093034308);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,4000);


(lib.Стоп = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3333").s().p("AA9CfIAAkDIh6AAIAAEDIhHAAIAAk9IEJAAIAAE9g");
	this.shape.setTransform(122.2,43.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC3333").s().p("AhqB4QgpgtAAhKIAAgDQAAguATgmQASglAigUQAhgUArAAQBAAAAoApQAoApADBEIAAAQQAAAvgSAlQgSAlghAUQgiAVgrgBQhDAAgogsgAg3hPQgUAcAAA2QAAAxAUAcQAUAbAkABQAjAAAVgcQATgcAAg2QABgwgVgcQgVgcgjAAQgiAAgVAbg");
	this.shape_1.setTransform(87.85,43.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC3333").s().p("AgjCfIAAkEIhmAAIAAg5IETAAIAAA5IhnAAIAAEEg");
	this.shape_2.setTransform(55.925,43.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CC3333").s().p("AhWDDQgngYgWgtQgVgsAAg7IAAgnQAAg8AVguQAVguApgZQAngZA0AAQBGAAAsAmQArAmAGBGIhJAAQgGgugVgUQgWgUgpAAQgwAAgZAjQgbAjAABEIAAAmQAABFAZAkQAYAkAvAAQArAAAXgTQAWgUAGguIBJAAQgGBFgsAmQgsAmhJAAQgyAAgmgYg");
	this.shape_3.setTransform(21.95,37.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC3333").s().p("AhqB4QgpgtAAhLIAAgCQAAguATgmQASglAigUQAhgUArAAQBAAAAoApQAoApADBEIAAAQQAAAvgSAlQgSAlghAUQgiAVgrgBQhDAAgogsgAg3hPQgUAcAAA2QAAAxAUAcQAUAbAkABQAjAAAVgcQATgcAAg2QABgwgVgcQgVgcgjAAQgiAAgVAbg");
	this.shape_4.setTransform(87.85,37.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#99CC66").ss(1,1,1).p("Aq1kpIVrAAIAAJTI1rAAg");
	this.shape_5.setTransform(72.1,44.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CC3333").s().p("Aq0EqIAApTIVqAAIAAJTg");
	this.shape_6.setTransform(72.1,44.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{y:37.675}},{t:this.shape_2,p:{y:43.15}},{t:this.shape_1},{t:this.shape,p:{y:43.15}}]}).to({state:[{t:this.shape_3,p:{y:37.675}},{t:this.shape_2,p:{y:43.15}},{t:this.shape_1},{t:this.shape,p:{y:43.15}}]},1).to({state:[{t:this.shape_3,p:{y:32.275}},{t:this.shape_2,p:{y:37.75}},{t:this.shape_4,p:{y:37.75}},{t:this.shape,p:{y:37.75}}]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_3,p:{y:35.875}},{t:this.shape_2,p:{y:41.35}},{t:this.shape_4,p:{y:41.35}},{t:this.shape,p:{y:41.35}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-5.4,142.5,81.4);


(lib.Старт = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00CCCC").s().p("AgjCfIAAkEIhmAAIAAg5IETAAIAAA5IhnAAIAAEEg");
	this.shape.setTransform(151.875,43.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CCCC").s().p("AiKDeIAAm2IBCAAIADAhQAfgmA1AAQA6AAAhArQAhArAABNIAAAEQAABJgiArQghAtg4gBQgzAAgggiIAACWgAhDh/IAACMQAUAlAsAAQAhAAATgbQATgcAAg3QAAgvgTgcQgTgcgiAAQgsAAgTAkg");
	this.shape_1.setTransform(120.775,48.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#00CCCC").s().p("AhpCJQgegbAAgoQAAgzAmgaQAlgbBFAAIAsAAIAAgVQAAgZgOgOQgNgPgcAAQgYAAgQAMQgPAMAAATIhIAAQAAgaASgXQARgXAegNQAdgMAlAAQA3AAAhAcQAhAbABA0IAACNQAAArAMAaIAAAFIhIAAQgFgKgEgUQgiAjgwAAQgwABgegcgAgsAYQgUANAAAaQAAAUAOAMQAOAMAWAAQAVAAASgKQASgLAKgQIAAg9IgnAAQgmABgUAOg");
	this.shape_2.setTransform(87.05,43.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00CCCC").s().p("AgjCfIAAkEIhmAAIAAg5IETAAIAAA5IhnAAIAAEEg");
	this.shape_3.setTransform(55.925,43.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00CCCC").s().p("AhWDDQgngYgWgtQgVgsAAg7IAAgnQAAg8AVguQAVguApgZQAngZA0AAQBGAAAsAmQArAmAGBGIhJAAQgGgugVgUQgWgUgpAAQgwAAgZAjQgbAjAABEIAAAmQAABFAZAkQAYAkAvAAQArAAAXgTQAWgUAGguIBJAAQgGBFgsAmQgsAmhJAAQgyAAgmgYg");
	this.shape_4.setTransform(21.95,37.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgjCfIAAkEIhmAAIAAg5IETAAIAAA5IhnAAIAAEEg");
	this.shape_5.setTransform(151.875,43.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AiKDeIAAm2IBCAAIADAhQAfgmA1AAQA6AAAhArQAhArAABNIAAAEQAABJgiArQghAtg4gBQgzAAgggiIAACWgAhDh/IAACMQAUAlAsAAQAhAAATgbQATgcAAg3QAAgvgTgcQgTgcgiAAQgsAAgTAkg");
	this.shape_6.setTransform(120.775,48.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhpCJQgegbAAgoQAAgzAmgaQAlgbBFAAIAsAAIAAgVQAAgZgOgOQgNgPgcAAQgYAAgQAMQgPAMAAATIhIAAQAAgaASgXQARgXAegNQAdgMAlAAQA3AAAhAcQAhAbABA0IAACNQAAArAMAaIAAAFIhIAAQgFgKgEgUQgiAjgwAAQgwABgegcgAgsAYQgUANAAAaQAAAUAOAMQAOAMAWAAQAVAAASgKQASgLAKgQIAAg9IgnAAQgmABgUAOg");
	this.shape_7.setTransform(87.05,43.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgjCfIAAkEIhmAAIAAg5IETAAIAAA5IhnAAIAAEEg");
	this.shape_8.setTransform(55.925,43.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhWDDQgngYgWgtQgVgsAAg7IAAgnQAAg8AVguQAVguApgZQAngZA0AAQBGAAAsAmQArAmAGBGIhJAAQgGgugVgUQgWgUgpAAQgwAAgZAjQgbAjAABEIAAAmQAABFAZAkQAYAkAvAAQArAAAXgTQAWgUAGguIBJAAQgGBFgsAmQgsAmhJAAQgyAAgmgYg");
	this.shape_9.setTransform(21.95,37.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#99CC66").ss(1,1,1).p("AtykBIblAAIAAIDI7lAAg");
	this.shape_10.setTransform(87.425,40.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AtyECIAAoDIblAAIAAIDg");
	this.shape_11.setTransform(87.425,40.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,0,178.70000000000002,76);


(lib.Вначало = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhqB4QgogtAAhKIAAgDQAAgvASgkQASgmAigUQAhgVArAAQBAAAAoAqQAoApADBEIAAAQQABAvgTAlQgRAlgiAUQgiAVgsAAQhCAAgogtgAg2hOQgVAbAAA2QAAAxAUAcQAVAbAiAAQAlAAATgcQAVgbgBg2QAAgwgUgcQgVgcgjAAQgiAAgUAcg");
	this.shape.setTransform(155.65,-64.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABNCeIAAkCIhZAAIgGBuQgFBPgZAjQgZAig0AAIgWAAIAAg6IAPgCQAXgDALgaQAKgZADhCIAGiHIDjAAIAAE7g");
	this.shape_1.setTransform(119.875,-64.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhpCJQgegbAAgpQAAgyAlgaQAmgbBFAAIAsAAIAAgVQAAgYgOgPQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgWQARgXAegNQAegNAjgBQA4ABAhAcQAhAbABAzIAACOQAAArAMAaIAAAEIhJAAQgEgJgEgUQgiAkgwAAQgwgBgegbgAgsAXQgUAOAAAZQAAAVAOAMQANAMAXAAQAVAAASgKQATgLAJgRIAAg7IgmAAQgnAAgUANg");
	this.shape_2.setTransform(87.9,-64.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8CfIAAhqQgbAGgfAAQhAAAgigfQgigeAAg6IAAhiIBHAAIAABiQAAAiAPAPQAQANAeAAQAdAAAdgGIAAiZIBHAAIAAE8g");
	this.shape_3.setTransform(54.575,-64.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhpCJQgegbAAgpQAAgyAlgaQAmgbBFAAIAsAAIAAgVQAAgYgOgPQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgWQARgXAegNQAdgNAkgBQA4ABAhAcQAhAbABAzIAACOQAAArAMAaIAAAEIhJAAQgEgJgEgUQgiAkgwAAQgwgBgegbgAgsAXQgUAOAAAZQAAAVAOAMQANAMAXAAQAUAAATgKQATgLAJgRIAAg7IgmAAQgnAAgUANg");
	this.shape_4.setTransform(22.45,-64.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AA+CeIAAh/Ih7AAIAAB/IhHAAIAAk7IBHAAIAACEIB7AAIAAiEIBHAAIAAE7g");
	this.shape_5.setTransform(-10.975,-64.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AiXDVIAAmpICSAAQBHAAAmAdQAmAdAAA5QAAAdgQAYQgQAXgeANQAiAJATAaQATAZAAAlQAAA8gmAgQgnAghIAAgAhNCaIBRAAQAjAAAUgRQATgRAAgfQAAhDhEgBIhXAAgAhNghIBIAAQAiAAAUgPQATgQAAgdQAAgfgSgOQgSgPglAAIhIAAg");
	this.shape_6.setTransform(-61.425,-70.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhqB4QgogtAAhLIAAgCQAAgvASgkQASgmAigUQAhgVArABQBAAAAoApQAoAqADBEIAAAPQABAvgTAlQgRAlgiAUQgiAUgsAAQhCAAgogsgAg2hPQgVAcAAA2QAAAxAUAcQAVAcAigBQAlAAATgcQAVgcgBg1QAAgwgUgcQgVgcgjAAQgiAAgUAbg");
	this.shape_7.setTransform(155.65,-67.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("ABNCfIAAkDIhZAAIgGBtQgFBQgZAjQgZAjg0AAIgWAAIAAg8IAPgBQAXgEALgYQAKgaADhCIAGiHIDjAAIAAE8g");
	this.shape_8.setTransform(119.875,-67.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhpCJQgegbAAgoQAAgzAlgaQAmgbBFAAIAsAAIAAgVQAAgYgOgPQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgXQARgWAegOQAegNAjABQA4gBAhAdQAhAcABAzIAACOQAAAqAMAZIAAAGIhJAAQgEgJgEgVQgiAkgwgBQgwAAgegbgAgsAYQgUANAAAZQAAAVAOAMQANAMAXAAQAVAAASgKQATgKAJgRIAAg9IgmAAQgnABgUAOg");
	this.shape_9.setTransform(87.9,-67.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhpCJQgegbAAgoQAAgzAlgaQAmgbBFAAIAsAAIAAgVQAAgYgOgPQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgXQARgWAegOQAdgNAkABQA4gBAhAdQAhAcABAzIAACOQAAAqAMAZIAAAGIhJAAQgEgJgEgVQgiAkgwgBQgwAAgegbgAgsAYQgUANAAAZQAAAVAOAMQANAMAXAAQAUAAATgKQATgKAJgRIAAg9IgmAAQgnABgUAOg");
	this.shape_10.setTransform(22.45,-67.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AA+CfIAAiAIh7AAIAACAIhHAAIAAk8IBHAAIAACDIB7AAIAAiDIBHAAIAAE8g");
	this.shape_11.setTransform(-10.975,-67.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhqB4QgogtAAhLIAAgCQAAguASgmQASglAigUQAhgUArAAQBAAAAoApQAoApADBEIAAAQQABAvgTAlQgRAlgiAUQgiAVgsgBQhCAAgogsgAg2hPQgVAcAAA2QAAAxAUAcQAVAbAiABQAlAAATgcQAVgcgBg2QAAgwgUgcQgVgcgjAAQgiAAgUAbg");
	this.shape_12.setTransform(155.65,-69.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("ABNCfIAAkDIhZAAIgGBtQgFBQgZAjQgZAjg0AAIgWAAIAAg8IAPgBQAXgDALgZQAKgaADhCIAGiIIDjAAIAAE9g");
	this.shape_13.setTransform(119.875,-69.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhpCJQgegbAAgoQAAgzAlgaQAmgbBFAAIAsAAIAAgVQAAgZgOgOQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgXQARgXAegNQAegMAjAAQA4AAAhAcQAhAbABA0IAACNQAAArAMAZIAAAGIhJAAQgEgKgEgUQgiAjgwAAQgwABgegcgAgsAYQgUANAAAaQAAAUAOAMQANAMAXAAQAVAAASgKQATgLAJgQIAAg9IgmAAQgnABgUAOg");
	this.shape_14.setTransform(87.9,-69.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhpCJQgegbAAgoQAAgzAlgaQAmgbBFAAIAsAAIAAgVQAAgZgOgOQgOgPgbAAQgYAAgQAMQgPAMAAATIhHAAQAAgaARgXQARgXAegNQAdgMAkAAQA4AAAhAcQAhAbABA0IAACNQAAArAMAZIAAAGIhJAAQgEgKgEgUQgiAjgwAAQgwABgegcgAgsAYQgUANAAAaQAAAUAOAMQANAMAXAAQAUAAATgKQATgLAJgQIAAg9IgmAAQgnABgUAOg");
	this.shape_15.setTransform(22.45,-69.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AA+CfIAAiBIh7AAIAACBIhHAAIAAk9IBHAAIAACEIB7AAIAAiEIBHAAIAAE9g");
	this.shape_16.setTransform(-10.975,-69.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#99CC66").ss(1,1,1).p("Az/kwMAn/AAAIAAJhMgn/AAAg");
	this.shape_17.setTransform(47,-67.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("Az+ExIAAphMAn+AAAIAAJhg");
	this.shape_18.setTransform(47,-67.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6,p:{y:-70.275}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3,p:{y:-64.825}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6,p:{y:-70.275}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3,p:{y:-64.825}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_6,p:{y:-73.275}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_3,p:{y:-67.825}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_6,p:{y:-75.275}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_3,p:{y:-69.825}},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-112.9,259,81);


(lib.Анимация26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhCBsIAAjUIAgAAIABAQQAPgSAZAAQAcAAAQAUQAQAVAAAmIAAACQAAAigQAVQgQAVgbABQgZgBgPgQIAABJgAggg9IAABDQAKASAVAAQAPAAAKgOQAJgLAAgbQAAgYgJgNQgJgOgQAAQgWAAgJASg");
	this.shape.setTransform(113.625,-39.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgQBMIAAh9IgyAAIAAgbICEAAIAAAbIgxAAIAAB9g");
	this.shape_1.setTransform(97.95,-42.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AguA7QgUgVAAgiIAAgEQAAgXAIgSQAJgRAQgLQAQgKATABQAfAAARATQARAVAAAkIAAANIhjAAQACATALALQALALAQAAQAXAAAPgUIATASQgJAOgQAIQgPAIgTAAQgggBgUgUgAgUgpQgJAKgCARIBAAAIAAgCQgBgRgIgJQgIgJgOAAQgNAAgJAKg");
	this.shape_2.setTransform(83.175,-42.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AA2BMIAAhkIgqBkIgWAAIgrhkIAABkIgjAAIAAiYIAsAAIAsBuIAthuIAsAAIAACYg");
	this.shape_3.setTransform(64.3,-42.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgRBMIAAh9IgxAAIAAgbICFAAIAAAbIgyAAIAAB9g");
	this.shape_4.setTransform(46.25,-42.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhABMIAAiYIAjAAIAAAxIAhAAQASAAAOAGQAOAHAIAMQAHALAAAPQAAAYgRAOQgQAOgcAAgAgdAxIAgAAQANAAAHgGQAIgGAAgMQgBgMgGgHQgIgGgMAAIghAAg");
	this.shape_5.setTransform(31.65,-42.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AAlBMIAAh8IgqAAIgDA0QgDAngMARQgMAQgZAAIgKAAIgBgcIAIgBQALgCAFgMQAFgMACggIAChBIBuAAIAACYg");
	this.shape_6.setTransform(14.075,-42.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgzA6QgTgWAAgkIAAAAQAAgXAJgSQAJgSAQgKQAQgJAUAAQAfAAATATQAUAVABAgIAAAIQAAAWgIASQgJASgQAJQgQALgWAAQgfgBgUgVgAgagmQgKAOAAAaQAAAXAKANQAKAOAQAAQASAAAJgOQAKgOAAgYQAAgYgKgOQgKgNgRAAQgQAAgKANg");
	this.shape_7.setTransform(-1.825,-42.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhCBMIAAiYIA/AAQAfABAQAKQAQALAAAVQAAAKgGAJQgHAIgNAFQAPACAJAKQAIAJAAAMQAAAWgPALQgQAMgegBgAgfAxIAlAAQAbABgBgUQAAgTgbAAIgkAAgAgfgNIAcAAQAdABAAgSQAAgSgbgBIgeAAg");
	this.shape_8.setTransform(-17.9,-42.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AATBYQgJACgKAAQgYAAgTgNQgUgMgLgXQgLgWAAgdIAAgLQAAgfALgXQALgXATgMQAUgMAYAAQAZAAAUAMQATAMALAXQAKAWABAfIAAALQAAAcgKAWQgJAVgRANIAkAbIgYAVgAgjhJQgOASAAAhIAAAMQAAAgANATQANATAXAAQAYAAANgSQANgSAAgiIAAgLQAAgjgNgSQgNgSgYAAQgWAAgNATg");
	this.shape_9.setTransform(-43.825,-43.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("ABRBnIAAjNIAvAAIAADNgAh/BnIAAjNIAvAAIAABBIAtAAQAZAAASAJQAUAJAKAQQAJAPAAAUQAAAggXAUQgWATglAAgAhQBCIAtAAQARAAAKgIQAJgJgBgQQABgPgJgJQgKgJgQAAIguAAg");
	this.shape_10.setTransform(-283.15,245.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("ABDCGIAAg+IiDAAIAAA+IgvAAIAAhjIARAAQATgVAGgSQAHgUABgeIADhPICOAAIAACoIAdAAIAABjgAgPg2QgCA4gXAhIBOAAIAAiAIgzAAg");
	this.shape_11.setTransform(-310.8,248.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhEBOQgbgeAAgvIAAgCQAAgeAMgZQAMgYAWgNQAWgNAbAAQAqAAAaAbQAaAbACAsIAAAKQAAAfgMAYQgMAYgVAMQgWAOgdAAQgqAAgagdgAgjgyQgNASAAAiQAAAgANASQANASAWAAQAYAAANgTQANgRAAgjQAAgfgOgSQgNgSgXAAQgWAAgNASg");
	this.shape_12.setTransform(-333.925,245.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhZCQIAAkbIArAAIABAUQAVgZAiAAQAmABAVAcQAVAcAAAxIAAADQAAAwgVAcQgWAcglAAQggABgVgXIAABhgAgrhSIAABaQANAZAcAAQAVgBANgRQAMgRAAgkQAAgfgMgTQgMgSgWAAQgcAAgNAYg");
	this.shape_13.setTransform(-355.575,249.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgXBnIAAipIhCAAIAAgkICzAAIAAAkIhDAAIAACpg");
	this.shape_14.setTransform(-376.625,245.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAhBnIg4hSIgXAAIAABSIgvAAIAAjNIAvAAIAABSIAVAAIA3hSIA5AAIhKBiIBQBrg");
	this.shape_15.setTransform(-395.8,245.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag/BPQgbgbAAgvIAAgFQAAgfANgYQALgYAVgOQAWgNAaAAQApAAAYAbQAXAbgBAxIAAARIiFAAQACAaAPAPQAPAPAWAAQAgAAATgaIAZAYQgMATgVAJQgUALgaAAQgrAAgcgcgAgbg4QgMAOgDAXIBXAAIAAgDQgBgXgMgMQgLgMgSABQgTgBgLANg");
	this.shape_16.setTransform(-418.15,245.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAyBnIAAioIg5AAIgEBHQgEA0gQAXQgQAWgiAAIgOAAIAAgmIAJgBQAPgCAHgRQAHgQACgrIAEhYICTAAIAADNg");
	this.shape_17.setTransform(-440.975,245.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhMB1QgdgZgEgrIAwAAQAEAdAOANQAOANAcAAQAdAAAQgWQARgVABgqIhhAAIAAglIBhAAQgCgqgRgVQgQgVgeAAQgbAAgOAMQgOAOgDAeIgwAAQAEgtAcgaQAcgZAuAAQAhAAAaAQQAaAQAOAeQAOAeAAAnIAAAWQAAAngNAeQgOAegaAQQgZAQghAAQgvAAgcgZg");
	this.shape_18.setTransform(-464.075,241.8);

	this.instance = new lib.Растровоеизображение13();
	this.instance.setTransform(-31.2,-253.35,0.1319,0.1331);

	this.instance_1 = new lib.PXL_20221004_093028404();
	this.instance_1.setTransform(-496.2,-267.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-496.2,-267.3,992.5,534.7);


(lib.Анимация25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhCBsIAAjUIAgAAIABAQQAPgSAZAAQAcAAAQAUQAQAVAAAmIAAACQAAAigQAVQgQAVgbABQgZgBgPgQIAABJgAggg9IAABDQAKASAVAAQAPAAAKgOQAJgLAAgbQAAgYgJgNQgJgOgQAAQgWAAgJASg");
	this.shape.setTransform(113.625,-39.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgQBMIAAh9IgyAAIAAgbICEAAIAAAbIgxAAIAAB9g");
	this.shape_1.setTransform(97.95,-42.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AguA7QgUgVAAgiIAAgEQAAgXAIgSQAJgRAQgLQAQgKATABQAfAAARATQARAVAAAkIAAANIhjAAQACATALALQALALAQAAQAXAAAPgUIATASQgJAOgQAIQgPAIgTAAQgggBgUgUgAgUgpQgJAKgCARIBAAAIAAgCQgBgRgIgJQgIgJgOAAQgNAAgJAKg");
	this.shape_2.setTransform(83.175,-42.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AA2BMIAAhkIgqBkIgWAAIgrhkIAABkIgjAAIAAiYIAsAAIAsBuIAthuIAsAAIAACYg");
	this.shape_3.setTransform(64.3,-42.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgRBMIAAh9IgxAAIAAgbICFAAIAAAbIgyAAIAAB9g");
	this.shape_4.setTransform(46.25,-42.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhABMIAAiYIAjAAIAAAxIAhAAQASAAAOAGQAOAHAIAMQAHALAAAPQAAAYgRAOQgQAOgcAAgAgdAxIAgAAQANAAAHgGQAIgGAAgMQgBgMgGgHQgIgGgMAAIghAAg");
	this.shape_5.setTransform(31.65,-42.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AAlBMIAAh8IgqAAIgDA0QgDAngMARQgMAQgZAAIgKAAIgBgcIAIgBQALgCAFgMQAFgMACggIAChBIBuAAIAACYg");
	this.shape_6.setTransform(14.075,-42.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AgzA6QgTgWAAgkIAAAAQAAgXAJgSQAJgSAQgKQAQgJAUAAQAfAAATATQAUAVABAgIAAAIQAAAWgIASQgJASgQAJQgQALgWAAQgfgBgUgVgAgagmQgKAOAAAaQAAAXAKANQAKAOAQAAQASAAAJgOQAKgOAAgYQAAgYgKgOQgKgNgRAAQgQAAgKANg");
	this.shape_7.setTransform(-1.825,-42.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhCBMIAAiYIA/AAQAfABAQAKQAQALAAAVQAAAKgGAJQgHAIgNAFQAPACAJAKQAIAJAAAMQAAAWgPALQgQAMgegBgAgfAxIAlAAQAbABgBgUQAAgTgbAAIgkAAgAgfgNIAcAAQAdABAAgSQAAgSgbgBIgeAAg");
	this.shape_8.setTransform(-17.9,-42.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AATBYQgJACgKAAQgYAAgTgNQgUgMgLgXQgLgWAAgdIAAgLQAAgfALgXQALgXATgMQAUgMAYAAQAZAAAUAMQATAMALAXQAKAWABAfIAAALQAAAcgKAWQgJAVgRANIAkAbIgYAVgAgjhJQgOASAAAhIAAAMQAAAgANATQANATAXAAQAYAAANgSQANgSAAgiIAAgLQAAgjgNgSQgNgSgYAAQgWAAgNATg");
	this.shape_9.setTransform(-43.825,-43.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("ABRBnIAAjNIAvAAIAADNgAh/BnIAAjNIAvAAIAABBIAtAAQAZAAASAJQAUAJAKAQQAJAPAAAUQAAAggXAUQgWATglAAgAhQBCIAtAAQARAAAKgIQAJgJgBgQQABgPgJgJQgKgJgQAAIguAAg");
	this.shape_10.setTransform(-283.15,245.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("ABDCGIAAg+IiDAAIAAA+IgvAAIAAhjIARAAQATgVAGgSQAHgUABgeIADhPICOAAIAACoIAdAAIAABjgAgPg2QgCA4gXAhIBOAAIAAiAIgzAAg");
	this.shape_11.setTransform(-310.8,248.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhEBOQgbgeAAgvIAAgCQAAgeAMgZQAMgYAWgNQAWgNAbAAQAqAAAaAbQAaAbACAsIAAAKQAAAfgMAYQgMAYgVAMQgWAOgdAAQgqAAgagdgAgjgyQgNASAAAiQAAAgANASQANASAWAAQAYAAANgTQANgRAAgjQAAgfgOgSQgNgSgXAAQgWAAgNASg");
	this.shape_12.setTransform(-333.925,245.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhZCQIAAkbIArAAIABAUQAVgZAiAAQAmABAVAcQAVAcAAAxIAAADQAAAwgVAcQgWAcglAAQggABgVgXIAABhgAgrhSIAABaQANAZAcAAQAVgBANgRQAMgRAAgkQAAgfgMgTQgMgSgWAAQgcAAgNAYg");
	this.shape_13.setTransform(-355.575,249.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgXBnIAAipIhCAAIAAgkICzAAIAAAkIhDAAIAACpg");
	this.shape_14.setTransform(-376.625,245.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAhBnIg4hSIgXAAIAABSIgvAAIAAjNIAvAAIAABSIAVAAIA3hSIA5AAIhKBiIBQBrg");
	this.shape_15.setTransform(-395.8,245.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag/BPQgbgbAAgvIAAgFQAAgfANgYQALgYAVgOQAWgNAaAAQApAAAYAbQAXAbgBAxIAAARIiFAAQACAaAPAPQAPAPAWAAQAgAAATgaIAZAYQgMATgVAJQgUALgaAAQgrAAgcgcgAgbg4QgMAOgDAXIBXAAIAAgDQgBgXgMgMQgLgMgSABQgTgBgLANg");
	this.shape_16.setTransform(-418.15,245.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAyBnIAAioIg5AAIgEBHQgEA0gQAXQgQAWgiAAIgOAAIAAgmIAJgBQAPgCAHgRQAHgQACgrIAEhYICTAAIAADNg");
	this.shape_17.setTransform(-440.975,245.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhMB1QgdgZgEgrIAwAAQAEAdAOANQAOANAcAAQAdAAAQgWQARgVABgqIhhAAIAAglIBhAAQgCgqgRgVQgQgVgeAAQgbAAgOAMQgOAOgDAeIgwAAQAEgtAcgaQAcgZAuAAQAhAAAaAQQAaAQAOAeQAOAeAAAnIAAAWQAAAngNAeQgOAegaAQQgZAQghAAQgvAAgcgZg");
	this.shape_18.setTransform(-464.075,241.8);

	this.instance = new lib.Растровоеизображение13();
	this.instance.setTransform(-31.2,-253.35,0.1319,0.1331);

	this.instance_1 = new lib.PXL_20221004_093028404();
	this.instance_1.setTransform(-496.2,-267.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-496.2,-267.3,992.5,534.7);


(lib.Анимация24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("ACGCKQgHgFgEgIQgDgJADgIQADgKANgIIAXgLQAegQAJgfIgLgKIgEACQgJAFgVAAQg2ABhCAIQgnAFhOAOQgcAEgTAFQgYAIgJABQgIABgMgBIgVgBIgXABQgNAAgIgFQgLgHgCgNQgDgNAIgJQAIgJAPgCQAGgBAWAAQAPAAAVgEIAjgHIA/gLQBDgMAfgEQBFgJBAACIACAAQgBgHgEgEQgEgFgPgDQhngXhtgOQgWgCgKgIQgMgMAEgQQAEgQAQgEQAHgCAOACQBRAMApAHQBDALA2APQAnAKAHAVQACAFABAKIADAPQACAHAIAJIAOAPQAMAOABAWQABAVgJATQgOAfgoAbQgTANgMACIgMACQgNAAgJgHg");
	this.shape.setTransform(0.0255,0.0152);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26,-14.4,52.1,28.9);


(lib.Анимация23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("ACGCKQgHgFgEgIQgDgJADgIQADgKANgIIAXgLQAegQAJgfIgLgKIgEACQgJAFgVAAQg2ABhCAIQgnAFhOAOQgcAEgTAFQgYAIgJABQgIABgMgBIgVgBIgXABQgNAAgIgFQgLgHgCgNQgDgNAIgJQAIgJAPgCQAGgBAWAAQAPAAAVgEIAjgHIA/gLQBDgMAfgEQBFgJBAACIACAAQgBgHgEgEQgEgFgPgDQhngXhtgOQgWgCgKgIQgMgMAEgQQAEgQAQgEQAHgCAOACQBRAMApAHQBDALA2APQAnAKAHAVQACAFABAKIADAPQACAHAIAJIAOAPQAMAOABAWQABAVgJATQgOAfgoAbQgTANgMACIgMACQgNAAgJgHg");
	this.shape.setTransform(0.0255,0.0152);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26,-14.4,52.1,28.9);


(lib.Анимация20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.Растровоеизображение13();
	this.instance.setTransform(-365.9,-274.45,0.183,0.183);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-365.9,-274.4,731.9,548.9);


(lib.Анимация19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.Растровоеизображение13();
	this.instance.setTransform(-365.9,-274.45,0.183,0.183);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-365.9,-274.4,731.9,548.9);


(lib.Анимация18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhZCQIAAkcIArAAIABAWQAVgZAiAAQAmAAAVAcQAVAcAAAyIAAACQAAAwgVAcQgWAcglABQgggBgVgWIAABhgAgrhSIAABbQANAYAcAAQAVAAANgSQAMgRAAgkQAAgfgMgTQgMgRgWgBQgcABgNAXg");
	this.shape.setTransform(112.175,27.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgXBnIAAioIhCAAIAAglICzAAIAAAlIhDAAIAACog");
	this.shape_1.setTransform(91.125,23.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Ag+BPQgbgcAAguIAAgFQAAgeAMgZQALgYAWgOQAVgNAaAAQApAAAXAbQAYAbAAAxIAAARIiGAAQACAaAPAPQAPAPAWAAQAfAAAVgaIAYAYQgMASgUAKQgWALgZAAQgrAAgbgcgAgbg4QgMAOgDAXIBXAAIAAgCQgBgYgMgMQgLgLgSAAQgTAAgLAMg");
	this.shape_2.setTransform(71.2,23.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("ABIBnIAAiHIg4CHIgfAAIg4iIIAACIIgvAAIAAjNIA6AAIA8CUIA9iUIA6AAIAADNg");
	this.shape_3.setTransform(45.85,23.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgXBnIAAioIhCAAIAAglICzAAIAAAlIhDAAIAACog");
	this.shape_4.setTransform(21.575,23.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhWBnIAAjNIAuAAIAABBIAtAAQAZAAATAJQATAJAKAQQAJAPAAAVQAAAfgWAUQgXATglAAgAgoBCIAsAAQARAAAKgIQAKgJAAgQQAAgPgKgJQgJgJgRAAIgtAAg");
	this.shape_5.setTransform(1.875,23.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AAyBnIAAioIg5AAIgEBHQgEA0gQAWQgQAXgiAAIgOAAIAAgmIAJgCQAPgCAHgQQAHgRACgqIAEhYICTAAIAADNg");
	this.shape_6.setTransform(-21.725,23.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AhEBOQgbgeAAgwIAAgBQAAgeAMgZQAMgYAWgNQAWgNAbAAQAqAAAaAbQAaAbACAsIAAAKQAAAegMAZQgMAXgVAOQgWANgdAAQgqAAgagdgAgjgyQgNARAAAjQAAAgANASQANASAWAAQAYAAANgTQANgSAAgiQAAgfgOgSQgNgTgXABQgWgBgNATg");
	this.shape_7.setTransform(-43.125,23.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhZBnIAAjNIBUAAQAqAAAWAPQAWAPAAAbQAAAPgJALQgJALgSAGQAVAEAMAMQAMANgBARQAAAdgUAPQgWAPgnAAgAgqBDIAyAAQAkgBAAgZQAAgaglAAIgxAAgAgqgRIAmAAQAnAAAAgXQAAgYglgBIgoAAg");
	this.shape_8.setTransform(-64.75,23.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AAZB2QgMACgNABQggAAgbgRQgagRgOgeQgPgeAAgnIAAgQQAAgoAPggQAOgeAagRQAagRAhAAQAiAAAaARQAbAQAOAeQAOAfAAApIAAAPQAAAmgNAdQgMAdgXARIAwAmIgfAcgAgwhjQgSAZAAAsIAAAQQAAAsARAaQASAYAfAAQAgAAARgXQARgZAAguIAAgPQAAgugRgZQgSgYgfABQgfAAgRAYg");
	this.shape_9.setTransform(-99.7,22.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("Ah4CRQgLgGgBgPQgCgOAIgLQAKgMAagLQBAgZB6giQhQAChPAGQg3AEhqAMIhhALQg2AGgfAHQgbAHgLAAQgXAAgMgNQgGgIgBgKQgBgKAHgHQAGgGARgEQBTgQCZgPIBQgIQB2gMA7gCQAfgCA/AAIBoABQAYAAAKAHIADADQBOgXAwgUQgTgJgpgCQiwgIi1AJQgUABgJgDQgRgEgFgOQgCgJAEgJQAEgJAIgFQAMgIAXgCQAWgDAtAAIBQAAQBlAAAtACQBSADBAAKQAfAGANAIQAYAOACAXQABAUgRAPQgLAMgWAKQglASgxAOIhaAaIjJA3QgsAMgUAIQglAMgaAOQgSAKgJADQgHACgGAAQgHAAgHgEg");
	this.shape_10.setTransform(-107.9989,-30.8413);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-156.7,-45.7,313.4,91.5);


(lib.Анимация17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhZCQIAAkcIArAAIABAWQAVgZAiAAQAmAAAVAcQAVAcAAAyIAAACQAAAwgVAcQgWAcglABQgggBgVgWIAABhgAgrhSIAABbQANAYAcAAQAVAAANgSQAMgRAAgkQAAgfgMgTQgMgRgWgBQgcABgNAXg");
	this.shape.setTransform(112.175,27.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgXBnIAAioIhCAAIAAglICzAAIAAAlIhDAAIAACog");
	this.shape_1.setTransform(91.125,23.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Ag+BPQgbgcAAguIAAgFQAAgeAMgZQALgYAWgOQAVgNAaAAQApAAAXAbQAYAbAAAxIAAARIiGAAQACAaAPAPQAPAPAWAAQAfAAAVgaIAYAYQgMASgUAKQgWALgZAAQgrAAgbgcgAgbg4QgMAOgDAXIBXAAIAAgCQgBgYgMgMQgLgLgSAAQgTAAgLAMg");
	this.shape_2.setTransform(71.2,23.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("ABIBnIAAiHIg4CHIgfAAIg4iIIAACIIgvAAIAAjNIA6AAIA8CUIA9iUIA6AAIAADNg");
	this.shape_3.setTransform(45.85,23.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AgXBnIAAioIhCAAIAAglICzAAIAAAlIhDAAIAACog");
	this.shape_4.setTransform(21.575,23.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhWBnIAAjNIAuAAIAABBIAtAAQAZAAATAJQATAJAKAQQAJAPAAAVQAAAfgWAUQgXATglAAgAgoBCIAsAAQARAAAKgIQAKgJAAgQQAAgPgKgJQgJgJgRAAIgtAAg");
	this.shape_5.setTransform(1.875,23.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AAyBnIAAioIg5AAIgEBHQgEA0gQAWQgQAXgiAAIgOAAIAAgmIAJgCQAPgCAHgQQAHgRACgqIAEhYICTAAIAADNg");
	this.shape_6.setTransform(-21.725,23.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AhEBOQgbgeAAgwIAAgBQAAgeAMgZQAMgYAWgNQAWgNAbAAQAqAAAaAbQAaAbACAsIAAAKQAAAegMAZQgMAXgVAOQgWANgdAAQgqAAgagdgAgjgyQgNARAAAjQAAAgANASQANASAWAAQAYAAANgTQANgSAAgiQAAgfgOgSQgNgTgXABQgWgBgNATg");
	this.shape_7.setTransform(-43.125,23.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AhZBnIAAjNIBUAAQAqAAAWAPQAWAPAAAbQAAAPgJALQgJALgSAGQAVAEAMAMQAMANgBARQAAAdgUAPQgWAPgnAAgAgqBDIAyAAQAkgBAAgZQAAgaglAAIgxAAgAgqgRIAmAAQAnAAAAgXQAAgYglgBIgoAAg");
	this.shape_8.setTransform(-64.75,23.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF0000").s().p("AAZB2QgMACgNABQggAAgbgRQgagRgOgeQgPgeAAgnIAAgQQAAgoAPggQAOgeAagRQAagRAhAAQAiAAAaARQAbAQAOAeQAOAfAAApIAAAPQAAAmgNAdQgMAdgXARIAwAmIgfAcgAgwhjQgSAZAAAsIAAAQQAAAsARAaQASAYAfAAQAgAAARgXQARgZAAguIAAgPQAAgugRgZQgSgYgfABQgfAAgRAYg");
	this.shape_9.setTransform(-99.7,22.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF0000").s().p("Ah4CRQgLgGgBgPQgCgOAIgLQAKgMAagLQBAgZB6giQhQAChPAGQg3AEhqAMIhhALQg2AGgfAHQgbAHgLAAQgXAAgMgNQgGgIgBgKQgBgKAHgHQAGgGARgEQBTgQCZgPIBQgIQB2gMA7gCQAfgCA/AAIBoABQAYAAAKAHIADADQBOgXAwgUQgTgJgpgCQiwgIi1AJQgUABgJgDQgRgEgFgOQgCgJAEgJQAEgJAIgFQAMgIAXgCQAWgDAtAAIBQAAQBlAAAtACQBSADBAAKQAfAGANAIQAYAOACAXQABAUgRAPQgLAMgWAKQglASgxAOIhaAaIjJA3QgsAMgUAIQglAMgaAOQgSAKgJADQgHACgGAAQgHAAgHgEg");
	this.shape_10.setTransform(-107.9989,-30.8413);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-156.7,-45.7,313.4,91.5);


(lib.Анимация16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3333").s().p("A+YRtQgHgBgDgDQgFgGAIgGQAHgGAJAAQE6gZD1glQEpgtD8hHQDBg3DlhXQCcg8EAhtQGri0Dnh7QFii8DzjWQBihWBFhTQArgzBNhtIDRkkQA8hUAYg1QAUgvALg+QAFgZAEgkQgJALgJAIQgMAKgUANQghAXgSAIQgXALgsAJQgyAJgTAHIgTAHQgMADgIgCQgMgDgGgLQgGgLADgMQAHgSAcgKQAUgHAxgJQAsgJAXgKQASgIAVgPQAxghAWgmIASgeQANgRAQgBQAMAAAJAIQAJAJAAALQAAAIgEAJQAGAEAEAHQAFAMgGAbQgIAnAFA5IAKBhQAGBOgOBXQgDATgHAIQgIAIgNgBQgOgBgHgKQgIgKAAgQQAAgKAEgUQAHgpAAgpQAAgWgHhIQgIAdgJAYQgXA9g2BKIhfB9QgXAhglA3Ig7BZQjwFenBEUQizBujqBvQibBJkTB1QlRCQjKBKQktBukAA5QiYAjjBAbQh0ARjpAbQhCAIgkACIgnABQgiAAgegEg");
	this.shape.setTransform(0.0296,0.0266);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-195.6,-113.6,391.29999999999995,227.3);


(lib.Анимация15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3333").s().p("A+YRtQgHgBgDgDQgFgGAIgGQAHgGAJAAQE6gZD1glQEpgtD8hHQDBg3DlhXQCcg8EAhtQGri0Dnh7QFii8DzjWQBihWBFhTQArgzBNhtIDRkkQA8hUAYg1QAUgvALg+QAFgZAEgkQgJALgJAIQgMAKgUANQghAXgSAIQgXALgsAJQgyAJgTAHIgTAHQgMADgIgCQgMgDgGgLQgGgLADgMQAHgSAcgKQAUgHAxgJQAsgJAXgKQASgIAVgPQAxghAWgmIASgeQANgRAQgBQAMAAAJAIQAJAJAAALQAAAIgEAJQAGAEAEAHQAFAMgGAbQgIAnAFA5IAKBhQAGBOgOBXQgDATgHAIQgIAIgNgBQgOgBgHgKQgIgKAAgQQAAgKAEgUQAHgpAAgpQAAgWgHhIQgIAdgJAYQgXA9g2BKIhfB9QgXAhglA3Ig7BZQjwFenBEUQizBujqBvQibBJkTB1QlRCQjKBKQktBukAA5QiYAjjBAbQh0ARjpAbQhCAIgkACIgnABQgiAAgegEg");
	this.shape.setTransform(0.0296,0.0266);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-195.6,-113.6,391.29999999999995,227.3);


(lib.Анимация14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.PXL_20221004_093034308();
	this.instance.setTransform(19.2,-265.65,0.1325,0.1328);

	this.instance_1 = new lib.PXL_20221004_092924728();
	this.instance_1.setTransform(-416.8,-265.65,0.1328,0.1328);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-416.8,-265.6,833.6,531.3);


(lib.Анимация13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.PXL_20221004_093034308();
	this.instance.setTransform(19.2,-265.65,0.1325,0.1328);

	this.instance_1 = new lib.PXL_20221004_092924728();
	this.instance_1.setTransform(-416.8,-265.65,0.1328,0.1328);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-416.8,-265.6,833.6,531.3);


(lib.Анимация12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAwA9IAAh5IAbAAIAAB5gAhKA9IAAh5IAbAAIAAAnIAbAAQAPAAAKAFQALAFAGAKQAGAIAAAMQAAATgOALQgNAMgVAAgAgvAnIAbAAQAKAAAGgFQAEgFAAgJQAAgJgEgGQgGgFgKAAIgbAAg");
	this.shape.setTransform(335.925,1.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_1.setTransform(319.625,3.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAHgOQAIgPAMgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgHAOQgHAOgMAHQgNAIgRAAQgYAAgQgRgAgVgdQgHALgBATQABATAHALQAIALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgMAAgJALg");
	this.shape_2.setTransform(306,1.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_3.setTransform(293.225,4.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_4.setTransform(280.775,1.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_5.setTransform(269.475,1.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_6.setTransform(256.275,1.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_7.setTransform(242.775,1.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgtBGQgQgPgDgaIAcAAQACASAJAHQAIAIARAAQAQAAAKgNQAKgNAAgYIg4AAIAAgWIA4AAQgBgYgJgNQgKgNgRAAQgQAAgIAIQgJAIgCASIgcAAQADgbAQgPQAQgPAcAAQATAAAPAKQAPAJAJASQAIARAAAXIAAANQAAAXgIASQgIARgPAKQgPAJgTAAQgbAAgSgOg");
	this.shape_8.setTransform(229.2,-0.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgoA1QgLgKAAgQQAAgUAOgJQAPgKAaAAIAQAAIAAgIQAAgJgFgHQgFgFgKAAQgJAAgGAEQgGAFAAAHIgcAAQAAgJAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMALABATIAAA2QAAARAEAJIAAACIgcAAIgDgLQgNANgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAEQAGAGAIAAQAHAAAIgFQAHgEADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_9.setTransform(35.725,1.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_10.setTransform(23.775,1.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAYA9IAAgxIguAAIAAAxIgcAAIAAh5IAcAAIAAAzIAuAAIAAgzIAbAAIAAB5g");
	this.shape_11.setTransform(11.5,1.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_12.setTransform(-1.7,1.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_13.setTransform(-14.525,1.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQgBgSAIgOQAGgPAOgHQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAFQAAATgGAOQgIAOgNAHQgMAIgRAAQgYAAgQgRgAgUgdQgJALABATQgBATAJALQAHALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgNAAgHALg");
	this.shape_14.setTransform(-33.7,1.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgnA9IAAh5IBPAAIAAAWIg0AAIAABjg");
	this.shape_15.setTransform(-44.4,1.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAIgOQAGgPANgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgGAOQgIAOgMAHQgNAIgRAAQgZAAgPgRgAgUgdQgJALAAATQAAATAJALQAHALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgNAAgHALg");
	this.shape_16.setTransform(-56.45,1.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_17.setTransform(-68.625,1.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgkAuQgPgQgBgdIAAgCQAAgbAPgRQAPgRAYAAQAXAAANANQAOAMABAVIgaAAQgBgLgHgGQgHgHgKAAQgMAAgHAKQgHAKgBATIAAADQABAUAHAKQAHAKAMAAQAKAAAHgHQAHgFABgJIAaAAQgBALgHAKQgGAKgMAGQgLAFgOAAQgYAAgOgRg");
	this.shape_18.setTransform(-81.6,1.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_19.setTransform(-93.825,1.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAXA9IAAgpQgKADgMAAQgYAAgNgMQgNgLAAgXIAAglIAbAAIAAAlQAAAOAGAFQAGAFALAAQALAAALgCIAAg7IAbAAIAAB5g");
	this.shape_20.setTransform(-106.65,1.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_21.setTransform(-119.35,1.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_22.setTransform(-132.175,4.175);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_23.setTransform(-144.625,1.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_24.setTransform(-156.375,1.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AArA9IAAhQIghBQIgSAAIghhQIAABQIgcAAIAAh5IAjAAIAiBXIAkhXIAiAAIAAB5g");
	this.shape_25.setTransform(-171.35,1.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAIgOQAGgPANgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgGAOQgIAOgMAHQgNAIgRAAQgZAAgPgRgAgUgdQgJALAAATQAAATAJALQAHALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgNAAgHALg");
	this.shape_26.setTransform(-186.5,1.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_27.setTransform(-199.275,4.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_28.setTransform(-211.625,1.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_29.setTransform(-225.35,1.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AArA9IAAhQIghBQIgSAAIghhQIAABQIgcAAIAAh5IAjAAIAiBXIAkhXIAiAAIAAB5g");
	this.shape_30.setTransform(-240.65,1.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgoA1QgLgKAAgQQAAgUAOgJQAPgKAaAAIAQAAIAAgIQAAgJgFgHQgFgFgKAAQgJAAgGAEQgGAFAAAHIgcAAQAAgJAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMALABATIAAA2QAAARAEAJIAAACIgcAAIgDgLQgNANgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAEQAGAGAIAAQAHAAAIgFQAHgEADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_31.setTransform(-261.225,1.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_32.setTransform(-273.075,1.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_33.setTransform(-286.425,1.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQAAgSAGgOQAIgPANgHQAMgIAQAAQAZAAAOAQQAQAQABAaIAAAFQABATgIAOQgGAOgOAHQgMAIgRAAQgZAAgPgRgAgVgdQgHALAAATQAAATAHALQAIALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgMAAgJALg");
	this.shape_34.setTransform(-299.85,1.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_35.setTransform(-313.625,1.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQgBgSAIgOQAGgPAOgHQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAFQAAATgGAOQgIAOgNAHQgMAIgRAAQgYAAgQgRgAgUgdQgJALABATQgBATAJALQAHALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgNAAgHALg");
	this.shape_36.setTransform(-326.2,1.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_37.setTransform(-338.575,-0.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-347.5,-15.8,695,31.6);


(lib.Анимация11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAwA9IAAh5IAbAAIAAB5gAhKA9IAAh5IAbAAIAAAnIAbAAQAPAAAKAFQALAFAGAKQAGAIAAAMQAAATgOALQgNAMgVAAgAgvAnIAbAAQAKAAAGgFQAEgFAAgJQAAgJgEgGQgGgFgKAAIgbAAg");
	this.shape.setTransform(335.925,1.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_1.setTransform(319.625,3.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAHgOQAIgPAMgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgHAOQgHAOgMAHQgNAIgRAAQgYAAgQgRgAgVgdQgHALgBATQABATAHALQAIALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgMAAgJALg");
	this.shape_2.setTransform(306,1.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_3.setTransform(293.225,4.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_4.setTransform(280.775,1.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_5.setTransform(269.475,1.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_6.setTransform(256.275,1.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_7.setTransform(242.775,1.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgtBGQgQgPgDgaIAcAAQACASAJAHQAIAIARAAQAQAAAKgNQAKgNAAgYIg4AAIAAgWIA4AAQgBgYgJgNQgKgNgRAAQgQAAgIAIQgJAIgCASIgcAAQADgbAQgPQAQgPAcAAQATAAAPAKQAPAJAJASQAIARAAAXIAAANQAAAXgIASQgIARgPAKQgPAJgTAAQgbAAgSgOg");
	this.shape_8.setTransform(229.2,-0.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgoA1QgLgKAAgQQAAgUAOgJQAPgKAaAAIAQAAIAAgIQAAgJgFgHQgFgFgKAAQgJAAgGAEQgGAFAAAHIgcAAQAAgJAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMALABATIAAA2QAAARAEAJIAAACIgcAAIgDgLQgNANgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAEQAGAGAIAAQAHAAAIgFQAHgEADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_9.setTransform(35.725,1.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_10.setTransform(23.775,1.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAYA9IAAgxIguAAIAAAxIgcAAIAAh5IAcAAIAAAzIAuAAIAAgzIAbAAIAAB5g");
	this.shape_11.setTransform(11.5,1.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_12.setTransform(-1.7,1.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_13.setTransform(-14.525,1.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQgBgSAIgOQAGgPAOgHQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAFQAAATgGAOQgIAOgNAHQgMAIgRAAQgYAAgQgRgAgUgdQgJALABATQgBATAJALQAHALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgNAAgHALg");
	this.shape_14.setTransform(-33.7,1.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgnA9IAAh5IBPAAIAAAWIg0AAIAABjg");
	this.shape_15.setTransform(-44.4,1.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAIgOQAGgPANgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgGAOQgIAOgMAHQgNAIgRAAQgZAAgPgRgAgUgdQgJALAAATQAAATAJALQAHALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgNAAgHALg");
	this.shape_16.setTransform(-56.45,1.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_17.setTransform(-68.625,1.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgkAuQgPgQgBgdIAAgCQAAgbAPgRQAPgRAYAAQAXAAANANQAOAMABAVIgaAAQgBgLgHgGQgHgHgKAAQgMAAgHAKQgHAKgBATIAAADQABAUAHAKQAHAKAMAAQAKAAAHgHQAHgFABgJIAaAAQgBALgHAKQgGAKgMAGQgLAFgOAAQgYAAgOgRg");
	this.shape_18.setTransform(-81.6,1.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_19.setTransform(-93.825,1.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAXA9IAAgpQgKADgMAAQgYAAgNgMQgNgLAAgXIAAglIAbAAIAAAlQAAAOAGAFQAGAFALAAQALAAALgCIAAg7IAbAAIAAB5g");
	this.shape_20.setTransform(-106.65,1.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_21.setTransform(-119.35,1.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_22.setTransform(-132.175,4.175);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_23.setTransform(-144.625,1.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAIAMABQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_24.setTransform(-156.375,1.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AArA9IAAhQIghBQIgSAAIghhQIAABQIgcAAIAAh5IAjAAIAiBXIAkhXIAiAAIAAB5g");
	this.shape_25.setTransform(-171.35,1.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgoAuQgQgRAAgdIAAAAQAAgSAIgOQAGgPANgHQANgIAQAAQAZAAAPAQQAPAQABAaIABAFQgBATgGAOQgIAOgMAHQgNAIgRAAQgZAAgPgRgAgUgdQgJALAAATQAAATAJALQAHALANAAQAOgBAIgKQAHgLAAgUQAAgTgHgKQgJgLgNAAQgNAAgHALg");
	this.shape_26.setTransform(-186.5,1.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_27.setTransform(-199.275,4.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_28.setTransform(-211.625,1.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_29.setTransform(-225.35,1.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AArA9IAAhQIghBQIgSAAIghhQIAABQIgcAAIAAh5IAjAAIAiBXIAkhXIAiAAIAAB5g");
	this.shape_30.setTransform(-240.65,1.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgoA1QgLgKAAgQQAAgUAOgJQAPgKAaAAIAQAAIAAgIQAAgJgFgHQgFgFgKAAQgJAAgGAEQgGAFAAAHIgcAAQAAgJAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMALABATIAAA2QAAARAEAJIAAACIgcAAIgDgLQgNANgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAEQAGAGAIAAQAHAAAIgFQAHgEADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_31.setTransform(-261.225,1.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_32.setTransform(-273.075,1.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_33.setTransform(-286.425,1.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQAAgSAGgOQAIgPANgHQAMgIAQAAQAZAAAOAQQAQAQABAaIAAAFQABATgIAOQgGAOgOAHQgMAIgRAAQgZAAgPgRgAgVgdQgHALAAATQAAATAHALQAIALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgMAAgJALg");
	this.shape_34.setTransform(-299.85,1.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_35.setTransform(-313.625,1.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgoAuQgPgRAAgdIAAAAQgBgSAIgOQAGgPAOgHQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAFQAAATgGAOQgIAOgNAHQgMAIgRAAQgYAAgQgRgAgUgdQgJALABATQgBATAJALQAHALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgNAAgHALg");
	this.shape_36.setTransform(-326.2,1.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_37.setTransform(-338.575,-0.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-347.5,-15.8,695,31.6);


(lib.Анимация10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.Растровоеизображение6();
	this.instance.setTransform(91.95,-283.5,0.83,0.83);

	this.instance_1 = new lib.PXL_20221004_092747824();
	this.instance_1.setTransform(-423.05,-400.5,0.2003,0.2003);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0033").s().p("AFZZTIgtAAIgsAAIgHgBIgHgBIgHgCIgGgCIgGgCIgBgBIgHAAIgGgBIgGgBIgFgCIgGgCIgFgCIgCgBIgHAAIgIgBIgHgBIgLgCIgFgCIgGgCIgHgCIgHgCIgEgCIgFgCIAAAAIgEgCIgIgBIgHgBIgGgBIgFgBIgFgCIgHgDIgBAAIgIgBIgIgBIgHgCIgHgBIgHgDIgHgDIgFgCIgFgDIgFgCIgBAAIgHgBIgGAAIgGgBIgLgCIgGgBIgFgCIgFgCIgCAAIgIgBIgHgBIgIgBIgKgCIgGgCIgGgCIgGgBIgLAAQgJAAgKgCQgJgBgJgEIgQgEIgNgDIgNgEIgIAAIgHgBIgIAAIgGAAIgMgCIgHgBIgEgCIgFgCIgDgBIgIAAIgHgBIgHAAIgGAAIgMgBIgHgBIgFgBIgFgCIgFgCIgGgBIgGgBIgGgBIgGgCIgEgBIgEgCIgEgDIgIAAIgHAAIgHAAIgNgBIgMgCIgMgDIgFgCIgDAAIgIgBIgHAAIgIAAIgMgBIgMgBIgMgCIgFgCIgEgCIgCgBIgHAAIgIAAIgGAAIgGAAIgGgBIgGgBIgHgCIgHgDIgDgDIgFAAIgGgBIgGgCIgFgCIgFgDIgHgBIgIAAIgHAAIgHgCIgHgBIgGgCIgGgDIgBAAIgFAAIgGgBIgFAAIgGAAIgLgCIgGgBIgHgCIgFgEIgIAAIgHAAIgHgBIgGgBIgGgBIgGgDIgFgDIgHAAIgGgBIgGgBIgGgBIgGgCIgEgDIgFgCIgEgDIgEgCIgEgDIgEgBIgEgBIgGgCIgFgCIgGgDIgEgBIgFgBIgFgCIgFgCIgFgDIgEgDIgFgDIgFgDIgJgHIgDgDIgCgEIgEgBIgEgCIgEgDIgDgCIgFgBIgFgCIgEgDIgEgDIgGgEIgGgEIgEgCIgEgCIgFgEIgEgEIgHgEIgHgCIgHgCIgFgDIgBAAIgDgDIgEgCIgFgEIgGgEIgFgEIgFgEIgFgBIgGgDIgHgDIgDgCIgDgDIgGgDIgFgDIgGgCIgHgCIgGgDIgFgDIgEgEIgDgEIgDgFIgHgDIgGgDIgGgDIgFgDIgEgDIgEgDIgEgEIgFgEIgEgFIgDgCIgBgBIgEgEIgDgDIgEgCIgFgCIgEgDIgEgDIgEgEIgGgDIgFgEIgEgEIgEgEIgDgEIgDgEIgEgEIgDgEIgFgEIgEgCIgFgCIgFgDIgEgDIgDgEIgDgFIgDgFIgCgFIgDgDIgEgEIgFgGIgFgEIgEgFIgFgEIgEgFIgEgDIgEgEIgDgFIgEgGIgEgGIgDgGIgEgEIgDgEIgCgEIgCgFIgCgGIgCgCIgDgDIgEgEIgDgEIgCgEIgDgGIgCgHIgDgGIgCgFIgDgGIgDgFIgDgGIgGgLIgDgGIgCgGIgDgGIgCgFIgDgFIgCgFIgCgFIgBgGIgBgLIgDgGIgDgGIgCgGIgBgHIAAgHIgBgHIgBgEIgBgCIgEgFIgDgEIgDgGIgCgFIgCgGIAAgFIgBgFIgBgHIAAgHIgBgFIgCgFIgCgFIgBgFIgBgGIgBgFIgBgGIAAgHIgCgGIgCgGIgBgFIgCgGIgCgGIgDgGIgCgGIgCgHIgBgHIgBgNIgBgGIgBgDIgCgGIgCgGIgBgGIgCgNIgBgGIAAgHIgDgGIgCgGIgBgHIgBgHIgBgHIgCgDIgDgHIgCgGIgBgGIgBgHIgBgHIAAgGIAAgHIgDgGIgCgGIgBgGIgBgHIgBgGIgCgHIgDgNIgCgGIgBgFIgBgFIgBgCIgDgFIgBgDIgBgCIgBgGIgBgFIgBgIIgBgPIAAgHIgBgHIgCgHIgCgHIgCgGIgBgGIgBgHIgBgGIAAgGIAAgOIAAgHIAAgGIgBgHIgFgXIgHgeQgDgOgBgPIgBgcIgBgRIgBgFIgCgGIgCgGIgBgEIgBgFIAAgEIgBgEIgEgMIgEgNQgBgKAAgLIgBgOIAAgNIAAgNIgBgGIgCgGIgBgHIgBgGIgDgOIAAgHIAAgHIgBgHQgLgnABgoIABhaIAAhMIAAgJIABhaQAAgIACgHIACgFIACgEIAEgFIADgGIAEgGIABgGIAAgFIABgGIACgFIACgFIACgGIAAgBIABgIIABgIIABgHIACgLIACgGIADgGIAAgBIABgHIAAgIIABgGIABgGIACgFIACgFIADgFIABgEIACgGIACgGIADgFIAAgHIABgGIABgGIABgHIADgMIABgHIACgGIABgEIABgFIAAgBQgCgBgDABIgFABIgEABIgCAAIgFgBIgFgBIgFgBIgFgDIgEgDIgEgDIgDgEIgDgEIgDgFIgBgFIgBgFIgBgFIABgGIABgFIABgFIACgFIACgFIAEgFIABgCIACgFIACgFIADgFIADgGIACgFIACgGIADgFIACgGIADgFIADgFIADgEIADgDIADgEIABgEIACgFIACgGIADgGIAEgFIADgEIADgFIABgFIACgFIABgFIACgEIADgDIADgFIADgEIADgFIAEgFIADgEIADgEIABgCIACgGIADgGIADgFIACgGIACgFIACgFIADgEIABgFIAAgFIACgGIACgFIAEgFIADgEIAEgHIADgGIADgEIACgEIADgEIAEgEIADgEIAFgDIAEgDIACgCIADgBIAFgBIAGgBIAGgBIACgBIABgBIAEgFIAEgFIAFgEIAFgEIACgCIADgFIAEgEIAEgFIAIgIIAFgEIAEgDIAFgEIABAAIADgFIADgFIADgFIAIgJIAEgFIAEgFIADgDIACgDIADgFIADgDIAEgDIAEgEIAEgDIAFgEIAEgEIAFgEIAFgFIAJgKIAFgEIAEgGIAEgFIAEgFIAFgEIAGgEIAFgEIAKgIIAGgEIAEgEIAFgEIAFgEIAEgEIADgEIAEgEIAFgGIAEgEIAFgDIAFgDIAEgEIAEgDIAEgEIAFgFIAGgEIAGgFIAEgDIAEgDIAEgFIAEgDIAEgDIAFgCIAFgDIAEgEIAEgEIADgDIAFgDIAEgDIAEgEIADgEIAEgEIAFgDIAFgDIAFgFIAAAAIAEgFIAEgFIAEgFIAFgDIAGgDIAGgDIAEgDIgBAAIAEgEIAEgDIAFgGIADgFIABgBIAEgEIAFgDIAEgDIAFgDIADgEIADgEIAEgDIAEgDIAGgDIAGgDIADgCIAEgFIAGgEIAEgFIAFgEIAEgFIADgDIAEgDIAFgDIADgFIAEgEIAEgFIAEgFIAFgEIAEgFIAGgEIAEgFIADgEIAFgDIAEgCIAFgDIAEgDIAFgDIAGgFIAEgEIAEgEIAEgDIADgCIAEgFIAEgEIAEgFIAFgEIAEgFIAEgEIAEgEIAFgDIAGgDIAHgDIACgCIAFgEIAEgFIAEgFIAGgEIAGgEIADgCIAFgFIADgFIAEgFIAEgFIAEgFIAFgEIAFgDIAHgDIAGgDIACgCIAFgEIAEgEIAGgEIAFgEIALgGIAFgFIAFgFIADgDIAEgDIAFgDIAEgCIAEgDIAEgCIAEgCIAFgCIAEgBIAEgBIABgBIAEgFIAFgEIAGgDIAFgCIAGgCIAFgBIAFgBIADgCIAFgDIAGgCIAFgCIAEAAIAIgBIAHgBIABAAIAEgCIAEgCIAFgCIAEgBIAGgBIAGgBIAGAAIAGAAIABgBIAGgCIAFgCIAIgCIAHgCIAFgCIAFgCIAGgCIAFgBIAOgCIAHgBIAAAAIAGgCIAFgCIAFgCIAIgBIAHgBIAFgBIAEAAIAHAAIAIAAIAFgCIAGgDIAFgBIAIgBIAHgBIAEgBIAFAAIAEAAIAFAAIAFAAIAFgDIAGgCIAGgCIAGgCIAKgEIALgDQAKgCAKAAIAPgBIANAAIAFAAQANgGAPgBQATgCATAAIAmAAIAmAAIAfAAQARgHASgBIAsgBIArAAIArAAQAVgBAVAFIAMAEIAAABIAHAAIAIABIAGACIAGACIAFADIAFADIAFAEIAFADIAGACIAFABIAFACIAFACIAEADIAFABIAFAAIAGACIAFACIAFAEIAGAAIAGABIAFACIAFACIAFADIAIABIAHAAIAHAAIAGABIAGACIAFACIAEACIAEADIAEABIAEABIAHADIAGACIABABIAGAAIAGABIAGABIAFACIACAAIAEACIAFACIACABIAHAAIAHABIAIABIAEAAIAFABIAEACIAEACIADADIAGAAIAGABIAGACIAFADIAFADIAGACIAFACIAEACIAEADIAHABIAHACIAFABIAEADIAEACIAFABIAGABIAFABIAGADIAEADIAGABIADAAIACABIAFABIAFACIAFADIAFADIAFAEIADACIABABIADACIAHADIAEADIAFADIAGACIAHADIAHADIAFADIAJAGIAFADIAEAEIAGAEIAFACIAEADIAEACIAEAEIAEACIAFADIACAAIAGACIAGACIAFADIAFADIAEAEIACACIACADIADAEIAFACIAFADIAFACIAAAAIADACIADACIAEABIADADIAAAAIAAAAIAHADIAIADIAGAEIAGAFIAFAFIAEACIAEACIAEADIABAAIAGADIAHADIAEADIAEAEIAEADIAFAFIAFAEIAFAEIAGADIAGADIAFAEIAFAFIAFAEIAFAEIAEAFIAFAFIAFAEIAEAFIAFAEIACADIAEACIAEADIAFACIAEADIAFAEIAEADIAFAEIAFADIAEAEIAEAEIACACIABACIADAEIADACIAGADIAEADIAFADIAFACIAEACIABAAIAFADIAFAEIAEAFIAEAFIADACIADACIADACIAEACIAEACIAGADIAFAEIAFAEIAFAFIAFAFIAFAEIAGACIAGAEIAFAEIAFAEIAEAEIAEADIAEADIAFAEIAEADIAEAEIADAEIADAEIADADIADAFIAFAEIAFACIAEACIAGAEIAGAEIAEAEIAEADIADAEIABABIBKDEIAAAAIgDgDIgFgGIgEgFIgFgFIgDgGIgEgGIgEgGIgFgFIgEgEIgEgFIgEgFIgFgGIgEgFIgDgFIgCgFIgEgEIgFgFIgEgFIgFgEIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgGgDIgGgEIgFgFIgEgDIgDgEIgEgEIgCgCIgFgCIgFgCIgFgDIgEgDIgEgEIgEgEIgEgEIgDgEIgEgEIgEgEIgDgFIgBgBIgDgCIgDgCIgFgEIgFgFIgDgCIgGgDIgGgDIgGgDIgEgFIgEgEIgEgEIgDgDIgDgCIgFgCIgFgCIgFgDIgFgEIgFgCIgEgDIgFgCIgEgEIgEgEIgDgFIgBAAIgFgDIgFgDIgGgDIgGgDIgFgDIgEgEIgEgFIgEgEIgDgEIgDgEIgFgDIgEgDIgEgEIgGgDIgGgEIgGgEIgEgDIgEgCIgDgEIgDgEIgEgDIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgHgDIgFgEIgFgFIgEgDIgDgEIgEgEIgCgBIgEgCIgGgCIgFgDIgFgEIgGgCIgFgDIgFgDIgEgEIgDgFIgHgCIgGgCIgGgEIgFgEIgEgCIgDgCIgGgCIgFgCIgFgCIgEgDIgFgDIgDgDIgEgDIgCgFIgGgCIgGgDIgGgEIgGgDIgGgEIgFgCIgEgCIgFgDIgEgDIgDgDIgDgDIgCgCIgDgDIgHgDIgHgDIgGgCIgGgCIgFgDIgFgDIgEgCIgEgCIgFgDIgFgEIgEgEIgBAAIgGgBIgHgCIgFgBIgEgDIgFgCIAAAAIAAgBIgBAAIABABIgGgBIgHgCIgFgCIgFgCIgFgDIgFgBIgFgBIgGgCIgFgBIgEgDIgFgDIgBAAIgGgDIgHgDIgBAAIgHgCIgGgBIgFgCIgEgCIgEgCIgHgBIgHAAIgHgCIgHgBIgEgCIgCAAIgGgDIgDAAIgHgBIgGgBIgGgBIgGgCIgGgCIgFgDIgGgCIgGgCIgFgCIgFgCIAAAAIgFgBIgFAAIgIAAIgHgCIgIgBIgFgCIgEgCIgFgDIAAAAIgGgBIgHgBIgFgCIgFgCIgEgDIgBAAIAAAAIAAAAIAAAAIgGgBIgHgBIgFgCIgFgDIgEgCIgHgBIgGgCIgDgBIgCgBIgFgCIgFgDIgEgEIgEgEIgBAAIgHgBIgHgBIgFgBIgGgDIgFgCIgPAAIgWAAIgfAAIgkAAIgcAAIgOABIgTAGQgMADgNAAIgggBIgkAAIglAAQgOAAgNACIgGACIgFABIgEACIgGABIgGABIgHAAIgGAAIgIAAIgHAAIgIABIgHAAIgBAAIgGADIgGACIgEACIgEABIgEACIgFADIgEACIgHABIgHABIgHABIgHAAIgFAAIgFAAIgGAAIgGADIgGADIgHABIgGABIgHABIgHAAIgIAAIgHAAIgFADIgFACIgFABIgGACIgGAAIgHABIgIAAIAAAAIgHADIgGADIgGACIgFABIgGACIgFACIgFACIgGABIgHABIgIABIgHABIgFACIgFADIgGABIgGACIgHAAIgGABIgEACIgFACIgEACIgGABIgGACIgDACIgDACIgBABIgEADIgEADIgFADIgFABIgFACIgFABIgGAEIgEAEIgEAEIgEADIgEAEIgFADIgFADIgFADIgFADIgCADIgGAEIgFAEIgFAFIgGADIgGACIgCACIgEAGIgFAGIgEAGIgFAEIgEADIgFAEIgFADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgFACIgEADIgFABIgBABIgEAEIgEAFIgEADIgEAGIgEAFIgEAEIgFADIgEADIgCADIgGAEIgEAEIgEAEIgFADIgEACIgEADIgEACIgDADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgEAGIgFAFIgDAEIgFADIgFAEIgEAEIgEAEIgEAEIgEAEIgEAEIgGAFIgEADIgEAEIgCABIgCACIgIADIgCADIgDADIgFAFIgFADIgGAEIAAAAIgEAGIgEAEIgFAEIgEAFIgFAEIgEADIgBAAIAFgDIgGAFIgFAEIgGADIgDACIgFAFIgEAGIgFAEIgEAEIgFADIgFAEIgEAEIgEADIgEAEIgFAEIgFAEIgBABIgDAEIgEAEIgEAEIgFADIgEACIgBAAIgFACIgFAFIgFAEIgGAFIgGAEIgFAFIgGAFIgEAEIgFADIgEAEIgFADIAAABIgBAAIgCADIgDADIgEAGIgFAFIgFAEIgFAEIgFADIgGAFIgFAEIgGAEIgFAEIgFAEIgEAEIgIAKIgJAKIgBAAIgJAKIgJAJIgKAIIgJAIIgEAFIgFAGIgEAFIgFAFIgEAGIgCADIgEAGIgEAGIgFAFIgDAEIgEADIgFADIgEADIgFAGIgFAFIgDAEIgDAEIgEAEIgFAFIgFAEIgCADIgDADIgEAEIgFAEIgCAFIgDAEIgEAGIgEAFIgFAFIgFAFIgDAEIgCAEIgCAFIgDAEIgDAEIgEAFIgDAEIgEAFIgDAGIgEAFIgEAGIABAOIAAANIgBAMIAAANIgCAMQgCAJgEAIIgBAHIAAAGIAAAGIgBAGIgBAGIgBAGIgBAFIgCAFIgDAGIAAAKIgBAMIgCAMIgDAMIgEAMIgJASIgBAGIgCAHIgCAHIgCAGIgBAHIgBAHIAAAGIgBAHIgBAGIgBAGIgCAFIgCAFIgCAFIgCAFIgBAEIgDAHIgDAGIAAAFIgBAFIAAAHIgCAGIgBAHIgCAFIgDAGIAAABIgBAHIAAAGIgBAHIgBAHIgCAGIgCAFIgCAGIAAADIgCAIIgBAHIgCAIIgCAGIgDAGIgEAFIgCAEIgCAEIAAAzIAABBIAABDIAABIQAAARABASIACAGIABAHIACAHIABAHIABAGIABAFIAAAGIABAHIAAAHIADAPIADAOIACAPIAAAQIAAAOIABAVIABACIACAFIACAFIABAGIACAEIAAAFIACAGIACAGIABAGIABAFIABAGIAAABIABAFIABAGIAAAGIABAGIAAAHIAAAGIAAAGIAAAHIABAGIAEAVIAFAUIAEAUQADANAAANIABAVIAAAPIACAFIACAGIACAFIABAFIABAFIABAHIAAAHIAAAHIABAHIAAAHIABADIADAFIACAFIABAGIABAFIACAGIABAGIACAGIABAGIACAGIABAGIABAGIABAGIAAABIACAFIACAFIABAFIABAFIABAHIAAAGIABAGIAAAGIAEAHIACAHIABAFIABAGIABAGIABAHIAAAAIACAFIACAFIABAEIABAGIABAHIABAIIAAAHIABACIACAFIACAGIACAFIABAHIABAHIAAAHIABAHIAAABIADAGIACAGIACAHIACAGIACAHIADAHIABAHIABAHIABAHIABAHIABACIADAEIABAFIABAFIABAFIABAFIAAAFIABAGIAAAGIADAEIADAFIACAGIACAFIADAFIABAGIACAGIABAHIABAGIAAAGIADAGIACAFIACAGIABAFIABAGIAAAGIAGALIAGANIAGALIAFAKIAGANIAFAMIAFAGIADAEIAEAEIACAEIADAFIABAFIACADIADAEIAAAAIACAEIADAEIADAEIACAFIAEADIAEAFIAFAEIAEAFIAFAEIAEAFIAFAEIAFAGIADAEIADAEIAEAEIAAABIAFADIAFAEIAFAEIAEAEIADAEIAEAEIAEAEIADAEIAEAFIABAAIAEADIAEADIAEAEIAFADIAFADIAFADIAEADIAEADIAEAEIAEADIAFAFIAEAFIAGAEIADACIACABIACABIAHADIAHACIAGAEIAFADIAEAFIAEAFIAEABIAEACIAGAEIAHAEIAEACIADADIAGACIAGABIAFADIAFAEIAEADIAFAEIAFAEIAEADIAFADIAEABIAGACIAGADIAGADIAFADIAFADIAFAEIAFAEIAFADIAFADIAFACIAEADIAGAEIAFACIAEACIAFACIAFAEIAGACIAFADIAFADIAEAEIADAEIAEAFIADACIADACIAEABIAGACIAGACIAFADIAGABIAHACIAGACIAFADIAGADIAFADIAGADIAFABIAFAAIAGABIAFABIAFACIAGACIAEACIAHAAIAIABIAFAAIAGABIAFABIAFACIAFACIAFACIAAAAIAFABIAGAAIAGAAIAFABIAGABIAGABIAFABIAGACIAFACIAGABIAHAAIAGAAIAGABIAFABIAFABIAGACIAEACIAFACIABAAIAGABIAEABIAGACIAFACIAGADIAAAAIAIAAIAHAAIAHABIAGAAIAGABIAHACIAHACIAGADIAGAAIAFAAIAFAAIAFAAIAHAAIAGAAIAHABIAGABIAHABIAHACIAGADIABAAIAIABIAHAAIAIAAIAHAAIAIABIAIABIAHABIAGACIAFACIAGACIACACIAGABIAGABIAGABIAEABIABABIAGACIABAAIAIAAIAHAAIAHABIAGAAIAHABIAGABIAGABIAFABIAFACIABAAIABABIAAgBIAAABIACAAIgBAAIABAAIABABIABAAIAGAAIAHABIAHAAIAGAAIAHABIAHAAIAGACIAHABIAFACIAEACIAFABIAFABIAFABIAGABIAFACIAGACIAHACIAFAAIAGAAIAFAAIAGABIAGAAIAGABIAGABIAFACIAFACIAFACIABAAIAHABIAGAAIAHABIAHABIAGABIAFACIAFADIACAAIAHAAIAGABIAHABIAHABIAHABIAFACIAGACIAFACIAGADIAFADIAHABIAGACIAHABIAGABIAGABIAGABIAFACIAFACIABABIAGAAIAGABIAGAAIAGABIAFACIAGACIAFADIAEADIADAAIAFACIAFACIAFACIABAAIAHAAIAGABIAGAAIAHABIAGACIAHACIAGADIADAAIAGABIAHABIAGABIAFACIAFACIAFACIAQAAIAPAAIAQAAIAQAAIAPAAIAQAAIAPAAIAQAAIAPAAIAOAAIAPAAIAOgBIACAAIAGgDIAFgCIAHgBIAHgBIAIgBIAGAAIAGAAIAGAAIAGAAIAGAAIAHAAIAGgBIAFgDIAGgCIAFgBIAGgBIAGgBIAGAAIAGgBIAFAAIAFAAIABAAIAGgDIAGgCIAGgCIAEgDIAFgCIAFgDIAFgCIAFgDIAFgCIAFgCIAGgCIAFgCIAEgCIAEgCIAGgDIAGgDIAGgDIAHgDIAHgDIAFgDIAGgCIABgBIAFgFIAFgEIAGgEIAFgCIAGgCIAFgCIAGgBIAGgEIAGgEIAGgDIAGgEIAHgDIACgDIAFgEIAGgFIAGgCIAFgCIAGgCIAGgCIAAgBIAEgDIgDADIAFgEIAEgDIAFgEIACgCIADgEIAEgEIAEgEIAFgCIAGgDIAGgCIADgDIADgBIAEgCIAFgCIABgBIAEgEIAEgDIAFgDIAFgDIAGgDIAGgCIAHgCIAGgEIAHgDIAGgEIAHgDIAEgEIAFgDIAFgCIAFgCIADgDIADgCIAFgEIAEgEIAGgDIAEgBIAEgCIAEgDIAEgDIAFgDIAEgDIADgCIAEgFIAEgEIAFgFIAGgEIAGgEIAFgEIAGgDIAGgCIACgDIAEgEIADgEIADgEIAEgDIAEgDIAEgDIAGgDIAFgDIAGgDIAFgDIAEgDIAEgDIACgBIAEgGIAFgFIAEgEIAFgDIAFgCIAGgCIAEgEIAFgDIAFgFIACgDIACgEIADgEIAEgEIAEgEIAEgEIAFgEIAEgDIAHgEIAGgEIACgDIACgDIAEgGIAEgFIAEgFIAEgDIAEgDIAFgCIACgEIADgEIADgEIACgFIAEgDIAEgEIADgEIAEgEIADgEIAEgEIAEgFIAEgDIADgHIADgFIAEgFIAFgFIABgCIACgFIADgFIACgFIADgEIAEgDIAEgEIAEgFIADgGIADgGIADgGIADgFIAEgGIADgFIAEgGIAEgFIAFgEIABgCIACgFIADgFIAAgCQBKgkBIgmIgDAEIgBAEIgCAFIgDAFIgEAFIgEAFIgEAEIgEAEIgDAFIgDAFIgCAFIgCAEIgDAFIgGALIgDAFIgEAEIgEAEIgDAEIgEAEIgCAEIgDAEIgCAEIgCAEIgDADIgCADIgBACIgCAFIgCAFIgFAGIgEAGIgEAEIgEAEIgDAFIgDAFIgCAFIgDAEIgCAFIgGALIgDAFIgEAEIgEAEIgEAFIAAAAIgCAFIgCAEIgFAGIgEAGIgFAGIgCAFIgCAFIgDAEIgEAEIgEAEIgEADIgBABIgEAFIgEAFIgEAEIgEAEIgEAEIgEAHIgDAHIgDAEIgEAFIgDADIgFADIgEADIgFADIgBACIgDAEIgCAEIgDAEIgDADIgFAEIgFAEIgFADIgFAEIgFADIgDACIgDADIgEAGIgFAGIgFAFIgDAEIgJAHIgEADIgFAFIgGAEIgEACIgDAEIgEAFIgEAEIgFADIgFACIgFACIgEAEIgFADIgFADIgEACIgEADIgEABIgDACIgFAGIgFAFIgEAFIgEAEIgFADIgHADIgDACIgDABIgFADIgEADIgDAFIgEAEIgFAEIgFAEIgFADIgFAEIgFADIgFAEIgFADIgHADIgGADIgCACIgEAEIgEAEIgEADIgGACIgGADIgDACIgEACIgKAHIgKAFIgJAFIgLAEIgMAFIgBABIgDADIgEADIgEADIgGADIgGACIgDADIgDACIgFACIgFACIgEAEIgEAEIgLAIIgLAIIgLAHIgLAEIgFACIgFAFIgGAEIgFADIgMAHIgLAHIgLAGIgFACIAAABIgHACIgGACIgEAEIgEADIgEADIgFADIgFACIgFACIgGACIgEACIgEACIgGADIgGADIgMAGIgMAGIgNAEIgEADIgGADIgHACIgEADIgEADIgGACIgGACIgGACIgHADIgGADIgGABIgGABIgGABIgGABIgIAAIgHABIgEACIgLADIgKACIgSABIgLABIgMAAIgMAAQgTAIgVAAIgxABIgsAAgAAMYTIgBAAIgBAAIACAAgAAIXEIABAAIgCAAgAkAWXIACAAIgCgBIgBAAIABABgA0Mo2IAAABIAAgBIAAgBIAAABgAxytnIgBACIABgBIABgCIgBABgAxet/IAAAAIABgBIgBABgAtsy9IABAAIAAAAIgBAAgAJP2OIABAAIgBAAgAkx3RIABAAIABgBIgBAAIgBABgAFY3XIABAAIgBgBIAAABgAE93gIAAAAIgBgBIAAAAIABABgAAj5GIABAAIACgBIgBAAIgCABgAAn5HIAAAAIABAAIgBAAg");
	this.shape.setTransform(255.8458,-121.2023);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-423,-400.5,846.1,801.1);


(lib.Анимация9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.Растровоеизображение6();
	this.instance.setTransform(91.95,-283.5,0.83,0.83);

	this.instance_1 = new lib.PXL_20221004_092747824();
	this.instance_1.setTransform(-423.05,-400.5,0.2003,0.2003);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0033").s().p("AFZZTIgtAAIgsAAIgHgBIgHgBIgHgCIgGgCIgGgCIgBgBIgHAAIgGgBIgGgBIgFgCIgGgCIgFgCIgCgBIgHAAIgIgBIgHgBIgLgCIgFgCIgGgCIgHgCIgHgCIgEgCIgFgCIAAAAIgEgCIgIgBIgHgBIgGgBIgFgBIgFgCIgHgDIgBAAIgIgBIgIgBIgHgCIgHgBIgHgDIgHgDIgFgCIgFgDIgFgCIgBAAIgHgBIgGAAIgGgBIgLgCIgGgBIgFgCIgFgCIgCAAIgIgBIgHgBIgIgBIgKgCIgGgCIgGgCIgGgBIgLAAQgJAAgKgCQgJgBgJgEIgQgEIgNgDIgNgEIgIAAIgHgBIgIAAIgGAAIgMgCIgHgBIgEgCIgFgCIgDgBIgIAAIgHgBIgHAAIgGAAIgMgBIgHgBIgFgBIgFgCIgFgCIgGgBIgGgBIgGgBIgGgCIgEgBIgEgCIgEgDIgIAAIgHAAIgHAAIgNgBIgMgCIgMgDIgFgCIgDAAIgIgBIgHAAIgIAAIgMgBIgMgBIgMgCIgFgCIgEgCIgCgBIgHAAIgIAAIgGAAIgGAAIgGgBIgGgBIgHgCIgHgDIgDgDIgFAAIgGgBIgGgCIgFgCIgFgDIgHgBIgIAAIgHAAIgHgCIgHgBIgGgCIgGgDIgBAAIgFAAIgGgBIgFAAIgGAAIgLgCIgGgBIgHgCIgFgEIgIAAIgHAAIgHgBIgGgBIgGgBIgGgDIgFgDIgHAAIgGgBIgGgBIgGgBIgGgCIgEgDIgFgCIgEgDIgEgCIgEgDIgEgBIgEgBIgGgCIgFgCIgGgDIgEgBIgFgBIgFgCIgFgCIgFgDIgEgDIgFgDIgFgDIgJgHIgDgDIgCgEIgEgBIgEgCIgEgDIgDgCIgFgBIgFgCIgEgDIgEgDIgGgEIgGgEIgEgCIgEgCIgFgEIgEgEIgHgEIgHgCIgHgCIgFgDIgBAAIgDgDIgEgCIgFgEIgGgEIgFgEIgFgEIgFgBIgGgDIgHgDIgDgCIgDgDIgGgDIgFgDIgGgCIgHgCIgGgDIgFgDIgEgEIgDgEIgDgFIgHgDIgGgDIgGgDIgFgDIgEgDIgEgDIgEgEIgFgEIgEgFIgDgCIgBgBIgEgEIgDgDIgEgCIgFgCIgEgDIgEgDIgEgEIgGgDIgFgEIgEgEIgEgEIgDgEIgDgEIgEgEIgDgEIgFgEIgEgCIgFgCIgFgDIgEgDIgDgEIgDgFIgDgFIgCgFIgDgDIgEgEIgFgGIgFgEIgEgFIgFgEIgEgFIgEgDIgEgEIgDgFIgEgGIgEgGIgDgGIgEgEIgDgEIgCgEIgCgFIgCgGIgCgCIgDgDIgEgEIgDgEIgCgEIgDgGIgCgHIgDgGIgCgFIgDgGIgDgFIgDgGIgGgLIgDgGIgCgGIgDgGIgCgFIgDgFIgCgFIgCgFIgBgGIgBgLIgDgGIgDgGIgCgGIgBgHIAAgHIgBgHIgBgEIgBgCIgEgFIgDgEIgDgGIgCgFIgCgGIAAgFIgBgFIgBgHIAAgHIgBgFIgCgFIgCgFIgBgFIgBgGIgBgFIgBgGIAAgHIgCgGIgCgGIgBgFIgCgGIgCgGIgDgGIgCgGIgCgHIgBgHIgBgNIgBgGIgBgDIgCgGIgCgGIgBgGIgCgNIgBgGIAAgHIgDgGIgCgGIgBgHIgBgHIgBgHIgCgDIgDgHIgCgGIgBgGIgBgHIgBgHIAAgGIAAgHIgDgGIgCgGIgBgGIgBgHIgBgGIgCgHIgDgNIgCgGIgBgFIgBgFIgBgCIgDgFIgBgDIgBgCIgBgGIgBgFIgBgIIgBgPIAAgHIgBgHIgCgHIgCgHIgCgGIgBgGIgBgHIgBgGIAAgGIAAgOIAAgHIAAgGIgBgHIgFgXIgHgeQgDgOgBgPIgBgcIgBgRIgBgFIgCgGIgCgGIgBgEIgBgFIAAgEIgBgEIgEgMIgEgNQgBgKAAgLIgBgOIAAgNIAAgNIgBgGIgCgGIgBgHIgBgGIgDgOIAAgHIAAgHIgBgHQgLgnABgoIABhaIAAhMIAAgJIABhaQAAgIACgHIACgFIACgEIAEgFIADgGIAEgGIABgGIAAgFIABgGIACgFIACgFIACgGIAAgBIABgIIABgIIABgHIACgLIACgGIADgGIAAgBIABgHIAAgIIABgGIABgGIACgFIACgFIADgFIABgEIACgGIACgGIADgFIAAgHIABgGIABgGIABgHIADgMIABgHIACgGIABgEIABgFIAAgBQgCgBgDABIgFABIgEABIgCAAIgFgBIgFgBIgFgBIgFgDIgEgDIgEgDIgDgEIgDgEIgDgFIgBgFIgBgFIgBgFIABgGIABgFIABgFIACgFIACgFIAEgFIABgCIACgFIACgFIADgFIADgGIACgFIACgGIADgFIACgGIADgFIADgFIADgEIADgDIADgEIABgEIACgFIACgGIADgGIAEgFIADgEIADgFIABgFIACgFIABgFIACgEIADgDIADgFIADgEIADgFIAEgFIADgEIADgEIABgCIACgGIADgGIADgFIACgGIACgFIACgFIADgEIABgFIAAgFIACgGIACgFIAEgFIADgEIAEgHIADgGIADgEIACgEIADgEIAEgEIADgEIAFgDIAEgDIACgCIADgBIAFgBIAGgBIAGgBIACgBIABgBIAEgFIAEgFIAFgEIAFgEIACgCIADgFIAEgEIAEgFIAIgIIAFgEIAEgDIAFgEIABAAIADgFIADgFIADgFIAIgJIAEgFIAEgFIADgDIACgDIADgFIADgDIAEgDIAEgEIAEgDIAFgEIAEgEIAFgEIAFgFIAJgKIAFgEIAEgGIAEgFIAEgFIAFgEIAGgEIAFgEIAKgIIAGgEIAEgEIAFgEIAFgEIAEgEIADgEIAEgEIAFgGIAEgEIAFgDIAFgDIAEgEIAEgDIAEgEIAFgFIAGgEIAGgFIAEgDIAEgDIAEgFIAEgDIAEgDIAFgCIAFgDIAEgEIAEgEIADgDIAFgDIAEgDIAEgEIADgEIAEgEIAFgDIAFgDIAFgFIAAAAIAEgFIAEgFIAEgFIAFgDIAGgDIAGgDIAEgDIgBAAIAEgEIAEgDIAFgGIADgFIABgBIAEgEIAFgDIAEgDIAFgDIADgEIADgEIAEgDIAEgDIAGgDIAGgDIADgCIAEgFIAGgEIAEgFIAFgEIAEgFIADgDIAEgDIAFgDIADgFIAEgEIAEgFIAEgFIAFgEIAEgFIAGgEIAEgFIADgEIAFgDIAEgCIAFgDIAEgDIAFgDIAGgFIAEgEIAEgEIAEgDIADgCIAEgFIAEgEIAEgFIAFgEIAEgFIAEgEIAEgEIAFgDIAGgDIAHgDIACgCIAFgEIAEgFIAEgFIAGgEIAGgEIADgCIAFgFIADgFIAEgFIAEgFIAEgFIAFgEIAFgDIAHgDIAGgDIACgCIAFgEIAEgEIAGgEIAFgEIALgGIAFgFIAFgFIADgDIAEgDIAFgDIAEgCIAEgDIAEgCIAEgCIAFgCIAEgBIAEgBIABgBIAEgFIAFgEIAGgDIAFgCIAGgCIAFgBIAFgBIADgCIAFgDIAGgCIAFgCIAEAAIAIgBIAHgBIABAAIAEgCIAEgCIAFgCIAEgBIAGgBIAGgBIAGAAIAGAAIABgBIAGgCIAFgCIAIgCIAHgCIAFgCIAFgCIAGgCIAFgBIAOgCIAHgBIAAAAIAGgCIAFgCIAFgCIAIgBIAHgBIAFgBIAEAAIAHAAIAIAAIAFgCIAGgDIAFgBIAIgBIAHgBIAEgBIAFAAIAEAAIAFAAIAFAAIAFgDIAGgCIAGgCIAGgCIAKgEIALgDQAKgCAKAAIAPgBIANAAIAFAAQANgGAPgBQATgCATAAIAmAAIAmAAIAfAAQARgHASgBIAsgBIArAAIArAAQAVgBAVAFIAMAEIAAABIAHAAIAIABIAGACIAGACIAFADIAFADIAFAEIAFADIAGACIAFABIAFACIAFACIAEADIAFABIAFAAIAGACIAFACIAFAEIAGAAIAGABIAFACIAFACIAFADIAIABIAHAAIAHAAIAGABIAGACIAFACIAEACIAEADIAEABIAEABIAHADIAGACIABABIAGAAIAGABIAGABIAFACIACAAIAEACIAFACIACABIAHAAIAHABIAIABIAEAAIAFABIAEACIAEACIADADIAGAAIAGABIAGACIAFADIAFADIAGACIAFACIAEACIAEADIAHABIAHACIAFABIAEADIAEACIAFABIAGABIAFABIAGADIAEADIAGABIADAAIACABIAFABIAFACIAFADIAFADIAFAEIADACIABABIADACIAHADIAEADIAFADIAGACIAHADIAHADIAFADIAJAGIAFADIAEAEIAGAEIAFACIAEADIAEACIAEAEIAEACIAFADIACAAIAGACIAGACIAFADIAFADIAEAEIACACIACADIADAEIAFACIAFADIAFACIAAAAIADACIADACIAEABIADADIAAAAIAAAAIAHADIAIADIAGAEIAGAFIAFAFIAEACIAEACIAEADIABAAIAGADIAHADIAEADIAEAEIAEADIAFAFIAFAEIAFAEIAGADIAGADIAFAEIAFAFIAFAEIAFAEIAEAFIAFAFIAFAEIAEAFIAFAEIACADIAEACIAEADIAFACIAEADIAFAEIAEADIAFAEIAFADIAEAEIAEAEIACACIABACIADAEIADACIAGADIAEADIAFADIAFACIAEACIABAAIAFADIAFAEIAEAFIAEAFIADACIADACIADACIAEACIAEACIAGADIAFAEIAFAEIAFAFIAFAFIAFAEIAGACIAGAEIAFAEIAFAEIAEAEIAEADIAEADIAFAEIAEADIAEAEIADAEIADAEIADADIADAFIAFAEIAFACIAEACIAGAEIAGAEIAEAEIAEADIADAEIABABIBKDEIAAAAIgDgDIgFgGIgEgFIgFgFIgDgGIgEgGIgEgGIgFgFIgEgEIgEgFIgEgFIgFgGIgEgFIgDgFIgCgFIgEgEIgFgFIgEgFIgFgEIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgGgDIgGgEIgFgFIgEgDIgDgEIgEgEIgCgCIgFgCIgFgCIgFgDIgEgDIgEgEIgEgEIgEgEIgDgEIgEgEIgEgEIgDgFIgBgBIgDgCIgDgCIgFgEIgFgFIgDgCIgGgDIgGgDIgGgDIgEgFIgEgEIgEgEIgDgDIgDgCIgFgCIgFgCIgFgDIgFgEIgFgCIgEgDIgFgCIgEgEIgEgEIgDgFIgBAAIgFgDIgFgDIgGgDIgGgDIgFgDIgEgEIgEgFIgEgEIgDgEIgDgEIgFgDIgEgDIgEgEIgGgDIgGgEIgGgEIgEgDIgEgCIgDgEIgDgEIgEgDIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgHgDIgFgEIgFgFIgEgDIgDgEIgEgEIgCgBIgEgCIgGgCIgFgDIgFgEIgGgCIgFgDIgFgDIgEgEIgDgFIgHgCIgGgCIgGgEIgFgEIgEgCIgDgCIgGgCIgFgCIgFgCIgEgDIgFgDIgDgDIgEgDIgCgFIgGgCIgGgDIgGgEIgGgDIgGgEIgFgCIgEgCIgFgDIgEgDIgDgDIgDgDIgCgCIgDgDIgHgDIgHgDIgGgCIgGgCIgFgDIgFgDIgEgCIgEgCIgFgDIgFgEIgEgEIgBAAIgGgBIgHgCIgFgBIgEgDIgFgCIAAAAIAAgBIgBAAIABABIgGgBIgHgCIgFgCIgFgCIgFgDIgFgBIgFgBIgGgCIgFgBIgEgDIgFgDIgBAAIgGgDIgHgDIgBAAIgHgCIgGgBIgFgCIgEgCIgEgCIgHgBIgHAAIgHgCIgHgBIgEgCIgCAAIgGgDIgDAAIgHgBIgGgBIgGgBIgGgCIgGgCIgFgDIgGgCIgGgCIgFgCIgFgCIAAAAIgFgBIgFAAIgIAAIgHgCIgIgBIgFgCIgEgCIgFgDIAAAAIgGgBIgHgBIgFgCIgFgCIgEgDIgBAAIAAAAIAAAAIAAAAIgGgBIgHgBIgFgCIgFgDIgEgCIgHgBIgGgCIgDgBIgCgBIgFgCIgFgDIgEgEIgEgEIgBAAIgHgBIgHgBIgFgBIgGgDIgFgCIgPAAIgWAAIgfAAIgkAAIgcAAIgOABIgTAGQgMADgNAAIgggBIgkAAIglAAQgOAAgNACIgGACIgFABIgEACIgGABIgGABIgHAAIgGAAIgIAAIgHAAIgIABIgHAAIgBAAIgGADIgGACIgEACIgEABIgEACIgFADIgEACIgHABIgHABIgHABIgHAAIgFAAIgFAAIgGAAIgGADIgGADIgHABIgGABIgHABIgHAAIgIAAIgHAAIgFADIgFACIgFABIgGACIgGAAIgHABIgIAAIAAAAIgHADIgGADIgGACIgFABIgGACIgFACIgFACIgGABIgHABIgIABIgHABIgFACIgFADIgGABIgGACIgHAAIgGABIgEACIgFACIgEACIgGABIgGACIgDACIgDACIgBABIgEADIgEADIgFADIgFABIgFACIgFABIgGAEIgEAEIgEAEIgEADIgEAEIgFADIgFADIgFADIgFADIgCADIgGAEIgFAEIgFAFIgGADIgGACIgCACIgEAGIgFAGIgEAGIgFAEIgEADIgFAEIgFADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgFACIgEADIgFABIgBABIgEAEIgEAFIgEADIgEAGIgEAFIgEAEIgFADIgEADIgCADIgGAEIgEAEIgEAEIgFADIgEACIgEADIgEACIgDADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgEAGIgFAFIgDAEIgFADIgFAEIgEAEIgEAEIgEAEIgEAEIgEAEIgGAFIgEADIgEAEIgCABIgCACIgIADIgCADIgDADIgFAFIgFADIgGAEIAAAAIgEAGIgEAEIgFAEIgEAFIgFAEIgEADIgBAAIAFgDIgGAFIgFAEIgGADIgDACIgFAFIgEAGIgFAEIgEAEIgFADIgFAEIgEAEIgEADIgEAEIgFAEIgFAEIgBABIgDAEIgEAEIgEAEIgFADIgEACIgBAAIgFACIgFAFIgFAEIgGAFIgGAEIgFAFIgGAFIgEAEIgFADIgEAEIgFADIAAABIgBAAIgCADIgDADIgEAGIgFAFIgFAEIgFAEIgFADIgGAFIgFAEIgGAEIgFAEIgFAEIgEAEIgIAKIgJAKIgBAAIgJAKIgJAJIgKAIIgJAIIgEAFIgFAGIgEAFIgFAFIgEAGIgCADIgEAGIgEAGIgFAFIgDAEIgEADIgFADIgEADIgFAGIgFAFIgDAEIgDAEIgEAEIgFAFIgFAEIgCADIgDADIgEAEIgFAEIgCAFIgDAEIgEAGIgEAFIgFAFIgFAFIgDAEIgCAEIgCAFIgDAEIgDAEIgEAFIgDAEIgEAFIgDAGIgEAFIgEAGIABAOIAAANIgBAMIAAANIgCAMQgCAJgEAIIgBAHIAAAGIAAAGIgBAGIgBAGIgBAGIgBAFIgCAFIgDAGIAAAKIgBAMIgCAMIgDAMIgEAMIgJASIgBAGIgCAHIgCAHIgCAGIgBAHIgBAHIAAAGIgBAHIgBAGIgBAGIgCAFIgCAFIgCAFIgCAFIgBAEIgDAHIgDAGIAAAFIgBAFIAAAHIgCAGIgBAHIgCAFIgDAGIAAABIgBAHIAAAGIgBAHIgBAHIgCAGIgCAFIgCAGIAAADIgCAIIgBAHIgCAIIgCAGIgDAGIgEAFIgCAEIgCAEIAAAzIAABBIAABDIAABIQAAARABASIACAGIABAHIACAHIABAHIABAGIABAFIAAAGIABAHIAAAHIADAPIADAOIACAPIAAAQIAAAOIABAVIABACIACAFIACAFIABAGIACAEIAAAFIACAGIACAGIABAGIABAFIABAGIAAABIABAFIABAGIAAAGIABAGIAAAHIAAAGIAAAGIAAAHIABAGIAEAVIAFAUIAEAUQADANAAANIABAVIAAAPIACAFIACAGIACAFIABAFIABAFIABAHIAAAHIAAAHIABAHIAAAHIABADIADAFIACAFIABAGIABAFIACAGIABAGIACAGIABAGIACAGIABAGIABAGIABAGIAAABIACAFIACAFIABAFIABAFIABAHIAAAGIABAGIAAAGIAEAHIACAHIABAFIABAGIABAGIABAHIAAAAIACAFIACAFIABAEIABAGIABAHIABAIIAAAHIABACIACAFIACAGIACAFIABAHIABAHIAAAHIABAHIAAABIADAGIACAGIACAHIACAGIACAHIADAHIABAHIABAHIABAHIABAHIABACIADAEIABAFIABAFIABAFIABAFIAAAFIABAGIAAAGIADAEIADAFIACAGIACAFIADAFIABAGIACAGIABAHIABAGIAAAGIADAGIACAFIACAGIABAFIABAGIAAAGIAGALIAGANIAGALIAFAKIAGANIAFAMIAFAGIADAEIAEAEIACAEIADAFIABAFIACADIADAEIAAAAIACAEIADAEIADAEIACAFIAEADIAEAFIAFAEIAEAFIAFAEIAEAFIAFAEIAFAGIADAEIADAEIAEAEIAAABIAFADIAFAEIAFAEIAEAEIADAEIAEAEIAEAEIADAEIAEAFIABAAIAEADIAEADIAEAEIAFADIAFADIAFADIAEADIAEADIAEAEIAEADIAFAFIAEAFIAGAEIADACIACABIACABIAHADIAHACIAGAEIAFADIAEAFIAEAFIAEABIAEACIAGAEIAHAEIAEACIADADIAGACIAGABIAFADIAFAEIAEADIAFAEIAFAEIAEADIAFADIAEABIAGACIAGADIAGADIAFADIAFADIAFAEIAFAEIAFADIAFADIAFACIAEADIAGAEIAFACIAEACIAFACIAFAEIAGACIAFADIAFADIAEAEIADAEIAEAFIADACIADACIAEABIAGACIAGACIAFADIAGABIAHACIAGACIAFADIAGADIAFADIAGADIAFABIAFAAIAGABIAFABIAFACIAGACIAEACIAHAAIAIABIAFAAIAGABIAFABIAFACIAFACIAFACIAAAAIAFABIAGAAIAGAAIAFABIAGABIAGABIAFABIAGACIAFACIAGABIAHAAIAGAAIAGABIAFABIAFABIAGACIAEACIAFACIABAAIAGABIAEABIAGACIAFACIAGADIAAAAIAIAAIAHAAIAHABIAGAAIAGABIAHACIAHACIAGADIAGAAIAFAAIAFAAIAFAAIAHAAIAGAAIAHABIAGABIAHABIAHACIAGADIABAAIAIABIAHAAIAIAAIAHAAIAIABIAIABIAHABIAGACIAFACIAGACIACACIAGABIAGABIAGABIAEABIABABIAGACIABAAIAIAAIAHAAIAHABIAGAAIAHABIAGABIAGABIAFABIAFACIABAAIABABIAAgBIAAABIACAAIgBAAIABAAIABABIABAAIAGAAIAHABIAHAAIAGAAIAHABIAHAAIAGACIAHABIAFACIAEACIAFABIAFABIAFABIAGABIAFACIAGACIAHACIAFAAIAGAAIAFAAIAGABIAGAAIAGABIAGABIAFACIAFACIAFACIABAAIAHABIAGAAIAHABIAHABIAGABIAFACIAFADIACAAIAHAAIAGABIAHABIAHABIAHABIAFACIAGACIAFACIAGADIAFADIAHABIAGACIAHABIAGABIAGABIAGABIAFACIAFACIABABIAGAAIAGABIAGAAIAGABIAFACIAGACIAFADIAEADIADAAIAFACIAFACIAFACIABAAIAHAAIAGABIAGAAIAHABIAGACIAHACIAGADIADAAIAGABIAHABIAGABIAFACIAFACIAFACIAQAAIAPAAIAQAAIAQAAIAPAAIAQAAIAPAAIAQAAIAPAAIAOAAIAPAAIAOgBIACAAIAGgDIAFgCIAHgBIAHgBIAIgBIAGAAIAGAAIAGAAIAGAAIAGAAIAHAAIAGgBIAFgDIAGgCIAFgBIAGgBIAGgBIAGAAIAGgBIAFAAIAFAAIABAAIAGgDIAGgCIAGgCIAEgDIAFgCIAFgDIAFgCIAFgDIAFgCIAFgCIAGgCIAFgCIAEgCIAEgCIAGgDIAGgDIAGgDIAHgDIAHgDIAFgDIAGgCIABgBIAFgFIAFgEIAGgEIAFgCIAGgCIAFgCIAGgBIAGgEIAGgEIAGgDIAGgEIAHgDIACgDIAFgEIAGgFIAGgCIAFgCIAGgCIAGgCIAAgBIAEgDIgDADIAFgEIAEgDIAFgEIACgCIADgEIAEgEIAEgEIAFgCIAGgDIAGgCIADgDIADgBIAEgCIAFgCIABgBIAEgEIAEgDIAFgDIAFgDIAGgDIAGgCIAHgCIAGgEIAHgDIAGgEIAHgDIAEgEIAFgDIAFgCIAFgCIADgDIADgCIAFgEIAEgEIAGgDIAEgBIAEgCIAEgDIAEgDIAFgDIAEgDIADgCIAEgFIAEgEIAFgFIAGgEIAGgEIAFgEIAGgDIAGgCIACgDIAEgEIADgEIADgEIAEgDIAEgDIAEgDIAGgDIAFgDIAGgDIAFgDIAEgDIAEgDIACgBIAEgGIAFgFIAEgEIAFgDIAFgCIAGgCIAEgEIAFgDIAFgFIACgDIACgEIADgEIAEgEIAEgEIAEgEIAFgEIAEgDIAHgEIAGgEIACgDIACgDIAEgGIAEgFIAEgFIAEgDIAEgDIAFgCIACgEIADgEIADgEIACgFIAEgDIAEgEIADgEIAEgEIADgEIAEgEIAEgFIAEgDIADgHIADgFIAEgFIAFgFIABgCIACgFIADgFIACgFIADgEIAEgDIAEgEIAEgFIADgGIADgGIADgGIADgFIAEgGIADgFIAEgGIAEgFIAFgEIABgCIACgFIADgFIAAgCQBKgkBIgmIgDAEIgBAEIgCAFIgDAFIgEAFIgEAFIgEAEIgEAEIgDAFIgDAFIgCAFIgCAEIgDAFIgGALIgDAFIgEAEIgEAEIgDAEIgEAEIgCAEIgDAEIgCAEIgCAEIgDADIgCADIgBACIgCAFIgCAFIgFAGIgEAGIgEAEIgEAEIgDAFIgDAFIgCAFIgDAEIgCAFIgGALIgDAFIgEAEIgEAEIgEAFIAAAAIgCAFIgCAEIgFAGIgEAGIgFAGIgCAFIgCAFIgDAEIgEAEIgEAEIgEADIgBABIgEAFIgEAFIgEAEIgEAEIgEAEIgEAHIgDAHIgDAEIgEAFIgDADIgFADIgEADIgFADIgBACIgDAEIgCAEIgDAEIgDADIgFAEIgFAEIgFADIgFAEIgFADIgDACIgDADIgEAGIgFAGIgFAFIgDAEIgJAHIgEADIgFAFIgGAEIgEACIgDAEIgEAFIgEAEIgFADIgFACIgFACIgEAEIgFADIgFADIgEACIgEADIgEABIgDACIgFAGIgFAFIgEAFIgEAEIgFADIgHADIgDACIgDABIgFADIgEADIgDAFIgEAEIgFAEIgFAEIgFADIgFAEIgFADIgFAEIgFADIgHADIgGADIgCACIgEAEIgEAEIgEADIgGACIgGADIgDACIgEACIgKAHIgKAFIgJAFIgLAEIgMAFIgBABIgDADIgEADIgEADIgGADIgGACIgDADIgDACIgFACIgFACIgEAEIgEAEIgLAIIgLAIIgLAHIgLAEIgFACIgFAFIgGAEIgFADIgMAHIgLAHIgLAGIgFACIAAABIgHACIgGACIgEAEIgEADIgEADIgFADIgFACIgFACIgGACIgEACIgEACIgGADIgGADIgMAGIgMAGIgNAEIgEADIgGADIgHACIgEADIgEADIgGACIgGACIgGACIgHADIgGADIgGABIgGABIgGABIgGABIgIAAIgHABIgEACIgLADIgKACIgSABIgLABIgMAAIgMAAQgTAIgVAAIgxABIgsAAgAAMYTIgBAAIgBAAIACAAgAAIXEIABAAIgCAAgAkAWXIACAAIgCgBIgBAAIABABgA0Mo2IAAABIAAgBIAAgBIAAABgAxytnIgBACIABgBIABgCIgBABgAxet/IAAAAIABgBIgBABgAtsy9IABAAIAAAAIgBAAgAJP2OIABAAIgBAAgAkx3RIABAAIABgBIgBAAIgBABgAFY3XIABAAIgBgBIAAABgAE93gIAAAAIgBgBIAAAAIABABgAAj5GIABAAIACgBIgBAAIgCABgAAn5HIAAAAIABAAIgBAAg");
	this.shape.setTransform(255.8458,-121.2023);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-423,-400.5,846.1,801.1);


(lib.Анимация8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoA1QgLgLAAgPQAAgTAOgKQAPgKAaAAIAQAAIAAgIQAAgKgFgFQgFgGgKAAQgJAAgGAFQgGAEAAAHIgcAAQAAgKAHgIQAHgJALgFQALgFAOAAQAVAAANALQAMAKABAUIAAA2QAAAQAEAKIAAACIgcAAIgDgMQgNAOgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAFQAGAEAIAAQAHAAAIgEQAHgDADgHIAAgXIgOAAQgPAAgHAFg");
	this.shape.setTransform(25.475,-7.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_1.setTransform(13.025,-5.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_2.setTransform(0.575,-7.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgkAvQgQgRAAgbIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_3.setTransform(-11.175,-7.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AArA9IAAhQIgiBQIgRAAIgihQIAABQIgbAAIAAh5IAiAAIAjBXIAkhXIAiAAIAAB5g");
	this.shape_4.setTransform(-26.15,-7.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgsBTIAAgVIAGAAQAKAAAFgDQAFgEADgJIAEgKIgrh4IAeAAIAYBSIAZhSIAdAAIgwCLQgKAegaAAQgHAAgHgCg");
	this.shape_5.setTransform(-40.35,-5.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_6.setTransform(-51.575,-7.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgoAuQgQgRAAgcIAAgBQABgRAGgPQAIgOAMgIQANgIAQAAQAYAAAPAQQAQAQABAaIABAFQAAASgIAPQgGANgNAIQgNAIgRAAQgZAAgPgRgAgVgdQgHAKgBAUQABATAHALQAIALANgBQAOAAAHgLQAIgKAAgUQAAgSgIgLQgIgLgNAAQgMAAgJALg");
	this.shape_7.setTransform(-71,-7.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_8.setTransform(-84.725,-5.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZA6QgLgEgHgJQgGgJAAgLIAbAAQAAAHAHAFQAGAFAJAAQAKAAAHgEQAFgFAAgIQAAgJgEgEQgGgDgLAAIgSAAIAAgTIATAAQASAAAAgPQABgIgGgEQgFgEgKAAQgIAAgGAFQgGAEAAAHIgbAAQAAgQANgLQAOgKAUAAQAWAAANAJQAMAKAAAQQAAAJgEAGQgGAHgIAEQAVAGAAAVQAAARgOAKQgOAKgWAAQgNAAgMgFg");
	this.shape_9.setTransform(-97.7,-7.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgkAvQgQgRAAgbIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_10.setTransform(-109.625,-7.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAXA9IAAgxIgtAAIAAAxIgcAAIAAh5IAcAAIAAAzIAtAAIAAgzIAcAAIAAB5g");
	this.shape_11.setTransform(-122.5,-7.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_12.setTransform(-134.925,-9.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgLALgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAGgDADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_13.setTransform(6.25,198);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CC0033").s().p("AAQAyIgbgnIgLAAIAAAnIgXAAIAAhjIAXAAIAAAoIAKAAIAbgoIAcAAIglAwIAnAzg");
	this.shape_14.setTransform(-3.45,197.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CC0033").s().p("AATBGIAAhEIglBEIgXAAIAAhkIAXAAIAABCIAlhCIAXAAIAABkgAgUgyQgJgGABgNIAQAAQAAAGAEAEQADAEAFAAQAGAAAEgEQAEgEAAgGIAQAAQABANgJAGQgIAIgOAAQgNAAgHgIg");
	this.shape_15.setTransform(-14.8,196.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CC0033").s().p("AghAmQgNgOAAgYIAAAAQAAgPAGgMQAGgLALgHQAKgGANAAQAUAAANANQANANABAWIAAAEQAAAPgGAMQgGALgLAHQgKAGgOAAQgUAAgNgOgAgQgYQgHAIAAARQAAAPAHAJQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgGAJg");
	this.shape_16.setTransform(-25.65,198);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CC0033").s().p("AgrBGIAAiKIAVAAIABALQAKgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQALAAAFgJQAGgIABgRQgBgPgGgJQgFgJgLAAQgOAAgFALg");
	this.shape_17.setTransform(-36.2,199.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_18.setTransform(-46.475,197.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CC0033").s().p("AgeAmQgMgOAAgXIAAgCQAAgXAMgOQAMgNAUAAQASAAALAKQAMALAAARIgVAAQAAgJgGgGQgFgFgJAAQgKAAgGAIQgGAIAAAQIAAADQAAAQAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAIQgFAJgJAEQgKAFgLAAQgUAAgMgOg");
	this.shape_19.setTransform(-56.025,198);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CC0033").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgFAEgBAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_20.setTransform(-66.25,198);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CC0033").s().p("AAUAyIAAgoIgnAAIAAAoIgWAAIAAhjIAWAAIAAAqIAnAAIAAgqIAWAAIAABjg");
	this.shape_21.setTransform(-76.85,197.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CC0033").s().p("AAWAyIAAglIgVAAIgVAlIgXAAIAYgoQgKgEgFgGQgFgIAAgJQAAgOALgJQALgJARAAIAsAAIAABjgAgLgbQgFAEAAAHQAAAGAFAEQAEAEAHAAIAWAAIAAgdIgVAAQgHAAgFAEg");
	this.shape_22.setTransform(-92.825,197.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_23.setTransform(-102.75,198);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CC0033").s().p("AATAyIAAgoIglAAIAAAoIgXAAIAAhjIAXAAIAAAqIAlAAIAAgqIAXAAIAABjg");
	this.shape_24.setTransform(-113.35,197.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_25.setTransform(-123.525,197.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CC0033").s().p("AghAmQgMgOAAgYIAAAAQAAgPAFgMQAGgLAKgHQALgGANAAQAUAAANANQAMANABAWIAAAEQABAPgGAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAJg");
	this.shape_26.setTransform(-133.6,198);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_27.setTransform(-143.725,197.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CC0033").s().p("AgeAmQgMgOAAgXIAAgCQAAgXAMgOQAMgNAUAAQASAAALAKQAMALAAARIgVAAQAAgJgGgGQgFgFgJAAQgKAAgGAIQgGAIAAAQIAAADQAAAQAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAIQgFAJgJAEQgKAFgLAAQgUAAgMgOg");
	this.shape_28.setTransform(-153.275,198);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_29.setTransform(-163.5,198);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CC0033").s().p("AAdBEIAAg1QgPADgQAAQgYAAgNgKQgMgKAAgWIAAgqIAYAAIAAAqQAAANAFAGQAHAFANAAQAQAAAPgDIAAg/IAXAAIAACGg");
	this.shape_30.setTransform(-175.3,196.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CC0033").s().p("A7hZ7QgRAAgGgGQgHgHACgTIAVjiQACgXAJgJQAEgEAFgBIgDgCIgKgFIAAABQgIAOgSAcQgPAZgCAUIgBARQgDAJgIACQgJABgFgJQgEgHABgKQABgbANgZIAQgZQAKgQAFgJQAFgMADgEQAIgIAIACQAEABADAFIACAFIABAAQAJgCAPAIQAJAFARAOIAUARIAcAYIAUANIAJAJQAHAGAQAJIAOAJIAOAKIAOAGQAJADAFAEQAHAFACAHQACAIgGAFQgHAHgQgIQgPgHgUgNQgbgRgcgVQgugmgagUIgBAJQgOA1gGBEQgEAogEBSQGgAJDUgGQFdgJETgyQgYg1gPhzQgNhogVg2QgEAFgFAKQgRAigKAmIgGAOQgFAHgIgBQgGgBgDgIQgCgGABgIQACgPANgfIARgmQAIgSAGgHQAEgEAGgCIABgDQADgGAIgBQAHgBAGAEQADACADAFQAPgDAYADQAsAGATAJQAjAPAKAdQAFAOgGAHQgEAEgGABQgGAAgFgCQgEgCgNgMQgQgOgXgKQgbgMgdgEQALAjAHAxIAOBkQAJA6AVA/QAKAcgIANQgIANgbAEQkSAulbAJQhHAChdAAQi6AAkUgHgAcaT3IgGgCIgCgBIgBgCQgDgIABgFQABgDAFgDQAGgCAGACQAHADACAHQACAHgHAEIgGADIgCABgAwUolQgJgIABgUQACgaAJgyIAFgaQAHgmAGgTQAIgVANgWQAJgQABgIIABgNQABgIADgEQAGgGAJADQAJADADAIQAFAMgIAUQgEAJgLAVQgLATgEALIgHAcQgPBDgGA5QBVgZA6gVIBkghQAogMA1gPIAngLQAqgLAUgBQARgBAEAKQACAIgIAGQgDADgLADIjEA1QhZAbhaAhIghAMQgTAGgQAAQgMAAgGgEgAvgpfQgIgCAAgLQABgKAGgKQCAjGBGhfQB0ieByhsQBGhCBfhIQA9guBxhPID5ivQAlgbAZgBQAJAAAHAGQAIAFgDAIQgCAGgQAFQgfAIgyAkIlDDmQhfBCgxApQiMByiLC3QhLBiifDvQgJANgIAAIgCAAg");
	this.shape_31.setTransform(-4.7626,11.4333);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(204,0,51,0)").s().p("AVMT3IgBAAIgBgDIgDgIQAAgGAGgDQAEgDAHABIAFACQAFAEAAAHIAAAEQgCAFgIACIgDABgA1dkoQgGgFACgHQABgHAOgIQBOgqBkhYICoiTQA1grBlhEIJDmJQBKgyAfgXQA6grApgnQAKgKAMgDQANgDAEAKQAEALgRAOQiaB9lhDpQlUDgikCKQhXBMgtAlQhNBCg9AoQgRALgJAAQgHgBgGgFg");
	this.shape_32.setTransform(50.31,-82.3687);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.1,-209.7,376.29999999999995,419.5);


(lib.Анимация7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoA1QgLgLAAgPQAAgTAOgKQAPgKAaAAIAQAAIAAgIQAAgKgFgFQgFgGgKAAQgJAAgGAFQgGAEAAAHIgcAAQAAgKAHgIQAHgJALgFQALgFAOAAQAVAAANALQAMAKABAUIAAA2QAAAQAEAKIAAACIgcAAIgDgMQgNAOgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAFQAGAEAIAAQAHAAAIgEQAHgDADgHIAAgXIgOAAQgPAAgHAFg");
	this.shape.setTransform(25.475,-7.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_1.setTransform(13.025,-5.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_2.setTransform(0.575,-7.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgkAvQgQgRAAgbIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_3.setTransform(-11.175,-7.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AArA9IAAhQIgiBQIgRAAIgihQIAABQIgbAAIAAh5IAiAAIAjBXIAkhXIAiAAIAAB5g");
	this.shape_4.setTransform(-26.15,-7.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgsBTIAAgVIAGAAQAKAAAFgDQAFgEADgJIAEgKIgrh4IAeAAIAYBSIAZhSIAdAAIgwCLQgKAegaAAQgHAAgHgCg");
	this.shape_5.setTransform(-40.35,-5.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_6.setTransform(-51.575,-7.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgoAuQgQgRAAgcIAAgBQABgRAGgPQAIgOAMgIQANgIAQAAQAYAAAPAQQAQAQABAaIABAFQAAASgIAPQgGANgNAIQgNAIgRAAQgZAAgPgRgAgVgdQgHAKgBAUQABATAHALQAIALANgBQAOAAAHgLQAIgKAAgUQAAgSgIgLQgIgLgNAAQgMAAgJALg");
	this.shape_7.setTransform(-71,-7.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_8.setTransform(-84.725,-5.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZA6QgLgEgHgJQgGgJAAgLIAbAAQAAAHAHAFQAGAFAJAAQAKAAAHgEQAFgFAAgIQAAgJgEgEQgGgDgLAAIgSAAIAAgTIATAAQASAAAAgPQABgIgGgEQgFgEgKAAQgIAAgGAFQgGAEAAAHIgbAAQAAgQANgLQAOgKAUAAQAWAAANAJQAMAKAAAQQAAAJgEAGQgGAHgIAEQAVAGAAAVQAAARgOAKQgOAKgWAAQgNAAgMgFg");
	this.shape_9.setTransform(-97.7,-7.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgkAvQgQgRAAgbIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_10.setTransform(-109.625,-7.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAXA9IAAgxIgtAAIAAAxIgcAAIAAh5IAcAAIAAAzIAtAAIAAgzIAcAAIAAB5g");
	this.shape_11.setTransform(-122.5,-7.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_12.setTransform(-134.925,-9.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgLALgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAGgDADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_13.setTransform(6.25,198);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CC0033").s().p("AAQAyIgbgnIgLAAIAAAnIgXAAIAAhjIAXAAIAAAoIAKAAIAbgoIAcAAIglAwIAnAzg");
	this.shape_14.setTransform(-3.45,197.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CC0033").s().p("AATBGIAAhEIglBEIgXAAIAAhkIAXAAIAABCIAlhCIAXAAIAABkgAgUgyQgJgGABgNIAQAAQAAAGAEAEQADAEAFAAQAGAAAEgEQAEgEAAgGIAQAAQABANgJAGQgIAIgOAAQgNAAgHgIg");
	this.shape_15.setTransform(-14.8,196.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CC0033").s().p("AghAmQgNgOAAgYIAAAAQAAgPAGgMQAGgLALgHQAKgGANAAQAUAAANANQANANABAWIAAAEQAAAPgGAMQgGALgLAHQgKAGgOAAQgUAAgNgOgAgQgYQgHAIAAARQAAAPAHAJQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgGAJg");
	this.shape_16.setTransform(-25.65,198);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CC0033").s().p("AgrBGIAAiKIAVAAIABALQAKgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQALAAAFgJQAGgIABgRQgBgPgGgJQgFgJgLAAQgOAAgFALg");
	this.shape_17.setTransform(-36.2,199.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_18.setTransform(-46.475,197.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CC0033").s().p("AgeAmQgMgOAAgXIAAgCQAAgXAMgOQAMgNAUAAQASAAALAKQAMALAAARIgVAAQAAgJgGgGQgFgFgJAAQgKAAgGAIQgGAIAAAQIAAADQAAAQAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAIQgFAJgJAEQgKAFgLAAQgUAAgMgOg");
	this.shape_19.setTransform(-56.025,198);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CC0033").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgFAEgBAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_20.setTransform(-66.25,198);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CC0033").s().p("AAUAyIAAgoIgnAAIAAAoIgWAAIAAhjIAWAAIAAAqIAnAAIAAgqIAWAAIAABjg");
	this.shape_21.setTransform(-76.85,197.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CC0033").s().p("AAWAyIAAglIgVAAIgVAlIgXAAIAYgoQgKgEgFgGQgFgIAAgJQAAgOALgJQALgJARAAIAsAAIAABjgAgLgbQgFAEAAAHQAAAGAFAEQAEAEAHAAIAWAAIAAgdIgVAAQgHAAgFAEg");
	this.shape_22.setTransform(-92.825,197.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_23.setTransform(-102.75,198);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CC0033").s().p("AATAyIAAgoIglAAIAAAoIgXAAIAAhjIAXAAIAAAqIAlAAIAAgqIAXAAIAABjg");
	this.shape_24.setTransform(-113.35,197.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_25.setTransform(-123.525,197.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CC0033").s().p("AghAmQgMgOAAgYIAAAAQAAgPAFgMQAGgLAKgHQALgGANAAQAUAAANANQAMANABAWIAAAEQABAPgGAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAJg");
	this.shape_26.setTransform(-133.6,198);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_27.setTransform(-143.725,197.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CC0033").s().p("AgeAmQgMgOAAgXIAAgCQAAgXAMgOQAMgNAUAAQASAAALAKQAMALAAARIgVAAQAAgJgGgGQgFgFgJAAQgKAAgGAIQgGAIAAAQIAAADQAAAQAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAIQgFAJgJAEQgKAFgLAAQgUAAgMgOg");
	this.shape_28.setTransform(-153.275,198);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CC0033").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_29.setTransform(-163.5,198);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CC0033").s().p("AAdBEIAAg1QgPADgQAAQgYAAgNgKQgMgKAAgWIAAgqIAYAAIAAAqQAAANAFAGQAHAFANAAQAQAAAPgDIAAg/IAXAAIAACGg");
	this.shape_30.setTransform(-175.3,196.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CC0033").s().p("A7hZ7QgRAAgGgGQgHgHACgTIAVjiQACgXAJgJQAEgEAFgBIgDgCIgKgFIAAABQgIAOgSAcQgPAZgCAUIgBARQgDAJgIACQgJABgFgJQgEgHABgKQABgbANgZIAQgZQAKgQAFgJQAFgMADgEQAIgIAIACQAEABADAFIACAFIABAAQAJgCAPAIQAJAFARAOIAUARIAcAYIAUANIAJAJQAHAGAQAJIAOAJIAOAKIAOAGQAJADAFAEQAHAFACAHQACAIgGAFQgHAHgQgIQgPgHgUgNQgbgRgcgVQgugmgagUIgBAJQgOA1gGBEQgEAogEBSQGgAJDUgGQFdgJETgyQgYg1gPhzQgNhogVg2QgEAFgFAKQgRAigKAmIgGAOQgFAHgIgBQgGgBgDgIQgCgGABgIQACgPANgfIARgmQAIgSAGgHQAEgEAGgCIABgDQADgGAIgBQAHgBAGAEQADACADAFQAPgDAYADQAsAGATAJQAjAPAKAdQAFAOgGAHQgEAEgGABQgGAAgFgCQgEgCgNgMQgQgOgXgKQgbgMgdgEQALAjAHAxIAOBkQAJA6AVA/QAKAcgIANQgIANgbAEQkSAulbAJQhHAChdAAQi6AAkUgHgAcaT3IgGgCIgCgBIgBgCQgDgIABgFQABgDAFgDQAGgCAGACQAHADACAHQACAHgHAEIgGADIgCABgAwUolQgJgIABgUQACgaAJgyIAFgaQAHgmAGgTQAIgVANgWQAJgQABgIIABgNQABgIADgEQAGgGAJADQAJADADAIQAFAMgIAUQgEAJgLAVQgLATgEALIgHAcQgPBDgGA5QBVgZA6gVIBkghQAogMA1gPIAngLQAqgLAUgBQARgBAEAKQACAIgIAGQgDADgLADIjEA1QhZAbhaAhIghAMQgTAGgQAAQgMAAgGgEgAvgpfQgIgCAAgLQABgKAGgKQCAjGBGhfQB0ieByhsQBGhCBfhIQA9guBxhPID5ivQAlgbAZgBQAJAAAHAGQAIAFgDAIQgCAGgQAFQgfAIgyAkIlDDmQhfBCgxApQiMByiLC3QhLBiifDvQgJANgIAAIgCAAg");
	this.shape_31.setTransform(-4.7626,11.4333);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(204,0,51,0)").s().p("AVMT3IgBAAIgBgDIgDgIQAAgGAGgDQAEgDAHABIAFACQAFAEAAAHIAAAEQgCAFgIACIgDABgA1dkoQgGgFACgHQABgHAOgIQBOgqBkhYICoiTQA1grBlhEIJDmJQBKgyAfgXQA6grApgnQAKgKAMgDQANgDAEAKQAEALgRAOQiaB9lhDpQlUDgikCKQhXBMgtAlQhNBCg9AoQgRALgJAAQgHgBgGgFg");
	this.shape_32.setTransform(50.31,-82.3687);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.1,-209.7,376.29999999999995,419.5);


// stage content:
(lib.videos_HTML = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"SoundsData",startFrame:0,endFrame:1734,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("SoundsData",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1734,1);
		this.stop();
		
		this.play_btn.addEventListener("click", f1.bind(this));
		
		function f1 (args) {
		this.play();
		}
		
		this.pause_btn.addEventListener("click", f2.bind(this));
		
		function f2 (args) {
		this.stop();
		}
		
		this.return_btn.addEventListener("click", f3.bind(this));
		function f3 (args) {
		this.gotoAndStop(0);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1734));

	// Слой_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgoA1QgLgKAAgQQAAgUAOgJQAPgKAaAAIAQAAIAAgIQAAgJgFgHQgFgFgKAAQgJAAgGAEQgGAFAAAHIgcAAQAAgJAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMALABATIAAA2QAAARAEAJIAAACIgcAAIgDgLQgNANgSAAQgSAAgMgKgAgQAJQgIAGAAAJQAAAIAFAEQAGAGAIAAQAHAAAIgFQAHgEADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape.setTransform(685.025,457.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_1.setTransform(672.575,459.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_2.setTransform(660.125,457.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAJAMAAQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_3.setTransform(648.375,457.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AArA9IAAhQIgiBQIgRAAIghhQIAABQIgcAAIAAh5IAiAAIAjBXIAkhXIAiAAIAAB5g");
	this.shape_4.setTransform(633.4,457.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgsBTIAAgVIAFAAQALAAAFgDQAFgEADgJIAEgKIgrh4IAeAAIAZBSIAYhSIAeAAIgxCLQgKAegbAAQgFAAgIgCg");
	this.shape_5.setTransform(619.2,459.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_6.setTransform(607.975,457.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgoAuQgPgRAAgdIAAAAQAAgSAGgOQAIgPANgHQAMgIAQAAQAZAAAOAQQAQAQABAaIAAAFQAAATgHANQgGAPgOAHQgMAIgRAAQgYAAgQgRgAgUgdQgIALAAATQAAATAIALQAHALANAAQAOgBAHgKQAIgLAAgUQAAgTgIgKQgHgLgOAAQgNAAgHALg");
	this.shape_7.setTransform(588.55,457.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_8.setTransform(574.825,459.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZA6QgLgEgHgJQgGgJAAgLIAcAAQgBAHAHAFQAHAFAIAAQALAAAFgEQAHgFAAgIQAAgJgGgEQgFgDgLAAIgSAAIAAgTIATAAQASAAABgPQAAgIgGgEQgFgEgKAAQgHAAgGAFQgHAEAAAHIgbAAQAAgQANgLQAOgKAUAAQAWAAANAJQANAKAAAQQgBAJgFAGQgEAHgJAEQAVAGAAAVQAAARgOAKQgOAKgWAAQgNAAgMgFg");
	this.shape_9.setTransform(561.85,457.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgkAvQgQgQAAgbIAAgEQAAgRAHgOQAHgPAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAJQAJAJAMAAQATgBAMgPIAPAPQgIAKgMAHQgMAFgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_10.setTransform(549.925,457.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAXA9IAAgxIguAAIAAAxIgbAAIAAh5IAbAAIAAAzIAuAAIAAgzIAcAAIAAB5g");
	this.shape_11.setTransform(537.05,457.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_12.setTransform(524.625,455.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CC0033").s().p("AggArQgKgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgJgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_13.setTransform(665.8,663.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CC0033").s().p("AAQAyIgbgnIgLAAIAAAnIgXAAIAAhjIAXAAIAAAoIAKAAIAagoIAcAAIgkAwIAoAzg");
	this.shape_14.setTransform(656.1,663.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#CC0033").s().p("AAUBGIAAhDIgnBDIgWAAIAAhkIAWAAIAABCIAnhCIAWAAIAABkgAgVgxQgIgIAAgLIARAAQAAAGAEADQADADAFAAQAHAAADgDQADgDABgGIARAAQAAALgJAIQgIAHgOAAQgMAAgJgHg");
	this.shape_15.setTransform(644.75,661.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CC0033").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgLQAGgMAKgHQALgGANAAQAUAAANANQANANAAAVIAAAFQAAAPgFAMQgGALgKAGQgLAHgOAAQgUAAgNgOgAgQgZQgHAJAAARQAAAQAHAIQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgQgGgIQgHgJgLAAQgKAAgGAIg");
	this.shape_16.setTransform(633.9,663.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CC0033").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_17.setTransform(623.35,665.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_18.setTransform(613.075,663.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CC0033").s().p("AgeAmQgMgNAAgZIAAgBQAAgWAMgOQAMgOAUAAQASAAALAKQAMALAAAQIgVAAQAAgIgGgFQgFgGgJAAQgKAAgGAIQgGAHAAARIAAACQAAARAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAJQgFAHgJAFQgKAFgLAAQgUAAgMgOg");
	this.shape_19.setTransform(603.525,663.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CC0033").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQgBgHgEgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_20.setTransform(593.3,663.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CC0033").s().p("AATAyIAAgoIglAAIAAAoIgXAAIAAhjIAXAAIAAAqIAlAAIAAgqIAXAAIAABjg");
	this.shape_21.setTransform(582.7,663.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CC0033").s().p("AAWAyIAAglIgVAAIgVAlIgXAAIAYgoQgKgEgFgGQgFgIAAgJQAAgOALgJQALgJARAAIAsAAIAABjgAgLgbQgFAEAAAHQAAAGAFAEQAEAEAHAAIAWAAIAAgdIgVAAQgHAAgFAEg");
	this.shape_22.setTransform(566.725,663.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CC0033").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIAOAAIAAgHQgBgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDADgFIAAgTIgMAAQgMAAgGAEg");
	this.shape_23.setTransform(556.8,663.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CC0033").s().p("AAUAyIAAgoIgnAAIAAAoIgWAAIAAhjIAWAAIAAAqIAnAAIAAgqIAWAAIAABjg");
	this.shape_24.setTransform(546.2,663.225);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_25.setTransform(536.025,663.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#CC0033").s().p("AghAmQgNgOAAgYIAAAAQABgPAFgLQAGgMALgHQAKgGANAAQAUAAANANQAMANACAVIAAAFQAAAPgGAMQgGALgLAGQgKAHgOAAQgUAAgNgOgAgRgZQgGAJAAARQAAAQAGAIQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgQgHgIQgGgJgLAAQgKAAgHAIg");
	this.shape_26.setTransform(525.95,663.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CC0033").s().p("AgKAyIAAhRIghAAIAAgSIBXAAIAAASIghAAIAABRg");
	this.shape_27.setTransform(515.825,663.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CC0033").s().p("AgeAmQgMgNAAgZIAAgBQAAgWAMgOQAMgOAUAAQASAAALAKQAMALAAAQIgVAAQAAgIgGgFQgFgGgJAAQgKAAgGAIQgGAHAAARIAAACQAAARAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAJQgFAHgJAFQgKAFgLAAQgUAAgMgOg");
	this.shape_28.setTransform(506.275,663.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CC0033").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_29.setTransform(496.05,663.25);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CC0033").s().p("AAcBEIAAg2QgPAEgOAAQgZAAgMgLQgMgJgBgVIAAgsIAYAAIAAAsQgBANAHAFQAGAFAOAAQAOAAAPgEIAAg/IAYAAIAACHg");
	this.shape_30.setTransform(484.25,661.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(204,0,51,0)").s().p("AVMT3IgBAAIgBgDIgDgIQAAgGAGgDQAEgDAHABIAFACQAFAEAAAHIAAAEQgCAFgIACIgDABgA1dkoQgGgFACgHQABgHAOgIQBOgqBkhYICoiTQA1grBlhEIJDmJQBKgyAfgXQA6grApgnQAKgKAMgDQANgDAEAKQAEALgRAOQiaB9lhDpQlUDgikCKQhXBMgtAlQhNBCg9AoQgRALgJAAQgHgBgGgFg");
	this.shape_31.setTransform(709.86,382.8813);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CC0033").s().p("A7hZ7QgRAAgGgGQgHgHACgTIAVjiQACgXAJgJQAEgEAFgBIgDgCIgKgFIAAABQgIAOgSAcQgPAZgCAUIgBARQgDAJgIACQgJABgFgJQgEgHABgKQABgbANgZIAQgZQAKgQAFgJQAFgMADgEQAIgIAIACQAEABADAFIACAFIABAAQAJgCAPAIQAJAFARAOIAUARIAcAYIAUANIAJAJQAHAGAQAJIAOAJIAOAKIAOAGQAJADAFAEQAHAFACAHQACAIgGAFQgHAHgQgIQgPgHgUgNQgbgRgcgVQgugmgagUIgBAJQgOA1gGBEQgEAogEBSQGgAJDUgGQFdgJETgyQgYg1gPhzQgNhogVg2QgEAFgFAKQgRAigKAmIgGAOQgFAHgIgBQgGgBgDgIQgCgGABgIQACgPANgfIARgmQAIgSAGgHQAEgEAGgCIABgDQADgGAIgBQAHgBAGAEQADACADAFQAPgDAYADQAsAGATAJQAjAPAKAdQAFAOgGAHQgEAEgGABQgGAAgFgCQgEgCgNgMQgQgOgXgKQgbgMgdgEQALAjAHAxIAOBkQAJA6AVA/QAKAcgIANQgIANgbAEQkSAulbAJQhHAChdAAQi6AAkUgHgAcaT3IgGgCIgCgBIgBgCQgDgIABgFQABgDAFgDQAGgCAGACQAHADACAHQACAHgHAEIgGADIgCABgAwUolQgJgIABgUQACgaAJgyIAFgaQAHgmAGgTQAIgVANgWQAJgQABgIIABgNQABgIADgEQAGgGAJADQAJADADAIQAFAMgIAUQgEAJgLAVQgLATgEALIgHAcQgPBDgGA5QBVgZA6gVIBkghQAogMA1gPIAngLQAqgLAUgBQARgBAEAKQACAIgIAGQgDADgLADIjEA1QhZAbhaAhIghAMQgTAGgQAAQgMAAgGgEgAvgpfQgIgCAAgLQABgKAGgKQCAjGBGhfQB0ieByhsQBGhCBfhIQA9guBxhPID5ivQAlgbAZgBQAJAAAHAGQAIAFgDAIQgCAGgQAFQgfAIgyAkIlDDmQhfBCgxApQiMByiLC3QhLBiifDvQgJANgIAAIgCAAg");
	this.shape_32.setTransform(654.7874,476.6833);

	this.instance = new lib.Анимация7("synched",0);
	this.instance.setTransform(659.55,465.25);
	this.instance._off = true;

	this.instance_1 = new lib.Анимация8("synched",0);
	this.instance_1.setTransform(659.55,465.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AAwA9IAAh5IAbAAIAAB5gAhKA9IAAh5IAbAAIAAAnIAbAAQAPAAAKAFQALAFAGAKQAGAIAAAMQAAATgOALQgNAMgVAAgAgvAnIAbAAQAKAAAGgFQAEgFAAgJQAAgJgEgGQgGgFgKAAIgbAAg");
	this.shape_33.setTransform(737.575,592.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AAnBPIAAgkIhNAAIAAAkIgbAAIAAg6IAKAAQALgNAEgKQAEgMABgRIABgvIBUAAIAABjIAQAAIAAA6gAgIgfQgCAggNAUIAtAAIAAhLIgdAAg");
	this.shape_34.setTransform(721.275,594.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgoAuQgPgRAAgcIAAgBQgBgRAIgPQAGgOAOgIQAMgIAQAAQAZAAAPAQQAPAQABAaIABAGQgBARgGAOQgIAOgMAJQgNAHgRAAQgZAAgPgRgAgUgdQgJALABAUQgBASAJALQAHAKANAAQAOABAIgMQAHgKAAgUQAAgSgHgLQgJgLgNAAQgNAAgHALg");
	this.shape_35.setTransform(707.65,592.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_36.setTransform(694.875,594.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_37.setTransform(682.425,592.325);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_38.setTransform(671.125,592.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgkAvQgQgQAAgcIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_39.setTransform(657.925,592.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_40.setTransform(644.425,592.325);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgsBFQgSgOgCgaIAdAAQABARAJAIQAIAHARAAQARAAAKgMQAJgNAAgYIg4AAIAAgWIA4AAQAAgYgKgNQgKgNgRAAQgQAAgIAIQgJAIgBARIgdAAQACgaARgPQARgPAbAAQATAAAPAJQAPAKAJASQAIARAAAXIAAANQAAAXgIASQgIARgPAKQgPAJgTAAQgcAAgQgPg");
	this.shape_41.setTransform(630.85,590.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgoA1QgLgLAAgPQAAgTAOgKQAPgKAaAAIAQAAIAAgIQAAgKgFgFQgFgGgKAAQgJAAgGAEQgGAFAAAIIgcAAQAAgKAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMAKABAUIAAA2QAAAQAEAKIAAACIgcAAIgDgMQgNAOgSAAQgSAAgMgKgAgQAJQgIAFAAAKQAAAIAFAFQAGAEAIAAQAHAAAIgDQAHgFADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_42.setTransform(437.375,592.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_43.setTransform(425.425,592.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AAYA9IAAgxIgvAAIAAAxIgbAAIAAh5IAbAAIAAAzIAvAAIAAgzIAbAAIAAB5g");
	this.shape_44.setTransform(413.15,592.325);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_45.setTransform(399.95,592.325);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_46.setTransform(387.125,592.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgoAuQgPgRAAgcIAAgBQAAgRAGgPQAIgOANgIQAMgIAQAAQAZAAAOAQQAQAQABAaIAAAGQABARgIAOQgGAOgOAJQgMAHgRAAQgZAAgPgRgAgVgdQgHALAAAUQAAASAHALQAIAKANAAQAOABAHgMQAIgKAAgUQAAgSgIgLQgHgLgOAAQgMAAgJALg");
	this.shape_47.setTransform(367.95,592.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgnA9IAAh5IBPAAIAAAWIg0AAIAABjg");
	this.shape_48.setTransform(357.25,592.325);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgoAuQgPgRAAgcIAAgBQgBgRAIgPQAGgOAOgIQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAGQAAARgGAOQgIAOgNAJQgMAHgRAAQgYAAgQgRgAgUgdQgJALABAUQgBASAJALQAHAKANAAQAOABAHgMQAIgKAAgUQAAgSgIgLQgHgLgOAAQgNAAgHALg");
	this.shape_49.setTransform(345.2,592.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_50.setTransform(333.025,592.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AglAvQgPgRABgdIAAgCQAAgcAOgQQAPgRAZAAQAWAAANANQANAMABAVIgZAAQgBgLgGgGQgIgHgJAAQgNAAgHAKQgHAJAAAUIAAAEQAAATAHAKQAHAJANAAQAJAAAIgFQAGgHABgIIAZAAQAAALgHAKQgGAKgMAFQgLAGgNAAQgZAAgPgQg");
	this.shape_51.setTransform(320.05,592.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgkAvQgQgQAAgcIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_52.setTransform(307.825,592.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AAXA9IAAgpQgKADgMAAQgYAAgNgMQgNgLAAgXIAAglIAbAAIAAAlQAAAOAGAFQAGAFALAAQALAAALgCIAAg7IAcAAIAAB5g");
	this.shape_53.setTransform(295,592.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_54.setTransform(282.3,592.325);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_55.setTransform(269.475,594.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgNA9IAAhjIgnAAIAAgWIBpAAIAAAWIgoAAIAABjg");
	this.shape_56.setTransform(257.025,592.325);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgkAvQgQgQAAgcIAAgDQAAgRAHgPQAHgOAMgIQANgIAPAAQAYAAAOAQQANAQAAAdIAAAKIhOAAQABAPAJAIQAJAJAMAAQATAAAMgOIAPANQgIALgMAGQgMAGgPAAQgZAAgQgQgAgQggQgHAIgBAOIAzAAIAAgCQgBgOgHgHQgGgHgMAAQgKAAgHAIg");
	this.shape_57.setTransform(245.275,592.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AArA9IAAhQIgiBQIgRAAIghhQIAABQIgcAAIAAh5IAiAAIAjBXIAkhXIAiAAIAAB5g");
	this.shape_58.setTransform(230.3,592.325);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgoAuQgPgRAAgcIAAgBQgBgRAIgPQAGgOAOgIQAMgIAQAAQAYAAAPAQQAQAQABAaIAAAGQAAARgGAOQgIAOgNAJQgMAHgRAAQgYAAgQgRgAgUgdQgJALABAUQgBASAJALQAHAKANAAQAOABAHgMQAIgKAAgUQAAgSgIgLQgHgLgOAAQgNAAgHALg");
	this.shape_59.setTransform(215.15,592.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("Ag0BVIAAinIAZAAIABANQAMgPAUAAQAWAAANARQAMAQAAAeIAAABQAAAbgNARQgMARgWAAQgTAAgMgNIAAA5gAgZgwIAAA1QAHAOARAAQAMAAAIgKQAHgKAAgVQAAgSgHgLQgIgLgMAAQgRAAgHAOg");
	this.shape_60.setTransform(202.375,594.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_61.setTransform(190.025,592.325);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AAYA9IAAhQIgvBQIgbAAIAAh5IAbAAIAABQIAvhQIAbAAIAAB5g");
	this.shape_62.setTransform(176.3,592.325);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AArA9IAAhQIgiBQIgRAAIghhQIAABQIgcAAIAAh5IAiAAIAjBXIAkhXIAiAAIAAB5g");
	this.shape_63.setTransform(161,592.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgoA1QgLgLAAgPQAAgTAOgKQAPgKAaAAIAQAAIAAgIQAAgKgFgFQgFgGgKAAQgJAAgGAEQgGAFAAAIIgcAAQAAgKAHgJQAHgJALgFQALgFAOAAQAVAAANALQAMAKABAUIAAA2QAAAQAEAKIAAACIgcAAIgDgMQgNAOgSAAQgSAAgMgKgAgQAJQgIAFAAAKQAAAIAFAFQAGAEAIAAQAHAAAIgDQAHgFADgGIAAgXIgOAAQgPAAgHAFg");
	this.shape_64.setTransform(140.425,592.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAUA9IghgwIgOAAIAAAwIgbAAIAAh5IAbAAIAAAxIAMAAIAhgxIAhAAIgsA6IAwA/g");
	this.shape_65.setTransform(128.575,592.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("Ag0A9IAAh5IAyAAQAYAAANAJQANAJAAAQQAAAIgGAHQgFAHgKADQAMACAHAHQAHAIAAAKQAAARgNAJQgMAJgYAAgAgYAnIAcAAQAVAAAAgPQAAgPgVAAIgcAAgAgYgKIAWAAQAWAAAAgNQAAgPgVAAIgXAAg");
	this.shape_66.setTransform(115.225,592.325);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgoAuQgQgRAAgcIAAgBQABgRAGgPQAIgOAMgIQANgIAQAAQAYAAAPAQQAQAQABAaIABAGQAAARgIAOQgGAOgNAJQgNAHgRAAQgZAAgPgRgAgVgdQgHALgBAUQABASAHALQAIAKANAAQAOABAHgMQAIgKAAgUQAAgSgIgLQgIgLgNAAQgMAAgJALg");
	this.shape_67.setTransform(101.8,592.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAeA9IAAhjIgiAAIgCAqQgCAegKANQgJAOgUAAIgIAAIgBgXIAGAAQAJgCAEgJQAEgKABgZIADg0IBWAAIAAB5g");
	this.shape_68.setTransform(88.025,592.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgoAuQgPgRAAgcIAAgBQAAgRAGgPQAIgOANgIQAMgIAQAAQAZAAAOAQQAQAQABAaIAAAGQABARgIAOQgGAOgOAJQgMAHgRAAQgZAAgPgRgAgVgdQgHALAAAUQAAASAHALQAIAKANAAQAOABAHgMQAIgKAAgUQAAgSgIgLQgHgLgOAAQgMAAgJALg");
	this.shape_69.setTransform(75.45,592.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgzBSIAAijIBnAAIAAAXIhLAAIAACMg");
	this.shape_70.setTransform(63.075,590.225);

	this.instance_2 = new lib.Анимация11("synched",0);
	this.instance_2.setTransform(401.65,590.35);
	this.instance_2._off = true;

	this.instance_3 = new lib.Анимация12("synched",0);
	this.instance_3.setTransform(401.65,590.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FF3333").s().p("A+YRtQgHgBgDgDQgFgGAIgGQAHgGAJAAQE6gZD1glQEpgtD8hHQDBg3DlhXQCcg8EAhtQGri0Dnh7QFii8DzjWQBihWBFhTQArgzBNhtIDRkkQA8hUAYg1QAUgvALg+QAFgZAEgkQgJALgJAIQgMAKgUANQghAXgSAIQgXALgsAJQgyAJgTAHIgTAHQgMADgIgCQgMgDgGgLQgGgLADgMQAHgSAcgKQAUgHAxgJQAsgJAXgKQASgIAVgPQAxghAWgmIASgeQANgRAQgBQAMAAAJAIQAJAJAAALQAAAIgEAJQAGAEAEAHQAFAMgGAbQgIAnAFA5IAKBhQAGBOgOBXQgDATgHAIQgIAIgNgBQgOgBgHgKQgIgKAAgQQAAgKAEgUQAHgpAAgpQAAgWgHhIQgIAdgJAYQgXA9g2BKIhfB9QgXAhglA3Ig7BZQjwFenBEUQizBujqBvQibBJkTB1QlRCQjKBKQktBukAA5QiYAjjBAbQh0ARjpAbQhCAIgkACIgnABQgiAAgegEg");
	this.shape_71.setTransform(520.2296,427.7266);

	this.instance_4 = new lib.Анимация15("synched",0);
	this.instance_4.setTransform(520.2,427.7);
	this.instance_4._off = true;

	this.instance_5 = new lib.Анимация16("synched",0);
	this.instance_5.setTransform(520.2,427.7);

	this.instance_6 = new lib.Анимация17("synched",0);
	this.instance_6.setTransform(228.2,313.95);
	this.instance_6._off = true;

	this.instance_7 = new lib.Анимация18("synched",0);
	this.instance_7.setTransform(228.2,313.95);
	this.instance_7._off = true;

	this.instance_8 = new lib.Анимация23("synched",0);
	this.instance_8.setTransform(475.3,230.55);
	this.instance_8._off = true;

	this.instance_9 = new lib.Анимация24("synched",0);
	this.instance_9.setTransform(475.3,230.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},176).to({state:[{t:this.instance_1}]},15).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33}]},1).to({state:[{t:this.instance_2}]},472).to({state:[{t:this.instance_3}]},11).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.instance_4}]},22).to({state:[{t:this.instance_5}]},29).to({state:[{t:this.instance_6}]},400).to({state:[{t:this.instance_7}]},16).to({state:[{t:this.instance_7}]},44).to({state:[{t:this.instance_8}]},238).to({state:[{t:this.instance_9}]},12).wait(297));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(176).to({_off:false},0).to({_off:true},15).wait(1543));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(664).to({_off:false},0).to({_off:true},11).wait(1059));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(698).to({_off:false},0).to({_off:true},29).wait(1007));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1127).to({_off:false},0).to({_off:true},16).wait(591));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1127).to({_off:false},16).to({startPosition:0},44).to({_off:true},238).wait(309));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1425).to({_off:false},0).to({_off:true},12).wait(297));

	// Картинки
	this.instance_10 = new lib.Растровоеизображение6();
	this.instance_10.setTransform(651,76,0.83,0.83);

	this.instance_11 = new lib.PXL_20221004_092747824();
	this.instance_11.setTransform(136,-41,0.2003,0.2003);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#CC0033").s().p("AFZZTIgtAAIgsAAIgHgBIgHgBIgHgCIgGgCIgGgCIgBgBIgHAAIgGgBIgGgBIgFgCIgGgCIgFgCIgCgBIgHAAIgIgBIgHgBIgLgCIgFgCIgGgCIgHgCIgHgCIgEgCIgFgCIAAAAIgEgCIgIgBIgHgBIgGgBIgFgBIgFgCIgHgDIgBAAIgIgBIgIgBIgHgCIgHgBIgHgDIgHgDIgFgCIgFgDIgFgCIgBAAIgHgBIgGAAIgGgBIgLgCIgGgBIgFgCIgFgCIgCAAIgIgBIgHgBIgIgBIgKgCIgGgCIgGgCIgGgBIgLAAQgJAAgKgCQgJgBgJgEIgQgEIgNgDIgNgEIgIAAIgHgBIgIAAIgGAAIgMgCIgHgBIgEgCIgFgCIgDgBIgIAAIgHgBIgHAAIgGAAIgMgBIgHgBIgFgBIgFgCIgFgCIgGgBIgGgBIgGgBIgGgCIgEgBIgEgCIgEgDIgIAAIgHAAIgHAAIgNgBIgMgCIgMgDIgFgCIgDAAIgIgBIgHAAIgIAAIgMgBIgMgBIgMgCIgFgCIgEgCIgCgBIgHAAIgIAAIgGAAIgGAAIgGgBIgGgBIgHgCIgHgDIgDgDIgFAAIgGgBIgGgCIgFgCIgFgDIgHgBIgIAAIgHAAIgHgCIgHgBIgGgCIgGgDIgBAAIgFAAIgGgBIgFAAIgGAAIgLgCIgGgBIgHgCIgFgEIgIAAIgHAAIgHgBIgGgBIgGgBIgGgDIgFgDIgHAAIgGgBIgGgBIgGgBIgGgCIgEgDIgFgCIgEgDIgEgCIgEgDIgEgBIgEgBIgGgCIgFgCIgGgDIgEgBIgFgBIgFgCIgFgCIgFgDIgEgDIgFgDIgFgDIgJgHIgDgDIgCgEIgEgBIgEgCIgEgDIgDgCIgFgBIgFgCIgEgDIgEgDIgGgEIgGgEIgEgCIgEgCIgFgEIgEgEIgHgEIgHgCIgHgCIgFgDIgBAAIgDgDIgEgCIgFgEIgGgEIgFgEIgFgEIgFgBIgGgDIgHgDIgDgCIgDgDIgGgDIgFgDIgGgCIgHgCIgGgDIgFgDIgEgEIgDgEIgDgFIgHgDIgGgDIgGgDIgFgDIgEgDIgEgDIgEgEIgFgEIgEgFIgDgCIgBgBIgEgEIgDgDIgEgCIgFgCIgEgDIgEgDIgEgEIgGgDIgFgEIgEgEIgEgEIgDgEIgDgEIgEgEIgDgEIgFgEIgEgCIgFgCIgFgDIgEgDIgDgEIgDgFIgDgFIgCgFIgDgDIgEgEIgFgGIgFgEIgEgFIgFgEIgEgFIgEgDIgEgEIgDgFIgEgGIgEgGIgDgGIgEgEIgDgEIgCgEIgCgFIgCgGIgCgCIgDgDIgEgEIgDgEIgCgEIgDgGIgCgHIgDgGIgCgFIgDgGIgDgFIgDgGIgGgLIgDgGIgCgGIgDgGIgCgFIgDgFIgCgFIgCgFIgBgGIgBgLIgDgGIgDgGIgCgGIgBgHIAAgHIgBgHIgBgEIgBgCIgEgFIgDgEIgDgGIgCgFIgCgGIAAgFIgBgFIgBgHIAAgHIgBgFIgCgFIgCgFIgBgFIgBgGIgBgFIgBgGIAAgHIgCgGIgCgGIgBgFIgCgGIgCgGIgDgGIgCgGIgCgHIgBgHIgBgNIgBgGIgBgDIgCgGIgCgGIgBgGIgCgNIgBgGIAAgHIgDgGIgCgGIgBgHIgBgHIgBgHIgCgDIgDgHIgCgGIgBgGIgBgHIgBgHIAAgGIAAgHIgDgGIgCgGIgBgGIgBgHIgBgGIgCgHIgDgNIgCgGIgBgFIgBgFIgBgCIgDgFIgBgDIgBgCIgBgGIgBgFIgBgIIgBgPIAAgHIgBgHIgCgHIgCgHIgCgGIgBgGIgBgHIgBgGIAAgGIAAgOIAAgHIAAgGIgBgHIgFgXIgHgeQgDgOgBgPIgBgcIgBgRIgBgFIgCgGIgCgGIgBgEIgBgFIAAgEIgBgEIgEgMIgEgNQgBgKAAgLIgBgOIAAgNIAAgNIgBgGIgCgGIgBgHIgBgGIgDgOIAAgHIAAgHIgBgHQgLgnABgoIABhaIAAhMIAAgJIABhaQAAgIACgHIACgFIACgEIAEgFIADgGIAEgGIABgGIAAgFIABgGIACgFIACgFIACgGIAAgBIABgIIABgIIABgHIACgLIACgGIADgGIAAgBIABgHIAAgIIABgGIABgGIACgFIACgFIADgFIABgEIACgGIACgGIADgFIAAgHIABgGIABgGIABgHIADgMIABgHIACgGIABgEIABgFIAAgBQgCgBgDABIgFABIgEABIgCAAIgFgBIgFgBIgFgBIgFgDIgEgDIgEgDIgDgEIgDgEIgDgFIgBgFIgBgFIgBgFIABgGIABgFIABgFIACgFIACgFIAEgFIABgCIACgFIACgFIADgFIADgGIACgFIACgGIADgFIACgGIADgFIADgFIADgEIADgDIADgEIABgEIACgFIACgGIADgGIAEgFIADgEIADgFIABgFIACgFIABgFIACgEIADgDIADgFIADgEIADgFIAEgFIADgEIADgEIABgCIACgGIADgGIADgFIACgGIACgFIACgFIADgEIABgFIAAgFIACgGIACgFIAEgFIADgEIAEgHIADgGIADgEIACgEIADgEIAEgEIADgEIAFgDIAEgDIACgCIADgBIAFgBIAGgBIAGgBIACgBIABgBIAEgFIAEgFIAFgEIAFgEIACgCIADgFIAEgEIAEgFIAIgIIAFgEIAEgDIAFgEIABAAIADgFIADgFIADgFIAIgJIAEgFIAEgFIADgDIACgDIADgFIADgDIAEgDIAEgEIAEgDIAFgEIAEgEIAFgEIAFgFIAJgKIAFgEIAEgGIAEgFIAEgFIAFgEIAGgEIAFgEIAKgIIAGgEIAEgEIAFgEIAFgEIAEgEIADgEIAEgEIAFgGIAEgEIAFgDIAFgDIAEgEIAEgDIAEgEIAFgFIAGgEIAGgFIAEgDIAEgDIAEgFIAEgDIAEgDIAFgCIAFgDIAEgEIAEgEIADgDIAFgDIAEgDIAEgEIADgEIAEgEIAFgDIAFgDIAFgFIAAAAIAEgFIAEgFIAEgFIAFgDIAGgDIAGgDIAEgDIgBAAIAEgEIAEgDIAFgGIADgFIABgBIAEgEIAFgDIAEgDIAFgDIADgEIADgEIAEgDIAEgDIAGgDIAGgDIADgCIAEgFIAGgEIAEgFIAFgEIAEgFIADgDIAEgDIAFgDIADgFIAEgEIAEgFIAEgFIAFgEIAEgFIAGgEIAEgFIADgEIAFgDIAEgCIAFgDIAEgDIAFgDIAGgFIAEgEIAEgEIAEgDIADgCIAEgFIAEgEIAEgFIAFgEIAEgFIAEgEIAEgEIAFgDIAGgDIAHgDIACgCIAFgEIAEgFIAEgFIAGgEIAGgEIADgCIAFgFIADgFIAEgFIAEgFIAEgFIAFgEIAFgDIAHgDIAGgDIACgCIAFgEIAEgEIAGgEIAFgEIALgGIAFgFIAFgFIADgDIAEgDIAFgDIAEgCIAEgDIAEgCIAEgCIAFgCIAEgBIAEgBIABgBIAEgFIAFgEIAGgDIAFgCIAGgCIAFgBIAFgBIADgCIAFgDIAGgCIAFgCIAEAAIAIgBIAHgBIABAAIAEgCIAEgCIAFgCIAEgBIAGgBIAGgBIAGAAIAGAAIABgBIAGgCIAFgCIAIgCIAHgCIAFgCIAFgCIAGgCIAFgBIAOgCIAHgBIAAAAIAGgCIAFgCIAFgCIAIgBIAHgBIAFgBIAEAAIAHAAIAIAAIAFgCIAGgDIAFgBIAIgBIAHgBIAEgBIAFAAIAEAAIAFAAIAFAAIAFgDIAGgCIAGgCIAGgCIAKgEIALgDQAKgCAKAAIAPgBIANAAIAFAAQANgGAPgBQATgCATAAIAmAAIAmAAIAfAAQARgHASgBIAsgBIArAAIArAAQAVgBAVAFIAMAEIAAABIAHAAIAIABIAGACIAGACIAFADIAFADIAFAEIAFADIAGACIAFABIAFACIAFACIAEADIAFABIAFAAIAGACIAFACIAFAEIAGAAIAGABIAFACIAFACIAFADIAIABIAHAAIAHAAIAGABIAGACIAFACIAEACIAEADIAEABIAEABIAHADIAGACIABABIAGAAIAGABIAGABIAFACIACAAIAEACIAFACIACABIAHAAIAHABIAIABIAEAAIAFABIAEACIAEACIADADIAGAAIAGABIAGACIAFADIAFADIAGACIAFACIAEACIAEADIAHABIAHACIAFABIAEADIAEACIAFABIAGABIAFABIAGADIAEADIAGABIADAAIACABIAFABIAFACIAFADIAFADIAFAEIADACIABABIADACIAHADIAEADIAFADIAGACIAHADIAHADIAFADIAJAGIAFADIAEAEIAGAEIAFACIAEADIAEACIAEAEIAEACIAFADIACAAIAGACIAGACIAFADIAFADIAEAEIACACIACADIADAEIAFACIAFADIAFACIAAAAIADACIADACIAEABIADADIAAAAIAAAAIAHADIAIADIAGAEIAGAFIAFAFIAEACIAEACIAEADIABAAIAGADIAHADIAEADIAEAEIAEADIAFAFIAFAEIAFAEIAGADIAGADIAFAEIAFAFIAFAEIAFAEIAEAFIAFAFIAFAEIAEAFIAFAEIACADIAEACIAEADIAFACIAEADIAFAEIAEADIAFAEIAFADIAEAEIAEAEIACACIABACIADAEIADACIAGADIAEADIAFADIAFACIAEACIABAAIAFADIAFAEIAEAFIAEAFIADACIADACIADACIAEACIAEACIAGADIAFAEIAFAEIAFAFIAFAFIAFAEIAGACIAGAEIAFAEIAFAEIAEAEIAEADIAEADIAFAEIAEADIAEAEIADAEIADAEIADADIADAFIAFAEIAFACIAEACIAGAEIAGAEIAEAEIAEADIADAEIABABIBKDEIAAAAIgDgDIgFgGIgEgFIgFgFIgDgGIgEgGIgEgGIgFgFIgEgEIgEgFIgEgFIgFgGIgEgFIgDgFIgCgFIgEgEIgFgFIgEgFIgFgEIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgGgDIgGgEIgFgFIgEgDIgDgEIgEgEIgCgCIgFgCIgFgCIgFgDIgEgDIgEgEIgEgEIgEgEIgDgEIgEgEIgEgEIgDgFIgBgBIgDgCIgDgCIgFgEIgFgFIgDgCIgGgDIgGgDIgGgDIgEgFIgEgEIgEgEIgDgDIgDgCIgFgCIgFgCIgFgDIgFgEIgFgCIgEgDIgFgCIgEgEIgEgEIgDgFIgBAAIgFgDIgFgDIgGgDIgGgDIgFgDIgEgEIgEgFIgEgEIgDgEIgDgEIgFgDIgEgDIgEgEIgGgDIgGgEIgGgEIgEgDIgEgCIgDgEIgDgEIgEgDIgEgFIgFgEIgEgFIgFgEIgEgFIgDgBIgGgDIgHgDIgFgEIgFgFIgEgDIgDgEIgEgEIgCgBIgEgCIgGgCIgFgDIgFgEIgGgCIgFgDIgFgDIgEgEIgDgFIgHgCIgGgCIgGgEIgFgEIgEgCIgDgCIgGgCIgFgCIgFgCIgEgDIgFgDIgDgDIgEgDIgCgFIgGgCIgGgDIgGgEIgGgDIgGgEIgFgCIgEgCIgFgDIgEgDIgDgDIgDgDIgCgCIgDgDIgHgDIgHgDIgGgCIgGgCIgFgDIgFgDIgEgCIgEgCIgFgDIgFgEIgEgEIgBAAIgGgBIgHgCIgFgBIgEgDIgFgCIAAAAIAAgBIgBAAIABABIgGgBIgHgCIgFgCIgFgCIgFgDIgFgBIgFgBIgGgCIgFgBIgEgDIgFgDIgBAAIgGgDIgHgDIgBAAIgHgCIgGgBIgFgCIgEgCIgEgCIgHgBIgHAAIgHgCIgHgBIgEgCIgCAAIgGgDIgDAAIgHgBIgGgBIgGgBIgGgCIgGgCIgFgDIgGgCIgGgCIgFgCIgFgCIAAAAIgFgBIgFAAIgIAAIgHgCIgIgBIgFgCIgEgCIgFgDIAAAAIgGgBIgHgBIgFgCIgFgCIgEgDIgBAAIAAAAIAAAAIAAAAIgGgBIgHgBIgFgCIgFgDIgEgCIgHgBIgGgCIgDgBIgCgBIgFgCIgFgDIgEgEIgEgEIgBAAIgHgBIgHgBIgFgBIgGgDIgFgCIgPAAIgWAAIgfAAIgkAAIgcAAIgOABIgTAGQgMADgNAAIgggBIgkAAIglAAQgOAAgNACIgGACIgFABIgEACIgGABIgGABIgHAAIgGAAIgIAAIgHAAIgIABIgHAAIgBAAIgGADIgGACIgEACIgEABIgEACIgFADIgEACIgHABIgHABIgHABIgHAAIgFAAIgFAAIgGAAIgGADIgGADIgHABIgGABIgHABIgHAAIgIAAIgHAAIgFADIgFACIgFABIgGACIgGAAIgHABIgIAAIAAAAIgHADIgGADIgGACIgFABIgGACIgFACIgFACIgGABIgHABIgIABIgHABIgFACIgFADIgGABIgGACIgHAAIgGABIgEACIgFACIgEACIgGABIgGACIgDACIgDACIgBABIgEADIgEADIgFADIgFABIgFACIgFABIgGAEIgEAEIgEAEIgEADIgEAEIgFADIgFADIgFADIgFADIgCADIgGAEIgFAEIgFAFIgGADIgGACIgCACIgEAGIgFAGIgEAGIgFAEIgEADIgFAEIgFADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgFACIgEADIgFABIgBABIgEAEIgEAFIgEADIgEAGIgEAFIgEAEIgFADIgEADIgCADIgGAEIgEAEIgEAEIgFADIgEACIgEADIgEACIgDADIgEAEIgEAEIgEAEIgFAEIgEAEIgEAEIgEAGIgFAFIgDAEIgFADIgFAEIgEAEIgEAEIgEAEIgEAEIgEAEIgGAFIgEADIgEAEIgCABIgCACIgIADIgCADIgDADIgFAFIgFADIgGAEIAAAAIgEAGIgEAEIgFAEIgEAFIgFAEIgEADIgBAAIAFgDIgGAFIgFAEIgGADIgDACIgFAFIgEAGIgFAEIgEAEIgFADIgFAEIgEAEIgEADIgEAEIgFAEIgFAEIgBABIgDAEIgEAEIgEAEIgFADIgEACIgBAAIgFACIgFAFIgFAEIgGAFIgGAEIgFAFIgGAFIgEAEIgFADIgEAEIgFADIAAABIgBAAIgCADIgDADIgEAGIgFAFIgFAEIgFAEIgFADIgGAFIgFAEIgGAEIgFAEIgFAEIgEAEIgIAKIgJAKIgBAAIgJAKIgJAJIgKAIIgJAIIgEAFIgFAGIgEAFIgFAFIgEAGIgCADIgEAGIgEAGIgFAFIgDAEIgEADIgFADIgEADIgFAGIgFAFIgDAEIgDAEIgEAEIgFAFIgFAEIgCADIgDADIgEAEIgFAEIgCAFIgDAEIgEAGIgEAFIgFAFIgFAFIgDAEIgCAEIgCAFIgDAEIgDAEIgEAFIgDAEIgEAFIgDAGIgEAFIgEAGIABAOIAAANIgBAMIAAANIgCAMQgCAJgEAIIgBAHIAAAGIAAAGIgBAGIgBAGIgBAGIgBAFIgCAFIgDAGIAAAKIgBAMIgCAMIgDAMIgEAMIgJASIgBAGIgCAHIgCAHIgCAGIgBAHIgBAHIAAAGIgBAHIgBAGIgBAGIgCAFIgCAFIgCAFIgCAFIgBAEIgDAHIgDAGIAAAFIgBAFIAAAHIgCAGIgBAHIgCAFIgDAGIAAABIgBAHIAAAGIgBAHIgBAHIgCAGIgCAFIgCAGIAAADIgCAIIgBAHIgCAIIgCAGIgDAGIgEAFIgCAEIgCAEIAAAzIAABBIAABDIAABIQAAARABASIACAGIABAHIACAHIABAHIABAGIABAFIAAAGIABAHIAAAHIADAPIADAOIACAPIAAAQIAAAOIABAVIABACIACAFIACAFIABAGIACAEIAAAFIACAGIACAGIABAGIABAFIABAGIAAABIABAFIABAGIAAAGIABAGIAAAHIAAAGIAAAGIAAAHIABAGIAEAVIAFAUIAEAUQADANAAANIABAVIAAAPIACAFIACAGIACAFIABAFIABAFIABAHIAAAHIAAAHIABAHIAAAHIABADIADAFIACAFIABAGIABAFIACAGIABAGIACAGIABAGIACAGIABAGIABAGIABAGIAAABIACAFIACAFIABAFIABAFIABAHIAAAGIABAGIAAAGIAEAHIACAHIABAFIABAGIABAGIABAHIAAAAIACAFIACAFIABAEIABAGIABAHIABAIIAAAHIABACIACAFIACAGIACAFIABAHIABAHIAAAHIABAHIAAABIADAGIACAGIACAHIACAGIACAHIADAHIABAHIABAHIABAHIABAHIABACIADAEIABAFIABAFIABAFIABAFIAAAFIABAGIAAAGIADAEIADAFIACAGIACAFIADAFIABAGIACAGIABAHIABAGIAAAGIADAGIACAFIACAGIABAFIABAGIAAAGIAGALIAGANIAGALIAFAKIAGANIAFAMIAFAGIADAEIAEAEIACAEIADAFIABAFIACADIADAEIAAAAIACAEIADAEIADAEIACAFIAEADIAEAFIAFAEIAEAFIAFAEIAEAFIAFAEIAFAGIADAEIADAEIAEAEIAAABIAFADIAFAEIAFAEIAEAEIADAEIAEAEIAEAEIADAEIAEAFIABAAIAEADIAEADIAEAEIAFADIAFADIAFADIAEADIAEADIAEAEIAEADIAFAFIAEAFIAGAEIADACIACABIACABIAHADIAHACIAGAEIAFADIAEAFIAEAFIAEABIAEACIAGAEIAHAEIAEACIADADIAGACIAGABIAFADIAFAEIAEADIAFAEIAFAEIAEADIAFADIAEABIAGACIAGADIAGADIAFADIAFADIAFAEIAFAEIAFADIAFADIAFACIAEADIAGAEIAFACIAEACIAFACIAFAEIAGACIAFADIAFADIAEAEIADAEIAEAFIADACIADACIAEABIAGACIAGACIAFADIAGABIAHACIAGACIAFADIAGADIAFADIAGADIAFABIAFAAIAGABIAFABIAFACIAGACIAEACIAHAAIAIABIAFAAIAGABIAFABIAFACIAFACIAFACIAAAAIAFABIAGAAIAGAAIAFABIAGABIAGABIAFABIAGACIAFACIAGABIAHAAIAGAAIAGABIAFABIAFABIAGACIAEACIAFACIABAAIAGABIAEABIAGACIAFACIAGADIAAAAIAIAAIAHAAIAHABIAGAAIAGABIAHACIAHACIAGADIAGAAIAFAAIAFAAIAFAAIAHAAIAGAAIAHABIAGABIAHABIAHACIAGADIABAAIAIABIAHAAIAIAAIAHAAIAIABIAIABIAHABIAGACIAFACIAGACIACACIAGABIAGABIAGABIAEABIABABIAGACIABAAIAIAAIAHAAIAHABIAGAAIAHABIAGABIAGABIAFABIAFACIABAAIABABIAAgBIAAABIACAAIgBAAIABAAIABABIABAAIAGAAIAHABIAHAAIAGAAIAHABIAHAAIAGACIAHABIAFACIAEACIAFABIAFABIAFABIAGABIAFACIAGACIAHACIAFAAIAGAAIAFAAIAGABIAGAAIAGABIAGABIAFACIAFACIAFACIABAAIAHABIAGAAIAHABIAHABIAGABIAFACIAFADIACAAIAHAAIAGABIAHABIAHABIAHABIAFACIAGACIAFACIAGADIAFADIAHABIAGACIAHABIAGABIAGABIAGABIAFACIAFACIABABIAGAAIAGABIAGAAIAGABIAFACIAGACIAFADIAEADIADAAIAFACIAFACIAFACIABAAIAHAAIAGABIAGAAIAHABIAGACIAHACIAGADIADAAIAGABIAHABIAGABIAFACIAFACIAFACIAQAAIAPAAIAQAAIAQAAIAPAAIAQAAIAPAAIAQAAIAPAAIAOAAIAPAAIAOgBIACAAIAGgDIAFgCIAHgBIAHgBIAIgBIAGAAIAGAAIAGAAIAGAAIAGAAIAHAAIAGgBIAFgDIAGgCIAFgBIAGgBIAGgBIAGAAIAGgBIAFAAIAFAAIABAAIAGgDIAGgCIAGgCIAEgDIAFgCIAFgDIAFgCIAFgDIAFgCIAFgCIAGgCIAFgCIAEgCIAEgCIAGgDIAGgDIAGgDIAHgDIAHgDIAFgDIAGgCIABgBIAFgFIAFgEIAGgEIAFgCIAGgCIAFgCIAGgBIAGgEIAGgEIAGgDIAGgEIAHgDIACgDIAFgEIAGgFIAGgCIAFgCIAGgCIAGgCIAAgBIAEgDIgDADIAFgEIAEgDIAFgEIACgCIADgEIAEgEIAEgEIAFgCIAGgDIAGgCIADgDIADgBIAEgCIAFgCIABgBIAEgEIAEgDIAFgDIAFgDIAGgDIAGgCIAHgCIAGgEIAHgDIAGgEIAHgDIAEgEIAFgDIAFgCIAFgCIADgDIADgCIAFgEIAEgEIAGgDIAEgBIAEgCIAEgDIAEgDIAFgDIAEgDIADgCIAEgFIAEgEIAFgFIAGgEIAGgEIAFgEIAGgDIAGgCIACgDIAEgEIADgEIADgEIAEgDIAEgDIAEgDIAGgDIAFgDIAGgDIAFgDIAEgDIAEgDIACgBIAEgGIAFgFIAEgEIAFgDIAFgCIAGgCIAEgEIAFgDIAFgFIACgDIACgEIADgEIAEgEIAEgEIAEgEIAFgEIAEgDIAHgEIAGgEIACgDIACgDIAEgGIAEgFIAEgFIAEgDIAEgDIAFgCIACgEIADgEIADgEIACgFIAEgDIAEgEIADgEIAEgEIADgEIAEgEIAEgFIAEgDIADgHIADgFIAEgFIAFgFIABgCIACgFIADgFIACgFIADgEIAEgDIAEgEIAEgFIADgGIADgGIADgGIADgFIAEgGIADgFIAEgGIAEgFIAFgEIABgCIACgFIADgFIAAgCQBKgkBIgmIgDAEIgBAEIgCAFIgDAFIgEAFIgEAFIgEAEIgEAEIgDAFIgDAFIgCAFIgCAEIgDAFIgGALIgDAFIgEAEIgEAEIgDAEIgEAEIgCAEIgDAEIgCAEIgCAEIgDADIgCADIgBACIgCAFIgCAFIgFAGIgEAGIgEAEIgEAEIgDAFIgDAFIgCAFIgDAEIgCAFIgGALIgDAFIgEAEIgEAEIgEAFIAAAAIgCAFIgCAEIgFAGIgEAGIgFAGIgCAFIgCAFIgDAEIgEAEIgEAEIgEADIgBABIgEAFIgEAFIgEAEIgEAEIgEAEIgEAHIgDAHIgDAEIgEAFIgDADIgFADIgEADIgFADIgBACIgDAEIgCAEIgDAEIgDADIgFAEIgFAEIgFADIgFAEIgFADIgDACIgDADIgEAGIgFAGIgFAFIgDAEIgJAHIgEADIgFAFIgGAEIgEACIgDAEIgEAFIgEAEIgFADIgFACIgFACIgEAEIgFADIgFADIgEACIgEADIgEABIgDACIgFAGIgFAFIgEAFIgEAEIgFADIgHADIgDACIgDABIgFADIgEADIgDAFIgEAEIgFAEIgFAEIgFADIgFAEIgFADIgFAEIgFADIgHADIgGADIgCACIgEAEIgEAEIgEADIgGACIgGADIgDACIgEACIgKAHIgKAFIgJAFIgLAEIgMAFIgBABIgDADIgEADIgEADIgGADIgGACIgDADIgDACIgFACIgFACIgEAEIgEAEIgLAIIgLAIIgLAHIgLAEIgFACIgFAFIgGAEIgFADIgMAHIgLAHIgLAGIgFACIAAABIgHACIgGACIgEAEIgEADIgEADIgFADIgFACIgFACIgGACIgEACIgEACIgGADIgGADIgMAGIgMAGIgNAEIgEADIgGADIgHACIgEADIgEADIgGACIgGACIgGACIgHADIgGADIgGABIgGABIgGABIgGABIgIAAIgHABIgEACIgLADIgKACIgSABIgLABIgMAAIgMAAQgTAIgVAAIgxABIgsAAgAAMYTIgBAAIgBAAIACAAgAAIXEIABAAIgCAAgAkAWXIACAAIgCgBIgBAAIABABgA0Mo2IAAABIAAgBIAAgBIAAABgAxytnIgBACIABgBIABgCIgBABgAxet/IAAAAIABgBIgBABgAtsy9IABAAIAAAAIgBAAgAJP2OIABAAIgBAAgAkx3RIABAAIABgBIgBAAIgBABgAFY3XIABAAIgBgBIAAABgAE93gIAAAAIgBgBIAAAAIABABgAAj5GIABAAIACgBIgBAAIgCABgAAn5HIAAAAIABAAIgBAAg");
	this.shape_72.setTransform(814.8958,238.2977);

	this.instance_12 = new lib.Анимация9("synched",0);
	this.instance_12.setTransform(559.05,359.5);
	this.instance_12._off = true;

	this.instance_13 = new lib.Анимация10("synched",0);
	this.instance_13.setTransform(559.05,359.5);

	this.instance_14 = new lib.PXL_20221004_093034308();
	this.instance_14.setTransform(488,29,0.1325,0.1328);

	this.instance_15 = new lib.PXL_20221004_092924728();
	this.instance_15.setTransform(52,29,0.1328,0.1328);

	this.instance_16 = new lib.Анимация13("synched",0);
	this.instance_16.setTransform(468.8,294.65);
	this.instance_16._off = true;

	this.instance_17 = new lib.Анимация14("synched",0);
	this.instance_17.setTransform(468.8,294.65);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AA0BCIAAiDIAeAAIAACDgAhRBCIAAiDIAeAAIAAAqIAdAAQAQAAALAGQAMAFAHALQAGAIAAAOQAAAUgPANQgOAMgXAAgAgzArIAdAAQALAAAGgGQAFgGAAgKQAAgJgFgGQgGgGgLAAIgdAAg");
	this.shape_73.setTransform(792.375,547.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AAqBWIAAgoIhTAAIAAAoIgeAAIAAg/IALAAQAMgOAFgMQADgMABgTIACgzIBbAAIAABsIASAAIAAA/gAgJgiQgBAjgPAWIAxAAIAAhSIggAAg");
	this.shape_74.setTransform(774.65,549.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgrAyQgRgTAAgfIAAAAQgBgTAJgQQAHgQAOgIQAOgJARAAQAaAAASARQAQASACAcIAAAGQAAAUgIAPQgHAQgPAIQgNAJgTAAQgbgBgQgSgAgWggQgJALAAAWQABAVAHAMQAJALAOAAQAPAAAIgMQAJgMAAgVQAAgVgJgLQgIgMgPAAQgOAAgIAMg");
	this.shape_75.setTransform(759.8,547.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("Ag5BdIAAi2IAbAAIACANQANgQAVAAQAYAAAOASQAOASAAAgIAAACQAAAegOASQgOASgXAAQgVAAgNgOIAAA/gAgbg0IAAA5QAIAQASAAQAOAAAHgMQAJgKgBgYQABgTgJgMQgHgLgOAAQgSAAgIAPg");
	this.shape_76.setTransform(745.95,550.025);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgOBCIAAhsIgqAAIAAgXIBxAAIAAAXIgqAAIAABsg");
	this.shape_77.setTransform(732.475,547.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AAVBCIgkg0IgPAAIAAA0IgdAAIAAiDIAdAAIAAA0IAOAAIAjg0IAlAAIgwA/IA0BEg");
	this.shape_78.setTransform(720.2,547.6);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgoAzQgRgSAAgeIAAgDQAAgTAIgQQAHgPAOgJQAOgJAQAAQAbAAAOARQAPASAAAgIAAAKIhVAAQABARAKAJQAJAKAOAAQAUAAANgRIAQAQQgIAMgNAGQgNAHgRAAQgbAAgSgSgAgRgjQgIAIgCAQIA4AAIAAgDQgBgOgHgIQgHgHgMgBQgMABgHAIg");
	this.shape_79.setTransform(705.875,547.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAgBCIAAhrIgkAAIgDAtQgCAhgKAPQgLAOgVAAIgKAAIAAgYIAGgCQAKgBAFgKQAEgLABgaIADg5IBeAAIAACDg");
	this.shape_80.setTransform(691.225,547.6);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgxBLQgSgQgDgcIAfAAQADATAJAIQAJAJASAAQASAAALgOQAKgOABgaIg+AAIAAgYIA+AAQgBgbgLgOQgLgOgSAAQgSAAgJAJQgJAJgCATIgfAAQADgdASgQQASgQAeAAQAUAAARAKQARAKAJATQAJATAAAZIAAAOQAAAZgJAUQgJATgQAKQgRAKgUAAQgeAAgTgQg");
	this.shape_81.setTransform(676.425,545.325);

	this.instance_18 = new lib.PXL_20221004_093028404();
	this.instance_18.setTransform(608,114,0.1016,0.1016);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AA0BCIAAiDIAeAAIAACDgAhRBCIAAiDIAeAAIAAAqIAdAAQAQAAALAFQAMAGAHALQAGAJAAANQAAAUgPAMQgOANgXAAgAgzArIAdAAQALgBAGgFQAFgGAAgJQAAgLgFgFQgGgGgLAAIgdAAg");
	this.shape_82.setTransform(298.275,539.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AAjBVIAAgnIhiAAIAAiDIAdAAIAABsIAzAAIAAhsIAdAAIAABsIASAAIgCA+g");
	this.shape_83.setTransform(281.325,541.2);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgbA/QgMgEgHgKQgHgKAAgMIAeAAQgBAIAIAGQAHAEAKAAQALAAAGgEQAGgGAAgIQABgJgGgEQgFgFgMAAIgVAAIAAgUIAWAAQATgBAAgQQAAgIgGgEQgGgEgJgBQgJAAgHAGQgGAEAAAHIgeAAQAAgRAOgLQAPgMAWABQAZAAANAKQANAJAAATQAAAJgEAIQgGAGgKAFQAXAHAAAWQAAATgOALQgPAKgZABQgPAAgMgGg");
	this.shape_84.setTransform(266.85,539.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgrA5QgNgMAAgQQAAgVAQgKQAQgLAcAAIASAAIAAgJQAAgLgGgFQgGgHgKAAQgKAAgHAFQgGAFAAAIIgeAAQAAgLAHgJQAHgKANgFQAMgGAOABQAYgBANAMQAOAMABAVIAAA6QAAASAFALIAAACIgfAAQgCgEgBgJQgOAPgUABQgUAAgMgMgAgSAJQgIAHAAAKQAAAIAGAGQAFAEAKAAQAIAAAHgDQAIgFAEgHIAAgZIgQAAQgPAAgJAFg");
	this.shape_85.setTransform(253.725,539.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("Ag5BdIAAi2IAbAAIABANQAOgQAVAAQAYAAAOASQAOASAAAgIAAACQAAAegOASQgOASgYAAQgUAAgNgOIAAA/gAgbg0IAAA5QAIAQASAAQANAAAJgMQAHgKABgYQgBgTgHgMQgJgLgNAAQgTAAgHAPg");
	this.shape_86.setTransform(240.2,541.675);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgrBOQgRgSAAgfIAAgJQAAgpAPgZQAQgZAdgGQARgEAFgEQAEgDAAgHIAYAAQAAAMgEAIQgEAIgIAFQgIAEgVAFQgRADgKAKQgKAKgDASQASgSAXAAQAZAAAPARQAPAPAAAdIAAABQAAAdgRASQgQARgcAAQgaAAgRgSgAgWADQgIAJAAAUQAAATAIALQAIALAOAAQAPAAAIgLQAIgLAAgVQAAgRgIgKQgIgJgPAAQgOAAgIAJg");
	this.shape_87.setTransform(226.025,536.475);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AglBRQgRgLgJgTQgKgUAAgaIAAgJQAAgaAJgTQAKgUAQgLQARgKAVAAQAWAAARAKQAQAKAJAUQAKAUAAAaIAAAJQAAAagJATQgJAUgRALQgRAKgWAAQgUAAgRgKgAgegxQgMAQAAAcIAAAKQAAAdAMAQQALAQATAAQAVAAALgQQALgPAAgeIAAgJQAAgdgLgQQgMgQgUAAQgTAAgLAQg");
	this.shape_88.setTransform(210.225,536.975);

	this.instance_19 = new lib.Растровоеизображение11();
	this.instance_19.setTransform(86,139);

	this.instance_20 = new lib.Анимация19("synched",0);
	this.instance_20.setTransform(520.9,333.45);
	this.instance_20._off = true;

	this.instance_21 = new lib.Анимация20("synched",0);
	this.instance_21.setTransform(520.9,333.45);

	this.instance_22 = new lib.Анимация25("synched",0);
	this.instance_22.setTransform(530.2,309.35);
	this.instance_22._off = true;

	this.instance_23 = new lib.Анимация26("synched",0);
	this.instance_23.setTransform(530.2,309.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.instance_11},{t:this.instance_10}]}).to({state:[{t:this.instance_12}]},176).to({state:[{t:this.instance_13}]},15).to({state:[{t:this.instance_15},{t:this.instance_14}]},1).to({state:[{t:this.instance_16}]},472).to({state:[{t:this.instance_17}]},11).to({state:[{t:this.instance_19},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.instance_18},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73}]},1).to({state:[{t:this.instance_20}]},451).to({state:[{t:this.instance_20}]},16).to({state:[{t:this.instance_21}]},46).to({state:[{t:this.instance_22}]},236).to({state:[{t:this.instance_23}]},12).wait(297));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(176).to({_off:false},0).to({_off:true},15).wait(1543));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(664).to({_off:false},0).to({_off:true},11).wait(1059));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1127).to({_off:false},0).to({startPosition:0},16).to({_off:true},46).wait(545));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1425).to({_off:false},0).to({_off:true},12).wait(297));

	// Кнопки
	this.return_btn = new lib.Вначало();
	this.return_btn.name = "return_btn";
	this.return_btn.setTransform(1064.8,711.8);
	new cjs.ButtonHelper(this.return_btn, 0, 1, 2, false, new lib.Вначало(), 3);

	this.pause_btn = new lib.Стоп();
	this.pause_btn.name = "pause_btn";
	this.pause_btn.setTransform(1098.15,527.85);
	new cjs.ButtonHelper(this.pause_btn, 0, 1, 2, false, new lib.Стоп(), 3);

	this.play_btn = new lib.Старт();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(1070.8,439.7);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 2, false, new lib.Старт(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.play_btn},{t:this.pause_btn},{t:this.return_btn}]}).wait(1734));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(674,319,573.0999999999999,441.1);
// library properties:
lib.properties = {
	id: '09885C4A0886DD4692796986D22F72B4',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Растровоеизображение11.png", id:"Растровоеизображение11"},
		{src:"images/Растровоеизображение13.jpg", id:"Растровоеизображение13"},
		{src:"images/Растровоеизображение6.png", id:"Растровоеизображение6"},
		{src:"images/PXL_20221004_092747824.jpg", id:"PXL_20221004_092747824"},
		{src:"images/PXL_20221004_092924728.jpg", id:"PXL_20221004_092924728"},
		{src:"images/PXL_20221004_093028404.jpg", id:"PXL_20221004_093028404"},
		{src:"images/PXL_20221004_093034308.jpg", id:"PXL_20221004_093034308"},
		{src:"sounds/SoundsData.mp3", id:"SoundsData"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['09885C4A0886DD4692796986D22F72B4'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;