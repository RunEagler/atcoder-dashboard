import Vuex, { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import Vue from 'vue';
import { statisticsModule } from '@/store/modules/statistics.module';

Vue.use(Vuex);

export interface RootState {
  collapsed: boolean;
  route: {
    path: string;
    params: { [key: string]: string };
    query: { [key: string]: string };
    fullPath: string;
  };
}

const stateOfModule: RootState = {
  collapsed: true,
  route: {
    path: '',
    params: {},
    query: {},
    fullPath: '',
  },
};

const gettersOfModule: GetterTree<RootState, RootState> = {
  collapsed(state: RootState): boolean {
    return state.collapsed;
  },
};

const mutations: MutationTree<RootState> = {
  collapsed: (state: RootState, value: boolean) => {
    state.collapsed = value;
  },
};

const actions: ActionTree<RootState, RootState> = {
  init(ctx: ActionContext<RootState, RootState>) {
    // authToken反映処理
    // localeの設定
  },
};

export const store = new Vuex.Store<RootState>({
  state: stateOfModule,
  getters: gettersOfModule,
  mutations,
  actions,
  modules: {},
});
