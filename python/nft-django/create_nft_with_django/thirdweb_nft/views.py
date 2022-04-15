from email.mime import image
from unicodedata import name
from django.shortcuts import redirect, render, HttpResponse
from . import nft_collection
from thirdweb.types.nft import NFTMetadataInput 
import os
from io import BytesIO
#from nft_collection import nft_collection

#path ='/Users/razazaidi/Downloads/0.png'

def home(request):
    
    #file_url = nft_collection.nft_module.balance()
    # file_url = nft_collection.nft_collection.balance()
    #print("balance"+str(file_url))
    #nft_data = nft_collection.nft_collection.get_all()
    # nft_new_meta = []
    # for i in range(nft_collection.nft_collection.balance()):
    #     nft_new_meta.append(nft_data[i].metadata.image)
    
    #print("data1: "+str(nft_new_meta))

    #print("alle data"+str(nft_data))
    if request.method == 'POST' and request.FILES['home']:
    #if request.method == 'POST' :xxx
        name_nft = request.POST.get('name','')
        description_nft = "My-Wing"
        image_nft = request.FILES['home'].file
        image_nft.name = request.POST.get('name','')
       
        #open(BytesIO(image.read()), "rb")
        #image_nft = open(path,"r")
        prop = {}

        nft_metadata = {
            'name': name_nft,
            'description': description_nft,
            'image': image_nft,
            'properties':prop
        }
        print(nft_metadata)
        nft_collection.nft_collection.mint(NFTMetadataInput.from_json(nft_metadata))
        #nft_network.nft_module.mint(MintArg(name=name_nft,description=description_nft,image_uri=image_nft, properties=prop))
        
        return redirect("success")
        
    return render(request, "index.html",{})
    #{'file_url': file_url, 'nft_data': nft_data, 'nft_new_meta':nft_new_meta}


def success(request):
    return HttpResponse("successfully uploaded")