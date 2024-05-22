const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
	numOfCakes: 10,
};

const cakeSlice = createSlice({
	name: 'cake',
	initialState,
	reducers: {
		ordered: (state) => {
			state.numOfCakes--;
		},
		restocked: (state, aciton) => {
			state.numOfCakes += aciton.payload;
		},
	},
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
