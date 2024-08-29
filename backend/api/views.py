from django.shortcuts import render


from django.contrib.auth.models import User
from rest_framework import generics
from.serializers import Userserializer,NoteSerializer  
from .models import Note
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

class CreateUserView(generics.CreateAPIView):


    queryset=User.objects.all()
    serializer_class=Userserializer
    permission_class=[AllowAny]


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_class=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user # OBJECT USER
        return Note.objects.filter(author=user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
    permission_class=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user # OBJECT USER
        return Note.objects.filter(author=user)
    