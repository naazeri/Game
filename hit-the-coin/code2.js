gdjs.Result_32SceneCode = {};
gdjs.Result_32SceneCode.GDResultTextObjects1= [];
gdjs.Result_32SceneCode.GDResultTextObjects2= [];
gdjs.Result_32SceneCode.GDResultTextObjects3= [];
gdjs.Result_32SceneCode.GDPlayAgainTextObjects1= [];
gdjs.Result_32SceneCode.GDPlayAgainTextObjects2= [];
gdjs.Result_32SceneCode.GDPlayAgainTextObjects3= [];
gdjs.Result_32SceneCode.GDBackTextObjects1= [];
gdjs.Result_32SceneCode.GDBackTextObjects2= [];
gdjs.Result_32SceneCode.GDBackTextObjects3= [];


gdjs.Result_32SceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BackText"), gdjs.Result_32SceneCode.GDBackTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("PlayAgainText"), gdjs.Result_32SceneCode.GDPlayAgainTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("ResultText"), gdjs.Result_32SceneCode.GDResultTextObjects1);
{for(var i = 0, len = gdjs.Result_32SceneCode.GDResultTextObjects1.length ;i < len;++i) {
    gdjs.Result_32SceneCode.GDResultTextObjects1[i].setString("Score: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(0)));
}
}{for(var i = 0, len = gdjs.Result_32SceneCode.GDResultTextObjects1.length ;i < len;++i) {
    gdjs.Result_32SceneCode.GDResultTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
for(var i = 0, len = gdjs.Result_32SceneCode.GDPlayAgainTextObjects1.length ;i < len;++i) {
    gdjs.Result_32SceneCode.GDPlayAgainTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
for(var i = 0, len = gdjs.Result_32SceneCode.GDBackTextObjects1.length ;i < len;++i) {
    gdjs.Result_32SceneCode.GDBackTextObjects1[i].setCenterXInScene(gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2);
}
}}

}


};gdjs.Result_32SceneCode.mapOfGDgdjs_46Result_9532SceneCode_46GDPlayAgainTextObjects2Objects = Hashtable.newFrom({"PlayAgainText": gdjs.Result_32SceneCode.GDPlayAgainTextObjects2});
gdjs.Result_32SceneCode.mapOfGDgdjs_46Result_9532SceneCode_46GDBackTextObjects1Objects = Hashtable.newFrom({"BackText": gdjs.Result_32SceneCode.GDBackTextObjects1});
gdjs.Result_32SceneCode.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("PlayAgainText"), gdjs.Result_32SceneCode.GDPlayAgainTextObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Result_32SceneCode.mapOfGDgdjs_46Result_9532SceneCode_46GDPlayAgainTextObjects2Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game Scene", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("BackText"), gdjs.Result_32SceneCode.GDBackTextObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Result_32SceneCode.mapOfGDgdjs_46Result_9532SceneCode_46GDBackTextObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Menu Scene", false);
}}

}


};gdjs.Result_32SceneCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {

{ //Subevents
gdjs.Result_32SceneCode.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.Result_32SceneCode.eventsList3 = function(runtimeScene) {

{


gdjs.Result_32SceneCode.eventsList0(runtimeScene);
}


{


gdjs.Result_32SceneCode.eventsList2(runtimeScene);
}


};

gdjs.Result_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Result_32SceneCode.GDResultTextObjects1.length = 0;
gdjs.Result_32SceneCode.GDResultTextObjects2.length = 0;
gdjs.Result_32SceneCode.GDResultTextObjects3.length = 0;
gdjs.Result_32SceneCode.GDPlayAgainTextObjects1.length = 0;
gdjs.Result_32SceneCode.GDPlayAgainTextObjects2.length = 0;
gdjs.Result_32SceneCode.GDPlayAgainTextObjects3.length = 0;
gdjs.Result_32SceneCode.GDBackTextObjects1.length = 0;
gdjs.Result_32SceneCode.GDBackTextObjects2.length = 0;
gdjs.Result_32SceneCode.GDBackTextObjects3.length = 0;

gdjs.Result_32SceneCode.eventsList3(runtimeScene);

return;

}

gdjs['Result_32SceneCode'] = gdjs.Result_32SceneCode;
