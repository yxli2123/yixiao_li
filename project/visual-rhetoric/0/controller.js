var type;
var options ={
    Background :'#221f4d',
    CircleColor : '#FFE947',
    Radius: 40,
    Opacity : 160,

    Random: function () {
        background(options.Background);
        var Background  = random(['#FFE300', '#00EBA5','#111111','#f2f2f2']);
        bgColorControl.setValue(Background);

        var CircleColor = random(['#E632A5', '#580AFF','#005CFF']);
        ColorControl.setValue(CircleColor);


        options.Radius = random(50,150);
        options.Opacity = random(150,200);
    },

    SavePNG : false,
    Save : function(){
        saveFrames("Transparent", "png", 1, 1);
    },
}



var gui, config, bgColorControl, ColorControl, RadiusControl, RandomControl, pngControl, SaveControl;

window.onload = function() {
    gui = new dat.GUI();

    //folder1
    var folder1 = gui.addFolder('Controls');

    bgColorControl = folder1.addColor(options, 'Background');
    bgColorControl.onChange(draw);

    ColorControl = folder1.addColor(options, 'CircleColor');
    ColorControl.onChange(draw);

    RadiusControl = folder1.add(options, 'Radius',10,400);
    RadiusControl.onChange(draw);
    RadiusControl.listen();

    OpacityControl = folder1.add(options, 'Opacity',0, 255);
    OpacityControl.onChange(draw);
    OpacityControl.listen();

    RandomControl = folder1.add(options, 'Random');


    pngControl = folder1.add(options, 'SavePNG');
    pngControl.onChange(draw);


    SaveControl = folder1.add(options, 'Save');
    folder1.open();


};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

