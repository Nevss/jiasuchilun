var button = document.createElement("button");
button.textContent = "开始操作";
button.style.position = "fixed";
button.style.top = "20px"; // 距离顶部的距离
button.style.right = "20px"; // 距离右侧的距离
button.style.zIndex = "9999"; // 设置z-index确保按钮位于其他元素上方
button.style.backgroundColor = "#007bff"; // 按钮背景颜色
button.style.color = "#fff"; // 按钮文字颜色
button.style.border = "none"; // 去除按钮边框
button.style.borderRadius = "5px"; // 设置按钮圆角
button.style.padding = "10px 20px"; // 按钮内边距
button.style.cursor = "pointer"; // 设置鼠标样式为手型

// 将按钮添加到页面上
document.body.appendChild(button);

// 添加按钮点击事件监听器
button.addEventListener("click", function() {
    // 在这里执行按钮点击后的操作
    performSelection(true); // 调用你的函数
});


function containsTwoImagesText(element) {
    return element.textContent.includes('3张');
}

function performSelection(isDown) {
    var selectElement = document.querySelector('.ant-select-selector');

    if (selectElement) {
        var listItemElements = document.querySelectorAll('div.site');

        // 检查所有包含 "2张" 字符串的 div 元素
        var hasTwoImagesText = Array.from(listItemElements).some(function(element) {
            return containsTwoImagesText(element);
        });

        if (!hasTwoImagesText) {
            // 原来的逻辑
            // 找到包含下拉框的元素

                // 创建鼠标点击事件（打开下拉框）
                var openEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });

                // 触发点击事件以打开下拉框
                selectElement.dispatchEvent(openEvent);

                // 模拟按下三次箭头键
                for (var i = 0; i < 3; i++) {
                    var arrowEvent = new KeyboardEvent('keydown', {
                        bubbles: true,
                        cancelable: true,
                        key: isDown ? 'ArrowDown' : 'ArrowUp',
                        keyCode: isDown ? 40 : 38,
                        which: isDown ? 40 : 38,
                        code: isDown ? 'ArrowDown' : 'ArrowUp'
                    });

                    selectElement.dispatchEvent(arrowEvent);
                }

                // 模拟按下回车键来选择选项
                var enterEvent = new KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    key: 'Enter',
                    keyCode: 13,
                    which: 13,
                    code: 'Enter'
                });

                selectElement.dispatchEvent(enterEvent);
            
        } else {
            // 创建蒙版元素
            var overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.right = "0";
            overlay.style.width = "50%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // 红色蒙版，带有50%的透明度
            overlay.style.zIndex = "9999"; // 设置蒙版在最前面
            
            // 将蒙版添加到页面上
            document.body.appendChild(overlay);

            console.log('已找到包含"3张"字符串的元素，停止替换。');
            return; // 停止替换
        }
    }

    setTimeout(function() {
        performSelection(!isDown);
    }, 5000);
}

//performSelection(true);
