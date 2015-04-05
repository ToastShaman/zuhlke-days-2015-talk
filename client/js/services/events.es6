import signals from 'signals';

class Events {
    constructor() {
        this.http = {
            failedRequest: new signals.Signal()
        }
    }
}

export default new Events();