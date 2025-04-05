import { afterEach, beforeEach, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import { cleanup } from "@testing-library/vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

failOnConsole({
  shouldFailOnError: true,
  shouldFailOnWarn: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnDebug: true,
});

export const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouterMock();

beforeEach(() => {
  global.URL.createObjectURL = vi.fn();
  const pinia = createTestingPinia();
  setActivePinia(pinia);

  router.reset();
  injectRouterMock(router);
});

Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  writable: true,
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
  localStorage.clear();
});
