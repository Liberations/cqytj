"ui";
importClass(android.view.WindowManager);
importClass(android.view.View);
importClass(android.graphics.Color)
var storage = storages.create("chessStorage");
var radius = storage.get("radius", 1.28) //按压系数
var window = activity.getWindow();
var decorView = window.getDecorView();
var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
decorView.setSystemUiVisibility(option);
decorView.getChildAt(0).getChildAt(1).getLayoutParams().height = device.height
//fd.setLayoutParams(lp)
window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
window.setStatusBarColor(Color.TRANSPARENT);
var verionName = "v1.0.3"
var width = device.width
var height = device.height
var deviceInfo = width + "*" + height
ui.layout(
    <vertical bg="#000000" fitsSystemWindows="true">
        <text text="从前有条街跳一跳助手{{verionName}}" w="*" h="100" textColor="green" gravity="center" textSize="20" />
        <text text="最佳分辨率1080*2400 本机({{deviceInfo}})" w="*" h="20" textColor="white" gravity="center" textSize="14" />
        <text text="QQ 910689331" w="*" h="20" textColor="white" gravity="center" textSize="14" />
        <horizontal  >
            <text text="滑动系数:" w="80" h="*" gravity="center|right" textColor="red" />
            <input id="radius" text="{{radius}}" inputType="text" singleLine="true" textColor="white" w="200" h="*" />
        </horizontal>
        <Switch id="无障碍服务" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" textColor="white" />
        <Switch id="悬浮窗权限" text="悬浮窗权限" checked="{{floaty.checkPermission() != false}}" padding="8 8 8 8" textSize="15sp" textColor="white" />
        <button id="使用教程" style="Widget.AppCompat.Button.Colored" text="使用教程" />
        <button id="startBtn" style="Widget.AppCompat.Button.Colored" text="开始" />
        <text text="仅适配1080*2400分辨率 其他机型自测" w="*" h="auto" gravity="left" textColor="white" />
        <text text="小米长按应用--应用信息--省电策略--无限制" w="*" h="auto" gravity="left" textColor="white" />
        <text text="Vivo设置--电池--后台耗电管理--找到引擎app-允许后台高耗电" w="*" h="auto" gravity="left" textColor="white" />
        <text text="注意运行期间不要操作屏幕否则会影响屏幕点击！音量上直接停止脚本" w="*" h="auto" gravity="left" textColor="red" textSize="20" />
    </vertical>
);
if (device.width != 1080 || device.height != 2400) {
    var clear = confirm("可能不支持你的手机");
    if (clear) {
    }
}
//安卓版本高于Android 9
log("我的引擎" + engines.myEngine())
engines.all().forEach(item => {
    if (item.id != engines.myEngine().id) {
        log("停止引擎" + item)
        item.forceStop()
    }

})
// let date = new Date().getTime()
// if (date >= 699026825000) {
//     toastLog("体验结束！")
//     exit()
// }
ui.无障碍服务.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.悬浮窗权限.on("check", function (checked) {
    //申请悬浮窗
    importClass(android.content.Intent);
    importClass(android.net.Uri);
    importClass(android.provider.Settings);
    var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:" + context.getPackageName()));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    app.startActivity(intent);
});
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.无障碍服务.checked = auto.service != null;
    ui.悬浮窗权限.checked = floaty.checkPermission() != false
});


ui.startBtn.on("click", () => {
    if (floaty.checkPermission() == false) {
        toast("请先开启悬浮窗权限！")
        return;
    }
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    threads.start(function () {
        radius = parseFloat(ui.radius.text())
        storage.put("radius", radius)
        log("radius " + radius)
        engines.execScriptFile("ttw.js");

    });

})
