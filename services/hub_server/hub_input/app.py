#!/usr/bin/python
# -*- coding: utf-8 -*-
import base64
import time

import cv2
import socketio

sio = socketio.Client()


@sio.event
def connect():
    print('[INFO] Successfully connected to server.')


@sio.event
def connect_error():
    print('[INFO] Failed to connect to server.')


@sio.event
def disconnect():
    print('[INFO] Disconnected from server.')


class CVClient:
    def __init__(self):
        self.server_addr = 'localhost'
        self.server_port = 5001
        self.server_namespace = 'cv'

    def setup(self):
        while True:
            try:
                print('[INFO] Connecting to server http://{}:{}...'.format(
                    self.server_addr, self.server_port))
                sio.connect(
                    url='http://{}:{}/{}'
                        .format(self.server_addr, self.server_port, self.server_namespace)
                )
                sio.sleep(1)
                break
            except TypeError:
                print('[INFO] Connection Failed, Retrying...')
                time.sleep(1)
        return self

    def _convert_image_to_jpeg(self, image):
        # Encode frame as jpeg
        frame_image = cv2.imencode('.jpg', image)[1].tobytes()
        # Encode frame in base64 representation and remove
        # utf-8 encoding
        frame_image = base64.b64encode(frame_image).decode('utf-8')
        return frame_image

    def send_data(self, frame):

        sio.emit(
            'cv2server',
            self._convert_image_to_jpeg(frame)
        )


def main():
    # define a video capture object
    cap = cv2.VideoCapture(0)
    # cap = cv2.VideoCapture(
    #     'people-wearing-face-mask-stock-video-free-stock-footage-free-hd-videos-no-copyright'
    #     '-channel-pmi.mp4')
    cap.set(3, 640)
    cap.set(4, 480)
    frame_rate = 20
    count_frame = 1
    streamer = CVClient().setup()

    if not cap.isOpened():
        print('Error opening video video or file')

    while cap.isOpened():
        # Capture the video frame
        (ret, frame) = cap.read()
        if ret:
            if count_frame % frame_rate == 0:
                streamer.send_data(frame)
            count_frame += 1
    # After the loop release the cap object
    cap.release()


if __name__ == '__main__':
    main()
