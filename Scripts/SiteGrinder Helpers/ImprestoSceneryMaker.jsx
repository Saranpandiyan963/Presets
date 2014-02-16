﻿/*@@@BUILDINFO@@@ ImprestoSceneryMaker.jsx 1.0*//*// BEGIN__HARVEST_EXCEPTION_ZSTRING<javascriptresource><name>$$$/JavaScripts/SceneryMaker/Menu=Impresto Scenery Maker</name><about>$$$/JavaScripts/SceneryMaker/About=Impresto Scenery Maker.</about><category>sitegrinder</category><enableinfo>true</enableinfo></javascriptresource>// END__HARVEST_EXCEPTION_ZSTRING*//* Copyright 2012, Media Lab Inc.    Thi script is part of the amazing Photoshop to Website plugin "Impresto!"    http://www.medialab.com */main();//your code including the start of the loopfunction newTypeLayer(container, txt) {     // Create a new art layer containing text    var artLayerRef = container.artLayers.add();    artLayerRef.kind = LayerKind.TEXT;    // Set the contents of the text layer    var textItemRef = artLayerRef.textItem;    textItemRef.contents = txt;    return textItemRef;}function newLayerGroup(container, name) {    var newSet = container.layerSets.add();    newSet.name=name;    return newSet;}function newTextSlide(container, name, txt) {    var slideGroup = newLayerGroup(container, name+"-scenery");    var slideText = newTypeLayer(slideGroup, txt);    return slideText;}function trim(s) {    return s.replace(/^\s+|\s+$/g,""); }function parseTextItems(src, delim) {    var ahrrrg = src.split(delim);    //alert(ahrrrg.length);    for(var i = 0; i<ahrrrg.length; i++) {        ahrrrg[i] = trim(ahrrrg[i]);     }     return ahrrrg; }function firstWordsOf(str, n) {    var strArr = str.split(' ');    var famousFirstWords = "";    var numWords = strArr.length < n ? strArr.length : n;    for(var i = 0; i<numWords; i++) {        famousFirstWords += strArr[i];        if(i<numWords - 1) { famousFirstWords+= ' '; }     }     return famousFirstWords;}function makeSlides(container, arr) {    var curItem = arr.length - 1;    for(var i = 0; i<arr.length; i++) {        newTextSlide(container, firstWordsOf(arr[curItem],4), arr[curItem]);        curItem--;     }}function parseToMakeNewSlides(doc) {    if(getSelectedLayersCount() > 1 || doc.activeLayer.kind!= LayerKind.TEXT || typeof doc.activeLayer.textItem.contents!='string' || doc.activeLayer.textItem.contents.indexOf('---') == -1) {        return false;    }    return true;} function indexOfEndNum(str) {    var num = "";    var i=0;    var foundNum = false;    for(i=str.length-1;i>=0;i--) {        var tryNum = parseInt(str[i],10);        var NaN = isNaN(tryNum);        if(foundNum) {             if(NaN || i==0) {                break;            }        } else {            foundNum = !NaN;        }    }    return i; }function nextNumName(orig) {    var delimLoc = orig.lastIndexOf('-');    if(delimLoc <0) { delimLoc = orig.length; }    var hintPart = '';    var namePart = orig.substring(0,delimLoc);    if(delimLoc > 0 && delimLoc < orig.length-1) {        var hintPart = orig.substring(delimLoc,orig.length);    }    var newName = "";    var numStart = indexOfEndNum(namePart);    if(numStart<0) { newNum = 1; newName = namePart + ' '; }    else {         var newNum = parseInt(namePart.substring(numStart+1, namePart.length),10)+1;        newName = namePart.substring(0,numStart+1);    }    newName = newName + newNum + hintPart;    return newName;}function fixName(initName) {    var tryName = initName;    while(findLayer(activeDocument, tryName)) {        tryName = nextNumName(tryName);     }     return tryName;}function main() {    var doc = activeDocument;        if(parseToMakeNewSlides(doc)) {        if ( app.documents.length <= 0 ) {            if ( DialogModes.NO != app.playbackDisplayDialogs ) {                alert( 'Script requires an open document' );            }            return 'cancel';         }        try {            var srcTxt = doc.activeLayer.textItem.contents;            var txtArray = parseTextItems(srcTxt, '---');            makeSlides(doc,txtArray);    //        newTextSlide(doc, "test", "welcome");             /*        var selectedLayers = new Array();        var groupLayers = doc.activeLayer.layers;        var len = groupLayers.length;         if(len<=0) { executeAction(cTID('undo'), undefined, DialogModes.NO); alert('At least one layer must be selected'); return 'cancel'; }        for (var i = 0; i < len; i++) {            doc.activeLayer = groupLayers[i];            selectedLayers.push(doc.activeLayer);        }        executeAction(cTID('undo'), undefined, DialogModes.NO);                        var docName = app.activeDocument.name;            var compsName = new String("none");            var compsCount = app.activeDocument.layerComps.length;            if ( compsCount < 1 ) {                  alert ( 'At least one layer comp must be selected'  );                return 'cancel';            } else {                app.activeDocument = app.documents[docName];                docRef = app.activeDocument;                     for ( compsIndex = 0; compsIndex < compsCount; compsIndex++ ) {                    var compRef = docRef.layerComps[ compsIndex ];                     if(compRef.selected) {                         compRef.apply();                         makeLayersVisible(selectedLayers);                         compRef.recapture();                    }                 }            }     */        }         catch (e) {            if ( DialogModes.NO != app.playbackDisplayDialogs ) {                alert(e);            }            return 'cancel';         }    } else {           // if one group selected     var selLayer = doc.activeLayer;     groupSelectedLayers();     var groupLayers = doc.activeLayer.layers;	 var len = groupLayers.length;                if(selLayer.artLayers && len == 1) {                //alert('one group selected and no other layers');               executeAction(cTID('undo'), undefined, DialogModes.NO); // ungroup               var dup = doc.activeLayer.duplicate();               dup.name = fixName(doc.activeLayer.name);                          }                // dupe group                // correct name of duped group                      //else           else {               //groupSelectedLayers();               var newGroup  = doc.activeLayer;               var firstTryName = firstWordsOf(doc.activeLayer.layers[0].name,4)+"-scenery";               var finalName = fixName(firstTryName);               newGroup.name = finalName;           }    }}function makeLayersVisible(lays) {	var layCount = lays.length;	for ( var laysIndex= 0; laysIndex < layCount; laysIndex++ ) {		lays[laysIndex].visible=true;	}}function cTID(s) {return app.charIDToTypeID(s);}function sTID(s) {return app.stringIDToTypeID(s);}function groupSelectedLayers() {	var ref = new ActionReference();	ref.putClass(sTID('layerSection'));	var desc = new ActionDescriptor();	desc.putReference(cTID('null'), ref);	var ref2 = new ActionReference();	ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));	desc.putReference(cTID('From'), ref2);	executeAction(cTID('Mk  '), desc, DialogModes.NO);}    function getSelectedLayersCount(){       var res = new Number();       var ref = new ActionReference();       ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );       var desc = executeActionGet(ref);       if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){          desc = desc.getList( stringIDToTypeID( 'targetLayers' ));          res = desc.count       }else{    var vis = app.activeDocument.activeLayer.visible;    if(vis == true) app.activeDocument.activeLayer.visible = false;    checkVisability();    if(app.activeDocument.activeLayer.visible == true){        res =1;        }else{            res = 0;            }    app.activeDocument.activeLayer.visible = vis;    }       return res;    }    function checkVisability(){    var desc = new ActionDescriptor();        var list = new ActionList();        var ref = new ActionReference();        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );        list.putReference( ref );        desc.putList( charIDToTypeID('null'), list );        executeAction( charIDToTypeID('Shw '), desc, DialogModes.NO );    }function findLayer(ref, name) {	// declare local variables	var layers = ref.layers;	var len = layers.length;	var match = false;	// iterate through layers to find a match	for (var i = 0; i < len; i++) {		// test for matching layer		var layer = layers[i];		if (layer.name.toLowerCase() == name.toLowerCase()) {			// select matching layer			activeDocument.activeLayer = layer;			match = true;			break;		}		// handle groups (layer sets)		else if (layer.typename == 'LayerSet') {			match = findLayer(layer, name);			if (match) {				break;			}		}	}	return match;}