import unittest

from hub import webapp


class AuthentificationcheckTest(unittest.TestCase):
    def setUp(self):
        self.client = webapp.app.test_client()
        self.first_name = "unit_test"
        self.last_name = "robot"
        self.email = "unit_test.admin@robot.com"
        self.password = "mRzwE7kCcqkFmp9P"
        self.role = "Administrator"

    def get_authorization(self):
        request_result = self.client.post("/api/authentification/login",
                                          data=dict(
                                              email=self.email,
                                              password=self.password,
                                          ))
        json_data = request_result.get_json()
        return json_data['access_token']

    def test0_register(self):
        request_result = self.client.post("/api/authentification/register",
                                          data=dict(
                                              first_name=self.first_name,
                                              last_name=self.last_name,
                                              email=self.email,
                                              password=self.password,
                                              role=self.role
                                          ))
        self.assertTrue(request_result.status_code == 201 or request_result.status_code == 409)

    def test1_good_login(self):
        request_result = self.client.post("/api/authentification/login",
                                          data=dict(
                                              email=self.email,
                                              password=self.password,
                                          ))
        json_data = request_result.get_json()
        self.authorization = json_data['access_token']
        self.assertEqual(request_result.status_code, 201)

    def test1_bad_login(self):
        request_result = self.client.post("/api/authentification/login",
                                          data=dict(
                                              email="value",
                                              password="value",
                                          ))
        self.assertEqual(request_result.status_code, 401)

    def test2_dashbaord(self):
        request_result = self.client.get("/api/authentification/dashboard",
                                         headers=
                                         {
                                             "Authorization": f"Bearer {self.get_authorization()}"
                                         })
        self.assertEqual(request_result.status_code, 200)
