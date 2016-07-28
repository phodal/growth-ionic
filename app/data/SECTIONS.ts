import {SECTION0} from "./sections/section-0";
import {SECTION1} from "./sections/section-1";
import {SECTION2} from "./sections/section-2";
import {SECTION3} from "./sections/section-3";
import {SECTION4} from "./sections/section-4";
import {SECTION5} from "./sections/section-5";
export const SECTIONS = {};

SECTIONS["hello"] = SECTION0.hello;
SECTIONS["env"] = SECTION0.env;

SECTIONS["build"] = SECTION1.build;
SECTIONS["front"] = SECTION1.front;
SECTIONS["backend"] = SECTION1.backend;

SECTIONS["before"] = SECTION2.before;
SECTIONS["test"] = SECTION2.test;
SECTIONS["coding"] = SECTION2.coding;

SECTIONS["container"] = SECTION3.container;
SECTIONS["server"] = SECTION3.server;
SECTIONS["configurable"] = SECTION3.configurable;

SECTIONS["analytics"] = SECTION4.analytics;
SECTIONS["ux"] = SECTION4.ux;

SECTIONS["ci"] = SECTION5.ci;
SECTIONS["cd"] = SECTION5.cd;
