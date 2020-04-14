import { withKnobs, boolean } from "@storybook/addon-knobs";
import React from "react";
import Cell from "./Cell";

export default {
	title: 'Cell',
	decorators: [withKnobs],
}

export const CellStory: React.FC = () => {
	return (
		<Cell isAlive={boolean('isAlive', false)} />
	)
}