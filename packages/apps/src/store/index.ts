import { Store } from 'vuex';
import { Module, createStore as cs } from 'vuex-smart-module';
import { CommentCollectionModule } from '@/store/CommentCollectionModule';

export function createStore(): Store<any> {
  const rootModule = new Module({
    modules: {
      CommentCollectionModule,
    },
  });
  return cs(rootModule);
}
