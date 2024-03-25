import json
import unittest
from app import create_app, db
from flask_jwt_extended import create_access_token


class MessageTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

        with self.app.app_context():
            self.access_token = create_access_token(identity='testuser')
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_post_message(self):
        # Test successful message post
        headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Content-Type': 'application/json'
        }
        data = {'content': 'Hello World', 'user': 'testuser'}
        response = self.client.post('/messages', headers=headers, data=json.dumps(data))
        self.assertEqual(response.status_code, 201)

        # Test post with missing content
        data = {'user': 'testuser'}
        response = self.client.post('/messages', headers=headers, data=json.dumps(data))
        self.assertEqual(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
