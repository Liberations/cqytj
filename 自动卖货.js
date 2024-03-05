auto()
//首个杂货铺点击位置
shopStartX = 1000
shopStartY = 314
//每个方块的宽度
shopWidth = 340
//每个杂货铺的高度
shopHeight = 90
shopCount = 17
shopCol = 3
shopRow = 6
//杂货铺收取间隔（分钟）
shopSleepTime = 2

function main() {
    shopRow = Math.ceil(shopCount / shopCol)
    log("杂货铺数量" + shopCount + "行数" + shopRow + "列数" + shopCol)
    log("开始运行")
    while (true) {
        findTap()
        sleep(shopSleepTime * 60 * 1000)
    }
}


function findTap() {
    //点击销冠位置
    click(984, 608)
    sleep(800)
    //点击一键领取
    click(802, 1959)
    sleep(1000)
    //点击全部接取
    click(580, 1960)
    sleep(800)
    //点击返回
    click(1024, 2324)
    sleep(800)
    //点击总览
    click(1002, 334)
    sleep(800)
    //点击销售
    click(422, 1902)
    sleep(800)
    //点击一键收取
    click(533, 1696)
    sleep(800)
    //点击生产
    click(223, 1902)
    sleep(800)
    //点击一键收取
    click(533, 1696)
    sleep(800)
    //点击外围
    click(540, 328)
    //点击外围
    sleep(2000)
    click(540, 328)
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
window.setPosition(0, device.height / 2);

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