from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Journey, Step
from .serializers import JourneySerializer
import anthropic
import os
import json
import logging

logger = logging.getLogger(__name__)

class JourneyViewSet(viewsets.ModelViewSet):
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer

    @action(detail=False, methods=['post'])
    def generate(self, request):
        logger.debug(f"Received request data: {request.data}")  # Debug log
        
        subject = request.data.get('subject')
        topic = request.data.get('topic')
        age_group = request.data.get('age_group')

        if not all([subject, topic, age_group]):
            return Response(
                {"error": "Subject, topic, and age_group are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = anthropic.Client(api_key=os.getenv('ANTHROPIC_API_KEY'))
            logger.debug("Anthropic client created successfully")  # Debug log
            
            prompt = f"""
            Create a learning journey for children about:
            Subject: {subject}
            Topic: {topic}
            Age Group: {age_group}

            Provide the response in the following JSON format:
            {{
                "title": "Journey title",
                "steps": [
                    {{
                        "order": 1,
                        "title": "Step title",
                        "content": "Main explanation text",
                        "visual_reference": "Description of what should be shown visually",
                        "duration": "Expected duration"
                    }},
                    // more steps...
                ]
            }}
            """

            logger.debug("Sending request to Anthropic")  # Debug log
            response = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4096,
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Claude's response is in response.content
            logger.debug(f"Received response from Anthropic: {response.content}")  # Debug log
            
            # Parse the response - need to get the actual content from Claude's response
            journey_data = json.loads(response.content[0].text)  # Changed this line
            logger.debug(f"Parsed journey data: {journey_data}")  # Debug log
            
            # Create journey
            journey = Journey.objects.create(
                title=journey_data['title'],
                subject=subject,
                topic=topic,
                age_group=age_group
            )
            
            # Create steps
            for step_data in journey_data['steps']:
                Step.objects.create(
                    journey=journey,
                    order=step_data['order'],
                    title=step_data['title'],
                    content=step_data['content'],
                    visual_reference=step_data['visual_reference'],
                    duration=step_data['duration']
                )
            
            # Return the complete journey
            serializer = self.get_serializer(journey)
            return Response(serializer.data)
            
        except Exception as e:
            logger.exception("Error in generate journey")  # Log the full error
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )