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
    messages = [{
        message: '1'
    }, {
        message: '1'
    }, {
        message: '1'
    }, {
        message: '1'
    }];
    constructor(props) {
        super(props)

        props.dispatch({
            type: 'fetch'
        });
        // this.messages = props.list;
        console.log(props.list)
    }

    render() {
        return (
            <div className={styles.normal}>
                <ul className={styles.list}>
                    {this.messages.map((item, index) => {
                        return <li className={styles.item} key={index}>{item.message}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageComponent);
