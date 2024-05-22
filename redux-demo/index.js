const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

// Types
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// Actions
function orderCake(qty = 1) {
	return {
		type: CAKE_ORDERED,
		payload: qty,
	};
}
function restockCake(qty = 1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}
function orderIceCream(qty = 1) {
	return {
		type: ICECREAM_ORDERED,
		payload: qty,
	};
}
function restockIceCream(qty = 1) {
	return {
		type: ICECREAM_RESTOCKED,
		payload: qty,
	};
}

// Initial States
const initialCakeState = {
	numOfCakes: 10,
};
const initialIceCreamState = {
	numOfIceCreams: 20,
};

// Reducers
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,
				numOfCakes: state.numOfCakes - action.payload,
			};
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			};
		default:
			return state;
	}
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case ICECREAM_ORDERED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - action.payload,
			};
		case ICECREAM_RESTOCKED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams + action.payload,
			};
		case CAKE_ORDERED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - 1,
			};
		default:
			return state;
	}
};
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});

// Store
const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial state ', store.getState());
const unsubscribe = store.subscribe(() => {
	// console.log('Updated state ', store.getState())
});

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake(2));
store.dispatch(restockCake(4));
store.dispatch(orderIceCream());
store.dispatch(orderIceCream(2));
store.dispatch(restockIceCream(3));

unsubscribe();
