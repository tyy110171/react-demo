import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './index.css';

function mapStateToProps(state) {
    const { list} = state.messages;
    return {
        list
    };
}

class MessageComponent extends Component {

    constructor(props) {
        super(props)

        props.dispatch({
            type: 'fetch'
        });

    }

    render() {
        return (
            <div className={styles.normal}>
                <ul className={styles.list}>
                    {this.props.list.map((item, index) => {
                        return <li className={styles.item} key={index}>{item.message}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageComponent);
