import { createSlice } from '@reduxjs/toolkit';

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

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
