document.addEventListener('DOMContentLoaded', function() {

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
            console.log('已找到包含"3张"字符串的元素，停止替换。');
            Gear.setRate(100);
            return; // 停止替换
        }
    }

    setTimeout(function() {
        performSelection(!isDown);
    }, 5000);
}

performSelection(true);
}
