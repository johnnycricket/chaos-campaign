import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CampaignsPage from "@/pages/CampaignsPage.vue";
import CampaignDetailsPage from "@/pages/CampaignDetailsPage.vue";
import UnitsPage from "@/pages/UnitsPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/campaigns",
    name: "campaigns",
    component: CampaignsPage,
  },
  {
    path: "/campaigns/:id",
    name: "campaign-details",
    component: CampaignDetailsPage,
  },
  {
    path: "/units",
    name: "units",
    component: UnitsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
