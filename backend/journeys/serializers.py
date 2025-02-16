from rest_framework import serializers
from .models import Journey, Step

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'order', 'title', 'content', 'visual_reference', 'duration', 'completed']

class JourneySerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Journey
        fields = ['id', 'title', 'subject', 'topic', 'age_group', 'steps']