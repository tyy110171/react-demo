import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import styles from './index.css';

function mapStateToProps(state) {
    const { list} = state.messages;
    return {
        list
    };
}

class MessageComponent extends Component {
    // props;
    constructor(props) {
        super(props);
        this.getData();
    }

    getData() {
        this.props.dispatch({
            type: 'messages/fetch',
            payload: {
                list: []
            }
        });
    }

    render() {
        return (
            <div className={styles.normal}>
                <div className={styles.btn}>
                    <Button onClick={this.getData.bind(this)}>刷新</Button>
                </div>
                <ul className={styles.list}>
                    {this.props.list.map((item, index) => {
                        return <li className={styles.item} key={index}>
                            <div>
                                channel: {item.channel}
                            </div>

                            <div>
                                name: {item.name}
                            </div>
                            <div>
                                message: {item.message}
                            </div>

                            </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageComponent);
