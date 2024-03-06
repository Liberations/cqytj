auto()
//首个杂货铺点击位置
shopStartX = 744
shopStartY = 243
//每个方块的宽度
shopWidth = 274
//每个杂货铺的高度
shopHeight = 117
shopCount = 22
shopCol = 4
shopRow = 6
//杂货铺收取间隔（分钟）
shopSleepTime = 1
shopPoints = [
    [744, 243], [1022, 243], [1315, 243], [1407, 243],//第1排
    [691, 340], [990, 340], [1315, 340], [1407, 340],//第2排
    [680, 452], [990, 452], [1315, 452], [1407, 452],//第3排
    [630, 568], [970, 568], [1325, 568], [1460, 568],//第4排
    [575, 720], [953, 720], [1322, 720], [1470, 720],//第5排
    [380, 820], [830, 820]  //第6排
] 

function main() {
    shopRow = Math.ceil(shopCount / shopCol)
    log("杂货铺数量" + shopCount + "行数" + shopRow + "列数" + shopCol)
    log("开始运行")
    sleep(1000)
    while (true) {
        //let find = findConin()
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
    shopPoints.forEach((pos)=>{
        let clickX = pos[0]
        let clickY = pos[1]
        log("点击第" + (count + 1)+"杂货铺")
        //点击杂货铺
        click(clickX, clickY)
        sleep(800)
        //点击物品
        click(1496, 865)
        sleep(800)
        //点击上架
        click(1271, 863)
        sleep(800)
        //点击外围
        click(2100, 849)
        sleep(800)
        //点击外围
        click(2100, 849)
        sleep(800)
        count++
        if (count >= shopCount) {
            log("结束收货")
            //点击外围
            click(2100, 849)
            sleep(800)
            //点击外围
            click(2100, 849)
            sleep(800)
            return
        }
    })
  


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
window.setPosition(0, 250);

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

hideMenu()
threads.start(function () {
    log("开始")
    main()
});

//保持脚本运行
setInterval(() => { }, 5000);

