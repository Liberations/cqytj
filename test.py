import cv2
import numpy as np

def find_pattern(image_path, pattern_path):
    # 读取待搜索的图像和目标图像
    image = cv2.imread(image_path)
    pattern = cv2.imread(pattern_path)

    # 使用模板匹配
    result = cv2.matchTemplate(image, pattern, cv2.TM_CCOEFF_NORMED)
    _, max_val, _, max_loc = cv2.minMaxLoc(result)

    # 设置匹配阈值，可以根据实际情况调整
    threshold = 0.65

    # 找到最佳匹配位置的坐标
    if max_val >= threshold:
        top_left = max_loc
         # 获取图片1和图片2的尺寸
        height1, width1, channels1 = pattern.shape
        return [top_left[0]+int(width1 / 2),top_left[1]+int(height1 / 2)]
    else:
        print('Pattern not found.')
        return None


# 测试竹排 中心正常
#find_pattern('test_zp.png', 'zp.jpg')
# 测试荷叶 中心正常
#find_pattern('test_hy.jpg', 'hy.jpg')
# 测试井盖
#find_pattern('test_jg.jpg', 'jg.jpg')
# 测试莲蓬
#find_pattern('test_lp.jpg', 'lp.jpg')
# 测试正方形
#find_pattern('test_zfx.jpg', 'zfx.jpg')
# 测试开始
#find_pattern('test_ks.jpg', 'ks.jpg')
# 测试再来一次
#find_pattern('test_zlyj.jpg', 'zlyj.jpg')

#测试图片 
testArray = ["test_zp.png","test_hy.jpg","test_jg.jpg","test_lp.jpg","test_zfx.jpg"]
#起点图片
startImag = cv2.imread("start.jpg")
#竹排图片
zpImage = cv2.imread("zp.jpg")
#荷叶图片
hyImage = cv2.imread("hy.jpg")
#井盖图片
jgImage = cv2.imread("jg.jpg")
#莲蓬图片
lpImage = cv2.imread("lp.jpg")
#正方形图片
zfxImage = cv2.imread("zfx.jpg")

tartgetArry = [zpImage,hyImage,jgImage,lpImage,zfxImage]

#这里遍历testArray中的图片 从里面找出startImage 如果找不到直接return
#接下来 遍历寻找 tartgetArry 中的图片找到一个就终止循环
#接下来 在原图中 标记出 startImage tartgetImage的位置 计算出他们中心点之间的距离 并且连线

print('Distance between the patterns:', zpPos) 
# 在图片上绘制连接线
image = cv2.imread("test_jg.jpg")
cv2.line(image, zpPos, qwPos, (0, 0, 255), 10)  # 绘制连线，参数为起点和终点的坐标以及线的颜色和粗细
image_resized = cv2.resize(image, (0,0), fx=0.3, fy=0.3)
cv2.imshow('Matched Patterns',image_resized)  # 显示结果图像
cv2.waitKey(0)  # 等待用户按键操作
cv2.destroyAllWindows()  # 关闭所有OpenCV窗口
