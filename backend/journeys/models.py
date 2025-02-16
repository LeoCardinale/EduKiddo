from django.db import models

class Journey(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    age_group = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.topic}"

class Step(models.Model):
    journey = models.ForeignKey(Journey, related_name='steps', on_delete=models.CASCADE)
    order = models.IntegerField()  # To maintain step sequence
    title = models.CharField(max_length=200)
    content = models.TextField()  # Main text/explanation content
    visual_reference = models.TextField()  # Description for visual aid generation
    duration = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return f"Step {self.order} of {self.journey.title}"