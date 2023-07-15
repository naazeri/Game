gdjs.Menu_32SceneCode = {};
gdjs.Menu_32SceneCode.GDStartTextObjects1= [];
gdjs.Menu_32SceneCode.GDStartTextObjects2= [];
gdjs.Menu_32SceneCode.GDStartTextObjects3= [];
gdjs.Menu_32SceneCode.GDStartTextObjects4= [];
gdjs.Menu_32SceneCode.GDAboutTextObjects1= [];
gdjs.Menu_32SceneCode.GDAboutTextObjects2= [];
gdjs.Menu_32SceneCode.GDAboutTextObjects3= [];
gdjs.Menu_32SceneCode.GDAboutTextObjects4= [];
gdjs.Menu_32SceneCode.GDExitTextObjects1= [];
gdjs.Menu_32SceneCode.GDExitTextObjects2= [];
gdjs.Menu_32SceneCode.GDExitTextObjects3= [];
gdjs.Menu_32SceneCode.GDExitTextObjects4= [];


gdjs.Menu_32SceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("AboutText"), gdjs.Menu_32SceneCode.GDAboutTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("ExitText"), gdjs.Menu_32SceneCode.GDExitTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("StartText"), gdjs.Menu_32SceneCode.GDStartTextObjects1);
{for(var i = 0, len = gdjs.Menu_32SceneCode.GDStartTextObjects1.length ;i < len;++i) {
    gdjs.Menu_32SceneCode.GDStartTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
for(var i = 0, len = gdjs.Menu_32SceneCode.GDAboutTextObjects1.length ;i < len;++i) {
    gdjs.Menu_32SceneCode.GDAboutTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
for(var i = 0, len = gdjs.Menu_32SceneCode.GDExitTextObjects1.length ;i < len;++i) {
    gdjs.Menu_32SceneCode.GDExitTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
}}

}


};gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDStartTextObjects3Objects = Hashtable.newFrom({"StartText": gdjs.Menu_32SceneCode.GDStartTextObjects3});
gdjs.Menu_32SceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.window.isFullScreen(runtimeScene));
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}}

}


};gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDAboutTextObjects3Objects = Hashtable.newFrom({"AboutText": gdjs.Menu_32SceneCode.GDAboutTextObjects3});
gdjs.Menu_32SceneCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.evtTools.window.isFullScreen(runtimeScene));
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}}

}


};gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDExitTextObjects2Objects = Hashtable.newFrom({"ExitText": gdjs.Menu_32SceneCode.GDExitTextObjects2});
gdjs.Menu_32SceneCode.eventsList3 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("StartText"), gdjs.Menu_32SceneCode.GDStartTextObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDStartTextObjects3Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game Scene", false);
}
{ //Subevents
gdjs.Menu_32SceneCode.eventsList1(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("AboutText"), gdjs.Menu_32SceneCode.GDAboutTextObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDAboutTextObjects3Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "About Scene", false);
}{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}
{ //Subevents
gdjs.Menu_32SceneCode.eventsList2(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("ExitText"), gdjs.Menu_32SceneCode.GDExitTextObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Menu_32SceneCode.mapOfGDgdjs_46Menu_9532SceneCode_46GDExitTextObjects2Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, false, true);
}{gdjs.evtTools.runtimeScene.stopGame(runtimeScene);
}}

}


};gdjs.Menu_32SceneCode.eventsList4 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {

{ //Subevents
gdjs.Menu_32SceneCode.eventsList3(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "Escape");
if (isConditionTrue_0) {
{gdjs.evtTools.window.setFullScreen(runtimeScene, false, true);
}{gdjs.evtTools.runtimeScene.stopGame(runtimeScene);
}}

}


};gdjs.Menu_32SceneCode.eventsList5 = function(runtimeScene) {

{


gdjs.Menu_32SceneCode.eventsList0(runtimeScene);
}


{


gdjs.Menu_32SceneCode.eventsList4(runtimeScene);
}


};

gdjs.Menu_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Menu_32SceneCode.GDStartTextObjects1.length = 0;
gdjs.Menu_32SceneCode.GDStartTextObjects2.length = 0;
gdjs.Menu_32SceneCode.GDStartTextObjects3.length = 0;
gdjs.Menu_32SceneCode.GDStartTextObjects4.length = 0;
gdjs.Menu_32SceneCode.GDAboutTextObjects1.length = 0;
gdjs.Menu_32SceneCode.GDAboutTextObjects2.length = 0;
gdjs.Menu_32SceneCode.GDAboutTextObjects3.length = 0;
gdjs.Menu_32SceneCode.GDAboutTextObjects4.length = 0;
gdjs.Menu_32SceneCode.GDExitTextObjects1.length = 0;
gdjs.Menu_32SceneCode.GDExitTextObjects2.length = 0;
gdjs.Menu_32SceneCode.GDExitTextObjects3.length = 0;
gdjs.Menu_32SceneCode.GDExitTextObjects4.length = 0;

gdjs.Menu_32SceneCode.eventsList5(runtimeScene);

return;

}

gdjs['Menu_32SceneCode'] = gdjs.Menu_32SceneCode;
