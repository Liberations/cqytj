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
    toastLog("开始运行")
    while (true) {
        findTap()
        sleep(shopSleepTime * 60 * 1000)
    }
}


function findTap() {
    //点击销冠位置
    click(1963, 208)
    sleep(800)
    //点击一键收取
    click(2060, 925)
    sleep(800)
    //点击全部接取
    click(2060, 708)
    sleep(800)
    //点击右上角返回
    click(2270, 137)
    sleep(800)
    //点击总览
    click(2244, 200)
    sleep(800)
    //点击一键收取
    click(1160, 912)
    sleep(800)
    //点击销售
    click(1965, 489)
    sleep(800)
    //点击一键收取
    click(1160, 912)
    sleep(800)
    //点击外围
    click(2200, 869)
    var count = 0
    for (var i = 0; i < shopRow; i++) {
        for (var j = 0; j < shopCol; j++) {
            let clickOffsetX = j * shopWidth
            let clickOffsetY = i * shopHeight
            let clickX = shopStartX + clickOffsetX
            let clickY = shopStartY + clickOffsetY
            log("点击第"+(i+1)+"行第"+(j+1)+"列")
            //点击杂货铺
            click(clickX, clickY)
            sleep(800)
            //双击杂货铺防止出现金币
            click(clickX, clickY)
            sleep(800)
            //点击物品
            click(1496, 865)
            sleep(800)
            //点击上架
            click(1271, 863)
            sleep(800)
            //点击外围
            click(2156, 849)
            sleep(800)
            //点击外围
            click(2156, 849)
            sleep(800)
            count++
            if (count >= shopCount) {
                log("结束收货")
                //点击外围
                click(2156, 849)
                sleep(800)
                //点击外围
                click(2156, 849)
                sleep(800)
                break
            }
        }

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