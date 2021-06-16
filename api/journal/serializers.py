from rest_framework import serializers


class MuxAssetPlaybackIdListSerializer(serializers.Serializer):
    """
    Serializer class for Mux Playback ID
    """
    id = serializers.CharField()
    policy = serializers.CharField()
    thumbnail_url = serializers.SerializerMethodField()
    preview_gif_url = serializers.SerializerMethodField()
    playback_url = serializers.SerializerMethodField()

    def get_thumbnail_url(self, playback_id):
        """
        Returns a thumbnail url for this asset
        """
        return f'https://image.mux.com/{playback_id.id}/thumbnail.jpg'

    def get_preview_gif_url(self, playback_id):
        """
        Returns an animated preview gif for this asset
        """
        return f'https://image.mux.com/{playback_id.id}/animated.gif?end=1'

    def get_playback_url(self, playback_id):
        """
        Returns an animated preview gif for this asset
        """
        return f'https://stream.mux.com/{playback_id.id}.m3u8'


class MuxAssetSerializer(serializers.Serializer):
    """
    Serializer class for assets from Mux
    """
    created_at = serializers.CharField()
    duration = serializers.FloatField()
    id = serializers.CharField()
    playback_ids = MuxAssetPlaybackIdListSerializer(many=True)
