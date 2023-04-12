export default {
    state: {
        isCollapse: false// 用于控制菜单的展开还是收起
    },
    mutations: {
        //修改菜单收起的方法
        COLLAPSE_MENU(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}

// 导出