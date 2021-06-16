from django.test import TestCase, Client
from unittest import mock, skip
from mux_python.models import (UploadResponse, Upload,
                               ListAssetsResponse, Asset, PlaybackID)


class MuxViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    @mock.patch('mux_python.DirectUploadsApi.create_direct_upload')
    def test_get_upload_url(self, mocked_mux_api_call):
        test_url = 'http://test-passes.io'
        mocked_mux_api_call.return_value = UploadResponse(
            data=Upload(url=test_url))
        resp = self.client.get('/mux/upload-url/')
        assert resp.status_code == 200
        assert 'url' in resp.data
        assert resp.data['url'] == test_url

    @mock.patch('mux_python.AssetsApi.list_assets')
    def test_list_mux_assets(self, mocked_mux_api_call):
        test_asset = {
            'created_at': '123456789',
            'duration': 12.32,
            'id': 'testasset',
            'playback_ids': [PlaybackID(id='testplaybackid', policy='public')]
        }
        mocked_mux_api_call.return_value = ListAssetsResponse(
            data=[Asset(**test_asset)])
        resp = self.client.get('/mux/assets/')
        assert resp.status_code == 200
        assert 'data' in resp.data
        assert len(resp.data['data']) == 1
        assert resp.data['data'][0]['id'] == test_asset['id']
