from django.shortcuts import render
from django.http import JsonResponse
from django.views import View

from roster.models import ClusiveUser
from roster.views import set_user_preferences

from .models import Message, MessageTypes

import json
import logging

logger = logging.getLogger(__name__)

# Create your views here.

# TODO: this needs to be replaced with something that actually works with the Model 
# definition and the signals code
def process_messages(queue_timestamp, messages, user, request):    
    for message in messages:
        message["content"]["userId"] = user.id
        message_timestamp = message["timestamp"]
        message_content = message["content"]
        message_type = message["content"]["type"]
        if(message_type == MessageTypes.PREF_CHANGE):
            logger.debug("Found a preference change message: %s" % message)
            
            set_user_preferences(user, message_content["preferences"], request)
            pref_change_message = Message(type=message_type, content=message_content, timestamp=message_timestamp)
            pref_change_message.save()


class MessageQueueView(View):
    def post(self, request):        
        try:
            receivedQueue = json.loads(request.body)     
            logger.debug("Received a message queue: %s" % receivedQueue);
            queue_timestamp = receivedQueue["timestamp"]
            messages = receivedQueue["messages"]
            user = request.clusive_user
            process_messages(queue_timestamp, messages, user, request)
        except json.JSONDecodeError:
            return JsonResponse(status=501, data={'message': 'Invalid JSON in request body'})        
        return JsonResponse({'success': messages})