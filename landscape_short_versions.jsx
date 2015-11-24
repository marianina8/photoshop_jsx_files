	// Photoshop Script to Create iPhone Icons from PortraitArtwork
	//
	// WARNING!!! In the rare case that there are name collisions, this script will
	// overwrite (delete perminently) files in the same folder in which the selected
	// PortraitArtwork file is located. Therefore, to be safe, before running the
	// script, it's best to make sure the selected iTuensArtwork file is the only
	// file in its containing folder.
	//
	// Copyright (c) 2010 Matt Di Pasquale
	// Added tweaks Copyright (c) 2012 by Josh Jones http://www.appsbynight.com
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	// THE SOFTWARE.
	//
	// Prerequisite:
	// First, create at least a 1024x1024 px PNG file according to:
	// http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
	//
	// Install - Save Create Icons.jsx to:
	//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
	//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
	// * Restart Photoshop
	//
	// Update:
	// * Just modify & save, no need to resart Photoshop once it's installed.
	//
	// Run:
	// * With Photoshop open, select File > Scripts > Create Icons
	// * When prompted select the prepared PortraitArtwork file for your app.
	// * The different version of the versions will get saved to the same folder that
	//   the PortraitArtwork file is in.
	//
	// Adobe Photoshop JavaScript Reference
	// http://www.adobe.com/devnet/photoshop/scripting.html


	// Turn debugger on. 0 is off.
	// $.level = 1;

	try
	{
	  // Prompt user to select PortraitArtwork file. Clicking "Cancel" returns null.
	  var PortraitArtwork = File.openDialog("Select a JPG file that is at least 2048x768.", "*.jpg", false);

	  if (PortraitArtwork !== null) 
	  { 
	    var doc = open(PortraitArtwork, OpenDocumentType.JPEG);
    
	    if (doc == null)
	    {
	      throw "Something is wrong with the file.  Make sure it's a valid JPG file.";
	    }


	    var startState = doc.activeHistoryState;       // save for undo
	    var initialPrefs = app.preferences.rulerUnits; // will restore at end
	    // Save the current preferences
	    var startDisplayDialogs = app.displayDialogs
	    // Set Adobe Photoshop CC 2015 to use pixels and display no dialogs
	    app.displayDialogs = DialogModes.NO
		
	    app.preferences.rulerUnits = Units.PIXELS;     // use pixels
		app.preferences.typeUnits = TypeUnits.PIXELS; //use pixels for type also
		

	    if ((doc.width.value < 2048) && (doc.height.value < 768))
	    {
	        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
	    }
	    else if (doc.width.value < 2048)
	    {
	        throw "Image width is too small!  Image width must be at least 1024 pixels.";
	    }
	    else if (doc.height.value < 768)
	    {
	        throw "Image height is too small!  Image height must be at least 1024 pixels.";
	    }
    
	    // Folder selection dialog
	    var destFolder = Folder.selectDialog( "Choose an output folder");

	    if (destFolder == null)
	    {
	      // User canceled, just exit
	      throw "";
	    }

	    var filename=prompt("Please enter title code:","DFF010017");
	    // Save versions in PNG using Save for Web.
	    var sfw = new ExportOptionsSaveForWeb();
		sfw.quality = 60; 
		sfw.includeProfile = true; 
		sfw.optimised = true; 
		sfw.format = SaveDocumentType.JPEG;  

		doc.resizeCanvas(2048,550,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(1600, 430, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Dish_1600x430.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2048,567,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(990, 274, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Dish_990x274.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2048,567,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(650, 180, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Dish_650x180.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2048,640,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(1280,400,null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Neulion_1280x400.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeImage(2048,768,null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Hulu_2048x768.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize		  

		doc.resizeCanvas(2048,567,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(1280,370,null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Neulion_DynamicLead_1280x370.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2048,740,AnchorPosition.MIDDLECENTER);
		var destFileName = filename + "_Neulion_DynamicLead_2048x740.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize
		
		alert("Landscape (Short) Versions created!");
		
		
	  }
	}
	catch (exception)
	{
	  // Show degbug message and then quit
		if ((exception != null) && (exception != ""))
	    alert(exception);
	 }
	finally
	{
	    if (doc != null)
	        doc.close(SaveOptions.DONOTSAVECHANGES);
  
	    app.preferences.rulerUnits = initialPrefs; // restore prefs
	}