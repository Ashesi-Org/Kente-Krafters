import cv2
import os
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


# Set the filename
filename = 'readymade4'
folder_name = 'textile_images'
file_path = os.path.join(folder_name, f'{filename}.jpg')
script_directory = os.path.dirname(os.path.abspath(__file__))
full_path = os.path.join(script_directory, file_path)
original_image = cv2.imread(full_path)

# Resize the image
target_size = (500, 500)
resized_image = cv2.resize(original_image, target_size)

# Flatten the image into a list of pixels
pixels = resized_image.reshape(-1, 3)

# Perform k-means clustering to quantize the colors
num_colors = 6
kmeans = KMeans(n_clusters=num_colors, random_state=42)
kmeans.fit(pixels)

# Get the quantized colors and create the quantized image
quantized_colors = kmeans.cluster_centers_.astype(np.uint8)
quantized_image = quantized_colors[kmeans.labels_].reshape(resized_image.shape)

# Save the quantized image
quantized_folder = os.path.join(script_directory, 'quantized_textiles')
os.makedirs(quantized_folder, exist_ok=True)
quantized_image_path = os.path.join(quantized_folder, f'{filename}_quantized.png')
cv2.imwrite(quantized_image_path, quantized_image)

# Display the original and quantized images
# plt.figure(figsize=(10, 5))
# plt.subplot(1, 2, 1)
# plt.title('Original Image')
# plt.imshow(cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB))
# plt.axis('off')
# plt.subplot(1, 2, 2)
# plt.title('Quantized Image')
# plt.imshow(cv2.cvtColor(quantized_image, cv2.COLOR_BGR2RGB))
# plt.axis('off')
# plt.show()
# print(f"Quantized image saved as {quantized_image_path}")
