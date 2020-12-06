import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile/:uid',
    loadChildren: () => import('./logged-in/profile/profile.module').then(mod => mod.ProfileModule)
  },
  {
    path: 'search/:query',
    loadChildren: () => import('./logged-in/search/search.module').then(mod => mod.SearchModule)
  },
  {
    path: 'academy',
    loadChildren: () => import('./logged-in/academy/academy.module').then(mod => mod.AcademyModule)
  },
  {
    path: 'discover/gigs',
    loadChildren: () => import('./logged-in/discover-gigs/discover-gigs.module').then(mod => mod.DiscoverGigsModule)
  },
  {
    path: 'discover/artists',
    loadChildren: () => import('./logged-in/discover-artists/discover-artists.module').then(mod => mod.DiscoverArtistsModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./logged-in/logged-in.module').then(mod => mod.LoggedInModule)
  },
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(mod => mod.HomepageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule)
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
