import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'result', loadChildren: './result/result.module#ResultPageModule' }
  /*{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#TabsPageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#TabsPageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#TabsPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#TabsPageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#TabsPageModule' },
  */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
