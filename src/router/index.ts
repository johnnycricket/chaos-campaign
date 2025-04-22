import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import CampaignsPage from "@/pages/CampaignsPage.vue";
import CampaignDetailsPage from "@/pages/CampaignDetailsPage.vue";
import ForcesPage from "@/pages/ForcesPage.vue";
import ForceDetailsPage from "@/pages/ForceDetailsPage.vue";
import UnitFormPage from "@/pages/UnitFormPage.vue";
import UnitDetailsPage from "@/pages/UnitDetailsPage.vue";

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
    path: "/forces",
    name: "forces",
    component: ForcesPage,
  },
  {
    path: "/forces/:forceId",
    name: "force-details",
    component: ForceDetailsPage,
  },
  {
    path: "/forces/:forceId/units/new",
    name: "unit-new",
    component: UnitFormPage,
  },
  {
    path: "/forces/:forceId/units/:unitId",
    name: "unit-details",
    component: UnitDetailsPage,
  },
  {
    path: "/forces/:forceId/units/:unitId/edit",
    name: "unit-edit",
    component: UnitFormPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
