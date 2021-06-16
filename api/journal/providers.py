import mux_python
from django.conf import settings


class MuxPlaybackPolicy:
    """
    Playback policies for assets uploaded to Mux
    """
    PUBLIC = mux_python.PlaybackPolicy.PUBLIC
    SIGNED = mux_python.PlaybackPolicy.SIGNED


class MuxProvider:
    """
    Client wrapper for interacting with Mux API
    """

    def __init__(self):
        configuration = mux_python.Configuration()
        configuration.username = settings.MUX['ACCESS_TOKEN_ID']
        configuration.password = settings.MUX['API_SECRET_KEY']
        self.api_client = mux_python.ApiClient(configuration)
        self.uploads_api = mux_python.DirectUploadsApi(self.api_client)
        self.assets_api = mux_python.AssetsApi(self.api_client)

    def get_upload_url(self):
        """
        Returns a direct upload URL which a client can
        use to upload assets directly to Mux
        """
        create_asset_request = mux_python.CreateAssetRequest(
            playback_policy=[MuxPlaybackPolicy.PUBLIC])
        create_upload_request = mux_python.CreateUploadRequest(
            new_asset_settings=create_asset_request, cors_origin='*', test=True)
        resp = self.uploads_api.create_direct_upload(
            create_upload_request)

        return resp.data.url

    def list_assets(self, limit=25, page=1):
        """
        Returns all assets uploaded to Mux
        """
        resp = self.assets_api.list_assets(limit=limit, page=page)
        return resp.data
