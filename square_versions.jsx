	// Photoshop Script to Create Square Version VOD Artwork for DirecTV, DISH, CMC, and Neulion
	//
	// Author: Marian Montagnino
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the "Software"), to deal
	// in the Software without restriction, including without limitation the rights
	// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
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
	// First, create a 2400x2400 px JPG file
	//
	// Install - Presets/Scripts/ folder
	// * Restart Photoshop
	//
	// Update:
	// * Just modify & save, no need to restart Photoshop once it's installed.
	//
	// Run:
	// * With Photoshop open, select File > Scripts > Square Versions
	// * When prompted select the prepared artwork file for your app.
	// * The different version of the versions will get saved to the selected output folder.
	//
	// Adobe Photoshop JavaScript Reference
	// http://www.adobe.com/devnet/photoshop/scripting.html


	// Turn debugger on. 0 is off.
	// $.level = 1;

	try
	{
	  // Prompt user to select PortraitArtwork file. Clicking "Cancel" returns null.
	  var PortraitArtwork = File.openDialog("Select a JPG file that is at least 2400x2400.", "*.jpg", false);

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

		if (doc.width.value != doc.height.value)
		{
			throw "Image is not a square.";
		}
	    else if ((doc.width.value < 2400) && (doc.height.value < 2400))
	    {
	        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
	    }
	    else if (doc.width.value < 2400)
	    {
	        throw "Image width is too small!  Image width must be at least 1024 pixels.";
	    }
	    else if (doc.height.value < 2400)
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

	    var sfw_bmp = new ExportOptionsSaveForWeb();
		sfw_bmp.format = SaveDocumentType.BMP;

		doc.resizeImage(2400, 2400, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_iTunes_2400x2400.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeImage(600, 600, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_iTunes_600x600.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeImage(160, 160, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Neulion_160x160.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeImage(1080, 1080, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Verizon_1080x1080.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2400,1875,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(320, 250, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_CMC_320x250.bmp";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw_bmp);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2024,2400,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(430, 510, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Neulion_430x510.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2400,1800,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(2048, 1536, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Rovi_2048x1536.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2400,1800,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(1440, 1080, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Sony_1440x1080.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		doc.resizeCanvas(2400,1800,AnchorPosition.MIDDLECENTER);
		doc.resizeImage(1440, 1080, null, ResampleMethod.BICUBICSHARPER);
		var destFileName = filename + "_Verizon_1440x1080.jpg";
		doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
		doc.activeHistoryState = startState; // undo resize

		alert("Square Versions created!");

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
