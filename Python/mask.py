import cv2

def apply_8bit_effect(image_path, output_path):
    # Load the image
    original_image = cv2.imread(image_path)
    
    # Define the factor for resizing (the smaller, the more pixelated)
    pixelation_level = 0.1
    
    # Pixelate the image by resizing down and up
    small = cv2.resize(original_image, None, fx=pixelation_level, fy=pixelation_level, interpolation=cv2.INTER_LINEAR)
    pixelated_image = cv2.resize(small, original_image.shape[:2][::-1], interpolation=cv2.INTER_NEAREST)
    
    # Convert the image to a palette with fewer colors
    # Convert to LAB color space for better quantization
    lab_image = cv2.cvtColor(pixelated_image, cv2.COLOR_BGR2LAB)
    
    # Quantize the ab channels to reduce the number of colors
    lab_image[:, :, 1] = (lab_image[:, :, 1] // 16) * 16
    lab_image[:, :, 2] = (lab_image[:, :, 2] // 16) * 16
    
    # Convert back to BGR color space
    quantized_image = cv2.cvtColor(lab_image, cv2.COLOR_LAB2BGR)
    
    # Save the 8-bit style image
    cv2.imwrite(output_path, quantized_image)

# Apply the effect to the uploaded image and save the result
input_image_path = './map.png'
output_image_path = './image_8bit.png'
apply_8bit_effect(input_image_path, output_image_path)
