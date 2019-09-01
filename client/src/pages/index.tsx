import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Col, Row } from 'antd'
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
                    <Row className={styles.row}>
                    {this.props.list.map((item, index) => {
                        return <Col className={styles.span} span = {12} xs ={24} sm = {12} md = {12} lg = {8} xl = {6}>
                                    <li className={styles.item} key={index}>
                                        <div>
                                            name: {item.name}
                                        </div>
                                        <div>
                                            message: {item.message}
                                        </div>

                                    </li>
                                </Col>

                    })}
                    </Row>
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessageComponent);
