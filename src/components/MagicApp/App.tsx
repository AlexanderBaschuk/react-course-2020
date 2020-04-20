import React, { Component } from 'react'
import { MyHeader } from './MyHeader'
import { MagicButton } from './MagicButton'

interface Props {}

interface State {
	count: number
}

export class App extends Component<Props, State> {
	constructor() {
		super(null)
		this.state = {
			count: 0,
		}
		this.increment = this.increment.bind(this)
	}

	increment() {
		this.setState({
			count: this.state.count + 1,
		})
	}

	render() {
		return (
			<>
				<MyHeader count={this.state.count} />
				<MagicButton increment={this.increment} count={this.state.count} />
			</>
		)
	}
}
