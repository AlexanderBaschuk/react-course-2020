import { getTime } from "./timeHelpers"

const text: string = "Hello world!"

export const helloWorld = () => {
	document.body.textContent = getTime().toString + text
}
