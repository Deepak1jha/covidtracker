import {compose, createStore} from "redux";
import {autoRehydrate, persistStore} from "redux-persist";
import reducers from "../reducers";

function configureStore() {

    const enhancer = compose(
        autoRehydrate(),
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    const store = createStore(reducers, enhancer);

    persistStore(store);
    return store;

}

export default configureStore();
