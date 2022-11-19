import * as PIXI from 'pixi.js';

import 'map/modules/app';
import 'map/modules/chart';
import 'map/modules/timeline';
import 'map/modules/scrollable';

// pixi debug
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
