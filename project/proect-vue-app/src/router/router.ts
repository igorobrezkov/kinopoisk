import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            name: 'main',
            path: '/',
            component: () => import('../views/MainView.vue')
        },
        {
            name: 'genres',
            path: '/genres',
            component: () => import('../views/GenresView.vue'),
        },
        {
            name: 'genre',
            path: '/genres/:id',
            component: () => import('../views/GenreDetailView.vue'),
        },
        {
            name: 'film',
            path: '/film/:id',
            component: () => import('../views/PageFilmView.vue'),
            children: [
                {
                    name: 'films',
                    path: '/film/:id',
                    component: () => import('../views/PageFilmView.vue'),
                }
            ]
        },
        {
            name: 'account',
            path: '/account',
            component: () => import('../views/AccountView.vue'),
            children: [
                {
                    name: 'favorites',
                    path: '/account/favorites',
                    component: () => import('../views/AccountFavoritesView.vue'),
                },
                {
                    name: 'settings',
                    path: '/account/settings',
                    component: () => import('../views/AccountSettingsView.vue'),
                }
            ]
        }
    ]

})


export default router