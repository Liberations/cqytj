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
var 顶部投壶 = images.read("顶部投壶.jpg")
var 底部投壶 = images.read("底部投壶.jpg")
var 开始投壶 = images.read("开始投壶.jpg")

function main() {
    sleep(1000)
    toastLog("开始运行")
    while (true) {
        findTap()
        sleep(200)

    }
}


function findTap() {
    var img = images.captureScreen()
    if (!img) {
        log('截图失败')
        return
    }
    //点击开始投掷
    click(733, 2563)
    log("开始识别")
    var pos = images.findImage(img, 开始投壶)
    if (pos) {
        click(pos.x, pos.y)
        return
    }

    var pos1 = images.findImage(img, 顶部投壶)
    if (pos1 && pos1.x > device.width / 2 + 30) {
        log("顶部投壶" + pos1)
        click(733, 2563)
        sleep(3000)
        swipe(device.width/2,device.height * 0.9,device.width / 2, device.height * 0.8, 30000)

        return
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
    threads.start(function () {
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
setInterval(() => { }, 5000);