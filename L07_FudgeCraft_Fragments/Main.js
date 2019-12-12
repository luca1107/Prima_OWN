"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = f.Vector3.ZERO();
    let raster;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize(true);
        f.Debug.log("Canvas", canvas);
        setupRaster();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(2, 3, 20));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        game = new f.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L07_FudgeCraft_Fragments.Fragment(0);
        // f.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform());
        game.appendChild(fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(1);
        // f.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(2);
        // f.Debug.log("Fragment", fragment);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-4))));
        game.appendChild(fragment);
        fragment = new L07_FudgeCraft_Fragments.Fragment(3);
        fragment.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.X(-6))));
        game.appendChild(fragment);
        let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        f.Debug.log("Viewport", viewport);
        viewport.draw();
        f.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
        checkCollision();
    }
    function setupRaster() {
        const n = 20; // or some dynamic value
        raster = new Array(n).fill(null).map(() => new Array(n).fill(null).map(() => new Array(n).fill(null)));
    }
    function checkCollision() {
        setupRaster();
        for (let fragment of game.getChildren()) {
            for (let fragmentPart of fragment.getChildren()) {
                let x = fragment.cmpTransform.local.translation.x + fragmentPart.cmpTransform.local.translation.x;
                let y = fragment.cmpTransform.local.translation.y + fragmentPart.cmpTransform.local.translation.y;
                let z = fragment.cmpTransform.local.translation.z + fragmentPart.cmpTransform.local.translation.z;
                if (raster[x + 10][y + 10][z + 10] == null) {
                    raster[x + 10][y + 10][z + 10] = fragmentPart;
                }
                else {
                    console.log("kollision an Stelle : x:" + x + "y" + y + "z" + z);
                }
                console.log(x + "||" + y + "||" + z);
            }
        }
        console.log(raster);
    }
    function hndKeyDown(_event) {
        //let rotate: f.Vector3 = f.Vector3.ZERO();
        switch (_event.code) {
            case f.KEYBOARD_CODE.ARROW_UP:
                doRotateAnimation(0);
                checkCollision();
                break;
            case f.KEYBOARD_CODE.ARROW_DOWN:
                doRotateAnimation(1);
                checkCollision();
                break;
            case f.KEYBOARD_CODE.ARROW_LEFT:
                doRotateAnimation(2);
                checkCollision();
                break;
            case f.KEYBOARD_CODE.ARROW_RIGHT:
                doRotateAnimation(3);
                checkCollision();
                break;
        }
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        f.RenderManager.update();
        viewport.draw();
    }
    async function doRotateAnimation(index) {
        switch (index) {
            case 0:
                for (let fragment of game.getChildren()) {
                    for (let _fragmentPart of fragment.getChildren()) {
                        let x = _fragmentPart.cmpTransform.local.translation.x;
                        let y = _fragmentPart.cmpTransform.local.translation.y;
                        let z = _fragmentPart.cmpTransform.local.translation.z;
                        _fragmentPart.cmpTransform.local.translation = new f.Vector3(x, z, -y);
                    }
                    f.RenderManager.update();
                    viewport.draw();
                }
                break;
            case 1:
                for (let fragment of game.getChildren()) {
                    for (let _fragmentPart of fragment.getChildren()) {
                        let x = _fragmentPart.cmpTransform.local.translation.x;
                        let y = _fragmentPart.cmpTransform.local.translation.y;
                        let z = _fragmentPart.cmpTransform.local.translation.z;
                        _fragmentPart.cmpTransform.local.translation = new f.Vector3(x, -z, y);
                    }
                    f.RenderManager.update();
                    viewport.draw();
                }
                break;
            case 2:
                for (let fragment of game.getChildren()) {
                    for (let _fragmentPart of fragment.getChildren()) {
                        let x = _fragmentPart.cmpTransform.local.translation.x;
                        let y = _fragmentPart.cmpTransform.local.translation.y;
                        let z = _fragmentPart.cmpTransform.local.translation.z;
                        _fragmentPart.cmpTransform.local.translation = new f.Vector3(z, y, -x);
                    }
                    f.RenderManager.update();
                    viewport.draw();
                }
                break;
            case 3:
                for (let fragment of game.getChildren()) {
                    for (let _fragmentPart of fragment.getChildren()) {
                        let x = _fragmentPart.cmpTransform.local.translation.x;
                        let y = _fragmentPart.cmpTransform.local.translation.y;
                        let z = _fragmentPart.cmpTransform.local.translation.z;
                        _fragmentPart.cmpTransform.local.translation = new f.Vector3(-z, y, x);
                    }
                }
                break;
        }
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Main.js.map