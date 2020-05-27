"""Test installed Dlib package: requires scikit-image: ``pip install scikit-image``."""
import os

import dlib

from skimage import io

if __name__ == '__main__':
    this_path = os.path.dirname(os.path.realpath(__file__))
    img = io.imread('{this_path}/asap-mob.jpg'.format(this_path=this_path))
    detector = dlib.get_frontal_face_detector()
    faces = detector(img, 2)
    assert len(faces) == 8
    print("DLib is working!")
