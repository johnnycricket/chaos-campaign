import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CampaignsPage from "@/pages/CampaignsPage.vue";
import CampaignDetailsPage from "@/pages/CampaignDetailsPage.vue";
import UnitsPage from "@/pages/UnitsPage.vue";
import UnitsDetailsPage from "@/pages/UnitsDetailsPage.vue";
import ForcesPage from "@/pages/ForcesPage.vue";
import ForceDetailsPage from "@/pages/ForceDetailsPage.vue";

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
  {
    path: "/units/:id",
    name: "unit-details",
    component: UnitsDetailsPage,
  },
  {
    path: "/forces",
    name: "forces",
    component: ForcesPage,
  },
  {
    path: "/forces/:id",
    name: "force-details",
    component: ForceDetailsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
