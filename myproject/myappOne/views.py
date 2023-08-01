from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer,EmailSerializer
from django.contrib.auth import authenticate
from utils.utils import formatResponse
from rest_framework import status
from django.core.mail import send_mail,EmailMultiAlternatives
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.template.loader import render_to_string
from sys import exc_info
from .models import Email,User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        print("------------------------------")
        user_id = request.GET.get("user_id",None)
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                serializer = UserSerializer(user)
                response_data = serializer.data
            except User.DoesNotExist:
                return Response(formatResponse('User not found', 'error', None, status.HTTP_400_BAD_REQUEST))
        else:
            users = User.objects.all()

            print(users)
            serializer = UserSerializer(users, many=True)
            response_data = serializer.data

            print(response_data,'response_data')

        return Response(formatResponse('User(s) retrieved successfully', 'success', response_data, status.HTTP_200_OK))

    def put(self, request):
        user_id = request.GET.get("user_id",None)
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(formatResponse('User not found', 'error', None, status.HTTP_400_BAD_REQUEST))

        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(formatResponse('User updated successfully', 'success', None, status.HTTP_200_OK))
        return Response(formatResponse('Invalid data provided', 'error', serializer.errors, status.HTTP_400_BAD_REQUEST))

    def delete(self, request):
        user_id = request.GET.get("user_id",None)
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(formatResponse('User not found', 'error', None, status.HTTP_400_BAD_REQUEST))

        user.delete()
        return Response(formatResponse('User deleted successfully.', 'success', None, status.HTTP_200_OK))




class EmailView(APIView):
        permission_classes = (IsAuthenticated,)
        def sendemail(request):
            try:
                print("-------------welcome----------",request.data)
                subject = request.data.get('subject', '')
                message = request.data.get('message', '')
                recipients = request.data.get('recipients', [])
                attachment = request.FILES.get('attachment', None)
                print("-attachment-->",attachment)
                print("--subject->",subject)
                print("--message->",message)
                print("--recipients->",recipients)
                if not subject or not message or not recipients:
                    print("-------------11111----------")
                    return Response(formatResponse('Please provide subject, message, and recipients.', 'Error', None, status.HTTP_400_BAD_REQUEST))

                if not isinstance(recipients, (list, tuple)):
                    print("-------------222222----------")
                    return Response(formatResponse('Recipients must be a list or tuple.', 'Error', None, status.HTTP_400_BAD_REQUEST))
                
                _list = []
                emails_not_exist = [] 
                for x in recipients:
                    email_exists = Email.objects.filter(mail=x).values('is_sent').first()
                    if email_exists and not email_exists['is_sent']:  
                        _list.append(x)

                    try:
                        Email.objects.get(mail=x) 
                    except ObjectDoesNotExist:
                        emails_not_exist.append(x)
                        _list.append(x)

                if not _list:
                    print("-------------33333----------")
                    return Response(formatResponse('Email already sent to all recipients.', 'Success', None, status.HTTP_200_OK))
                
                print(emails_not_exist, 'emails_not_exist')

                for recipient_email in _list:
                    email = EmailMultiAlternatives(
                        subject=subject,
                        body=message,
                        from_email=settings.EMAIL_HOST_USER,
                        to=[recipient_email]  
                    )
                    if attachment:
                        email.attach(attachment.name, attachment.read(), attachment.content_type)
                    else:
                        html_content = render_to_string('template.html', {'message': message})
                        
                        email.attach_alternative(html_content, 'text/html')
                    email.send()

                    try:
                        email_obj = Email.objects.get(mail=recipient_email)
                        email_obj.is_sent = True
                        email_obj.save()
                        print(email_obj,'email_obj')
                    except ObjectDoesNotExist:
                        email_obj = Email.objects.create(
                            mail=recipient_email,
                            subject=subject,
                            sender=settings.EMAIL_HOST_USER,
                            message=message,
                            is_sent=True,
                            attachment=attachment if attachment else None
                        )
                        print(_list,'dsfsdfdfsdfs')

                return Response(formatResponse('Email sent successfully.', 'Success', _list , status.HTTP_200_OK))

            except Exception as e:
                print("-=====>",exc_info(),str(e))
                return Response(formatResponse("Internal server error", 'Error', None, status.HTTP_500_INTERNAL_SERVER_ERROR))







#Register API
@api_view(['POST'])
def register(request):
    try:
        print(request.data,'request')
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(formatResponse('Registration successfully.',"Success",serializer.data,status.HTTP_200_OK))
        return Response(formatResponse(serializer.errors, 'error', None, status.HTTP_400_BAD_REQUEST))
    except :
            print("--->",exc_info())
            return Response(formatResponse("Internal server error", "Error", None, status.HTTP_500_INTERNAL_SERVER_ERROR))



from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(['POST'])
def login(request):
    try:
        print(request.data, 'request')
        email = request.data['email']
        password = request.data['password']
        user = authenticate(request=request, username=email, password=password)

        print(user, 'user')
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)
            print(user, 'user')
            return Response(formatResponse("User successfully logged in", "Success", {'user_data': serializer.data, 'token': token.key}, status.HTTP_200_OK))
        else:
            raise AuthenticationFailed("Invalid email or password")

    except AuthenticationFailed as e:
        return Response(formatResponse("Invalid email or password", "Error", None, status.HTTP_401_UNAUTHORIZED))
    except Exception as e:
        print('exit', exc_info())
        return Response(formatResponse("Internal server error", "Error", None, status.HTTP_500_INTERNAL_SERVER_ERROR))




    

# Logout Api
@api_view(['POST'])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logout successfully.'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)






