channel-mapper
==============

A tool for mapping channel positions onto station layout and cross-section images.

== Background ==
The NEES channel history viewer features interactive maps of all stations. These maps contain clickable dots that represent each sensor. Unfortunately, every time we updated the image, or added sensors, we needed to recreate a pixel-perfect mapping of the sensor to its spot on the image in an XML file.

This tool seeks to simplify that process. The Channel Mapper tool allows NEES staff to drag an image into the app, point and click to map sensors, and then export to a JSON file with the click of a button!

==Technology==
The Channel Mapper uses Angular.js and D3 for SVG building and manipulation. It also uses the new FileReader and Drag and Drop HTML5 APIs, so everything happens on the client side :-)

==Use==

1. Drag an image from your local system onto the app viewport.
2. Change the Station name and Network name in the sidebar to match the station image.
3. Click points on the image to create a sensor mapping. A dialog will open allowing you to set name, label, sensor type and more.
4. Click save.
5. You can drag points around the map if you relize you've mapped a sensor to the wrong position.
6. When you are done mapping, click export.

== Importing ==
If you need to edit an existing channel mapping config file, click the "Import" button in the sidebar, select the file and click ok.
