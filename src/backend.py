from flask import Flask, jsonify,request,Response
from PIL import Image
import pandas as  pd 

import json
from flask_cors import CORS
from werkzeug.utils import secure_filename
import random
import tensorflow
from keras.applications.resnet50 import ResNet50,preprocess_input
from keras.layers import GlobalMaxPooling2D
import os 
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.applications import ResNet50
from sklearn.neighbors import NearestNeighbors
import cv2
import numpy as np
from numpy.linalg import norm
import pickle 
UPLOAD_FOLDER = r'C:\Users\dell\python_project\src\images_test'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','jfif'}

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
    s=0.85
    for  i in range(len(distances[0])): 
        if distances[0][i] < s:
            listfinal.append(indices[0][i])
            
    return  listfinal
    
    
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/', methods=['GET'])
def get_article():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Topwear', methods=['GET'])
def get_articleTopwear():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Topwear"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})


@app.route('/Bottomwear', methods=['GET'])
def get_articleBottomwear():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Bottomwear"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Dress', methods=['GET'])
def get_articleDress():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Dress"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Innerwear', methods=['GET'])
def get_articleInnerwear():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Innerwear"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Socks', methods=['GET'])
def get_articleSocks():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Socks"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Shoes', methods=['GET'])
def get_articleShoes():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Shoes"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Sandal', methods=['GET'])
def get_articleSandal():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Sandal"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})

@app.route('/Flip', methods=['GET'])
def get_articleFlip():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Flip Flops"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/Apparel', methods=['GET'])
def get_articleApparel():
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    subcategories = df[df["SubCategory"]=="Apparel Set"]
    subcategories = subcategories[["SubCategory", "ProductTitle","Gender","ProductId","Category"]].to_dict(orient="records")
    random.shuffle(subcategories)
    return jsonify({"subcategories": subcategories})
@app.route('/sendImage', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return 'No image provided', 400
    
    df = pd.read_csv(r"C:\Users\dell\python_project\archive\data\fashion.csv")
    file = request.files['image']
    if '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            # Save the file to the upload folder
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
 
    
    corrected_path = os.path.normpath(file_path)
    listmaybe = extract_indices(fr"{corrected_path}", model)
    listmaybe = np.array(listmaybe).tolist()
    subcategories = []
    for i in listmaybe:
            image_path = namelist[i]
            filename1 = os.path.basename(image_path)
            subcategories.append(df[df["Image"] == filename1].to_dict(orient="records"))
    subcategories = np.array(subcategories).tolist()
    elements=[]
    for i in subcategories :
        elements.append(i[0])
    
    elements = np.array(elements).tolist()   
    json_response = json.dumps({"subcategories": elements})

    
    return Response(json_response, content_type='application/json')
    
 
        
        
    
    
    
    
    
        
        
    
    
    
    
   

    


if __name__ == "__main__":
    app.run(debug=True)
    