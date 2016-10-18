import React, { Component } from 'react';

import { tasksRef } from '../firebase-ref';

class TaskInput extends Component {
    constructor() {
        super();
        this.state = { text: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const newTask = {
            text: this.state.text.trim(),
            done: false
        };
        if (newTask.text.length) {
            tasksRef.push(newTask);
            this.setState({ text: '' });
        }
    }

    render() {
        return (
            <div className="TaskInput">
                <form onSubmit={this.handleSubmit} className="TaskInput-form">
                    <input
                        onChange={(evt) => this.setState({ text: evt.target.value })}
                        value={this.state.text}
                        type="text"
                        placeholder="Add a new task..."
                        required
                    />
                </form>
            </div>
        );
    }
}

export default TaskInput;