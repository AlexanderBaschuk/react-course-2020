import { getTime } from "./helpers"

export const helloWorld = () => {
	const text = getTime().toString() + " Hello world!"
	document.body.textContent = text
	global.console.log(text)
}

helloWorld()
