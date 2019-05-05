import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/*const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },{
    path: 'product',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab2',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      },
      {
        path: 'tab3',
        redirectTo: '/tabs/tab3',
        pathMatch: 'full'
      },
      {
        path: 'tab4',
        redirectTo: '/tabs/tab4',
        pathMatch: 'full'
      },
      {
        path: 'tab5',
        redirectTo: '/tabs/tab5',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: '../product/product.module#ProductPageModule'
      }
    ]
  },{
    path: 'result',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab2',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      },
      {
        path: 'tab3',
        redirectTo: '/tabs/tab3',
        pathMatch: 'full'
      },
      {
        path: 'tab4',
        redirectTo: '/tabs/tab4',
        pathMatch: 'full'
      },
      {
        path: 'tab5',
        redirectTo: '/tabs/tab5',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: '../result/result.module#ResultPageModule'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];*/

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab1/result',
        loadChildren: '../result/result.module#ResultPageModule'
      },
      {
        path: 'tab1/result/product',
        loadChildren: '../product/product.module#ProductPageModule'
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3/result',
        loadChildren: '../result/result.module#ResultPageModule'
      },
      {
        path: 'tab3/result/product',
        loadChildren: '../product/product.module#ProductPageModule'
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ]
      },
      {
        path: 'tab4/product',
        loadChildren: '../product/product.module#ProductPageModule'
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule'
          }
        ]
      }/*,
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }*/
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
