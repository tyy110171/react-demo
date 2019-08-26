import React, { Component } from 'react';
import styles from './index.css';
import {MessageService} from "../service/message";


export default class MessageComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getMessage()
    }

    getMessage() {
        MessageService.getMessage()
            .then(resp => console.log(resp))
    }

    render() {
        return (
            <div className={styles.normal}>
                <div className={styles.welcome} />
                <ul className={styles.list}>
                    <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
                    <li>
                        <a href="https://umijs.org/guide/getting-started.html">
                            Getting Started
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
