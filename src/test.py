import tensorflow
from flask import Flask, jsonify,request
from keras.applications.resnet50 import ResNet50,preprocess_input
from keras.layers import GlobalMaxPooling2D
import os 
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.applications import ResNet50
from sklearn.neighbors import NearestNeighbors
import cv2
import numpy as np
from numpy.linalg import norm
import pickle 
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model.trainable=False
model=tensorflow.keras.Sequential([model,GlobalMaxPooling2D()])
featurelist=pickle.load(open(r"C:\Users\dell\python_project\src\featurelist.pkl","rb"))
namelist=pickle.load(open(r"C:\Users\dell\python_project\src\namelist.pkl","rb"))
neigh = NearestNeighbors(n_neighbors=12,algorithm="brute",metric="euclidean")
neigh.fit(featurelist)
def extract_indices(img_path,model):
    image=cv2.imread(img_path)
    width = 224
    height = 224
    image = cv2.resize(image, (width, height))
    image=np.array(image)
    expand_img=np.expand_dims(image,axis=0)
    expand_img.shape
    pre_img=preprocess_input(expand_img)
    result=model.predict(pre_img).flatten()
    normalized=result/norm(result)
    distances, indices = neigh.kneighbors([normalized])
    listfinal =[]
    s=0.80
    for  i in range(len(distances[0])): 
        if distances[0][i] < s:
            listfinal.append(indices[0][i])
            
    return  distances
def extract_feature(img_path,model):
    image=cv2.imread(img_path)
    width = 224
    height = 224
    image = cv2.resize(image, (width, height))
    image=np.array(image)
    expand_img=np.expand_dims(image,axis=0)
    expand_img.shape
    pre_img=preprocess_input(expand_img)
    result=model.predict(pre_img).flatten()
    normalized=result/norm(result)
    return normalized
featurelist=pickle.load(open("featurelist.pkl","rb"))
namelist=pickle.load(open("namelist.pkl","rb"))

df = pd.read_csv(r"C:\Users\dell\Pictures\archive\data\fashion.csv")

dist = extract_indices(r"C:\Users\dell\Downloads\0000.jpg", model)
print(dist)


