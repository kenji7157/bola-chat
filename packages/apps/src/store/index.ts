import { Store } from 'vuex';
import { Module, createStore as cs } from 'vuex-smart-module';
import { SignInModule } from '@/store/SignInModule';
import { CommentCollectionModule } from '@/store/CommentCollectionModule';

export function createStore(): Store<any> {
  const rootModule = new Module({
    modules: {
      SignInModule,
      CommentCollectionModule,
    },
  });
  return cs(rootModule);
}
