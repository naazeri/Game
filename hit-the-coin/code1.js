gdjs.Game_32SceneCode = {};
gdjs.Game_32SceneCode.GDScoreTextObjects1= [];
gdjs.Game_32SceneCode.GDScoreTextObjects2= [];
gdjs.Game_32SceneCode.GDScoreTextObjects3= [];
gdjs.Game_32SceneCode.GDTimeTextObjects1= [];
gdjs.Game_32SceneCode.GDTimeTextObjects2= [];
gdjs.Game_32SceneCode.GDTimeTextObjects3= [];
gdjs.Game_32SceneCode.GDCoinObjects1= [];
gdjs.Game_32SceneCode.GDCoinObjects2= [];
gdjs.Game_32SceneCode.GDCoinObjects3= [];


gdjs.Game_32SceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.systemInfo.isPreview(runtimeScene);
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(3);
}{gdjs.evtTools.window.setFullScreen(runtimeScene, true, true);
}}

}


};gdjs.Game_32SceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Coin"), gdjs.Game_32SceneCode.GDCoinObjects1);
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)));
}{for(var i = 0, len = gdjs.Game_32SceneCode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDCoinObjects1[i].setPosition(gdjs.randomInRange(0, gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (gdjs.Game_32SceneCode.GDCoinObjects1[i].getWidth())),gdjs.randomInRange(0, gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - (gdjs.Game_32SceneCode.GDCoinObjects1[i].getHeight())));
}
}{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(0);
}
{ //Subevents
gdjs.Game_32SceneCode.eventsList0(runtimeScene);} //End of subevents
}

}


};gdjs.Game_32SceneCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.common.logicalNegation(false);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.Game_32SceneCode.GDScoreTextObjects1);
gdjs.copyArray(runtimeScene.getObjects("TimeText"), gdjs.Game_32SceneCode.GDTimeTextObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDScoreTextObjects1[i].setString("Score: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().getFromIndex(0)));
}
}{for(var i = 0, len = gdjs.Game_32SceneCode.GDTimeTextObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDTimeTextObjects1[i].setString("Time: " + gdjs.evtTools.common.toString(Math.round(Math.abs(gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSeconds(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1))) - gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0))))));
}
}}

}


};gdjs.Game_32SceneCode.eventsList3 = function(runtimeScene) {

{


gdjs.Game_32SceneCode.eventsList2(runtimeScene);
}


};gdjs.Game_32SceneCode.mapOfGDgdjs_46Game_9532SceneCode_46GDCoinObjects2Objects = Hashtable.newFrom({"Coin": gdjs.Game_32SceneCode.GDCoinObjects2});
gdjs.Game_32SceneCode.mapOfGDgdjs_46Game_9532SceneCode_46GDCoinObjects1Objects = Hashtable.newFrom({"Coin": gdjs.Game_32SceneCode.GDCoinObjects1});
gdjs.Game_32SceneCode.eventsList4 = function(runtimeScene) {

{



}


{

gdjs.copyArray(runtimeScene.getObjects("Coin"), gdjs.Game_32SceneCode.GDCoinObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32SceneCode.mapOfGDgdjs_46Game_9532SceneCode_46GDCoinObjects2Objects, runtimeScene, true, true);
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSound(runtimeScene, "assets\\sound\\effect\\fail.wav", false, 100, 1);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Coin"), gdjs.Game_32SceneCode.GDCoinObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32SceneCode.mapOfGDgdjs_46Game_9532SceneCode_46GDCoinObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDCoinObjects1 */
{runtimeScene.getGame().getVariables().getFromIndex(0).add(1);
}{for(var i = 0, len = gdjs.Game_32SceneCode.GDCoinObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDCoinObjects1[i].setPosition(gdjs.randomInRange(0, gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) - (gdjs.Game_32SceneCode.GDCoinObjects1[i].getWidth())),gdjs.randomInRange(0, gdjs.evtTools.window.getGameResolutionHeight(runtimeScene) - (gdjs.Game_32SceneCode.GDCoinObjects1[i].getHeight())));
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "assets\\sound\\effect\\coin.wav", false, 100, 1);
}}

}


};gdjs.Game_32SceneCode.eventsList5 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(8307796);
}
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList4(runtimeScene);} //End of subevents
}

}


};gdjs.Game_32SceneCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1))) > gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0));
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "Escape");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pauseTimer(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)));
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Result Scene", false);
}}

}


};gdjs.Game_32SceneCode.eventsList7 = function(runtimeScene) {

{


gdjs.Game_32SceneCode.eventsList1(runtimeScene);
}


{


gdjs.Game_32SceneCode.eventsList3(runtimeScene);
}


{


gdjs.Game_32SceneCode.eventsList5(runtimeScene);
}


{



}


{


gdjs.Game_32SceneCode.eventsList6(runtimeScene);
}


};

gdjs.Game_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32SceneCode.GDScoreTextObjects1.length = 0;
gdjs.Game_32SceneCode.GDScoreTextObjects2.length = 0;
gdjs.Game_32SceneCode.GDScoreTextObjects3.length = 0;
gdjs.Game_32SceneCode.GDTimeTextObjects1.length = 0;
gdjs.Game_32SceneCode.GDTimeTextObjects2.length = 0;
gdjs.Game_32SceneCode.GDTimeTextObjects3.length = 0;
gdjs.Game_32SceneCode.GDCoinObjects1.length = 0;
gdjs.Game_32SceneCode.GDCoinObjects2.length = 0;
gdjs.Game_32SceneCode.GDCoinObjects3.length = 0;

gdjs.Game_32SceneCode.eventsList7(runtimeScene);

return;

}

gdjs['Game_32SceneCode'] = gdjs.Game_32SceneCode;
