"use strict";
var L03_PongPaddle;
(function (L03_PongPaddle) {
    var f = FudgeCore;
    let keysPressed = {};
    window.addEventListener("load", hndLoad);
    // tslint:disable-next-line: typedef
    let viewport;
    let ball = new f.Node("Ball");
    let paddleLeft = new f.Node("PaddleLeft");
    let paddleRight = new f.Node("PaddleRight");
    let randX;
    let randY;
    let randZ;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = createPong();
        setUpBall();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(4);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function setUpBall() {
        randX = plusMinus() * Math.random() / 10;
        randY = plusMinus() * Math.random() / 10;
        //randZ = plusMinus() * Math.random() / 10;
    }
    function plusMinus() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    function update(_event) {
        let lockLeftUP = false;
        let lockLeftDOWN = false;
        let lockRightUP = false;
        let lockRightDOWN = false;
        console.log(keysPressed);
        ball.cmpTransform.local.translate(new f.Vector3(randX, randY, 0));
        console.log(paddleLeft.cmpTransform.local.translation.y);
        if (ball.cmpTransform.local.translation.x > 21 || ball.cmpTransform.local.translation.x < -21) {
            randX = -randX;
        }
        if (ball.cmpTransform.local.translation.y > 14 || ball.cmpTransform.local.translation.y < -14) {
            randY = -randY;
        }
        if (paddleLeft.cmpTransform.local.translation.y > 12.6) {
            lockLeftUP = true;
        }
        else {
            lockLeftUP = false;
        }
        if (paddleLeft.cmpTransform.local.translation.y < -12.6) {
            lockLeftDOWN = true;
        }
        else {
            lockLeftDOWN = false;
        }
        if (paddleRight.cmpTransform.local.translation.y > 12.6) {
            lockRightUP = true;
        }
        else {
            lockRightUP = false;
        }
        if (paddleRight.cmpTransform.local.translation.y < -12.6) {
            lockRightDOWN = true;
        }
        else {
            lockRightDOWN = false;
        }
        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP] && !lockRightUP)
            paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN] && !lockRightDOWN)
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        if (keysPressed[f.KEYBOARD_CODE.W] && !lockLeftUP)
            paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.S] && !lockLeftDOWN)
            paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        f.RenderManager.update();
        viewport.draw();
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function createPong() {
        let pong = new f.Node("Pong");
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let meshQuad = new f.MeshQuad();
        ball.addComponent(new f.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        paddleRight.addComponent(new f.ComponentMesh(meshQuad));
        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new f.ComponentTransform());
        paddleLeft.addComponent(new f.ComponentTransform());
        paddleRight.addComponent(new f.ComponentTransform());
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
})(L03_PongPaddle || (L03_PongPaddle = {}));
//# sourceMappingURL=Main.js.map