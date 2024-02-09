gdjs.About_32SceneCode = {};
gdjs.About_32SceneCode.GDAboutTextObjects1 = [];
gdjs.About_32SceneCode.GDAboutTextObjects2 = [];
gdjs.About_32SceneCode.GDAboutTextObjects3 = [];
gdjs.About_32SceneCode.GDBackTextObjects1 = [];
gdjs.About_32SceneCode.GDBackTextObjects2 = [];
gdjs.About_32SceneCode.GDBackTextObjects3 = [];

gdjs.About_32SceneCode.eventsList0 = function (runtimeScene) {
  {
    let isConditionTrue_0 = false;
    isConditionTrue_0 = false;
    isConditionTrue_0 =
      gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
    if (isConditionTrue_0) {
      gdjs.copyArray(
        runtimeScene.getObjects('AboutText'),
        gdjs.About_32SceneCode.GDAboutTextObjects1
      );
      gdjs.copyArray(
        runtimeScene.getObjects('BackText'),
        gdjs.About_32SceneCode.GDBackTextObjects1
      );
      {
        for (
          var i = 0, len = gdjs.About_32SceneCode.GDAboutTextObjects1.length;
          i < len;
          ++i
        ) {
          gdjs.About_32SceneCode.GDAboutTextObjects1[i].setCenterXInScene(
            gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2
          );
        }
        for (
          var i = 0, len = gdjs.About_32SceneCode.GDBackTextObjects1.length;
          i < len;
          ++i
        ) {
          gdjs.About_32SceneCode.GDBackTextObjects1[i].setCenterXInScene(
            gdjs.evtTools.window.getGameResolutionWidth(runtimeScene) / 2
          );
        }
      }
    }
  }
};
gdjs.About_32SceneCode.mapOfGDgdjs_46About_9532SceneCode_46GDAboutTextObjects2Objects =
  Hashtable.newFrom({ AboutText: gdjs.About_32SceneCode.GDAboutTextObjects2 });
gdjs.About_32SceneCode.mapOfGDgdjs_46About_9532SceneCode_46GDBackTextObjects1Objects =
  Hashtable.newFrom({ BackText: gdjs.About_32SceneCode.GDBackTextObjects1 });
gdjs.About_32SceneCode.eventsList1 = function (runtimeScene) {
  {
    gdjs.copyArray(
      runtimeScene.getObjects('AboutText'),
      gdjs.About_32SceneCode.GDAboutTextObjects2
    );

    let isConditionTrue_0 = false;
    isConditionTrue_0 = false;
    isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(
      gdjs.About_32SceneCode
        .mapOfGDgdjs_46About_9532SceneCode_46GDAboutTextObjects2Objects,
      runtimeScene,
      true,
      false
    );
    if (isConditionTrue_0) {
      {
        gdjs.evtTools.window.setFullScreen(runtimeScene, false, true);
      }
      {
        gdjs.evtTools.window.openURL('https://nazeriland.ir/', runtimeScene);
      }
    }
  }

  {
    gdjs.copyArray(
      runtimeScene.getObjects('BackText'),
      gdjs.About_32SceneCode.GDBackTextObjects1
    );

    let isConditionTrue_0 = false;
    isConditionTrue_0 = false;
    isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(
      gdjs.About_32SceneCode
        .mapOfGDgdjs_46About_9532SceneCode_46GDBackTextObjects1Objects,
      runtimeScene,
      true,
      false
    );
    if (isConditionTrue_0) {
      {
        gdjs.evtTools.runtimeScene.replaceScene(
          runtimeScene,
          'Menu Scene',
          false
        );
      }
    }
  }
};
gdjs.About_32SceneCode.eventsList2 = function (runtimeScene) {
  {
    let isConditionTrue_0 = false;
    isConditionTrue_0 = false;
    isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(
      runtimeScene,
      'Left'
    );
    if (isConditionTrue_0) {
      {
        //Subevents
        gdjs.About_32SceneCode.eventsList1(runtimeScene);
      } //End of subevents
    }
  }
};
gdjs.About_32SceneCode.eventsList3 = function (runtimeScene) {
  {
    gdjs.About_32SceneCode.eventsList0(runtimeScene);
  }

  {
    gdjs.About_32SceneCode.eventsList2(runtimeScene);
  }
};

gdjs.About_32SceneCode.func = function (runtimeScene) {
  runtimeScene.getOnceTriggers().startNewFrame();

  gdjs.About_32SceneCode.GDAboutTextObjects1.length = 0;
  gdjs.About_32SceneCode.GDAboutTextObjects2.length = 0;
  gdjs.About_32SceneCode.GDAboutTextObjects3.length = 0;
  gdjs.About_32SceneCode.GDBackTextObjects1.length = 0;
  gdjs.About_32SceneCode.GDBackTextObjects2.length = 0;
  gdjs.About_32SceneCode.GDBackTextObjects3.length = 0;

  gdjs.About_32SceneCode.eventsList3(runtimeScene);

  return;
};

gdjs['About_32SceneCode'] = gdjs.About_32SceneCode;
