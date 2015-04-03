import signals from 'signals';

class Events {
    constructor() {
        this.http = {
            failedHttpRequest: new signals.Signal()
        }
    }
}

export default new Events();