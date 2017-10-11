import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//创建 Vuex store 对象 - 购物车数据存储
export default new Vuex.Store({
  //数据
  state: {
    carts: []
  },
  //方法
  mutations: {
    addToCart(state, goods) {
      //数据格式：{id: 20, count: 1}
      //先去 localStorage 获取之前存好的购物车信息
      var carts = localStorage.getItem("carts");
      carts = carts ? JSON.parse(carts) : [];
      //遍历，如果已经有相同的商品，就合并count， 没有就push
      var isExist = false;
      carts.forEach(v => {
        if (v.id == goods.id) {
          v.count += goods.count;
          isExist = true;
        }
      });
      if (!isExist) {
        carts.push(goods);
      }

      //将购物车数组数据存入 localStroage
      localStorage.setItem("carts", JSON.stringify(carts));
      //用户最终访问的其实是state.carts，所以要同步
      state.carts = carts;

    },
    minusCount(state, id) {
      state.carts.forEach(v => {
        if (v.id == id) {
          v.count--;
        }
      });
      localStorage.setItem("carts", JSON.stringify(state.carts));

    },
    addCount(state, id) {
      state.carts.forEach(v => {
        if (v.id == id) {
          v.count++;
        }
      });
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    del(state, id) {
      var index = state.carts.findIndex(v => {
        return v.id == id;
      })
      state.carts.splice(index, 1);

      localStorage.setItem("carts", JSON.stringify(state.carts));
    }
  },
  getters: {
    totalCount: state => {
      //每次刷新页面（初始状态时，就要有数据显示）
      var carts = localStorage.getItem("carts");
      carts = carts ? JSON.parse(carts) : [];
      state.carts = carts;
      //获取总数
      var result = 0;
      state.carts.forEach(v => {
        result += v.count;
      });
      return result;
    },
    //购物车id对应的count存入counts对象中
    counts: state => {
      var obj = {};
      state.carts.forEach(v => {
        obj[v.id] = v.count;
      });
      return obj;
    },

  }
});