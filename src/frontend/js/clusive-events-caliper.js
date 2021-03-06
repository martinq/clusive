/* global PAGE_EVENT_ID, clusive */

$(document).ready(function() {
    'use strict';

    var addControlInteractionToQueue = function(control, value) {
        console.debug('Adding control interaction to queue: ', control, value);
        window.clusiveEvents.messageQueue.add({
            type: 'CE',
            caliperEvent: {
                type: window.clusiveEvents.caliperEventTypes.TOOL_USE_EVENT,
                control: control,
                value: value
            },
            readerInfo: clusiveContext.reader.info,
            eventId: PAGE_EVENT_ID
        });
    };

    window.clusiveEvents = {
        messageQueue: clusive.djangoMessageQueue(),
        caliperEventTypes: {
            TOOL_USE_EVENT: 'TOOL_USE_EVENT'
        },
        dataAttributes: {
            HANDLER: 'data-cle-handler',
            CONTROL: 'data-cle-control',
            VALUE: 'data-cle-value'
        },
        trackedControlInteractions: [
            /*
                control interactions to track can be added centrally here if needed,
                but in most cases using the data-cle-* attributes on the markup
                will be more appropriate
            */
            // {
            //     selector: ".btn.tts-play",
            //     handler: "click",
            //     control: "tts-play",
            //     value: "clicked"
            // }
        ],
        addControlInteractionToQueue: addControlInteractionToQueue
    };

    var addTipRelatedActionToQueue = function(action) {
        window.clusiveEvents.messageQueue.add({
            type: 'TRA',
            action: action
        });
    };

    // Build additional control interaction objects here from any data-clusive-event attributes on page markup
    // synax: data-clusive-event="[handler]|[control]|[value]"
    // example: data-clusive-event="click|settings-sidebar|opened"
    $('*[data-cle-handler]').each(function(i, control) {
        // data-clusive-event attribute
        var elm = $(control);
        var eventHandler = $(control).attr(clusiveEvents.dataAttributes.HANDLER);
        var eventControl = $(control).attr(clusiveEvents.dataAttributes.CONTROL);
        var eventValue = $(control).attr(clusiveEvents.dataAttributes.VALUE);
        console.debug('data-cle-handler attribute found', elm, eventHandler, eventControl, eventValue);
        if (eventHandler !== undefined && eventControl !== undefined && eventValue !== undefined) {
            var interactionDef = {
                selector: elm,
                handler: eventHandler,
                control: eventControl,
                value: eventValue
            };
            clusiveEvents.trackedControlInteractions.push(interactionDef);
        } else {
            console.debug('tried to add event logging, but missing a needed data-cle-* attribute on the element: ', elm);
        }
    });

    // Set up events control interactions here
    clusiveEvents.trackedControlInteractions.forEach(function(interactionDef) {
        var control = $(interactionDef.selector);
        console.debug('Event for control tracking: ', interactionDef, control);
        var handler = interactionDef.handler;
        $(interactionDef.selector)[handler](function() {
            addControlInteractionToQueue(interactionDef.control, interactionDef.value);
        });
    });

    $('body').on('click', '*[data-clusive-tip-action]', function(event) {
        var action = $(this).attr('data-clusive-tip-action');
        console.debug('data-clusive-tip-action', action, event);
        addTipRelatedActionToQueue(action);
    });
});
