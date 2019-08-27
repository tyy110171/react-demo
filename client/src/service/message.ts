import request from '../utils/request';

export function getMessage() {
    return request('/api/message');
}
