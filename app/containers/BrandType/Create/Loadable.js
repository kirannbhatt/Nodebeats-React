/**
 * Asynchronously loads the modules for HomePage
 */
import Loadable from "routing/Loadable";

import { handleLoadedModules } from '../Loadable';

export default Loadable({
    loader: ({ injectReducer, injectSagas }) =>
        Promise.all([
            import("../reducer"),
            import("../sagas"),
            import("./index")
        ]).then(handleLoadedModules(injectReducer, injectSagas))
});