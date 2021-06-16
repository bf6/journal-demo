from rest_framework.decorators import api_view
from rest_framework.response import Response
from .providers import MuxProvider
from .serializers import MuxAssetSerializer


@api_view()
def get_mux_upload_url(request):
    """
    Route that returns a direct upload url
    for Mux
    """
    mux = MuxProvider()
    direct_upload_url = mux.get_upload_url()
    return Response({'url': direct_upload_url})


@api_view()
def list_mux_assets(request):
    """
    Route that returns assets uploaded
    to Mux
    """
    mux = MuxProvider()
    assets = mux.list_assets()
    serialized_assets = MuxAssetSerializer(assets, many=True)
    return Response({'data': serialized_assets.data})
