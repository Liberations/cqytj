auto()
//安卓版本高于Android 9
if (device.sdkInt > 28) {
    //等待截屏权限申请并同意
    threads.start(function () {
        packageName('com.android.systemui').text('立即开始').waitFor()
        text('立即开始').click()
    });
}
//申请截屏权限
if (!requestScreenCapture()) {
    toast("请求截图失败")
    exit()
}
var 青蛙再玩一局 = images.read("青蛙再玩一局.jpg")
var 青蛙开始 = images.read("青蛙开始.jpg")
var 青蛙 = images.read("小青蛙.jpg")
var 竹排 = images.read("竹排.jpg")
var 黄色正方形 = images.read("正方形.jpg")
var 荷叶 = images.read("荷叶.jpg")
var 井盖 = images.read("井盖.jpg")
var 莲蓬 = images.read("莲蓬.jpg")
var radius = 1.28 //按压系数
var waArr = [青蛙, 竹排, 黄色正方形, 荷叶, 井盖, 莲蓬]
var waArrTxt = ["青蛙", "竹排", "黄色正方形", "荷叶", "井盖", "莲蓬"]

function main(){
    sleep(1000)
    toastLog("开始运行")
    while (true) {
        sleep(500)
        findTap()
    
    }
}


function findTap() {
    var img = images.captureScreen()
    if (!img) {
        log('截图失败')
        return
    }
    log("开始识别")
    var pos4 = images.findImage(img, 青蛙开始)
    if (pos4) {
        log("青蛙再玩一局" + pos4)
        click(pos4.x, pos4.y)
        sleep(1000)
        return
    }
    var pos3 = images.findImage(img, 青蛙再玩一局)
    if (pos3) {
        log("青蛙再玩一局" + pos3)
        click(pos3.x, pos3.y)
        sleep(1000)
        return
    }
    var pos = images.findImage(img, 青蛙, {
        threshold: 0.6
    })
    if (pos) {
        log("青蛙x " + pos.x + " y " + pos.y)
        for (var i = 0; i < waArr.length; i++) {
            let temp = waArr[i]
            var pos2 = images.findImage(img, temp, {
                threshold: 0.7,
                region: [0, 0, device.width, device.height / 2]
            })
            if (pos2) {
                log("找到 " + waArrTxt[i] + pos2.x + " y " + pos2.y)
                var disX = Math.abs(pos2.x - pos.x)
                var disY = Math.abs(pos2.y - pos.y)
                var dis = Math.sqrt(Math.floor(disX * disX + disY * disY))

                var pressTime = Math.floor(dis * radius)
                if (pressTime <= 0) {
                    pressTime = 1
                }
                log("距离" + dis + "按压时间" + pressTime)
                press(pos.x, pos.y, pressTime)
                break

            }
        }

    } else {
        log("没找青蛙")
    }
}


log("开始辅助")
// 创建悬浮窗
var window = floaty.window(
    <vertical>
        <button id="toggleButton" text="展开" w="auto" h="auto" />
        <vertical id="menu" visibility="gone">
            <button id="startButton" text="开始" w="auto" h="auto" />
            <button id="stopButton" text="结束" w="auto" h="auto" />
        </vertical>
    </vertical>
);
var isOpen = false
// 设置悬浮窗位置
window.setPosition(0, device.height / 20);

log("我的引擎" + engines.myEngine())
engines.all().forEach(item => {
    if (item.id != engines.myEngine().id) {
        log("停止引擎" + item)
        item.forceStop()
    }

})

function hideMenu() {
    isOpen = false
    window.menu.setVisibility(8);
    window.toggleButton.setText("展开");
}

function expandOrHideMenu() {
    isOpen = !isOpen
    if (isOpen) {
        window.menu.setVisibility(0);
        window.toggleButton.setText("收起");
    } else {
        window.menu.setVisibility(8);
        window.toggleButton.setText("展开");
    }
}
// 切换按钮点击事件
window.toggleButton.click(() => {
    expandOrHideMenu()

});

// 开始按钮点击事件
window.startButton.click(() => {
    hideMenu()
    threads.start(function() {
        log("开始")
        main()
    });

});

// 结束按钮点击事件
window.stopButton.click(() => {
    threads.shutDownAll()
    toastLog("已停止");
    hideMenu()
});

//保持脚本运行
setInterval(() => {}, 5000);