import cv2
import numpy as np
 
# 加载要查找的目标图像和源图像
template = cv2.imread('zfx.jpg')
image = cv2.imread('test_zfx.jpg')
 
# 将原图和模板图转换为灰度图
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

# 检查原图和模板图的深度和类型是否匹配
if image_gray.dtype != template_gray.dtype:
    raise ValueError("Image and template must have the same data type")
if image_gray.ndim != 2:
    raise ValueError("Image must be a 2D array")

# 使用模板匹配方法进行匹配
res = cv2.matchTemplate(image_gray, template_gray, cv2.TM_CCOEFF_NORMED)

# 设置阈值和最大匹配区域大小
threshold = 0.8
max_val = 0
top_left = None

# 查找匹配区域
loc = np.where(res >= threshold)
for pt in zip(*loc[::-1]):
    if res[0, len(res)] > max_val:
        max_val = res[pt[0], pt[1]]
        top_left = pt

# 在原图中绘制匹配区域（可选）
if top_left is not None:
    cv2.rectangle(image, top_left, (top_left[0] + template.shape[1], top_left[1] + template.shape[0]), (0, 0, 255), 2)

# 显示原图和匹配区域（可选）
cv2.imshow('Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()