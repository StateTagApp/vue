function privateValidateStaEvent(data, spec, onFailCallback) {

    for (var r of spec) {
        if (_.isEmpty(data[r]) && !_.isNumber(data[r])) {
            let msg = 'Missing staEvent element: '
                .concat(r)
                .concat(' in ')
                .concat(JSON.stringify(data));

            if (_.isFunction(onFailCallback)) {
                onFailCallback(msg)
            }

            return false;
        }
    }

    return true;
}

stateTagApp['dispatch'] = function (data) {
    let desired = ['app', 'type', 'from', 'event'];
    let required = [];

    data['app'] = 'stateTagApp';

    if (!_.isNull(this.state.state.context)) {
        data['thread'] = this.state.state.context;
    }

    privateValidateStaEvent(data, desired, console.log);
    if (privateValidateStaEvent(data, required, function (msg) {
        alert(msg);
    })) {
        window.parent.postMessage(JSON.stringify(data), '*');
    }
}

function stateTagAppEventListener(message) {
    let staEvent;
    try {
        staEvent = JSON.parse(message.data)
    } catch (error) {
        return;
    }
    if (typeof staEvent.app == 'undefined' || staEvent.app != 'stateTagApp') {
        return;
    }

    /**
     * HANDLERS
     * You can respond to stateTagApp events here.
     */
    console.log(staEvent)

}