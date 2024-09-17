import unittest
from flask import json
from app import app  # Import the app from your Flask file
from unittest.mock import patch, MagicMock
 
class FlaskAppTest(unittest.TestCase):
 
    # List to store test results
    test_results = []
 
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
 
    @patch('app.model')  # Mock the model object
    def test_predict_data_success(self, mock_model):
        try:
            mock_model.predict.return_value = [[14,31]]  # Mock prediction (rainfall, temperature)
 
            test_data = {
                'longitude': 80.5482919,
                'latitude': 5.947822,
                'month': 5
            }
 
            response = self.app.post('/predict_data', 
                                     data=json.dumps(test_data),
                                     content_type='application/json')
 
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.data)
            self.assertEqual(response_data['rainfall'], 14)
            self.assertEqual(response_data['temperature'], 31)
            FlaskAppTest.test_results.append("Test Case 1: Success")
        except AssertionError:
            FlaskAppTest.test_results.append("Test Case 1: Fail")
    @patch('app.db')  # Mock the Firestore client
    def test_login_success(self, mock_db):
        try:
            # Mocking Firestore response with document snapshot
            mock_doc = MagicMock()
            mock_doc.to_dict.return_value = {'password': 'test123'}
            mock_db.collection().where().stream.return_value = [mock_doc]
 
            login_data = {
                'email': 'testuser@example.com',
                'password': 'test123'
            }
 
            response = self.app.post('/login', 
                                     data=json.dumps(login_data),
                                     content_type='application/json')
 
            self.assertEqual(response.status_code, 200)
            response_data = json.loads(response.data)
            self.assertEqual(response_data['message'], 'Login successful')
            FlaskAppTest.test_results.append("Test Case 2: Success")
        except AssertionError:
            FlaskAppTest.test_results.append("Test Case 2: Fail")
 
    @patch('app.db')  # Mock the Firestore client
    def test_login_failure(self, mock_db):
        try:
            # Mocking Firestore response with no matching document
            mock_db.collection().where().stream.return_value = []
 
            login_data = {
                'email': 'invaliduser@example.com',
                'password': 'wrongpassword'
            }
 
            response = self.app.post('/login', 
                                     data=json.dumps(login_data),
                                     content_type='application/json')
 
            self.assertEqual(response.status_code, 401)
            response_data = json.loads(response.data)
            self.assertEqual(response_data['message'], 'Invalid email or password')
            FlaskAppTest.test_results.append("Test Case 3: Success")
        except AssertionError:
            FlaskAppTest.test_results.append("Test Case 3: Fail")
 
    @patch('app.db')  # Mock the Firestore client
    def test_register_success(self, mock_db):
        try:
            # Mock Firestore collection and methods
            mock_collection = MagicMock()
            mock_collection.where.return_value.stream.return_value = []  # No existing user
            mock_db.collection.return_value = mock_collection
            # Mock Firestore `add` method
            mock_add = MagicMock()
            mock_collection.add = mock_add
 
            register_data = {
                'name': 'New User',
                'email': 'newuser@example.com',
                'password': 'newpassword'
            }
 
            response = self.app.post('/register', 
                                     data=json.dumps(register_data),
                                     content_type='application/json')
 
            self.assertEqual(response.status_code, 201)
            response_data = json.loads(response.data)
            self.assertEqual(response_data['message'], 'User registered successfully')
            FlaskAppTest.test_results.append("Test Case 4: Success")
        except AssertionError:
            FlaskAppTest.test_results.append("Test Case 4: Fail")
 
    @classmethod
    def tearDownClass(cls):
        print("\nTest Results Summary:")
        for result in cls.test_results:
            print(result)
 
    @patch('app.db')  # Mock the Firestore client
    def test_register_user_already_exists(self, mock_db):
        try:
            # Mocking Firestore response with existing user
            mock_doc = MagicMock()
            mock_doc.to_dict.return_value = {'email': 'newuser@example.com'}
            mock_db.collection().where().stream.return_value = [mock_doc]
 
            register_data = {
                'name': 'New User',
                'email': 'newuser@example.com',
                'password': 'newpassword'
            }
 
            response = self.app.post('/register', 
                                     data=json.dumps(register_data),
                                     content_type='application/json')
 
            self.assertEqual(response.status_code, 400)
            response_data = json.loads(response.data)
            self.assertEqual(response_data['message'], 'User already exists')
            FlaskAppTest.test_results.append("Test Case 5: Success")
        except AssertionError:
            FlaskAppTest.test_results.append("Test Case 5: Fail")
 
    @classmethod
    def tearDownClass(cls):
        print("\nTest Results Summary:")
        for result in cls.test_results:
            print(result)
 
 
if __name__ == '__main__':
    unittest.main()