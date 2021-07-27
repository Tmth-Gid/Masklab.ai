import torch

if __name__ == '__main__':
    # Model
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='last.pt')  # or yolov5m, yolov5x, custom

    # Images
    img = 'https://cdni.rt.com/files/2016.06/article/5772e425c46188fe308b45b8.jpg'  # or file, PIL, OpenCV, numpy, multiple

    # Inference
    results = model(img)

    # Results
    results.show()  # or .show(), .save(), .crop(), .pandas(), etc.
