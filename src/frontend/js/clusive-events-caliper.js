'use strict'

var caliperMessageQueue = clusive.djangoMessageQueue();

var caliperEventTypes = {
    TOOL_USE_EVENT: "TOOL_USE_EVENT"
}

// Define explicitly tracked control interactions here
var trackedControlInteractions = [
    {
        selector: ".btn.tts-play",
        handler: "click",
        control: "tts-play",
        value: "clicked"
    },
    {
        selector: ".btn.tts-pause",
        handler: "click",
        control: "tts-pause",
        value: "clicked"
    },
    {
        selector: ".btn.tts-resume",
        handler: "click",
        control: "tts-resume",
        value: "clicked"
    },
    {
        selector: ".btn.tts-stop",
        handler: "click",
        control: "tts-stop",
        value: "clicked"
    }                    
];

var addControlInteractionToQueue = function (control, value) {
    console.debug("Adding control interaction to queue: ", control, value)
    caliperMessageQueue.add({
        "type": "CE", 
        "caliperEvent": {"type": caliperEventTypes.TOOL_USE_EVENT, "control": control, "value": value}
    });
};

$(document).ready(function () {    

    // Build additional control interaction objects here from any data-clusive-event attributes on markup
    // data-clusive-event="[handler]|[control]|[value]"
    // example: data-clusive-event="click|settings-sidebar|opened"

    // ="click|settings-sidebar|opened"
    $("*[data-clusive-event").each(function (i, control) {
        // data-clusive-event attribute 
        console.debug("data-clusive-event", control)
        var defsValsFromAttr = $(control).attr("data-clusive-event").split("|");
        if(defsValsFromAttr.length < 3) {
            console.debug("invalid data-clusive-event attribute value on control", control);
        }
        var interactionDef = {
            selector: control,
            handler: defsValsFromAttr[0],
            control: defsValsFromAttr[1],
            value: defsValsFromAttr[2]
        }
        trackedControlInteractions.push(interactionDef);
    });

    // Set up events control interactions here
    trackedControlInteractions.forEach(function (interactionDef, i) {              
        var control = $(interactionDef.selector);
        console.debug("Event for control tracking: ", interactionDef, control)      
        var handler = interactionDef.handler;
        $(interactionDef.selector).click(function () {                    
            addControlInteractionToQueue(interactionDef.control, interactionDef.value);
        })
    });            
})