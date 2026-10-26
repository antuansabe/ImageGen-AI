import ast
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import Mock, patch


class SecurityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.backend = Path(__file__).resolve().parent.parent
        sys.path.insert(0, str(cls.backend))
        cls.tmp = tempfile.TemporaryDirectory()
        cls.old_cwd = os.getcwd()
        os.chdir(cls.tmp.name)
        cls.stack = __import__("contextlib").ExitStack()
        cls.stack.enter_context(patch.dict(os.environ, {"FRONTEND_URL": "https://trusted.example"}))
        cls.azure = Mock()
        cls.stack.enter_context(patch("openai.AzureOpenAI", cls.azure))
        spec = importlib.util.spec_from_file_location("security_test_app", cls.backend / "app.py")
        cls.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.module)
        cls.client = cls.module.app.test_client()

    @classmethod
    def tearDownClass(cls):
        cls.stack.close()
        os.chdir(cls.old_cwd)
        cls.tmp.cleanup()

    def test_untrusted_origin_is_not_authorized(self):
        response = self.client.options('/api/generate', headers={"Origin": "https://untrusted.example", "Access-Control-Request-Method": "POST"})
        self.assertNotIn("Access-Control-Allow-Origin", response.headers)

    def test_configured_origin_is_authorized(self):
        response = self.client.options('/api/generate', headers={"Origin": "https://trusted.example", "Access-Control-Request-Method": "POST"})
        self.assertEqual(response.headers.get("Access-Control-Allow-Origin"), "https://trusted.example")
    def test_large_request_is_rejected_before_model_call(self):
        response = self.client.post("/api/generate", json={"prompt": "x" * (1024 * 1024 + 1)})
        self.assertEqual(response.status_code, 413)
        self.azure.return_value.images.generate.assert_not_called()


if __name__ == "__main__":
    unittest.main()
